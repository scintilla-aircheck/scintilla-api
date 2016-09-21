from django.conf import settings
from django.conf.urls import include, url

from rest_framework.routers import DefaultRouter

from .views import DeploymentViewSet, DeviceViewSet


router = DefaultRouter()
router.register(r'deployments', DeploymentViewSet)
router.register(r'devices', DeviceViewSet)

urlpatterns = [
    url(r'^' + settings.API_BASE_URL, include(router.urls)),
]
