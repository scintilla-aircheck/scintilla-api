from __future__ import unicode_literals

from django.apps import AppConfig


class ReadingsConfig(AppConfig):
    name = 'readings'

    def ready(self):
        import readings.signals
