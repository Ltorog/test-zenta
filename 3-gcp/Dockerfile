FROM python:3.12-slim

WORKDIR /app


COPY requirements.txt /
COPY requirements_dev.txt /

RUN pip install -r /requirements.txt
RUN pip install -r /requirements_dev.txt

COPY . ./

EXPOSE 8080
