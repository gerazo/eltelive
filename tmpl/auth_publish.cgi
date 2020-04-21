#!/bin/sh

DB_DIR=tokendb
USER_PREFIX="user_"
TOKEN_PREFIX="token_"

POSTDATA="$( cat - | tr '\&' '\n' )"
# GETDATA="$( echo $QUERY_STRING | tr '\&' '\n' )"
TOKEN=$( echo "$POSTDATA" | grep swfurl= | cut -d"=" -f2 | cut -d"%" -f2 | cut -c3- )
APPNAME=$( echo "$POSTDATA" | grep app= | cut -d"=" -f2 )
STREAMNAME=$( echo "$POSTDATA" | grep name= | cut -d"=" -f2 )
SOURCEIP=$( echo "$POSTDATA" | grep addr= | cut -d"=" -f2 )
USER="N/A"

if [ -z "$SOURCEIP" ] || [ -z "$APPNAME" ] || [ -z "$STREAMNAME" ] || [ -z "$TOKEN" ] || [ ! -f $DB_DIR/"$TOKEN_PREFIX""$TOKEN" ]; then
  #echo "$POSTDATA" >>/var/log/rtmp/publish.log
  echo "ip:$SOURCEIP user:$USER time:$( date +%Y-%m-%d-%H:%M:%S ) action:PUBLISH app:$APPNAME key:$STREAMNAME DENY" >>/var/log/rtmp/publish.log
  echo "HTTP/1.1 403 Forbidden"
  exit 0
fi

USER=$( cat $DB_DIR/"$TOKEN_PREFIX""$TOKEN" )
echo "ip:$SOURCEIP user:$USER time:$( date +%Y-%m-%d-%H:%M:%S ) action:PUBLISH app:$APPNAME key:$STREAMNAME ALLOW" >>/var/log/rtmp/publish.log

echo "HTTP/1.1 200 OK"
echo "Content-Type: text/html; charset=UTF-8"
echo ""
echo "<html><head><title>Pass</title></head><body></body></html>"
exit 0

