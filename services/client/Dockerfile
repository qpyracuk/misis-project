FROM debian:12.2

USER root
# АРГУМЕНТЫ СБОРКИ
ARG NGINX_VERSION

# РАБОЧАЯ ДИРЕКТОРИЯ
WORKDIR /root

# ОБНОВЛЕНИЕ И УСТАНОВКА OPENSSL
RUN apt-get update -y && apt-get upgrade -y && apt-get install openssl -y

# ГЕНЕРАЦИЯ КЛЮЧА ДЕФФИ-ХЕЛМАНА
RUN mkdir /secure && openssl dhparam -out /secure/dhparam.pem 1024

# ОБНОВЛЕНИЕ И УСТАНОВКА НУЖНЫХ ПАКЕТОВ
RUN apt-get update && apt-get upgrade -y && apt-get install git zlib1g-dev make build-essential libpcre3-dev libcurl4-openssl-dev gcc libexpat1-dev wget tar gettext-base -y;

# СОЗДАНИЕ ФАЙЛОВОЙ СТРУКТУРЫ ДЛЯ СКАЧИВАНИЯ И УСТАНОВКИ
RUN mkdir /src && mkdir /src/nginx && mkdir /src/nginx/modules

# СКАЧИВАНИЕ ИСХОДНИКОВ NGINX (РЕКОМАНДУЕТСЯ УСТАНАВЛИВАТЬ ПОСЛЕДНЮЮ АКТУАЛЬНУЮ ВЕРСИЮ)
RUN cd /src/nginx \
  && wget http://nginx.org/download/nginx-$NGINX_VERSION.tar.gz  \
  && tar -zxvf nginx-$NGINX_VERSION.tar.gz 

# КЛОНИРОВАНИЕ РЕПОЗИТОРИЯ BROTLI (АЛГОРИТМ СЖАТИЯ ОТ GOOGLE) И OPENSSL
RUN cd /src/nginx/modules \
  && git clone  https://github.com/openssl/openssl \
  && cd /src/nginx/modules/openssl \
  && git submodule update --init

# СБОРКА NGINX И ЕГО МОДУЛЕЙ 
RUN mkdir /www && cd /src/nginx/nginx-$NGINX_VERSION && ./configure \
  --prefix=/etc/nginx\
  --sbin-path=/usr/sbin/nginx\
  --conf-path=/etc/nginx/nginx.conf\
  --modules-path=/usr/lib/nginx/modules\
  --with-openssl=/src/nginx/modules/openssl\
  --error-log-path=/var/log/nginx/error.log\
  --http-log-path=/var/log/nginx/access.log\
  --pid-path=/var/run/nginx.pid\
  --lock-path=/var/run/nginx.lock\
  --user=root\
  --with-http_realip_module\
  --with-http_gzip_static_module\
  --with-http_gunzip_module\
  --with-http_sub_module\
  --with-http_dav_module\
  --with-http_flv_module\
  --with-http_mp4_module\
  --with-http_secure_link_module\
  --with-http_v2_module\
  --with-threads\
  --with-stream\
  --with-http_ssl_module\
  --with-compat\
  --with-file-aio\
  --with-stream_ssl_module\
  --with-stream_ssl_preread_module\
  --with-stream_realip_module && make && make install
# КОПИРОВАНИЕ ФАЙЛА КОНФИГУРАЦИИ ДЛЯ NGINX
COPY ./nginx.conf /src/nginx/nginx.conf.template
COPY ./05-docker-entrypoint.sh /docker-entrypoint.d/05-docker-entrypoint.sh
# НАСТРОЙКА ПОЛЬЗОВАТЕЛЯ NGINX
RUN chmod -R 777 /www && mv /secure/dhparam.pem /etc/nginx/dhparam.pem

# ПРОСЛУШИВАНИЕ ПОРТОВ
EXPOSE 80/tcp 443/tcp 80/udp 443/udp

STOPSIGNAL SIGTERM

ENTRYPOINT [ "/docker-entrypoint.d/05-docker-entrypoint.sh" ]

CMD ["nginx", "-g", "daemon off;"]