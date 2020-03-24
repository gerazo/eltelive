#!/bin/sh

ALPINE_PKGS="nginx nginx-mod-rtmp fcgiwrap ffmpeg"
DEBIAN_PKGS="nginx-light libnginx-mod-rtmp libnginx-mod-http-auth-pam fcgiwrap ffmpeg"

case "$EL_OS" in
  "alpine")
    apk update
    apk upgrade
    apk add $ALPINE_PKGS
    ;;
  "debian")
    DEBIAN_FRONTEND=noninteractive apt-get -qy update
    DEBIAN_FRONTEND=noninteractive apt-get -qy upgrade
    DEBIAN_FRONTEND=noninteractive apt-get -qy install $DEBIAN_PKGS
    ;;
esac
