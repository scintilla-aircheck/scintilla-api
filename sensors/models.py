from __future__ import unicode_literals

from django.db import models

from mixins.models import DateMixin

from accounts.models import ApiField


class GeoCoordinateField(models.DecimalField):

    def __init__(self, *args, **kwargs):
        kwargs['max_digits'] = 15
        kwargs['decimal_places'] = 12
        super(GeoCoordinateField, self).__init__(*args, **kwargs)


class DataField(models.DecimalField):

    def __init__(self, *args, **kwargs):
        kwargs['max_digits'] = 15
        kwargs['decimal_places'] = 12
        super(DataField, self).__init__(*args, **kwargs)


class SensorReading(DateMixin):

    class Type:
        NONE = 0
        OZONE = 1
        PM2_5 = 2
        PM10 = 3
        CO = 4
        SO2 = 5
        NO2 = 6

    TYPE = (
        (Type.NONE, 'None'),
        (Type.OZONE, 'Ozone'),
        (Type.PM2_5, 'PM2.5'),
        (Type.PM10, 'PM10'),
        (Type.CO, 'CO'),
        (Type.SO2, 'SO2'),
        (Type.NO2, 'NO2'),
    )

    class Unit:
        NONE = 0
        PPM = 1
        PPB = 2
        UG_M3 = 3
        DEGREES_F = 4
        DEGREES_C = 5

    UNIT = (
        (Unit.NONE, 'None'),
        (Unit.PPM, 'PPM'),
        (Unit.PPB, 'PPB'),
        (Unit.UG_M3, 'UG_M3'),
        (Unit.DEGREES_F, 'DEGREES_F'),
        (Unit.DEGREES_C, 'DEGREES_C'),
    )

    api_key = ApiField(default=None, db_index=True, null=True, blank=True)
    sensor = models.CharField(max_length=256, null=True, blank=True)
    type = models.IntegerField(default=Type.NONE, db_index=True, choices=TYPE, null=True, blank=True)
    unit = models.IntegerField(default=Unit.NONE, choices=UNIT, null=True, blank=True)
    average_over_hours = models.IntegerField(default=0, help_text="If the value is an average reading over time, how "
                                                                  "many hours is the average taken over? If it is not "
                                                                  "an average, the average_over_hours = 0")
    value = DataField(null=True, blank=True)
    longitude = GeoCoordinateField(null=True, blank=True)
    latitude = GeoCoordinateField(null=True, blank=True)
    temperature = DataField(null=True, blank=True)
    humidity= DataField(null=True, blank=True)
    date = models.DateTimeField(null=True, blank=True, help_text="This is the date that the sensor actually took the reading.")
    public = models.BooleanField(default=False)

    class Meta:
        index_together = [('longitude', 'latitude', ), ]

    def __unicode__(self):
        return str(self.type)