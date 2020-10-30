#!/bin/sh

LOG_DIR="../../../log/"

EACODE="$HTTP_EACODE"

DATE="$HTTP_DATESTRING"

FILE=""$LOG_DIR"/nginx/access.log"



if test -f "$FILE" ; then
    accessforthiscode=$( grep "PLAY \"live.*\"" "$FILE" | grep "$EACODE" | cut -d':' -f 1 | grep "$DATE" | cut -d' ' -f 1)
    browserplays=$( grep "GET /livehls/$EACODE.m3u8" "$FILE" | cut -d' ' -f 1,4 | grep "$DATE" | cut -d' ' -f 1)
    echo "HTTP/1.1 200 OK"
    echo "Content-Type: text/html; charset=UTF-8"
    echo "
    <!DOCTYPE html>
    <html>
    <head>
    </head>
    <body>"
    echo "$accessforthiscode"
    echo "$browserplays"
    echo "</body>
    </html>"
else
    echo "HTTP/1.1 503 Service Unavailable"
fi

exit 0