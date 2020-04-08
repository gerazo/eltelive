#!/bin/sh

echo "Configuring NGINX and RTMP module..."

NGINXCONF="/etc/nginx/nginx.conf"

if grep -q 'worker_processes .\{1,9\};' $NGINXCONF ; then
  sed -i 's/worker_processes .\{1,9\};/worker_processes 1;/' $NGINXCONF
else
  echo 'worker_processes 1;' >>$NGINXCONF
fi

if grep -q 'worker_shutdown_timeout .\{1,9\};' $NGINXCONF ; then
  sed -i 's/worker_shutdown_timeout .\{1,9\};/worker_shutdown_timeout 14s;/' $NGINXCONF
else
  sed -i 's/worker_processes 1;/worker_processes 1;\nworker_shutdown_timeout 14s;/' $NGINXCONF
fi

if grep -q 'worker_connections .\{1,9\};' $NGINXCONF ; then
  sed -i 's/worker_connections .\{1,9\};/worker_connections 2048;/' $NGINXCONF
else
  sed -i 's/events .\{0,9\}{.\{0,9\}\n/events {\nworker_connections 2048;\n/' $NGINXCONF
fi

if grep -q 'gzip \{0,9\}on;' $NGINXCONF ; then
  sed -i 's/gzip \{0,9\}on;/gzip off;/' $NGINXCONF
fi

if ! grep -q 'include /etc/nginx/rtmp.conf;' $NGINXCONF ; then
  echo 'include /etc/nginx/rtmp.conf;' >>$NGINXCONF
fi

cp rtmp.conf /etc/nginx/rtmp.conf
