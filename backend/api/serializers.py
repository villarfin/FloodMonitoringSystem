from rest_framework import serializers
from .models import Location, Sensor, FloodData, Alert

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'


class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensor
        fields = '__all__'


class FloodDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = FloodData
        fields = '__all__'


class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = '__all__'