# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-10-18 20:44
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('readings', '0003_auto_20161010_0430'),
    ]

    operations = [
        migrations.AddField(
            model_name='calibratedreading',
            name='device_name',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AddField(
            model_name='calibratedreading',
            name='sensor_type',
            field=models.IntegerField(blank=True, choices=[(0, 'None'), (1, 'Temperature'), (2, 'Humidity'), (3, 'Pressure'), (4, 'PM2.5'), (5, 'PM10'), (6, 'Ozone'), (7, 'CO'), (8, 'SO2'), (9, 'NO2')], default=0, null=True),
        ),
        migrations.AddField(
            model_name='calibratedreading',
            name='sensor_type_name',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AddField(
            model_name='reading',
            name='device_name',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AddField(
            model_name='reading',
            name='sensor_type',
            field=models.IntegerField(blank=True, choices=[(0, 'None'), (1, 'Temperature'), (2, 'Humidity'), (3, 'Pressure'), (4, 'PM2.5'), (5, 'PM10'), (6, 'Ozone'), (7, 'CO'), (8, 'SO2'), (9, 'NO2')], default=0, null=True),
        ),
        migrations.AddField(
            model_name='reading',
            name='sensor_type_name',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
    ]
