from django.conf import settings
from django.conf.urls import include, url

from rest_framework.routers import DefaultRouter

from .views import CalibratedReadingViewSet, ReadingViewSet


router = DefaultRouter()
router.register(r'calibrated_readings', CalibratedReadingViewSet)
router.register(r'readings', ReadingViewSet)

urlpatterns = [
    url(r'^' + settings.API_BASE_URL, include(router.urls)),
]
