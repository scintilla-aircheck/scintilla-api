from django.conf import settings

from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.mixins import ListModelMixin
from rest_framework.response import Response

from .models import Deployment, Device
from .paginations import DeploymentPagination, DevicePagination
from .serializers import DeploymentSerializer, DeviceSerializer

import logging

logger = logging.getLogger(settings.PROJECT_NAME)


class DeploymentViewSet(viewsets.GenericViewSet, ListModelMixin):
    queryset = Deployment.objects.all()
    serializer_class = DeploymentSerializer
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = ()
    pagination_class = DeploymentPagination

    def list(self, request, *args, **kwargs):

        queryset = self.queryset.filter()

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True, context={'request': request})

        return Response(serializer.data)


class DeviceViewSet(viewsets.GenericViewSet, ListModelMixin):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = ()
    pagination_class = DevicePagination

    def list(self, request, *args, **kwargs):

        queryset = self.queryset.filter()

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True, context={'request': request})

        return Response(serializer.data)
