#!/bin/bash
echo 'entrypoint-combinedserver.sh'
echo '============================'
cd /scintilla_api
sleep 3
python3 manage.py migrate
python3 manage.py loaddata test_platforms test_sensors test_deployments test_devices test_readings test_calibrated_readings
echo "from django.contrib.auth import get_user_model; get_user_model().objects.create_superuser('cdelguercio@gmail.com', 'password')" | python3 manage.py shell
#nohup python3 manage.py mock_readings_generator &
python3 manage.py runserver 0.0.0.0:8000
