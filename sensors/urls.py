from django.conf import settings
from django.conf.urls import include, url

from rest_framework.routers import DefaultRouter

from .views import SensorReadingViewSet


router = DefaultRouter()
router.register(r'sensor_readings', SensorReadingViewSet)

urlpatterns = [
    url(r'^' + settings.API_BASE_URL, include(router.urls)),
]
