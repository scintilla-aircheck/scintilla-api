#!/bin/bash
echo 'entrypoint-interface.sh'
echo '======================='
cd /scintilla_api && exec daphne -b 0.0.0.0 -p 8000 scintilla_api.asgi:channel_layer
