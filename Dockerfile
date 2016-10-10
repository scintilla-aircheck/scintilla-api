FROM python:3.5

RUN useradd --system scintilla_api && \
    mkdir /scintilla_api && \
    chown scintilla_api:scintilla_api /scintilla_api

ADD requirements.txt entrypoint-*.sh manage.py /scintilla_api/
ADD . /scintilla_api/

RUN pip install -r /scintilla_api/requirements.txt

VOLUME ["/scintilla_api"]
USER scintilla_api
WORKDIR /scintilla_api
ENV PYTHONUNBUFFERED 1
