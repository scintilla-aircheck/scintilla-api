from django.contrib.auth import get_user_model

from rest_framework import serializers

from .models import SensorReading


Account = get_user_model()


class SensorReadingSerializer(serializers.ModelSerializer):

    class Meta:
        model = SensorReading
        fields = ('id', 'sensor', 'type', 'unit', 'average_over_hours', 'value', 'longitude', 'latitude', 'temperature', 'humidity', 'date', )
