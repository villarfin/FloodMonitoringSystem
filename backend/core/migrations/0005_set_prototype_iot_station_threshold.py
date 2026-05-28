from decimal import Decimal

from django.db import migrations


def set_prototype_station(apps, _schema_editor):
    WaterLevel = apps.get_model("core", "WaterLevel")
    WaterLevel.objects.filter(location_name="Cagayan De Oro River").update(
        max_level=Decimal("14.00"),
    )


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0004_iotreading_seed_monitoring_data"),
    ]

    operations = [
        migrations.RunPython(set_prototype_station, migrations.RunPython.noop),
    ]
