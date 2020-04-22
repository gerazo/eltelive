# eltelive

Very simple, battle tested live streaming solution of ELTE University

Development is ongoing. Stay tuned!

## What it is?

This is a lightweight, open-source, self-deployable, self-manageable service for broadcasting live streams
by using NGINX RTMP module on the server side.
It is compatible with OBS Studio broadcasting client.
It can be installed on a Debian-based host and also on Docker containers based on Alpine or Debian Linux.

## How to start?

 1. Checkout repo
 2. Run `./eltelive.sh` to generate a default configuration
 3. Edit configuration under `deploy/config`
 4. Run `./eltelive.sh` again to deploy and start
 5. Point your browser to `https://localhost`
