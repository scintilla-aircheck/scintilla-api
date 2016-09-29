FROM python:3.5

#FROM ubuntu:16.04

#RUN apt update && apt install -y python3-pip python3-dev python3-setuptools libpq-dev

RUN useradd --system scintilla_api && \
    mkdir /scintilla_api && \
    chown scintilla_api:scintilla_api /scintilla_api

ADD requirements.txt entrypoint-*.sh manage.py /scintilla_api/
ADD . /scintilla_api/

RUN pip install -r /scintilla_api/requirements.txt

#RUN cd /scintilla_api && python3 manage.py migrate
#RUN sysctl vm.overcommit_memory=1

VOLUME ["/scintilla_api"]
USER scintilla_api
WORKDIR /scintilla_api
ENV PYTHONUNBUFFERED 1