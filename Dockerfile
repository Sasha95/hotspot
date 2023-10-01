FROM ubuntu
FROM freeradius/freeradius-server:latest

RUN apt update \
    && apt install -y libmariadb-dev \
        gcc\
        python3-dev \
        libcogl-pango-dev \
        libcairo2-dev \
        libtool \
        linux-headers-amd64 \
        musl-dev \
        libffi-dev \
        libssl-dev \
        libjpeg-dev \
        zlib1g-dev 

FROM php:8.0-apache

RUN apt-get update && apt-get upgrade -y
RUN apt install -y freeradius freeradius-mysql
RUN apt-get install -y default-mysql-client freeradius-utils
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

COPY php/mysql_data /etc/mysql_data/
# COPY raddb /etc/raddb/
COPY raddb/mods-available/sql /etc/freeradius/3.0/mods-enabled/sql
COPY raddb/sites-available/default /etc/freeradius/3.0/sites-available/default
COPY raddb/sites-available/inner-tunnel /etc/freeradius/3.0/sites-available/inner-tunnel
COPY raddb/auth.php /etc/freeradius/3.0/auth.php
COPY raddb/clients.conf /etc/freeradius/3.0/clients.conf
COPY raddb/users /etc/freeradius/3.0/users

EXPOSE 1812 1813