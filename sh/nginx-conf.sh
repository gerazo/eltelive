#!/bin/sh

echo "Configuring NGINX and RTMP module..."

cp rtmp.conf /etc/nginx/

mv /etc/nginx/nginx.conf /etc/nginx/nginx_orig_conf
cat /etc/nginx/nginx_orig_conf | sed 's/worker_processes .\{1,9\};/worker_processes 1;\nworker_shutdown_timeout 14s;/; s/worker_connections .\{1,9\};/worker_connections 2048;/; s/gzip .\{0,39\}on;/#gzip on;/' >/etc/nginx/nginx.conf
echo "include /etc/nginx/rtmp.conf;" >>/etc/nginx/nginx.conf
