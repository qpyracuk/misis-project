#!/usr/bin/env sh
set -eu
envsubst '\${DOMAIN} \$HTTP_PORT \$HTTPS_PORT \$SERVER_HOSTNAME' < /src/nginx/nginx.conf.template > /etc/nginx/nginx.conf
exec "$@" 