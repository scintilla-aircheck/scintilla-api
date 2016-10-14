from django.db import models

from mixins.models import DateMixin


class Platform(DateMixin):

    name = models.CharField(max_length=1000, null=True, blank=True)
    version = models.CharField(max_length=1000, null=True, blank=True)
    sensors = models.ManyToManyField('Sensor')

    def __str__(self):
        return '#' + str(self.id) + ' ' + str(self.name)


class Sensor(DateMixin):

    class Type:
        NONE = 0
        TEMPERATURE = 1
        HUMIDITY = 2
        PRESSURE = 3
        PM2_5 = 4
        PM10 = 5
        OZONE = 6
        CO = 7
        SO2 = 8
        NO2 = 9

    TYPE = (
        (Type.NONE, 'None'),
        (Type.TEMPERATURE, 'Temperature'),
        (Type.HUMIDITY, 'Humidity'),
        (Type.PRESSURE, 'Pressure'),
        (Type.PM2_5, 'PM2.5'),
        (Type.PM10, 'PM10'),
        (Type.OZONE, 'Ozone'),
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
        VOLTS = 6

    UNIT = (
        (Unit.NONE, 'None'),
        (Unit.PPM, 'PPM'),
        (Unit.PPB, 'PPB'),
        (Unit.UG_M3, 'UG_M3'),
        (Unit.DEGREES_F, 'DEGREES_F'),
        (Unit.DEGREES_C, 'DEGREES_C'),
        (Unit.VOLTS, 'VOLTS'),
    )

    name = models.CharField(max_length=1000, null=True, blank=True)
    version = models.CharField(max_length=1000, null=True, blank=True)
    type = models.IntegerField(default=Type.NONE, db_index=True, choices=TYPE, null=True, blank=True)

    def __str__(self):
        return '#' + str(self.id) + ' ' + str(self.name)