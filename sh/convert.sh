#!/bin/sh

NAME=$1
FILENAME=$2
BASENAME=$3

mv /var/log/ffmpeg/ffmpeg-$NAME-tmp.log /var/log/ffmpeg/ffmpeg-$NAME-$( date +%F-%T ).log
mv /var/log/ffmpeg/ffmpeg-$NAME-lq-tmp.log /var/log/ffmpeg/ffmpeg-$NAME-$( date +%F-%T )-lq.log
mkdir -p /var/www/videos/$NAME
nice ffmpeg -y -i /var/www/recording/$FILENAME -c:v libx265 -b:v 500k -preset $VIDEOPRESET -c:a copy -f matroska /var/www/videos/$NAME/$BASENAME.mkv >>/var/log/ffmpeg/ffmpeg-$NAME-$( date +%F-%T )-save.log 2>&1
rm /var/www/recording/$FILENAME
