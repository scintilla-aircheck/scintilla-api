from django.conf import settings
from django.conf.urls import include, url

from rest_framework.routers import DefaultRouter


router = DefaultRouter()

urlpatterns = [
    url(r'^api/' + settings.API_VERSION + '/', include(router.urls)),  # TODO makes sense to have a settings.API_BASE_URL rather than a settings.API_VERSION?
]
