from datetime import datetime
from decimal import Decimal
import json

from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils import timezone

from rest_framework import status, viewsets
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.mixins import ListModelMixin
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework.renderers import MultiPartRenderer, JSONRenderer, TemplateHTMLRenderer
from rest_framework.response import Response

from scintilla_protobufs import reading_pb2

from .models import CalibratedReading, Reading, ReadingGroup
from .paginations import CalibratedReadingPagination, ReadingPagination
from .parsers import PlainTextParser
from .renderers import PlainTextRenderer
from .serializers import CalibratedReadingSerializer, ReadingSerializer

Account = get_user_model()

import logging

logger = logging.getLogger(settings.PROJECT_NAME)


class CalibratedReadingViewSet(viewsets.GenericViewSet, ListModelMixin):
    queryset = CalibratedReading.objects.all()
    serializer_class = CalibratedReadingSerializer
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = ()
    pagination_class = CalibratedReadingPagination

    '''
    def create(self, request, *args, **kwargs):

        if 'message' in request.data:
            sensor_data = sensor_data_pb2.SensorDataMessage()
            sensor_data.ParseFromString(request.data.get('message'))

            # TODO: check that there is a non-null api key? or if there isn't and the user is logged in, get the api from the user

            api_key = None

            if not api_key and request.user.is_authenticated():
                api_key = request.user.api_key

            sensor_reading = SensorReading(api_key=api_key, sensor='lucky sensor', type=1, unit=1, average_over_hours=0, value=sensor_data.lucky_number, longitude=Decimal('2.3'), latitude=Decimal('4.3'), temperature=Decimal('2.3'), humidity=Decimal('4.3'), date=timezone.now(), public=True)
            sensor_reading.save()

            return Response(status=status.HTTP_204_NO_CONTENT)

        else:
            sensor_data = sensor_data_pb2.SensorDataMessage()
            sensor_data.lucky_number = 1234

            sensor_reading = SensorReading(api_key='', sensor='lucky sensor', type=1, unit=1, average_over_hours=0, value=sensor_data.lucky_number, longitude=Decimal('2.3'), latitude=Decimal('4.3'), temperature=Decimal('2.3'), humidity=Decimal('4.3'), date=timezone.now(), public=True)
            sensor_reading.save()

            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(status=status.HTTP_400_BAD_REQUEST)
    '''

    def list(self, request, *args, **kwargs):

        queryset = self.queryset.filter()

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True, context={'request': request})

        return Response(serializer.data)


