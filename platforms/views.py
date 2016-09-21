from django.conf import settings

from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.mixins import ListModelMixin
from rest_framework.response import Response

from .models import Platform, Sensor
from .paginations import PlatformPagination, SensorPagination
from .serializers import PlatformSerializer, SensorSerializer

import logging

logger = logging.getLogger(settings.PROJECT_NAME)


class PlatformViewSet(viewsets.GenericViewSet, ListModelMixin):
    queryset = Platform.objects.all()
    serializer_class = PlatformSerializer
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = ()
    pagination_class = PlatformPagination

    def list(self, request, *args, **kwargs):

        queryset = self.queryset.filter()

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True, context={'request': request})

        return Response(serializer.data)


class SensorViewSet(viewsets.GenericViewSet, ListModelMixin):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = ()
    pagination_class = SensorPagination

    def list(self, request, *args, **kwargs):

        queryset = self.queryset.filter()

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True, context={'request': request})

        return Response(serializer.data)
