from django.urls import include, path
from rest_framework.routers import DefaultRouter

from core.api.views import (
    LoginView,
    ProductViewSet,
    RegisterView,
    AlertViewSet,
    WaterLevelViewSet,
    IncidentReportViewSet,
    HealthView,
    IoTHistoryView,
    IoTLatestView,
    IoTReadingIngestView,
    IoTReadingsView,
)

router = DefaultRouter()
router.register(r"products", ProductViewSet, basename="product")
router.register(r"alerts", AlertViewSet, basename="alert")
router.register(r"water-levels", WaterLevelViewSet, basename="water-level")
router.register(r"reports", IncidentReportViewSet, basename="report")

urlpatterns = [
    path("health", HealthView.as_view(), name="health-no-slash"),
    path("health/", HealthView.as_view(), name="health"),
    path("iot/reading", IoTReadingIngestView.as_view(), name="iot-reading-no-slash"),
    path("iot/reading/", IoTReadingIngestView.as_view(), name="iot-reading"),
    path("iot/readings", IoTReadingsView.as_view(), name="iot-readings-no-slash"),
    path("iot/readings/", IoTReadingsView.as_view(), name="iot-readings"),
    path("iot/latest", IoTLatestView.as_view(), name="iot-latest-no-slash"),
    path("iot/latest/", IoTLatestView.as_view(), name="iot-latest"),
    path("iot/history", IoTHistoryView.as_view(), name="iot-history-no-slash"),
    path("iot/history/", IoTHistoryView.as_view(), name="iot-history"),
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("", include(router.urls)),
]
