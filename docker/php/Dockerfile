FROM php:8.3-fpm-bullseye AS base

WORKDIR /workspace

# timezone environment
ENV TZ=UTC \
    # locale
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US:en \
    LC_ALL=en_US.UTF-8 \
    # composer environment
    COMPOSER_ALLOW_SUPERUSER=1 \
    COMPOSER_HOME=/composer

COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

RUN <<EOF
    apt-get update
    apt-get -y install --no-install-recommends \
    locales \
    git \
    vim \
    unzip \
    libzip-dev \
    libicu-dev \
    libonig-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libjpeg-dev
    locale-gen en_US.UTF-8
    localedef -f UTF-8 -i en_US en_US.UTF-8
    docker-php-ext-install \
    intl \
    pdo_mysql \
    zip \
    bcmath \
    gd
    docker-php-ext-configure gd \
        --with-freetype=/usr/include/ \
        --with-jpeg=/usr/include/
    docker-php-ext-install -j$(nproc) gd
    composer config -g process-timeout 3600
    composer config -g repos.packagist composer https://packagist.org
EOF

ARG NODE_VERSION=20.x
RUN <<EOF
    curl -sL https://deb.nodesource.com/setup_$NODE_VERSION | bash -
    apt-get update
    apt-get install -y nodejs
    apt-get clean
    npm install -g npm@10.6.0
EOF

FROM base AS development

RUN <<EOF
    apt-get -y install --no-install-recommends \
        default-mysql-client
    apt-get clean
    rm -rf /var/lib/apt/lists/*
EOF

COPY ./docker/php/php.development.ini /usr/local/etc/php/php.ini

FROM development AS development-xdebug

RUN <<EOF
    pecl install xdebug
    docker-php-ext-enable xdebug
EOF

COPY ./docker/php/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

FROM base AS deploy

COPY ./docker/php/php.deploy.ini /usr/local/etc/php/php.ini
COPY ./src /workspace

RUN <<EOF
    composer install -q -n --no-ansi --no-dev --no-scripts --no-progress --prefer-dist
    chmod -R 777 storage bootstrap/cache
    php artisan optimize:clear
    php artisan optimize
    apt-get clean
    rm -rf /var/lib/apt/lists/*
EOF
