import json

from django.db.models.signals import post_save
from django.dispatch import receiver

from channels import Group

from mixins.utils import disable_for_loaddata

from .models import Reading
from .serializers import ReadingSerializer


@receiver(post_save, sender=Reading, dispatch_uid="create_reading")
@disable_for_loaddata
def create_reading(sender, instance=None, created=False, **kwargs):
    import sys
    print('create_reading signal', file=sys.stderr)
    if created:
        serializer = ReadingSerializer(instance)
        print(serializer.data, file=sys.stderr)
        Group('readings').send({
            "text": json.dumps(serializer.data)
        })
