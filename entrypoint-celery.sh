#!/bin/sh

cd /scintilla_api
# run Celery worker for our project myproject with Celery configuration stored in Celeryconf
#su -m scintilla_api -c "celery worker -A scintilla_api.celeryconf -Q default -n default@%h"
python3 manage.py migrate kombu_transport_django
celery worker -A scintilla_api.celeryconf -Q default -n default@%h