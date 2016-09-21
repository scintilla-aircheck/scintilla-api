from decimal import Decimal

import factory

from django.utils import timezone

from .models import CalibratedReading, Reading, ReadingGroup


class AbstractReadingFactory(factory.django.DjangoModelFactory):

    value = Decimal('0.0')
    average_over_seconds = 0
    longitude = Decimal('0.0')
    latitude = Decimal('0.0')
    unit = 0
    time = timezone.now()

    class Meta:
        abstract = True


class ReadingGroupFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = ReadingGroup


class ReadingFactory(AbstractReadingFactory):

    class Meta:
        model = Reading

    reading_group = factory.SubFactory(ReadingGroupFactory)


class CalibratedReadingFactory(AbstractReadingFactory):

    class Meta:
        model = CalibratedReading

    reading = factory.SubFactory(ReadingFactory)
