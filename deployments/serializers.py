from rest_framework import serializers

from .models import Deployment, Device


class DeviceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Device
        fields = ('id', 'platform', 'deployments', 'date_manufactured', )


class DeploymentSerializer(serializers.ModelSerializer):
    devices = DeviceSerializer(many=True)

    class Meta:
        model = Deployment
        fields = ('id', 'account', 'name', 'devices', )
