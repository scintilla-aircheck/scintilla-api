from decimal import Decimal
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

from scintilla_protobufs import reading_pb2

from deployments.factories import DeviceFactory

from .factories import ReadingFactory
from .models import Reading


Account = get_user_model()


class ReadingApiTest(TestCase):

    def setUp(self):
        super(ReadingApiTest, self).setUp()

        self.client = APIClient()
        self.email = 'test@test.com'
        self.password = 'scintilla'

        self.account = Account(email=self.email)
        self.account.set_password(self.password)
        #self.account.api_key = '123'
        self.account.save()

    def test_create_reading(self):

        device = DeviceFactory()
        device.save()

        reading_group_message = reading_pb2.ReadingGroupMessage()
        reading_message = reading_pb2.ReadingMessage()
        reading_message.sensor = 1
        reading_message.value = 1.1
        reading_message.average_over_seconds = 60
        reading_message.longitude = 1.2
        reading_message.latitude = 1.3
        reading_message.unit = 1
        reading_message.time = 123987
        reading_group_message.readings.extend([reading_message])

        '''
        optional int32 sensor = 1;
        optional double value = 2;
        optional int64 average_over_seconds = 3;
        optional double longitude = 4;
        optional double latitude = 5;
        optional int32 unit = 6;
        optional int64 time = 7;
        '''

        message_string = reading_group_message.SerializeToString()

        import sys
        print(message_string, file=sys.stderr)
        print(str(message_string), file=sys.stderr)
        print(type(message_string), file=sys.stderr)

        readings = Reading.objects.all()

        self.assertEqual(readings.count(), 0)

        # check we can create a sensor reading when we aren't logged in
        header = {}

        #response = self.client.post('/api/v1/readings/', data={'message': str(message_string)}, format='txt', **header)
        response = self.client.post('/api/v1/readings/', data=message_string, format='txt', **header)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT, msg=str(response.status_code) + ': ' + str(response.content))

        readings = Reading.objects.all()

        self.assertEqual(readings.count(), 1)

        self.assertAlmostEqual(readings[0].value, Decimal(reading_group_message.readings[0].value))

    '''
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
    '''