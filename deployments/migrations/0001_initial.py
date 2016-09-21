# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-09-20 20:40
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import mixins.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('platforms', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Deployment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_created', models.DateTimeField(auto_now_add=True, null=True)),
                ('date_updated', models.DateTimeField(auto_now=True, null=True)),
                ('name', models.CharField(blank=True, max_length=1000, null=True)),
                ('account', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
                'ordering': ['-date_created'],
            },
        ),
        migrations.CreateModel(
            name='Device',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_created', models.DateTimeField(auto_now_add=True, null=True)),
                ('date_updated', models.DateTimeField(auto_now=True, null=True)),
                ('device_key', mixins.fields.ApiField(max_length=256)),
                ('date_manufactured', models.DateTimeField(blank=True, null=True)),
                ('deployment', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='deployments.Deployment')),
                ('platform', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='platforms.Platform')),
            ],
            options={
                'abstract': False,
                'ordering': ['-date_created'],
            },
        ),
        migrations.AddField(
            model_name='deployment',
            name='devices',
            field=models.ManyToManyField(related_name='deployment_devices', to='deployments.Device'),
        ),
    ]
