import factory

from django.utils import timezone

from slothauth.factories import AccountFactory

from platforms.factories import PlatformFactory

from .models import Deployment, Device


class DeploymentFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = Deployment

    account = factory.SubFactory(AccountFactory)
    name = "Deployment Name"


class DeviceFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = Device

    platform = factory.SubFactory(PlatformFactory)
    device_key = "device_key"
    date_manufactured = timezone.now()
