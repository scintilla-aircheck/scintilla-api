from django.db import models

from mixins.fields import DataField, GeoCoordinateField
from mixins.models import DateMixin

from deployments.models import Device
from platforms.models import Sensor


class AbstractReading(DateMixin):
    device = models.ForeignKey(Device)
    sensor = models.ForeignKey(Sensor)
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

    reading = models.ForeignKey('Reading')

    def __unicode__(self):
        return str(self.name)


class Reading(AbstractReading):

    reading_group = models.ForeignKey('ReadingGroup')

    def __unicode__(self):
        return str(self.name)


class ReadingGroup(DateMixin):

    def __unicode__(self):
        return str(self.id)