# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-10-08 23:47
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('deployments', '0004_device_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='deployment',
            name='devices',
            field=models.ManyToManyField(blank=True, related_name='deployment_devices', to='deployments.Device'),
        ),
        migrations.AlterField(
            model_name='device',
            name='deployments',
            field=models.ManyToManyField(blank=True, related_name='device_deployments', to='deployments.Deployment'),
        ),
    ]