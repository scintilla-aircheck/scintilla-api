from django.conf import settings
from django.conf.urls import include, url

from rest_framework.routers import DefaultRouter

from .views import PlatformViewSet, SensorViewSet


router = DefaultRouter()
router.register(r'platforms', PlatformViewSet)
router.register(r'sensors', SensorViewSet)

urlpatterns = [
    url(r'^' + settings.API_BASE_URL, include(router.urls)),
]
