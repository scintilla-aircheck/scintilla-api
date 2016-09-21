from rest_framework import serializers

from .models import CalibratedReading, Reading


class CalibratedReadingSerializer(serializers.ModelSerializer):

    class Meta:
        model = CalibratedReading
        fields = ('id', 'value', 'average_over_seconds', 'longitude', 'latitude', 'unit', 'time', )


class ReadingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reading
        fields = ('id', 'value', 'average_over_seconds', 'longitude', 'latitude', 'unit', 'time', )
