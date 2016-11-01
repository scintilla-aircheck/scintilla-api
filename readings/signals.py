import simplejson as json  # simplejson.dumps for Decimal support

from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

from channels import Group

from mixins.utils import disable_for_loaddata

from .models import Reading
from .serializers import ReadingSerializer


@receiver(post_save, sender=Reading, dispatch_uid="create_reading")
@disable_for_loaddata
def create_reading(sender, instance=None, created=False, **kwargs):

    if created:
        serializer = ReadingSerializer(instance)
        try:
            for deployment in instance.device.deployments.all():
                Group('readings-' + str(deployment.id)).send({
                    "text": json.dumps(serializer.data)  # simplejson.dumps for Decimal support
                })
        except Exception as e:
            import sys
            print(e, file=sys.stderr)


@receiver(pre_save, sender=Reading, dispatch_uid="cache_device_name_and_sensor_type_name")
def cache_device_name_and_sensor_type_name(sender, instance=None, created=False, **kwargs):

    instance.device_name = instance.device.name
    instance.sensor_type = instance.sensor.type
    instance.sensor_type_name = instance.sensor.get_type_display()
    instance.unit_name = instance.get_unit_name(instance.unit)
