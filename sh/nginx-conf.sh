#!/bin/sh

echo "Configuring NGINX and RTMP module..."

NGINXCONF="/etc/nginx/nginx.conf"

if grep -q 'worker_processes .\{1,9\};' $NGINXCONF ; then
  sed -i 's/worker_processes .\{1,9\};/worker_processes 1;/' $NGINXCONF
else
  echo 'worker_processes 1;' >>$NGINXCONF
fi

if grep -q 'worker_shutdown_timeout .\{1,9\};' $NGINXCONF ; then
  sed -i 's/worker_shutdown_timeout .\{1,9\};/worker_shutdown_timeout 14s;/' $NGINXCONF
else
  sed -i 's/worker_processes 1;/worker_processes 1;\nworker_shutdown_timeout 14s;/' $NGINXCONF
fi

if grep -q 'worker_connections .\{1,9\};' $NGINXCONF ; then
  sed -i 's/worker_connections .\{1,9\};/worker_connections 2048;/' $NGINXCONF
else
  sed -i 's/events .\{0,9\}{.\{0,9\}\n/events {\nworker_connections 2048;\n/' $NGINXCONF
fi

if grep -q 'gzip \{0,9\}on;' $NGINXCONF ; then
  sed -i 's/gzip \{0,9\}on;/gzip off;/' $NGINXCONF
fi

if ! grep -q 'pid .*\.pid;' $NGINXCONF ; then
  echo 'pid /var/run/nginx.pid;' >>$NGINXCONF
fi

if ! grep -q 'include /etc/nginx/rtmp.conf;' $NGINXCONF ; then
  echo 'include /etc/nginx/rtmp.conf;' >>$NGINXCONF
fi

cp rtmp.conf /etc/nginx/rtmp.conf

case "$EL_OS" in
  "alpine")
    WWW_CONF="/etc/nginx/conf.d"
    WWW_CONF_LINK=""
    WWW_DEFAULT="default.conf"
    WWW_CONF_NAME="stream.conf"
    ;;
  "debian")
    WWW_CONF="/etc/nginx/sites-available"
    WWW_CONF_LINK="/etc/nginx/sites-enabled"
    WWW_DEFAULT="default"
    WWW_CONF_NAME="stream"
    ;;
esac

if [ -n "$EL_SSLCERTIFICATE" ] && [ -n "$EL_SSLSECRETKEY" ]; then
  if [ "$EL_CONTAINER" = "docker" ]; then
    EL_SSLCERTIFICATE="/etc/ssl/private/$( basename $EL_SSLCERTIFICATE )"
    EL_SSLSECRETKEY="/etc/ssl/private/$( basename $EL_SSLSECRETKEY )"
  fi
else
  if [ -f "/etc/ssl/private/ssl-cert-snakeoil.key" ] && [ -f "/etc/ssl/certs/ssl-cert-snakeoil.pem" ]; then
    EL_SSLCERTIFICATE="/etc/ssl/certs/ssl-cert-snakeoil.pem"
    EL_SSLSECRETKEY="/etc/ssl/private/ssl-cert-snakeoil.key"
  else
    openssl req -x509 -nodes -days 365 -subj "/C=CA/ST=QC/O=Localhost/CN=localhost" -addext "subjectAltName=DNS:localhost" -newkey rsa:2048 -keyout /etc/ssl/private/selfsigned.key -out /etc/ssl/private/selfsigned.crt >/dev/null 2>&1
    EL_SSLCERTIFICATE="/etc/ssl/private/selfsigned.crt"
    EL_SSLSECRETKEY="/etc/ssl/private/selfsigned.key"
  fi
fi

case "$EL_VIEWERAUTH" in
  "off")
    VIEWERLINE1=""
    VIEWERLINE2=""
    ;;
  "basic")
    VIEWERLINE1="auth_basic \"$EL_VIEWERAUTHMESSA\";"
    VIEWERLINE2="auth_basic_user_file \"/var/www/$( basename $EL_VIEWERAUTHFILE )\";"
    ;;
  "pam")
    VIEWERLINE1="auth_pam \"$EL_VIEWERAUTHMESSA\";"
    VIEWERLINE2="auth_pam_service_name \"$EL_VIEWERAUTHSERVICE\";"
    ;;
esac

case "$EL_PUBLISHERAUTH" in
  "basic")
    PUBLISHERLINE1="auth_basic \"$EL_PUBLISHERAUTHMESSA\";"
    PUBLISHERLINE2="auth_basic_user_file \"/var/www/$( basename $EL_PUBLISHERAUTHFILE )\";"
    ;;
  "pam")
    PUBLISHERLINE1="auth_pam \"$EL_PUBLISHERAUTHMESSA\";"
    PUBLISHERLINE2="auth_pam_service_name \"$EL_PUBLISHERAUTHSERVICE\";"
    ;;
esac

cat stream | sed 's|\$SSLCERTIFICATE|'"\"$EL_SSLCERTIFICATE\""'|; s|\$SSLSECRETKEY|'"\"$EL_SSLSECRETKEY\""'|; s|\$VIEWERAUTHMESSA|'"$VIEWERLINE1"'|; s|\$VIEWERAUTHSERVICE|'"$VIEWERLINE2"'|; s|\$PUBLISHERAUTHMESSA|'"$PUBLISHERLINE1"'|; s|\$PUBLISHERAUTHSERVICE|'"$PUBLISHERLINE2"'|' >"$WWW_CONF/$WWW_CONF_NAME"

if [ -n "$WWW_CONF_LINK" ]; then
  ln -s "$WWW_CONF/$WWW_CONF_NAME" "$WWW_CONF_LINK/$WWW_CONF_NAME"
  rm "$WWW_CONF_LINK"/"$WWW_DEFAULT"
else
  rm "$WWW_CONF"/"$WWW_DEFAULT"
fi