class ReadingViewSet(viewsets.GenericViewSet, ListModelMixin):
    queryset = Reading.objects.all()
    serializer_class = ReadingSerializer
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = ()
    pagination_class = ReadingPagination
    renderer_classes = (MultiPartRenderer, JSONRenderer, TemplateHTMLRenderer, PlainTextRenderer, )
    parser_classes = (JSONParser, PlainTextParser, MultiPartParser)

    def create(self, request, format=None, *args, **kwargs):

        #if b'message' in request.data: #format == 'pbuf' and
        if format != 'json':
            reading_group_message = reading_pb2.ReadingGroupMessage()
            '''
            print(request.data.get('message'), file=sys.stderr)
            print(type(request.data.get('message')), file=sys.stderr)
            print(request.data.get('message').encode(None), file=sys.stderr)
            reading_group_message.ParseFromString(request.data.get('message').encode('utf-8'))
            '''
            reading_group_message.ParseFromString(request.data)

            # TODO: check that there is a non-null api key? or if there isn't and the user is logged in, get the api from the user

            #api_key = None

            #if not api_key and request.user.is_authenticated():
            #    api_key = request.user.api_key

            reading_group = ReadingGroup()
            reading_group.save()

            for reading_message in reading_group_message.readings:
                reading = Reading(reading_group=reading_group, device_id=1, sensor_id=reading_message.sensor, value=reading_message.value, average_over_seconds=reading_message.average_over_seconds, longitude=reading_message.longitude, latitude=reading_message.latitude, unit=reading_message.unit, time=datetime.utcfromtimestamp(int(reading_message.time)))
                reading.save()

            return Response(status=status.HTTP_204_NO_CONTENT)

        if format == 'json' and 'message' in request.data:
            reading_group_message = json.loads(request.data["message"])

            for reading_message in reading_group_message.readings:
                reading_group = ReadingGroup()
                reading_group.save()
                reading = Reading(device_id=1, sensor_id=reading_message.sensor, value=reading_message.value, average_over_seconds=reading_message.average_over_seconds, longitude=reading_message.longitude, latitude=reading_message.latitude, unit=reading_message.unit, time=datetime.utcfromtimestamp(int(reading_message.time)))
                reading.save()

            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):

        queryset = self.queryset.filter()

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True, context={'request': request})

        return Response(serializer.data)

    '''
    @list_route(methods=['get'])
    def api_key(self, request, *args, **kwargs):

        api_key = None

        if 'api_key' in request.GET:
            api_key = request.GET.get('api_key')
        elif request.user.is_authenticated():
            api_key = request.user.api_key

        if not api_key:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        queryset = self.queryset.filter(api_key=api_key)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True, context={'request': request})

        return Response(serializer.data)
    '''

    '''
    @detail_route(methods=['get'])
    def retrieve(self, request, pk=None, *args, **kwargs):
        try:
            track = Song.objects.get(pk=pk)
        except Song.DoesNotExist:
            return Response('Song ID: (' + str(pk) + ') does not exist', status=status.HTTP_400_BAD_REQUEST)

        return Response(SongSerializer(track).data)

    @list_route(methods=['get'])
    def new(self, request, *args, **kwargs):

        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True, context={'request': request})

        return Response(serializer.data)

    @list_route(methods=['get'])
    def featured(self, request, *args, **kwargs):

        queryset = self.queryset.filter(featured=True)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True, context={'request': request})

        return Response(serializer.data)

    @list_route(methods=['get'], permission_classes=())
    def favorites(self, request, *args, **kwargs):

        if 'username' in request.GET:

            if request.GET.get('username') == '':
                if request.user.is_authenticated():
                    queryset = request.user.favorites.all()
                else:
                    return Response(status=status.HTTP_401_UNAUTHORIZED)
            else:
                try:
                    account = Account.objects.get(username=request.GET.get('username'))
                    queryset = account.favorites.all()
                except Account.DoesNotExist as e:
                    return Response(status=status.HTTP_400_BAD_REQUEST)

            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True, context={'request': request})
                return self.get_paginated_response(serializer.data)

            serializer = self.get_serializer(queryset, many=True, context={'request': request})

            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @list_route(methods=['get', 'post'])  # TODO should just be 'get'?
    def search(self, request, *args, **kwargs):

        if 'search' in request.data:

            search = unquote(request.data.get('search'))

            songs = watson.filter(Song, search)

            page = self.paginate_queryset(songs)
            if page is not None:
                serializer = self.get_serializer(page, many=True, context={'request': request})
                return self.get_paginated_response(serializer.data)

            serializer = self.get_serializer(songs, many=True, context={'request': request})

            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @list_route(methods=['get'])
    def username(self, request, *args, **kwargs):

        if 'username' in request.GET:

            if request.GET.get('username') == '':
                if request.user.is_authenticated():
                    queryset = self.queryset.filter(user=request.user)
                else:
                    return Response(status=status.HTTP_401_UNAUTHORIZED)
            else:
                queryset = self.queryset.filter(user__username=request.GET.get('username'))

            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True, context={'request': request})
                return self.get_paginated_response(serializer.data)

            serializer = self.get_serializer(queryset, many=True, context={'request': request})

            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @detail_route(methods=['post'], permission_classes=(IsAuthenticated, ))
    def favorite(self, request, pk=None, *args, **kwargs):

        if pk:
            try:
                song = Song.objects.get(id=pk)
            except Song.DoesNotExist:
                return Response('Song ID not found in database', status=status.HTTP_400_BAD_REQUEST)

            with transaction.atomic():
                is_favorite = False
                favorite, created = Favorite.objects.get_or_create(user=request.user, song=song)

                if not created:
                    song.num_favorites_cache -= 1
                    favorite.delete()
                else:
                    song.num_favorites_cache += 1
                    is_favorite = True

                song.save()
                return Response(str(is_favorite))

        else:
            return Response('No song ID sent', status=status.HTTP_400_BAD_REQUEST)

    @detail_route(methods=['post'])
    def play(self, request, pk=None, *args, **kwargs):

        if pk:
            try:
                song = Song.objects.get(id=pk)
            except Song.DoesNotExist:
                return Response('Song ID not found in database', status=status.HTTP_400_BAD_REQUEST)

            with transaction.atomic():
                num_plays = song.num_plays + 1
                song.num_plays = num_plays
                song.save()
                return Response(str(num_plays))

        else:
            return Response('No song ID sent', status=status.HTTP_400_BAD_REQUEST)

    @detail_route(methods=['post'])
    def share(self, request, pk=None, *args, **kwargs):

        if pk:
            try:
                song = Song.objects.get(id=pk)
            except Song.DoesNotExist:
                return Response('Song ID not found in database', status=status.HTTP_400_BAD_REQUEST)

            with transaction.atomic():
                num_shares = song.num_shares + 1
                song.num_shares = num_shares
                song.save()
                return Response(str(num_shares))

        else:
            return Response('No song ID sent', status=status.HTTP_400_BAD_REQUEST)

    @list_route(methods=['post'])
    def add(self, request, *args, **kwargs):
        if 'ga_tool_api_key' in request.data and\
           'compressed_file_name' in request.data and\
           'full_file_name' in request.data and\
           'song_name' in request.data and\
           request.data.get('ga_tool_api_key') == settings.GA_TOOL_API_KEY:

            song = Song(name=request.data.get('song_name'), compressed_file=request.data.get('compressed_file_name'), full_file=request.data.get('full_file_name'))
            song.save()

            return Response(status=status.HTTP_200_OK)

        return Response(status.HTTP_400_BAD_REQUEST)
    '''

    '''
    def list(self, request, *args, **kwargs):
        songs = self.queryset

        return Response(SongSerializer(songs, many=True).data)
    '''
