#!/bin/sh

echo "Running installation..."

set -a
. ./config
set +a
# env

./pkg-install.sh
./nginx-conf.sh
./env-conf.sh

if [ $EL_CONTAINER = "host" ]; then
  ./www-conf.sh
fi
