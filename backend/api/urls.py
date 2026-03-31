from django.urls import path
from .views import get_locations, get_sensors, get_flood_data, get_alerts

urlpatterns = [
    path('locations/', get_locations),
    path('sensors/', get_sensors),
    path('flood-data/', get_flood_data),
    path('alerts/', get_alerts),
]