#!/bin/sh

NAME=$1
FILENAME=$2
BASENAME=$3

mkdir -p /var/www/videos/$NAME
nice ffmpeg -y -i /var/www/recording/$FILENAME -c:v libx265 -b:v 500k -preset $VIDEOPRESET -c:a copy -f mp4 /var/www/videos/$NAME/$BASENAME.mp4
rm /var/www/recording/$FILENAME
mv /var/log/ffmpeg/ffmpeg-$NAME-tmp.log /var/log/ffmpeg/ffmpeg-$NAME-$( date +%F-%T ).log
