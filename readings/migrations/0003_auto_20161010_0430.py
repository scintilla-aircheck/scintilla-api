# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-10-10 04:30
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('readings', '0002_auto_20160928_1712'),
    ]

    operations = [
        migrations.AlterField(
            model_name='calibratedreading',
            name='reading',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='readings.Reading'),
        ),
        migrations.AlterField(
            model_name='reading',
            name='reading_group',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='readings.ReadingGroup'),
        ),
    ]
