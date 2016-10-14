from decimal import Decimal
import random
import time

from django.core.management.base import BaseCommand
from django.utils import timezone

from readings.models import Reading


class Command(BaseCommand):

    def handle(self, *args, **options):
        while True:
            reading = Reading(value=Decimal(random.randint(1, 1000)), device_id=1, sensor_id=1, average_over_seconds=60, longitude=1.234, latitude=5.678, unit=0, time=timezone.now())
            reading.save()
            time.sleep(10)
