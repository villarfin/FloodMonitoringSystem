from django.db import models

class Location(models.Model):
    name = models.CharField(max_length=100)
    location_type = models.CharField(max_length=50, default="River")
    barangay = models.CharField(max_length=100, blank=True, null=True)
    municipality = models.CharField(max_length=100, blank=True, null=True)
    max_level = models.FloatField(default=10.0)
    current_level = models.FloatField(default=0.0)
    status = models.CharField(max_length=50, default="Safe")
    trend = models.CharField(max_length=50, default="Stable")
    notes = models.TextField(blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    image_url = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name


class Sensor(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} ({self.location.name})"


class FloodData(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    water_level = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sensor.name} - {self.water_level}m"


class Alert(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    level = models.CharField(max_length=50)  # e.g. Low, Medium, High
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.level} alert at {self.location.name}"