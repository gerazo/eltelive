#!/bin/sh

echo "Setting up web appearance, data and logging..."

if [ "$EL_CONTAINER"="" ]; then
  set -a
  . ./config
  set +a
fi

mkdir -p /var/log/nginx
