from django.contrib.auth import login
from django.conf import settings
from django.db import transaction
from django.utils import timezone
from rest_framework import permissions, viewsets
from rest_framework.exceptions import ParseError, PermissionDenied
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from core.models import Product, Alert, WaterLevel, IncidentReport, IoTReading
from core.api.serializers import (
    LoginSerializer,
    ProductSerializer,
    RegisterSerializer,
    UserSerializer,
    AlertSerializer,
    WaterLevelSerializer,
    IncidentReportSerializer,
    IoTReadingSerializer,
)


IOT_API_KEY = getattr(settings, "IOT_API_KEY", "flood-iot-secret-2026")
IOT_STALE_MINUTES = 5
PROTOTYPE_MAX_LEVEL_CM = 14.0
WARNING_LEVEL_CM = 6.0
DANGER_LEVEL_CM = 10.0


def _read_payload(data, *keys, default=None):
    for key in keys:
        if key in data and data[key] not in (None, ""):
            return data[key]
    return default


def _normalize_trend(trend):
    value = str(trend or "").strip().lower()
    if value == "rising":
        return "Rising"
    if value == "falling":
        return "Falling"
    return "Steady"


def _compute_status(current_level, _max_level):
    level = float(current_level)
    if level >= DANGER_LEVEL_CM:
        return "Danger"
    if level >= WARNING_LEVEL_CM:
        return "Warning"
    return "Normal"


def _no_store(response):
    response["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    response["Pragma"] = "no-cache"
    response["Expires"] = "0"
    return response


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = Token.objects.get(user=user)
        return Response({
            "user": UserSerializer(user).data,
            "token": token.key,
        })


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "user": UserSerializer(user).data,
            "token": token.key,
        })


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class AlertViewSet(viewsets.ModelViewSet):
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer
    permission_classes = [permissions.AllowAny]  # Alerts should be public usually


class WaterLevelViewSet(viewsets.ModelViewSet):
    queryset = WaterLevel.objects.all()
    serializer_class = WaterLevelSerializer
    permission_classes = [permissions.AllowAny]

    def list(self, request, *args, **kwargs):
        return _no_store(super().list(request, *args, **kwargs))


class HealthView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, _request):
        latest = IoTReading.objects.order_by("-timestamp").first()
        latest_at = latest.timestamp if latest else None
        iot_stale = False
        if latest_at:
            iot_stale = timezone.now() - latest_at > timezone.timedelta(minutes=IOT_STALE_MINUTES)

        return _no_store(Response({
            "status": "ok",
            "db": True,
            "stationCount": WaterLevel.objects.count(),
            "alertCount": Alert.objects.count(),
            "iotReadingCount": IoTReading.objects.count(),
            "latestIotAt": latest_at.isoformat() if latest_at else None,
            "latestIotLocation": latest.location_name if latest else None,
            "iotStale": iot_stale,
            "thresholds": {
                "unit": "cm",
                "maxLevel": PROTOTYPE_MAX_LEVEL_CM,
                "safeBelow": WARNING_LEVEL_CM,
                "warningFrom": WARNING_LEVEL_CM,
                "dangerFrom": DANGER_LEVEL_CM,
            },
        }))


class IoTReadingIngestView(APIView):
    permission_classes = [permissions.AllowAny]

    @transaction.atomic
    def get(self, request):
        return self._save_reading(request)

    @transaction.atomic
    def post(self, request):
        return self._save_reading(request)

    def _save_reading(self, request):
        data = request.data if request.method != "GET" else request.query_params
        api_key = _read_payload(data, "api_key", "apiKey")
        if not api_key:
            api_key = request.headers.get("X-API-Key")
        if api_key != IOT_API_KEY:
            raise PermissionDenied("Invalid API key")

        location_name = _read_payload(
            data,
            "location_name",
            "locationName",
            "location",
            default="Cagayan De Oro River",
        )
        level_value = _read_payload(
            data,
            "current_level",
            "currentLevel",
            "waterLevel",
            "level",
            "water_level",
        )
        if level_value is None:
            raise ParseError("Missing water level. Send current_level, currentLevel, waterLevel, or level.")

        try:
            current_level = float(level_value)
        except (TypeError, ValueError):
            raise ParseError("Water level must be a number.")

        trend = _normalize_trend(_read_payload(data, "trend", default="Steady"))
        water = WaterLevel.objects.filter(location_name=location_name).first()

        max_level_value = _read_payload(data, "max_level", "maxLevel")
        max_level = float(max_level_value or PROTOTYPE_MAX_LEVEL_CM)
        if water:
            max_level = float(water.max_level or max_level)
        status = _compute_status(current_level, max_level)

        reading = IoTReading.objects.create(
            location_name=location_name,
            current_level=current_level,
            status=status,
            trend=trend,
        )

        if water:
            water.current_level = current_level
            water.max_level = max_level
            water.status = status
            water.trend = trend
            water.save(update_fields=["current_level", "max_level", "status", "trend", "last_updated"])
        else:
            WaterLevel.objects.create(
                location_name=location_name,
                current_level=current_level,
                max_level=max_level,
                status=status,
                trend=trend,
            )

        if status == "Danger":
            cutoff = timezone.now() - timezone.timedelta(minutes=15)
            has_recent_alert = Alert.objects.filter(
                type="danger",
                title__icontains=location_name,
                created_at__gte=cutoff,
            ).exists()
            if not has_recent_alert:
                pct = round((current_level / max_level) * 100, 1) if max_level else 0
                Alert.objects.create(
                    title=f"IoT Danger - {location_name}",
                    message=f"Sensor reading {current_level:.2f}cm ({pct}% of 14cm prototype max, {trend}). Automated alert.",
                    type="danger",
                )

        return _no_store(Response(IoTReadingSerializer(reading).data, status=201))


class IoTLatestView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        location_name = request.query_params.get("location_name")
        queryset = IoTReading.objects.all()
        if location_name:
            queryset = queryset.filter(location_name=location_name)
        reading = queryset.order_by("-timestamp").first()
        if not reading:
            return _no_store(Response(None))
        return _no_store(Response(IoTReadingSerializer(reading).data))


class IoTReadingsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        try:
            limit = min(max(int(request.query_params.get("limit", 50)), 1), 500)
        except ValueError:
            limit = 50
        readings = IoTReading.objects.order_by("-timestamp")[:limit]
        return _no_store(Response(IoTReadingSerializer(readings, many=True).data))


class IoTHistoryView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        location_name = request.query_params.get("location_name")
        if not location_name:
            raise ParseError("location_name is required")
        try:
            hours = min(max(int(request.query_params.get("hours", 24)), 1), 168)
        except ValueError:
            hours = 24
        cutoff = timezone.now() - timezone.timedelta(hours=hours)
        readings = IoTReading.objects.filter(
            location_name=location_name,
            timestamp__gte=cutoff,
        ).order_by("timestamp")
        return _no_store(Response([
            {
                "timestamp": reading.timestamp.isoformat(),
                "level": float(reading.current_level),
                "status": reading.status,
                "trend": reading.trend,
            }
            for reading in readings
        ]))


class IncidentReportViewSet(viewsets.ModelViewSet):
    queryset = IncidentReport.objects.all()
    serializer_class = IncidentReportSerializer
    permission_classes = [permissions.AllowAny]  # Public reporting
