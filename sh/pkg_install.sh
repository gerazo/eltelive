#!/bin/sh

ALPINE_PKGS="nginx nginx-mod-rtmp fcgiwrap ffmpeg"
DEBIAN_PKGS="nginx-light libnginx-mod-rtmp libnginx-mod-http-auth-pam fcgiwrap ffmpeg"

case "$EL_OS" in
  "alpine")
    apk update
    apk upgrade
    ;;
  "debian")
    DEBIAN_FRONTEND=noninteractive apt-get -qy update
    DEBIAN_FRONTEND=noninteractive apt-get -qy upgrade
    ;;
esac

if [ "$EL_SYNC_ONLY"="yes" ]; then
  exit 0
fi

case "$EL_OS" in
  "alpine")
    apk add $ALPINE_PKGS
    ;;
  "debian")
    DEBIAN_FRONTEND=noninteractive apt-get -qy install $DEBIAN_PKGS
    ;;
esac
