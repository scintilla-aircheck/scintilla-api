from django.contrib import admin

from .models import CalibratedReading, Reading, ReadingGroup


class CalibratedReadingAdmin(admin.ModelAdmin):
    list_display = ('id', 'reading', 'device', 'sensor', 'value', 'average_over_seconds', 'longitude', 'latitude', 'unit', 'time', 'date_updated', 'date_created', )

    class Meta:
        model = CalibratedReading


class ReadingAdmin(admin.ModelAdmin):
    list_display = ('id', 'reading_group', 'device', 'sensor', 'value', 'average_over_seconds', 'longitude', 'latitude', 'unit', 'time', 'date_updated', 'date_created', )

    class Meta:
        model = Reading


class ReadingGroupAdmin(admin.ModelAdmin):
    list_display = ('id', 'date_updated', 'date_created', )

    class Meta:
        model = ReadingGroup


admin.site.register(CalibratedReading, CalibratedReadingAdmin)
admin.site.register(Reading, ReadingAdmin)
admin.site.register(ReadingGroup, ReadingGroupAdmin)
