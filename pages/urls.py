from django.conf.urls import url
'''
from .views import robots
from .views import dashboard, settings, upload, profile
from .views import dashboard_index, dashboard_home, dashboard_song, dashboard_song_manager, dashboard_tag_manager, dashboard_tag
from .views import dashboard_signup, dashboard_login, dashboard_reset_password, dashboard_reset_password_thank_you, dashboard_logout, dashboard_logout_redirect
from .views import dashboard_header
'''

urlpatterns = [
    '''
    url(r'^$', dashboard, name='dashboard'),
    url(r'^upload/?$', dashboard, name='dashboard'),
    url(r'^settings/?$', dashboard, name='dashboard'),
    url(r'^u/', dashboard, name='dashboard'),

    url(r'^robots\.txt', robots, name='robots'),

    # Auth
    url(r'^signup/?$', dashboard, name='dashboard'),
    url(r'^login/?$', dashboard, name='dashboard'),
    url(r'^reset-password/?$', dashboard, name='dashboard'),
    url(r'^reset-password-thank-you/?$', dashboard, name='dashboard'),
    url(r'^logout/?$', dashboard, name='dashboard'),
    url(r'^logout-redirect/?$', dashboard, name='dashboard'),


    # Dashboard App
    url(r'^dashboard_app/index/?$', dashboard_index, name='dashboard_index'),
    url(r'^dashboard_app/header/?$', dashboard_header, name='dashboard_header'),
    url(r'^dashboard_app/home/?$', dashboard_home, name='dashboard_home'),
    url(r'^dashboard_app/upload/?$', upload, name='upload'),
    url(r'^dashboard_app/settings/?$', settings, name='settings'),
    url(r'^dashboard_app/profile/?$', profile, name='profile'),
    url(r'^dashboard_app/tag_manager/?$', dashboard_tag_manager, name='dashboard_tag_manager'),
    url(r'^dashboard_app/tag/?$', dashboard_tag, name='dashboard_tag'),
    url(r'^dashboard_app/song/?$', dashboard_song, name='dashboard_song'),
    url(r'^dashboard_app/song_manager/?$', dashboard_song_manager, name='dashboard_song_manager'),
    url(r'^dashboard_app/signup/?$', dashboard_signup, name='dashboard_signup'),
    url(r'^dashboard_app/login/?$', dashboard_login, name='dashboard_login'),
    url(r'^dashboard_app/reset-password/?$', dashboard_reset_password, name='dashboard_reset_password'),
    url(r'^dashboard_app/reset-password-thank-you/?$', dashboard_reset_password_thank_you, name='dashboard_reset_password_thank_you'),
    url(r'^dashboard_app/logout/?$', dashboard_logout, name='dashboard_logout'),
    url(r'^dashboard_app/logout_redirect/?$', dashboard_logout_redirect, name='dashboard_logout_redirect'),
    '''
]
