from decimal import Decimal
import random

from djcelery import celery

from django.utils import timezone

from readings.models import Reading


@celery.task
def mock_readings_generator(*args):
    reading = Reading(value=Decimal(random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250)), device_id=1, sensor_id=1, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=1, time=timezone.now())
    reading.save()
    reading = Reading(value=Decimal(random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250)), device_id=2, sensor_id=1, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=1, time=timezone.now())
    reading.save()
    reading = Reading(value=Decimal(random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250)), device_id=3, sensor_id=1, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=1, time=timezone.now())
    reading.save()
    reading = Reading(value=Decimal(random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250)), device_id=4, sensor_id=1, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=1, time=timezone.now())
    reading.save()
    reading = Reading(value=Decimal(random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250)), device_id=5, sensor_id=1, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=1, time=timezone.now())
    reading.save()
    reading = Reading(value=Decimal(random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250)), device_id=6, sensor_id=1, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=1, time=timezone.now())
    reading.save()
    reading = Reading(value=Decimal(random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250)), device_id=7, sensor_id=1, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=1, time=timezone.now())
    reading.save()
    reading = Reading(value=Decimal(random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250)), device_id=8, sensor_id=1, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=1, time=timezone.now())
    reading.save()
    reading = Reading(value=Decimal(random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250)), device_id=9, sensor_id=1, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=1, time=timezone.now())
    reading.save()
    reading = Reading(value=Decimal(random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250)), device_id=10, sensor_id=1, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=1, time=timezone.now())
    reading.save()
    reading = Reading(value=Decimal(random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250)), device_id=11, sensor_id=1, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=1, time=timezone.now())
    reading.save()
    reading = Reading(value=Decimal(random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250)), device_id=12, sensor_id=1, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=1, time=timezone.now())
    reading.save()
    reading = Reading(value=Decimal(random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250)), device_id=13, sensor_id=1, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=1, time=timezone.now())
    reading.save()

    reading = Reading(value=Decimal(random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250)), device_id=1, sensor_id=2, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=2, time=timezone.now())
    reading.save()
    reading = Reading(value=Decimal(random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250)), device_id=2, sensor_id=2, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=2, time=timezone.now())
    reading.save()
    reading = Reading(value=Decimal(random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250)), device_id=3, sensor_id=2, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=2, time=timezone.now())
    reading.save()
    reading = Reading(value=Decimal(random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250)), device_id=4, sensor_id=2, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=2, time=timezone.now())
    reading.save()
    reading = Reading(value=Decimal(random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250)), device_id=5, sensor_id=2, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=2, time=timezone.now())
    reading.save()
    reading = Reading(value=Decimal(random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250)), device_id=6, sensor_id=2, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=2, time=timezone.now())
    reading.save()
    reading = Reading(value=Decimal(random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250)), device_id=7, sensor_id=2, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=2, time=timezone.now())
    reading.save()
    reading = Reading(value=Decimal(random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250)), device_id=8, sensor_id=2, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=2, time=timezone.now())
    reading.save()
    reading = Reading(value=Decimal(random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250)), device_id=9, sensor_id=2, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=2, time=timezone.now())
    reading.save()
    reading = Reading(value=Decimal(random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250)), device_id=10, sensor_id=2, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=2, time=timezone.now())
    reading.save()
    reading = Reading(value=Decimal(random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250)), device_id=11, sensor_id=2, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=2, time=timezone.now())
    reading.save()
    reading = Reading(value=Decimal(random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250)), device_id=12, sensor_id=2, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=2, time=timezone.now())
    reading.save()
    reading = Reading(value=Decimal(random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250) + random.randint(1, 250)), device_id=13, sensor_id=2, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=2, time=timezone.now())
    reading.save()
