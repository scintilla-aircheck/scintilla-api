from rest_framework import serializers

from .models import Platform, Sensor


class SensorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sensor
        fields = ('id', 'name', 'version', 'type', )


class PlatformSerializer(serializers.ModelSerializer):
    sensors = SensorSerializer(source='sensor_set', many=True)

    class Meta:
        model = Platform
        fields = ('id', 'name', 'version', 'sensors', )
