#!/bin/sh

echo "Setting up web appearance, data and logging..."

if [ "$EL_CONTAINER"="" ]; then
  set -a
  . ./config
  set +a
fi

# TODO: Setup www stream folder if needed

# TODO: Setup logging folders if needed

mkdir -p /var/log/nginx
