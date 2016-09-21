from django.contrib import admin

from .models import Deployment, Device


class DeploymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'account', 'name', 'date_updated', 'date_created', )

    class Meta:
        model = Deployment


class DeviceAdmin(admin.ModelAdmin):
    list_display = ('id', 'platform', 'device_key', 'date_manufactured', 'date_updated', 'date_created', )

    class Meta:
        model = Device


admin.site.register(Deployment, DeploymentAdmin)
admin.site.register(Device, DeviceAdmin)
