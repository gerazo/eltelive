#!/bin/sh

EL_CONFIG="config"
EL_DEPLOY="deploy"
EL_CONTROL="control"
EL_RECORDING="recording"
EL_VIDEOS="videos"
EL_WWW="www"
EL_LOG="log"

echo "ELTELive Control Script"

if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
  echo "Installs and runs the service according to the given configuration."
  echo "   -h --help   Shows this help"
  exit 0
fi

if [ ! -f "$EL_CONFIG" ]; then
  echo "No configuration was found, creating a default one..."
  cp tmpl/"$EL_CONFIG" .
  chmod +x "$EL_CONFIG"
  echo "Please edit the configuration file \"$EL_CONFIG\" and rerun this script."
  exit 1
fi

if ! . ./config ; then
  echo "Could not read configuration. Executable rights problem?"
  exit 2
fi

if [ "$EL_CONTAINER" = "docker" ] && [ "$( command -v docker )" = "" ]; then
  echo "You want to create a container and you do not have Docker on your system. Please install it first!"
  exit 3
fi

mkdir -p $EL_DEPLOY/$EL_CONTROL
mkdir -p $EL_DEPLOY/$EL_RECORDING
mkdir -p $EL_DEPLOY/$EL_VIDEOS
mkdir -p $EL_DEPLOY/$EL_WWW
mkdir -p $EL_DEPLOY/$EL_LOG

cp sh/* $EL_DEPLOY/$EL_CONTROL/
cp config $EL_DEPLOY/$EL_CONTROL/

cd $EL_DEPLOY/$EL_CONTROL
case "$EL_CONTAINER" in
  "docker")
    case "$EL_OS" in
      "alpine")
        IMAGE="alpine:latest"
        ;;
      "debian")
        IMAGE="debian:stable-slim"
        ;;
    esac
    cat ../../tmpl/Dockerfile | sed 's/\$IMAGENAME/'"$IMAGE"'/' >Dockerfile
    if [ "$( docker ps -a | grep $EL_CONTAINERNAME )" != "" ]; then
      docker stop $EL_CONTAINERNAME
      docker rm $EL_CONTAINERNAME
    fi
    if [ "$( docker images | grep $EL_CONTAINERNAME )" != "" ]; then
      docker rmi $EL_CONTAINERNAME
    fi
    docker build -t $EL_CONTAINERNAME .
    RESTART=""
    if [ "$EL_AUTORESTART" = "yes" ]; then
      RESTART="--restart yes"
    fi
    docker create $RESTART -h stream --name $EL_CONTAINERNAME $EL_CONTAINERNAME
    # docker create $RESTART -h stream -i --name $EL_CONTAINERNAME $EL_CONTAINERNAME
    docker start $EL_CONTAINERNAME
    ;;
  "host")
    ./install.sh
    ;;
esac
cd ../..
