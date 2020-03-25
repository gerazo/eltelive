#!/bin/sh

echo "Running installation..."

./pkg-install.sh
./nginx-conf.sh
./www-conf.sh
./env-conf.sh
./auth-conf.sh
