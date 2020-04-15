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

if ! grep -q 'include /etc/nginx/rtmp.conf;' $NGINXCONF ; then
  echo 'include /etc/nginx/rtmp.conf;' >>$NGINXCONF
fi

cp rtmp.conf /etc/nginx/rtmp.conf

case "$EL_OS" in
  "alpine")
    WWW_CONF="/etc/nginx/conf.d"
    WWW_CONF_LINK=""
    WWW_DEFAULT="default.conf"
    ;;
  "debian")
    WWW_CONF="/etc/nginx/sites-available"
    WWW_CONF_LINK="/etc/nginx/sites-enabled"
    WWW_DEFAULT="default"
    ;;
esac

# TODO: Copy certificate files into place
# TODO: Generate snakeoil on certificates not given? (if needed)

case "$EL_VIEWERAUTH" in
  "off")
    VIEWERLINE1=""
    VIEWERLINE2=""
    ;;
  "basic")
    VIEWERLINE1="auth_basic \"$EL_VIEWERAUTHMESSA\";"
    VIEWERLINE2="auth_basic_user_file \"$EL_VIEWERAUTHFILE\";"
    ;;
  "pam")
    VIEWERLINE1="auth_pam \"$EL_VIEWERAUTHMESSA\";"
    VIEWERLINE2="auth_pam_service_name \"$EL_VIEWERAUTHSERVICE\";"
    ;;
esac

case "$EL_PUBLISHERAUTH" in
  "basic")
    PUBLISHERLINE1="auth_basic \"$EL_PUBLISHERAUTHMESSA\";"
    PUBLISHERLINE2="auth_basic_user_file \"$EL_PUBLISHERAUTHFILE\";"
    ;;
  "pam")
    PUBLISHERLINE1="auth_pam \"$EL_PUBLISHERAUTHMESSA\";"
    PUBLISHERLINE2="auth_pam_service_name \"$EL_PUBLISHERAUTHSERVICE\";"
    ;;
esac

cat stream | sed 's/\$SSLCERTIFICATE/'"\"$EL_SSLCERTIFICATE\""'/; s/\$SSLSECRETKEY/'"\"$EL_SSLSECRETKEY\""'/; s/\$VIEWERAUTHMESSA/'"$VIEWERLINE1"'/g; s/\$VIEWERAUTHSERVICE/'"$VIEWERLINE2"'/g; s/\$PUBLISHERAUTHMESSA/'"$PUBLISHERLINE1"'/g; s/\$PUBLISHERAUTHSERVICE/'"$PUBLISHERLINE2"'/g' >"$WWW_CONF/stream"

if [ -n "$WWW_CONF_LINK" ]; then
  ln -s "$WWW_CONF"/stream "$WWW_CONF_LINK"/stream
  rm "$WWW_CONF_LINK"/"$WWW_DEFAULT"
else
  rm "$WWW_CONF"/"$WWW_DEFAULT"
fi
