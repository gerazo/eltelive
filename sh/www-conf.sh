#!/bin/sh

echo "Setting up web appearance, data and logging..."

if [ "$EL_CONTAINER"="" ]; then
  set -a
  . ./config
  set +a
fi


mkdir -p /var/www/recording
mkdir -p /var/www/videos
chown root:www-data /var/www/recording /var/www/videos
chmod 775 /var/www/recording /var/www/videos
cp -f convert.sh /var/www/

mkdir -p /var/www/stream/publish/token/tokendb
mkdir -p /var/www/stream/token/tokendb
chown root:www-data /var/www/stream/publish/token/tokendb /var/www/stream/token/tokendb
chmod 775 /var/www/stream/publish/token/tokendb /var/www/stream/token/tokendb

if [ ! -f /var/www/stream/legal.html ]; then
  cp legal.html /var/www/stream/
fi
if [ ! -f /var/www/stream/logosmall.jpeg ]; then
  cp logosmall.jpeg /var/www/stream/
fi
if [ ! -f /var/www/stream/index.html ]; then
  cat index.html | sed 's/\$DOMAINNAME/'"$EL_DOMAINNAME"'/g' >/var/www/stream/index.html
fi

if [ ! -f /var/www/stream/publish/rtmp_stats.xsl ]; then
  cp rtmp_stats.xsl /var/www/stream/publish/
fi

if [ ! -f /var/www/stream/publish/index.html ]; then
  cat publish_index.html | sed 's/\$DOMAINNAME/'"$EL_DOMAINNAME"'/g' >/var/www/stream/publish/index.html
fi

if [ ! -f /var/www/stream/publish/token/auth_publish.cgi ]; then
  cp auth_publish.cgi /var/www/stream/publish/token/auth_publish.cgi
fi

if [ ! -f /var/www/stream/publish/token/gen_publish.cgi ]; then
  cat gen_publish.cgi | sed 's/\$DOMAINNAME/'"$EL_DOMAINNAME"'/g' >/var/www/stream/publish/token/gen_publish.cgi
  chmod +x /var/www/stream/publish/token/gen_publish.cgi
fi


mkdir -p /var/log/nginx
mkdir -p /var/log/rtmp
mkdir -p /var/log/ffmpeg
chown root:www-data /var/log/nginx /var/log/rtmp /var/log/ffmpeg
chmod 775 /var/log/nginx /var/log/rtmp /var/log/ffmpeg
