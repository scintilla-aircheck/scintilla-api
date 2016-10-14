from django.db import models

from mixins.fields import DataField, GeoCoordinateField
from mixins.models import DateMixin

from deployments.models import Device
from platforms.models import Sensor


class AbstractReading(DateMixin):
    device = models.ForeignKey(Device, null=True, blank=True)
    sensor = models.ForeignKey(Sensor, null=True, blank=True)
    value = DataField(null=True, blank=True)
    average_over_seconds = models.IntegerField(default=0, help_text="If the value is an average reading over time, how "
                                                                    "many seconds is the average taken over? If it is "
                                                                    "not an average, set average_over_seconds = 0")
    longitude = GeoCoordinateField(null=True, blank=True)
    latitude = GeoCoordinateField(null=True, blank=True)
    unit = models.IntegerField(default=Sensor.Unit.NONE, choices=Sensor.UNIT, null=True, blank=True)
    time = models.DateTimeField(null=True, blank=True)

    class Meta:
        abstract = True


class CalibratedReading(AbstractReading):

    reading = models.ForeignKey('Reading', null=True, blank=True)

    def __str__(self):
        return str(self.id)


class Reading(AbstractReading):

    reading_group = models.ForeignKey('ReadingGroup', null=True, blank=True)

    def __str__(self):
        return str(self.id)


class ReadingGroup(DateMixin):

    def __str__(self):
        return str(self.id)
