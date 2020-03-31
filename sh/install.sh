#!/bin/sh

echo "Running installation..."

set -a
. ./config
set +a
# env

./pkg-install.sh
./nginx-conf.sh
./www-conf.sh
./env-conf.sh
./auth-conf.sh
