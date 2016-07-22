from decimal import Decimal

import factory

from django.utils import timezone

from .models import SensorReading


class SensorReadingFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = SensorReading

    api_key = '12345'
    sensor = 'Sensor Name'
    type = 1
    unit = 1
    average_over_hours = 0
    value = Decimal('1.6')
    longitude = Decimal('43.4')
    latitude = Decimal('45.3')
    temperature = Decimal('32.4')
    humidity = Decimal('98.4')
    date = timezone.now()
    public = True
