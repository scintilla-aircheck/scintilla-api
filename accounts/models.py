from __future__ import unicode_literals

from django.db import models

from slothauth.models import SlothAuthBaseUser

from mixins.fields import ApiField


class Account(SlothAuthBaseUser):
    api_key = ApiField(default=None, unique=True, null=True, blank=True)
