#!/bin/bash
echo 'entrypoint-worker.sh'
echo '===================='
cd /scintilla_api && python3 manage.py runworker
