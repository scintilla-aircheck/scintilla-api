from __future__ import unicode_literals

from django.conf import settings
from django.db import models

from slothauth.models import SlothAuthBaseUser

KEY_SIZE = getattr(settings, 'KEY_SIZE', 256)


class ApiField(models.CharField):

    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = KEY_SIZE
        super(ApiField, self).__init__(*args, **kwargs)


class Account(SlothAuthBaseUser):
    api_key = ApiField(default=None, unique=True, null=True, blank=True)
