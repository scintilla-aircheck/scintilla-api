"""
Djangosettings for scintilla_api project.

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
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'j84wr$sls!c#86&0lmq2o)l2lo6tu6qk%-7=-aj^y&qd_qrze9')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = bool(os.environ.get('DEBUG', True))
TEMPLATE_DEBUG = bool(os.environ.get('TEMPLATE_DEBUG', DEBUG))
TESTING = bool(os.environ.get('TESTING', False))

# Custom Global App Config
PROJECT_NAME = 'scintilla_api'  # project folder name too
PROJECT_DOMAIN = 'scintilla.net'

APP_ENV = os.environ.get('APP_ENV', '').upper()

DEVELOPMENT = DEVELOPMENT_DOCKER = PRODUCTION_DOCKER = STAGING = PRODUCTION = False

if APP_ENV == 'DEVELOPMENT':
    DEVELOPMENT = True
elif APP_ENV == 'DEVELOPMENT_DOCKER':
    DEVELOPMENT_DOCKER = True
elif APP_ENV == 'PRODUCTION_DOCKER':
    PRODUCTION_DOCKER = True
elif APP_ENV == 'STAGING':
    STAGING = True
elif APP_ENV == 'PRODUCTION':
    PRODUCTION = True
    DEBUG = TEMPLATE_DEBUG = False

# Allowed Hosts
#ALLOWED_HOSTS = ['localhost', '127.0.0.1', PROJECT_DOMAIN, '.' + PROJECT_DOMAIN, 'dev.' + PROJECT_DOMAIN, 'staging.' + PROJECT_DOMAIN]
ALLOWED_HOSTS = ['*']

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
    'opbeat.contrib.django.middleware.OpbeatAPMMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
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
if DEVELOPMENT_DOCKER:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'USER': 'postgres',
            'NAME': 'postgres',
            'HOST': 'database',
            'PORT': '5432'
        }
    }
else:
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
    'channels',
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

# Opbeat

INSTALLED_APPS += [
    # ...
    'opbeat.contrib.django',
]


if DEVELOPMENT or DEVELOPMENT_DOCKER:
    OPBEAT = {
        'ORGANIZATION_ID': '87a8cc294e484a438bb43fbc6e679ee5',
        'APP_ID': 'cccb09b3a0',
        'SECRET_TOKEN': '157caed6dee33c2129443dd1f2c75a9f8612a65b',
        'DEBUG': True,
    }
else:
    OPBEAT = {
        'ORGANIZATION_ID': '87a8cc294e484a438bb43fbc6e679ee5',
        'APP_ID': 'cccb09b3a0',
        'SECRET_TOKEN': '157caed6dee33c2129443dd1f2c75a9f8612a65b',
        'DEBUG': True,
    }

LOGGING['handlers']['opbeat'] = {
    'level': 'INFO',
    'class': 'opbeat.contrib.django.handlers.OpbeatHandler',
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

'''
if PRODUCTION:  # TODO make cloudfront
    STATIC_URL = 'https://' + PROJECT_NAME + '-production.s3.amazonaws.com/static/'
    STATICFILES_STORAGE = PROJECT_NAME + '.storage.S3Storage'
    MEDIA_URL = 'https://' + PROJECT_NAME + '-production.s3.amazonaws.com/media/'
    DEFAULT_FILE_STORAGE = PROJECT_NAME + '.storage.MediaS3Storage'

elif STAGING:
    #STATIC_URL = '//' + PROJECT_NAME + '-staging.s3.amazonaws.com/static/'
    #STATICFILES_STORAGE = PROJECT_NAME + '.storage.S3Storage'
    MEDIA_URL = 'https://' + PROJECT_NAME + '-staging.s3.amazonaws.com/media/'
    DEFAULT_FILE_STORAGE = PROJECT_NAME + '.storage.MediaS3Storage'
'''

if DEVELOPMENT or DEVELOPMENT_DOCKER or True:
    STATIC_URL = '/static/'

# CORS Headers for dev server

INSTALLED_APPS += ['corsheaders', ]

CORS_ORIGIN_ALLOW_ALL = True

CORS_ORIGIN_WHITELIST = [

]

# Channels

if DEVELOPMENT_DOCKER:
    CHANNEL_LAYERS = {
        "default": {
            "BACKEND": "asgi_redis.RedisChannelLayer",
            "CONFIG": {
                "hosts": [("redis", 6379)],
            },
            "ROUTING": PROJECT_NAME + ".routing.channel_routing",
        },
    }
else:
    CHANNEL_LAYERS = {
        "default": {
            "BACKEND": "asgi_ipc.IPCChannelLayer",
            "CONFIG": {
                "prefix": PROJECT_NAME,
            },
            "ROUTING": PROJECT_NAME + ".routing.channel_routing",
        },
    }

# Broker

BROKER_URL = 'django://'

REDIS_PORT = 6379
REDIS_DB = 0
REDIS_HOST = os.environ.get('REDIS_PORT_6379_TCP_ADDR', '127.0.0.1')
'''
RABBIT_HOSTNAME = os.environ.get('RABBIT_PORT_5672_TCP', 'localhost:5672')

if RABBIT_HOSTNAME.startswith('tcp://'):
    RABBIT_HOSTNAME = RABBIT_HOSTNAME.split('//')[1]

BROKER_URL = os.environ.get('BROKER_URL',
                            '')
if not BROKER_URL:
    BROKER_URL = 'amqp://{user}:{password}@{hostname}/{vhost}/'.format(
        user=os.environ.get('RABBIT_ENV_USER', 'admin'),
        password=os.environ.get('RABBIT_ENV_RABBITMQ_PASS', 'password'),
        hostname=RABBIT_HOSTNAME,
        vhost=os.environ.get('RABBIT_ENV_VHOST', ''))

# We don't want to have dead connections stored on rabbitmq, so we have to negotiate using heartbeats
BROKER_HEARTBEAT = '?heartbeat=30'
if not BROKER_URL.endswith(BROKER_HEARTBEAT):
    BROKER_URL += BROKER_HEARTBEAT

BROKER_POOL_LIMIT = 1
BROKER_CONNECTION_TIMEOUT = 10
'''

# Celery

#from urllib.parse import urlparse

INSTALLED_APPS += ['djcelery', ]

import djcelery

djcelery.setup_loader()

CELERY_ENABLE_UTC = True
CELERY_TIMEZONE = "UTC"

INSTALLED_APPS += ['kombu.transport.django', ]

from kombu import Exchange, Queue

# configure queues, currently we have only one
CELERY_DEFAULT_QUEUE = 'default'
CELERY_QUEUES = (
    Queue('default', Exchange('default'), routing_key='default'),
)

# Sensible settings for celery
CELERY_ALWAYS_EAGER = False
CELERY_ACKS_LATE = True
CELERY_TASK_PUBLISH_RETRY = True
CELERY_DISABLE_RATE_LIMITS = False

# By default we will ignore result
# If you want to see results and try out tasks interactively, change it to False
# Or change this setting on tasks level
CELERY_IGNORE_RESULT = True
CELERY_SEND_TASK_ERROR_EMAILS = False
CELERY_TASK_RESULT_EXPIRES = 600

# Set redis as celery result backend
#CELERY_RESULT_BACKEND = 'redis://%s:%d/%d' % (REDIS_HOST, REDIS_PORT, REDIS_DB)
#CELERY_RESULT_BACKEND = BROKER_URL
CELERY_RESULT_BACKEND = 'djcelery.backends.database:DatabaseBackend'
CELERY_REDIS_MAX_CONNECTIONS = 1

# Don't use pickle as serializer, json is much safer
CELERY_TASK_SERIALIZER = "json"
CELERY_ACCEPT_CONTENT = ['application/json']

CELERYD_HIJACK_ROOT_LOGGER = False
CELERYD_PREFETCH_MULTIPLIER = 1
CELERYD_MAX_TASKS_PER_CHILD = 1000

CELERYBEAT_SCHEDULER = "djcelery.schedulers.DatabaseScheduler"

'''

redis_url = urlparse('redis://localhost:6379')

CACHES = {
    'default': {
        'BACKEND': 'redis_cache.RedisCache',
        'LOCATION': '%s:%s' % (redis_url.hostname, redis_url.port),
        'OPTIONS': {
            'PASSWORD': redis_url.password,
            'USERNAME': redis_url.username,
            'DB': 0,
        },
    },
}

CELERYBEAT_SCHEDULER = "djcelery.schedulers.DatabaseScheduler"

LOCAL_CACHE_ADDR = ('127.0.0.1:11211',)

CACHE_PREFIX = 'aqhq:'

redis = redis_url.geturl()
if STAGING or PRODUCTION:
    redis = redis + '/0'
    if not redis.startswith('redis'):
        # Hacking
        redis = 'redis://' + redis

BROKER_URL = redis
CELERY_RESULT_BACKEND = BROKER_URL

CELERY_DEFAULT_QUEUE = 'aqhq'

if not (STAGING or PRODUCTION or PRODUCTION_DOCKER):
    # Let celery tasks run locally and show errors
    CELERY_ALWAYS_EAGER = True
    CELERY_EAGER_PROPAGATES_EXCEPTIONS = True

CELERY_QUEUES = {
    CELERY_DEFAULT_QUEUE: {
        'exchange': CELERY_DEFAULT_QUEUE,
        'binding_key': CELERY_DEFAULT_QUEUE,
    }
}

BROKER_TRANSPORT_OPTIONS = {'visibility_timeout': 3600 * 24 * 14}
CELERY_TASK_RESULT_EXPIRES = 3600 * 24 * 14
'''

'''
redis_url = urlparse.urlparse(os.environ.get('REDIS_URL','redis://localhost:6379'))

if os.environ.get('TAGGLER_REDIS_1_PORT_6379_TCP_ADDR', False):
    # Fig
    redis_url = urlparse.urlparse('redis://%s:6379/0' % os.environ['TAGGLER_REDIS_1_PORT_6379_TCP_ADDR'],)

CACHES = {
    'default': {
        'BACKEND': 'redis_cache.RedisCache',
        'LOCATION': '%s:%s' % (redis_url.hostname, redis_url.port),
        'OPTIONS': {
            'PASSWORD': redis_url.password,
            'USERNAME': redis_url.username,
            'DB': 0,
        },
    },
}

CELERYBEAT_SCHEDULER = "djcelery.schedulers.DatabaseScheduler"

LOCAL_CACHE_ADDR = ('127.0.0.1:11211',)

CACHE_PREFIX = 'tag:'
if STAGING:
    CACHE_PREFIX = 'tags:'
elif PRODUCTION:
    CACHE_PREFIX = 'tagp:'
elif TESTING:
    CACHE_PREFIX = 'tagt:'

redis = redis_url.geturl()
if STAGING or PRODUCTION:
    redis = redis + '/0'
    if not redis.startswith('redis'):
        # Hacking
        redis = 'redis://' + redis

BROKER_URL = redis
CELERY_RESULT_BACKEND = BROKER_URL

if STAGING or PRODUCTION:
    CELERY_DEFAULT_QUEUE = 'ultrapress-staging'
    if PRODUCTION:
        CELERY_DEFAULT_QUEUE = 'ultrapress-prod'
else:
    CELERY_DEFAULT_QUEUE = 'ultrapress-dev'
    # Let celery tasks run locally and show errors
    CELERY_ALWAYS_EAGER = True
    CELERY_EAGER_PROPAGATES_EXCEPTIONS = True

CELERY_QUEUES = {
    CELERY_DEFAULT_QUEUE: {
        'exchange': CELERY_DEFAULT_QUEUE,
        'binding_key': CELERY_DEFAULT_QUEUE,
    }
}

BROKER_TRANSPORT_OPTIONS = {'visibility_timeout': 3600 * 24 * 14}
CELERY_TASK_RESULT_EXPIRES = 3600 * 24 * 14
'''

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
    'COERCE_DECIMAL_TO_STRING': False
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
