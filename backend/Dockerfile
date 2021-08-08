FROM composer as builder

WORKDIR /app
COPY composer.* /app/

RUN composer install --ignore-platform-reqs

COPY . /app

FROM php:8.0-apache

RUN docker-php-ext-install pdo_mysql

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-enabled/000-default.conf

COPY --from=builder --chown=www-data:www-data /app /var/www/html
