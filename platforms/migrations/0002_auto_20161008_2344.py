# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-10-08 23:44
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('platforms', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sensor',
            name='type',
            field=models.IntegerField(blank=True, choices=[(0, 'None'), (1, 'TEMPERATURE'), (2, 'HUMIDITY'), (3, 'PRESSURE'), (4, 'PM2.5'), (5, 'PM10'), (6, 'Ozone'), (7, 'CO'), (8, 'SO2'), (9, 'NO2')], db_index=True, default=0, null=True),
        ),
    ]
