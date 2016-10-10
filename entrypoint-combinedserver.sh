#!/bin/bash
cd /scintilla_api
python3 manage.py migrate
python3 manage.py loaddata initial_platforms initial_sensors initial_deployments initial_devices initial_readings initial_calibrated_readings
python3 manage.py runserver 0.0.0.0:8000
