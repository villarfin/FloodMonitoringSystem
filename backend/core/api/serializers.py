from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers
from rest_framework.authtoken.models import Token

from core.models import Product, Alert, WaterLevel, IncidentReport, IoTReading


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("id", "username", "email")


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = get_user_model()
        fields = ("username", "email", "password")

    def create(self, validated_data):
        user = get_user_model().objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            password=validated_data["password"],
        )
        Token.objects.create(user=user)
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        user = authenticate(
            username=attrs.get("username"), password=attrs.get("password")
        )
        if not user:
            raise serializers.ValidationError("Unable to log in with provided credentials.")
        attrs["user"] = user
        return attrs


class ProductSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Product
        fields = ("id", "name", "description", "price", "created_by", "created_at")


class AlertSerializer(serializers.ModelSerializer):
    createdAt = serializers.DateTimeField(source="created_at", read_only=True)

    class Meta:
        model = Alert
        fields = ("id", "title", "message", "type", "createdAt")


class WaterLevelSerializer(serializers.ModelSerializer):
    locationName = serializers.CharField(source="location_name")
    currentLevel = serializers.DecimalField(source="current_level", max_digits=5, decimal_places=2)
    maxLevel = serializers.DecimalField(source="max_level", max_digits=5, decimal_places=2)
    lastUpdated = serializers.DateTimeField(source="last_updated", read_only=True)

    class Meta:
        model = WaterLevel
        fields = ("id", "locationName", "currentLevel", "maxLevel", "status", "trend", "lastUpdated")


class IoTReadingSerializer(serializers.ModelSerializer):
    locationName = serializers.CharField(source="location_name", read_only=True)
    currentLevel = serializers.DecimalField(source="current_level", max_digits=6, decimal_places=2, read_only=True)

    class Meta:
        model = IoTReading
        fields = ("id", "locationName", "currentLevel", "status", "trend", "timestamp")


class IncidentReportSerializer(serializers.ModelSerializer):
    reporterName = serializers.CharField(source="reporter_name")
    incidentType = serializers.CharField(source="incident_type")
    rescueNeeds = serializers.CharField(source="rescue_needs")
    createdAt = serializers.DateTimeField(source="created_at", read_only=True)

    class Meta:
        model = IncidentReport
        fields = ("id", "reporterName", "incidentType", "rescueNeeds", "location", "createdAt")
