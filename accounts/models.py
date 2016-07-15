from __future__ import unicode_literals

from django.conf import settings
from django.db import models

from slothauth.models import SlothAuthBaseUser

KEY_SIZE = getattr(settings, 'KEY_SIZE', 256)


class Account(SlothAuthBaseUser):
    api_key = models.CharField(max_length=KEY_SIZE, null=True, blank=True, unique=True, default=None)
