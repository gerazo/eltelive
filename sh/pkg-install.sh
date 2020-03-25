#!/bin/sh

echo "Installing service dependencies..."

ALPINE_PKGS="dcron nginx nginx-mod-rtmp fcgiwrap ffmpeg"
DEBIAN_PKGS="cron nginx-light libnginx-mod-rtmp libnginx-mod-http-auth-pam fcgiwrap ffmpeg"

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
