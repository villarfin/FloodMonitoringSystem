from decimal import Decimal

from django.db import migrations, models
from django.utils import timezone


WATER_SEEDS = [
    ("Cagayan De Oro River", "0.00", "14.00", "Normal", "Steady"),
    ("Bigaan River", "4.10", "8.00", "Normal", "Steady"),
    ("Bitan-ag Creek", "7.00", "10.00", "Warning", "Rising"),
    ("Kauswagan Canal", "3.50", "7.00", "Normal", "Falling"),
    ("Taguanao Creek", "6.90", "9.00", "Warning", "Steady"),
    ("Iponan River", "9.20", "10.50", "Danger", "Rising"),
]


def seed_monitoring_data(apps, _schema_editor):
    WaterLevel = apps.get_model("core", "WaterLevel")
    Alert = apps.get_model("core", "Alert")

    existing_names = set(WaterLevel.objects.values_list("location_name", flat=True))
    for location_name, current_level, max_level, status, trend in WATER_SEEDS:
        if location_name in existing_names:
            continue
        WaterLevel.objects.create(
            location_name=location_name,
            current_level=Decimal(current_level),
            max_level=Decimal(max_level),
            status=status,
            trend=trend,
        )

    if not Alert.objects.exists():
        Alert.objects.create(
            title="High Water Level",
            message="Central Dam water level is approaching maximum capacity.",
            type="danger",
            created_at=timezone.now(),
        )


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0003_incidentreport_waterlevel_alter_alert_options_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="IoTReading",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("location_name", models.CharField(max_length=255)),
                ("current_level", models.DecimalField(decimal_places=2, max_digits=6)),
                ("status", models.CharField(max_length=10)),
                ("trend", models.CharField(max_length=10)),
                ("timestamp", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "ordering": ["-timestamp"],
            },
        ),
        migrations.RunPython(seed_monitoring_data, migrations.RunPython.noop),
    ]
