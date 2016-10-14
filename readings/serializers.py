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
    sensor_type_name = serializers.SerializerMethodField()
    device_name = serializers.SerializerMethodField()

    class Meta:
        model = Reading
        fields = ('id', 'device', 'device_name', 'value', 'average_over_seconds', 'longitude', 'latitude', 'unit', 'sensor_type', 'sensor_type_name', 'time', )

    def get_sensor_type(self, obj):

        if obj.sensor and obj.sensor.type:
            return obj.sensor.type

        return Sensor.Type.NONE

    def get_sensor_type_name(self, obj):  # TODO do this as a lookup

        if obj.sensor and obj.sensor.type:
            return obj.sensor.get_type_display()

        return 'No Type Provided'

    def get_device_name(self, obj):  # TODO do this as a lookup

        if obj.device and obj.device.name:
            return obj.device.name

        return 'Device ' + str(object.device.id)
