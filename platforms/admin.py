from django.contrib import admin

from .models import Platform, Sensor


class PlatformAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'version', 'date_updated', 'date_created', )

    class Meta:
        model = Platform


class SensorAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'version', 'type', 'date_updated', 'date_created', )

    class Meta:
        model = Sensor


admin.site.register(Platform, PlatformAdmin)
admin.site.register(Sensor, SensorAdmin)
