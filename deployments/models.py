from django.conf import settings
from django.db import models

from mixins.fields import ApiField
from mixins.models import DateMixin

from platforms.models import Platform


class Deployment(DateMixin):

    account = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True)
    name = models.CharField(max_length=1000, null=True, blank=True)
    devices = models.ManyToManyField('Device', related_name='deployment_devices', blank=True)

    def __str__(self):
        return '#' + str(self.id) + ' ' + str(self.name)


class Device(DateMixin):

    platform = models.ForeignKey(Platform, null=True, blank=True)
    deployments = models.ManyToManyField(Deployment, related_name='device_deployments', blank=True)
    device_key = ApiField()
    name = models.CharField(max_length=1000, null=True, blank=True)
    date_manufactured = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return '#' + str(self.id) + ' ' + str(self.name)
