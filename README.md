# eltelive

Very simple, battle tested live streaming solution of ELTE University

Development is ongoing. Stay tuned!

## What is it?

This is a lightweight, open-source, self-deployable, self-manageable service for broadcasting live streams
by using NGINX RTMP module on the server side.
It is compatible with OBS Studio.
It can be installed on a Debian-based host and also on Docker containers based on Alpine or Debian Linux.

## How to start?

### New web application
 1. Check out repo
 2. Navigate to [eltelive-new] and checkout this [README] for the instrucations related to the new version of the application


### Legacy web application

 1. Check out repo
 2. Run `./eltelive.sh` to generate a default configuration
 3. Edit configuration under `deploy/config`
 4. Run `./eltelive.sh` again to deploy and start
 5. Point your browser to `https://localhost`
 6. Enter lecturer section, generate publishing link and use OBSStudio for broadcasting
    (For development purposes, broadcast from command line: `ffmpeg -ss 1:00 -re -i video.H264.AAC.mp4 -c:v copy -c:a copy -f flv -rtmp_swfurl '%publishtoken' rtmp://localhost:1935/publish/streamkey`)
 7. Use `https://localhost` for viewing
 8. See your data and logs under `deploy` folder
 9. Run `./clean-project.sh` to clean built stuff but leave data and logs

[eltelive-new]: eltelive-new
[README]: eltelive-new/README.md