from decimal import Decimal
import random

from djcelery import celery

from django.utils import timezone

from readings.models import Reading


@celery.task
def mock_readings_generator(*args):
    reading = Reading(value=Decimal(random.randint(1, 1000)), device_id=1, sensor_id=1, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=0, time=timezone.now())
    reading.save()
