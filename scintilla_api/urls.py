"""scintilla_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls import include, url
from django.contrib import admin
from django.views.static import serve

import slothauth.urls as slothauth_urls
import accounts.urls as accounts_urls

import pages.urls as pages_urls

import sensors.urls as sensors_urls


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include(pages_urls)),
    url(r'^', include(sensors_urls)),
    url(r'^', include(accounts_urls)),
    url(r'^', include(slothauth_urls)),
]

urlpatterns += [
    url(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT, 'show_indexes': True}),
]

# TODO serve static files directly from nginx

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns += staticfiles_urlpatterns()
