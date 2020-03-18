#!/bin/sh

ALPINE_PKGS="nginx nginx-mod-rtmp fcgiwrap ffmpeg"
DEBIAN_PKGS="nginx-light libnginx-mod-rtmp libnginx-mod-http-auth-pam fcgiwrap ffmpeg"

if [ "$EL_OS"="alpine" ]; then
  apk update
  apk upgrade
fi

if [ "$EL_OS"="debian" ]; then
  DEBIAN_FRONTEND=noninteractive apt-get -qy update
  DEBIAN_FRONTEND=noninteractive apt-get -qy upgrade
fi

if [ "$EL_UPGRADE_ONLY"="yes" ]; then
  exit 0
fi

if [ "$EL_OS"="alpine" ]; then
  apk add $ALPINE_PKGS
fi

if [ "$EL_OS"="debian" ]; then
  DEBIAN_FRONTEND=noninteractive apt-get -qy install $DEBIAN_PKGS
fi
