#!/bin/sh

LOG_DIR="../../../log/"

#stackoverflow.com/questions/18884992/how-do-i-assign-ls-to-an-array-in-linux-bash

cd $LOG_DIR/ffmpeg

#TMPSTREAMS=$(ls -d *-tmp.log)
#shopt -s nullglob
#TMPSTREAMS=(*-tmp.log)
#shopt -u nullglob
#TMPSTREAMS=$(ls -d *-tmp.log)
##TMPSTREAMS=$(ls *nummod* )
##ARRAY=($TMPSTREAMS)
#MPSTREAMS=$(echo $TMPSTREAMS | cut -d'-' -f 2)

#stackoverflow.com/questions/12623064/listing-files-using-sh
set -- *-tmp.log
#set -- *analizis*


echo "HTTP/1.1 200 OK"
echo "Content-Type: text/html; charset=UTF-8"
echo "
<!DOCTYPE html>
<html>
<head>
</head>
<body>"
for filename; do
    echo "${filename}"
done
##echo "${ARRAY[*]}"
#echo "$ARRAY"
#echo "$TMPSTREAMS"
echo "</body>
</html>"
exit 0