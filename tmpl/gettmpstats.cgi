#!/bin/sh

LOG_DIR="../../../log/"

EACODE="$HTTP_EACODE"

FILE=""$LOG_DIR"/ffmpeg/ffmpeg-"$EACODE"-tmp.log"

if test -f "$FILE" ; then
    #lastline=$( tail -n 1 "$FILE" | head -n 1)
    #https://stackoverflow.com/questions/22727107/how-to-find-the-last-field-using-cut
    lastline=$( tail -n 1 "$FILE" | rev | cut -d'x' -f 2 | rev )
    echo "HTTP/1.1 200 OK"
    echo "Content-Type: text/html; charset=UTF-8"
    echo "
    <!DOCTYPE html>
    <html>
    <head>
    </head>
    <body>"
    echo "$lastline"
    echo "<br>"
    #set $QUERY_STRING #(this prints all the headers)
    echo "</body>
    </html>"
else
    echo "HTTP/1.1 200 OK"
    echo "Content-Type: text/html; charset=UTF-8"
    echo "
    <!DOCTYPE html>
    <html>
    <head>
    </head>
    <body>"
    echo "The requested stream is offline or does not exist."
    echo "<br>"
    echo "</body>
    </html>"
fi
exit 0