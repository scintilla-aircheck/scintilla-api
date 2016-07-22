from django.contrib import admin

from .models import SensorReading


class SensorReadingAdmin(admin.ModelAdmin):
    list_display = ('id', 'sensor', 'type', 'unit', 'average_over_hours', 'value', 'longitude', 'latitude', 'temperature', 'humidity', 'date', )

    class Meta:
        model = SensorReading


admin.site.register(SensorReading, SensorReadingAdmin)
