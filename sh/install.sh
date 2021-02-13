#!/bin/sh

echo "Running installation..."

set -a
. ./config
set +a
# env

sh pkg-install.sh
sh nginx-conf.sh
sh env-conf.sh

if [ $EL_CONTAINER = "host" ]; then
  sh www-conf.sh
fi
