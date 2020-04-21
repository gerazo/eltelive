#!/bin/sh

DB_DIR=tokendb
USER_PREFIX="user_"
TOKEN_PREFIX="token_"

if [ ! "$HTTPS" = "on" ] || [ -z "$HTTP_AUTHORIZATION" ]; then
  USER=""
else
  METHOD=$( echo "$HTTP_AUTHORIZATION" | cut -d" " -f1 )
  if [ "$METHOD" = "Basic" ]; then
    USER=$( echo "$HTTP_AUTHORIZATION" | cut -d" " -f2 | base64 -di | cut -d":" -f1 )
  else
    USER=""
  fi
fi

if [ -z "$USER" ]; then
  echo "HTTP/1.1 401 Unauthorized"
  echo "Content-Type: text/html; charset=UTF-8"
  echo ""
  echo "<html><head><title>Unauthorized</title></head><body>"
  echo "No go without authorization!"
  echo "</body></html>"
  exit 0
fi

if [ -f $DB_DIR/"$USER_PREFIX"$USER ]; then
  TOKEN=$( cat $DB_DIR/"$USER_PREFIX"$USER )
  IT_IS_NEW="no"
else
  TOKENFILE=$( mktemp -p $DB_DIR "$TOKEN_PREFIX"XXXXXXXXXXXX )
  TOKEN=$( echo $TOKENFILE | cut -d"_" -f2 )
  echo $USER >$DB_DIR/"$TOKEN_PREFIX"$TOKEN
  echo $TOKEN >$DB_DIR/"$USER_PREFIX"$USER
  IT_IS_NEW="yes"
fi

echo "HTTP/1.1 200 OK"
echo "Content-Type: text/html; charset=UTF-8"
echo "
<!DOCTYPE html>
<html>
<head>
<title>Publish Token</title>
<meta name=\"robots\" content=\"noindex,nofollow\" />
<style>
    body {
        width: 50em;
        margin: 0 auto;
        font-family: sans-serif;
    }
    img {
        float: left;
        margin: 2em;
    }
    h3 {
        clear: both;
    }
</style>
</head>
<body>
<img src=\"../../logosmall.jpeg\" alt=\"Logo Small\" width=\"128\" height=\"128\"/><br/>"
if [ $IT_IS_NEW = "yes" ]; then
echo "<h3>Publish token is ready</h3>
<p>Your publishing token for today is ready:</p>"
else
echo "<h3>Publish token was ready</h3>
<p>Your publishing token for today was already generated:</p>"
fi
echo "<ul>
<li/>User: <i>$USER</i>
<li/>Token: <i>$TOKEN</i>
<li/>Streaming URL (paste into OBS): <code><big>rtmp://$DOMAINNAME/publish?$TOKEN</big></code>
</ul>
<p><a href="..">Back to checklist</a></p>
</body></html>"
exit 0

