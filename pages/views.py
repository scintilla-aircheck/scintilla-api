'''
from django.shortcuts import render, render_to_response


def dashboard(request):
    return render(request, 'common/dashboard.html')


def robots(request):
    return render_to_response('robots.txt')


# Dashboard App


def dashboard_index(request):
    return render_to_response('common/dashboard/index.html')


def dashboard_header(request):
    return render(request, 'common/dashboard/header.html')


def dashboard_home(request):
    return render_to_response('common/dashboard/home.html')


def upload(request):
    return render(request, 'common/dashboard/upload.html')


def settings(request):
    return render(request, 'common/dashboard/settings.html')


def profile(request):
    return render(request, 'common/dashboard/profile.html')


def dashboard_tag_manager(request):
    return render_to_response('common/dashboard/tag-manager.html')


def dashboard_tag(request):
    return render_to_response('common/dashboard/tag.html')


def dashboard_song_manager(request):
    return render_to_response('common/dashboard/song-manager.html')


def dashboard_song(request):
    return render_to_response('common/dashboard/song.html')


def dashboard_signup(request):
    return render_to_response('common/dashboard/signup.html')


def dashboard_login(request):
    return render_to_response('common/dashboard/login.html')


def dashboard_reset_password(request):
    return render_to_response('common/dashboard/reset-password.html')


def dashboard_reset_password_thank_you(request):
    return render_to_response('common/dashboard/reset-password-thank-you.html')


def dashboard_logout(request):
    return render_to_response('common/dashboard/logout.html')


def dashboard_logout_redirect(request):
    return render_to_response('common/dashboard/logout-redirect.html')
'''