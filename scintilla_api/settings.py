"""
Django settings for scintilla_api project.

Generated by 'django-admin startproject' using Django 1.9.7.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.9/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_ROOT = os.path.dirname(os.path.realpath(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.9/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', 'j84wr$sls!c#86&0lmq2o)l2lo6tu6qk%-7=-aj^y&qd_qrze9')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = bool(os.environ.get('DEBUG', True))
template_debug = bool(os.environ.get('TEMPLATE_DEBUG', DEBUG))
TESTING = bool(os.environ.get('TESTING', False))

# Custom Global App Config
PROJECT_NAME = 'scintilla_api'  # project folder name too
PROJECT_DOMAIN = 'scintilla.net'

APP_ENV = os.environ.get('APP_ENV', '').upper()

STAGING = PRODUCTION = False

if APP_ENV == 'STAGING':
    STAGING = True
elif APP_ENV == 'PRODUCTION':
    PRODUCTION = True
    DEBUG = template_debug = False
else:
    DEBUG = template_debug = True

# Allowed Hosts
ALLOWED_HOSTS = ['localhost', '127.0.0.1', PROJECT_DOMAIN, '.' + PROJECT_DOMAIN, 'dev.' + PROJECT_DOMAIN, 'staging.' + PROJECT_DOMAIN]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE_CLASSES = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'slothauth.middleware.PasswordlessUserMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = PROJECT_NAME + '.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.media',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                PROJECT_NAME + '.context_processors.expose_settings',
                'django_mobile.context_processors.flavour',
            ],
            'loaders': [
                'django_mobile.loader.Loader',
                'django.template.loaders.filesystem.Loader',
                'django.template.loaders.app_directories.Loader',
            ]
        },
    },
]

TEMPLATE_LOADERS = TEMPLATES[0]['OPTIONS']['loaders']

WSGI_APPLICATION = PROJECT_NAME + '.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.9/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/1.9/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/1.9/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.9/howto/static-files/

STATIC_URL = '/static/'

#
# Custom Settings
#

# Scintilla

KEY_SIZE = 256

# My Apps

INSTALLED_APPS += [
    'django.contrib.sitemaps',
    # custom apps
    'accounts',
    'pages',
    'sensors',
    'readings',
    'deployments',
    'platforms',
]

ADMINS = [
    ('Chris Del Guercio', 'cdelguercio@gmail.com'),
]

VERSION = '0_1'

API_VERSION = 'v1'
API_BASE_URL = 'api/' + API_VERSION + '/'

if STAGING or PRODUCTION:
    STATIC_ROOT = os.path.join(PROJECT_ROOT, "static")
else:
    STATIC_ROOT = os.path.join(PROJECT_ROOT, "static_collected")

MEDIA_URL = '/media/'

MEDIA_ROOT = os.path.join(PROJECT_ROOT, 'media')

# Logging

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'null': {
            'level': 'DEBUG',
            'class': 'logging.NullHandler',
        },
        'console': {
            'level': 'ERROR',
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        },
        'mail_admins': {
            'level': 'ERROR',
            'formatter': 'verbose',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        },
    },
    'formatters': {
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(filename)s %(lineno)d %(message)s'
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
    },
    'loggers': {}
}

LOGGING['loggers'][PROJECT_NAME] = {
    'handlers': ['mail_admins'],
    'level': 'ERROR',
    'propagate': True,
}

# Test logging

LOGGING['loggers'][PROJECT_NAME + '-test'] = {
    'handlers': ['console'],
    'level': 'INFO',
    'propagate': True,
}

# DisallowedHost

LOGGING['loggers']['django.security.DisallowedHost'] = {
    'handlers': ['null'],
    'propagate': False,
}

# Django Request Error Logging

LOGGING['loggers']['django.request'] = {
    'handlers': ['mail_admins'],
    'level': 'ERROR',
    'propagate': True,
}

# Django Extensions

INSTALLED_APPS += [
    'django_extensions',
]

# Impersonate

MIDDLEWARE_CLASSES += [
    'slothauth.middleware.ImpersonateMiddleware',
]

# AWS

if PRODUCTION:
    AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
else:
    AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
AWS_QUERYSTRING_AUTH = AWS_S3_FILE_OVERWRITE = False

if PRODUCTION:
    AWS_STORAGE_BUCKET_NAME = PROJECT_NAME + '-production'
    AWS_BUCKET_NAME = AWS_STORAGE_BUCKET_NAME
    SYNC_S3_PREFIX = 'static/'
    AWS_S3_CUSTOM_DOMAIN = PROJECT_NAME + '-production.s3.amazonaws.com'  # TODO make cloudfront
else:
    AWS_STORAGE_BUCKET_NAME = PROJECT_NAME + '-staging'
    AWS_BUCKET_NAME = AWS_STORAGE_BUCKET_NAME
    SYNC_S3_PREFIX = 'static/'
    AWS_S3_CUSTOM_DOMAIN = PROJECT_NAME + '-staging.s3.amazonaws.com'

if PRODUCTION or STAGING:
    AWS_S3_SECURE_URLS = False
    AWS_S3_URL_PROTOCOL = 'https:'
else:
    AWS_S3_SECURE_URLS = False
    AWS_S3_URL_PROTOCOL = 'http:'

BOTO_S3_BUCKET = AWS_STORAGE_BUCKET_NAME

if STAGING:
    '''
    STATIC_URL = '//' + PROJECT_NAME + '-staging.s3.amazonaws.com/static/'
    STATICFILES_STORAGE = PROJECT_NAME + '.storage.S3Storage'
    '''
    MEDIA_URL = 'https://' + PROJECT_NAME + '-staging.s3.amazonaws.com/media/'
    DEFAULT_FILE_STORAGE = PROJECT_NAME + '.storage.MediaS3Storage'

if PRODUCTION:  # TODO make cloudfront
    STATIC_URL = 'https://' + PROJECT_NAME + '-production.s3.amazonaws.com/static/'
    STATICFILES_STORAGE = PROJECT_NAME + '.storage.S3Storage'
    MEDIA_URL = 'https://' + PROJECT_NAME + '-production.s3.amazonaws.com/media/'
    DEFAULT_FILE_STORAGE = PROJECT_NAME + '.storage.MediaS3Storage'

# Celery

INSTALLED_APPS += ('djcelery', )

import djcelery

djcelery.setup_loader()

# Authentication

ACCOUNT_NATURAL_KEY = 'email'
AUTHENTICATION_BACKENDS = [
    'slothauth.backends.PasswordlessAuthentication',
]

# Django Rest Framework

INSTALLED_APPS += [
    'rest_framework',
    'rest_framework.authtoken'
]

# Django Mobile

INSTALLED_APPS += [
    'django_mobile',
]

MIDDLEWARE_CLASSES += [
    'django_mobile.middleware.MobileDetectionMiddleware',
    'django_mobile.middleware.SetFlavourMiddleware',
]

# SlothAuth

INSTALLED_APPS += [
    'slothauth',
]

ACCOUNT_EMAIL_DOMAIN = PROJECT_DOMAIN

ACCOUNT_EMAIL_PASSWORD_RESET_SUBJECT = 'Scintilla Password Reset'

ACCOUNT_EMAIL_FROM = 'help@' + PROJECT_DOMAIN

ACCOUNT_EMAIL_PASSWORDLESS_LOGIN_SUBJECT = 'Scintilla Login Link'

AUTH_USER_MODEL = 'accounts.Account'

#ACCOUNT_FORM = 'accounts.forms.CustomAccountForm'

# Django Rest Framework

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 9999,
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAdminUser',
    ),
    'TEST_REQUEST_RENDERER_CLASSES': (
        'rest_framework.renderers.MultiPartRenderer',
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.TemplateHTMLRenderer',
        'readings.renderers.PlainTextRenderer',
    ),
}

# Email

EMAIL_BACKEND = PROJECT_NAME + '.backends.smtp.SSLEmailBackend'

POSTSAFE_WHITELIST_ON = not PRODUCTION  # Only send out real emails when on production

EMAIL_HOST = 'email-smtp.us-west-2.amazonaws.com'
EMAIL_PORT = '465'
EMAIL_HOST_USER = 'AKIAIUZZTJDYKT4OUQFA'  # TODO change?
EMAIL_HOST_PASSWORD = 'AuCllO83f/DrZLBCJ0vtZUzQtia02z9a7IfcWmJmDynG'
EMAIL_USE_TLS = True
SERVER_EMAIL = 'scintillaemails@gmail.com'
DEFAULT_FROM_EMAIL = 'scintillaemails@gmail.com'

# Template

SETTINGS_PASSED_TO_TEMPLATE = ['VERSION', 'PRODUCTION']
