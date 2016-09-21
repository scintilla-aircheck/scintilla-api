from django.conf import settings
from django.db import models

KEY_SIZE = getattr(settings, 'KEY_SIZE', 256)


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


class ApiField(models.CharField):

    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = KEY_SIZE
        super(ApiField, self).__init__(*args, **kwargs)
