from django.conf import settings
from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="products",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name


class Alert(models.Model):
    TYPE_CHOICES = [
        ("info", "Info"),
        ("warning", "Warning"),
        ("danger", "Danger"),
    ]

    title = models.CharField(max_length=255)
    message = models.TextField()
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, default="info")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.title} ({self.type})"


class WaterLevel(models.Model):
    STATUS_CHOICES = [
        ("Normal", "Normal"),
        ("Warning", "Warning"),
        ("Danger", "Danger"),
    ]
    TREND_CHOICES = [
        ("Steady", "Steady"),
        ("Rising", "Rising"),
        ("Falling", "Falling"),
    ]

    location_name = models.CharField(max_length=255)
    current_level = models.DecimalField(max_digits=5, decimal_places=2)
    max_level = models.DecimalField(max_digits=5, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="Normal")
    trend = models.CharField(max_length=10, choices=TREND_CHOICES, default="Steady")
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.location_name} - {self.current_level}m"


class IoTReading(models.Model):
    location_name = models.CharField(max_length=255)
    current_level = models.DecimalField(max_digits=6, decimal_places=2)
    status = models.CharField(max_length=10)
    trend = models.CharField(max_length=10)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-timestamp"]

    def __str__(self):
        return f"{self.location_name} - {self.current_level}m @ {self.timestamp}"


class IncidentReport(models.Model):
    reporter_name = models.CharField(max_length=255)
    incident_type = models.CharField(max_length=255)
    rescue_needs = models.TextField()
    location = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Report by {self.reporter_name} - {self.incident_type}"
