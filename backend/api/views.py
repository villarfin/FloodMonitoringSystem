from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Location, Sensor, FloodData, Alert
from .serializers import LocationSerializer, SensorSerializer, FloodDataSerializer, AlertSerializer

@api_view(['GET'])
def get_locations(request):
    locations = Location.objects.all()
    serializer = LocationSerializer(locations, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_sensors(request):
    sensors = Sensor.objects.all()
    serializer = SensorSerializer(sensors, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_flood_data(request):
    data = FloodData.objects.all().order_by('-timestamp')
    serializer = FloodDataSerializer(data, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_alerts(request):
    alerts = Alert.objects.all().order_by('-timestamp')
    serializer = AlertSerializer(alerts, many=True)
    return Response(serializer.data)