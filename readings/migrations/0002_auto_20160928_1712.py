# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-09-28 17:12
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('readings', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='calibratedreading',
            name='device',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='deployments.Device'),
        ),
        migrations.AlterField(
            model_name='calibratedreading',
            name='sensor',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='platforms.Sensor'),
        ),
        migrations.AlterField(
            model_name='reading',
            name='device',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='deployments.Device'),
        ),
        migrations.AlterField(
            model_name='reading',
            name='sensor',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='platforms.Sensor'),
        ),
    ]
