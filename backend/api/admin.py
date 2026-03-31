from django.contrib import admin
from .models import Location, Sensor, FloodData, Alert

# Register your models so they appear in the admin panel
@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('name', 'location_type', 'barangay', 'municipality', 'status', 'current_level', 'max_level')
    search_fields = ('name', 'barangay', 'municipality')
    list_filter = ('location_type', 'status', 'trend')

@admin.register(Sensor)
class SensorAdmin(admin.ModelAdmin):
    list_display = ('name', 'location')
    list_filter = ('location',)
    search_fields = ('name',)

@admin.register(FloodData)
class FloodDataAdmin(admin.ModelAdmin):
    list_display = ('sensor', 'water_level', 'timestamp')
    list_filter = ('sensor', 'timestamp')
    search_fields = ('sensor__name',)

@admin.register(Alert)
class AlertAdmin(admin.ModelAdmin):
    list_display = ('location', 'level', 'message', 'timestamp')
    list_filter = ('level', 'location', 'timestamp')
    search_fields = ('location__name', 'level', 'message')