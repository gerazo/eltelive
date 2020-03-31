#!/bin/sh

echo "Installing service dependencies..."

ALPINE_PKGS="nginx nginx-mod-rtmp fcgiwrap spawn-fcgi ffmpeg"
DEBIAN_PKGS="nginx-light libnginx-mod-rtmp libnginx-mod-http-auth-pam fcgiwrap spawn-fcgi ffmpeg"

case "$EL_OS" in
  "alpine")
    apk update
    apk upgrade
    apk add $ALPINE_PKGS
    printf "#!/bin/sh\n/usr/sbin/crond" >/usr/sbin/cron && chmod +x /usr/sbin/cron
    ln -s /usr/bin/fcgiwrap /usr/sbin/fcgiwrap
    ;;
  "debian")
    DEBIAN_FRONTEND=noninteractive apt-get -qy update
    DEBIAN_FRONTEND=noninteractive apt-get -qy upgrade
    DEBIAN_FRONTEND=noninteractive apt-get -qy install $DEBIAN_PKGS
    ;;
esac
