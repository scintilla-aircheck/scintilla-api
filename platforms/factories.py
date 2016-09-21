import factory

from .models import Platform, Sensor


class PlatformFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = Platform

    name = "Platform Name"
    version = "Platform Version 1.0"


class SensorFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = Sensor

    name = "Sensor Name"
    version = "Sensor Version 1.0"
