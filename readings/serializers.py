from rest_framework import serializers

from .models import CalibratedReading, Reading

from platforms.models import Sensor


class CalibratedReadingSerializer(serializers.ModelSerializer):

    sensor_type = serializers.SerializerMethodField()

    class Meta:
        model = CalibratedReading
        fields = ('id', 'device', 'value', 'average_over_seconds', 'longitude', 'latitude', 'unit', 'sensor_type', 'time', )

    def get_sensor_type(self, obj):

        if obj.sensor and obj.sensor.type:
            return obj.sensor.type

        return Sensor.Type.NONE



class ReadingSerializer(serializers.ModelSerializer):

    sensor_type = serializers.SerializerMethodField()

    class Meta:
        model = Reading
        fields = ('id', 'device', 'value', 'average_over_seconds', 'longitude', 'latitude', 'unit', 'sensor_type', 'time', )

    def get_sensor_type(self, obj):

        if obj.sensor and obj.sensor.type:
            return obj.sensor.type

        return Sensor.Type.NONE
