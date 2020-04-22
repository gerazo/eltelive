#!/bin/sh

echo "Installing service dependencies..."

ALPINE_PKGS="nginx nginx-mod-rtmp fcgiwrap spawn-fcgi ffmpeg openssl apache2-utils"
DEBIAN_PKGS="nginx-light libnginx-mod-rtmp fcgiwrap spawn-fcgi ffmpeg ssl-cert apache2-utils cron libnginx-mod-http-auth-pam"

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
