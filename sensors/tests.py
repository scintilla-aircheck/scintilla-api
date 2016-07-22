import json

from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.contrib.sessions.models import Session
from django.core import mail
from django.test import TestCase
from django.test.client import Client
from django.core.urlresolvers import reverse

from rest_framework import status
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token

import sensor_data_pb2

from .factories import SensorReadingFactory
from .models import SensorReading


Account = get_user_model()


class SensorReadingApiTest(TestCase):

    def setUp(self):
        super(SensorReadingApiTest, self).setUp()

        self.client = APIClient()
        self.email = 'test@test.com'
        self.password = 'scintilla'

        self.account = Account(email=self.email)
        self.account.set_password(self.password)
        self.account.api_key = '123'
        self.account.save()

    def test_create_sensor_reading(self):

        message = sensor_data_pb2.SensorDataMessage()
        message.lucky_number = 123

        message_string = message.SerializeToString()

        sensor_readings = SensorReading.objects.all()

        self.assertEqual(sensor_readings.count(), 0)

        # check we can create a sensor reading when we aren't logged in
        header = {}

        response = self.client.post('/api/v1/sensor_readings/', data={'api_key': self.account.api_key, 'message': message_string}, format='json', **header)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT, msg=str(response.status_code) + ': ' + response.content)

        sensor_readings = SensorReading.objects.all()

        self.assertEqual(sensor_readings.count(), 1)

        self.assertEqual(sensor_readings[0].value, message.lucky_number)

    def test_list_sensor_readings(self):

        sensor_reading = SensorReadingFactory(public=True)

        sensor_readings = SensorReading.objects.all()

        self.assertEqual(sensor_readings.count(), 1)

        # check that we can grab a list of all the public sensors
        header = {}

        response = self.client.get('/api/v1/sensor_readings/list/', data={}, format='json', **header)

        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=str(response.status_code) + ': ' + response.content)

        data = json.loads(response.content)

        self.assertEqual(len(data['results']), 1)

    def test_list_sensor_readings_by_api_key(self):

        sensor_reading = SensorReadingFactory(api_key=self.account.api_key, public=False)

        sensor_readings = SensorReading.objects.all()

        self.assertEqual(sensor_readings.count(), 1)

        # check that we can grab a list of the sensor readings from a given api_key
        header = {}

        response = self.client.get('/api/v1/sensor_readings/api_key/', data={'api_key': self.account.api_key}, format='json', **header)

        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=str(response.status_code) + ': ' + response.content)

        data = json.loads(response.content)

        self.assertEqual(len(data['results']), 1)

        # check that we can grab a list of the sensor readings with the api_key associated with our auth credentials
        header = {'HTTP_AUTHORIZATION': 'Token {}'.format(Token.objects.get(user=self.account).key)}

        response = self.client.get('/api/v1/sensor_readings/api_key/', data={}, format='json', **header)

        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=str(response.status_code) + ': ' + response.content)

        data = json.loads(response.content)

        self.assertEqual(len(data['results']), 1)
