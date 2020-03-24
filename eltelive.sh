#!/bin/sh

EL_CONFIG="config"
EL_DEPLOY="deploy"
EL_CONTROL="control"
EL_RECORDING="recording"
EL_VIDEOS="videos"
EL_WWW="www"
EL_LOG="log"

echo "ELTE Live Control Script"

if [ "$1"="-h" ] || [ "$1"="--help" ]; then
  echo "Installs and runs the service according to the given configuration."
  echo "   -h --help   Shows this help"
  exit 0
fi

if [ ! -f "$EL_CONFIG" ]; then
  echo "No configuration was found, creating a default one..."
  cp tmpl/"$EL_CONFIG" .
  chmod +x "$EL_CONFIG"
  echo "Please edit the configuration file: $EL_CONFIG and rerun this script."
  exit 1
fi

if ! . config ; then
  echo "Could not read configuration. Executable rights problem?"
  exit 2
fi

if [ "$EL_CONTAINER"="docker" ] && [ $( command -v docker )="" ]; then
  echo "You want to create a container and you do not have Docker on your system. Please install it first!"
  exit 3
fi

mkdir -p $EL_DEPLOY/$EL_CONTROL
mkdir -p $EL_DEPLOY/$EL_RECORDING
mkdir -p $EL_DEPLOY/$EL_VIDEOS
mkdir -p $EL_DEPLOY/$EL_WWW
mkdir -p $EL_DEPLOY/$EL_LOG

cp sh/*.sh $EL_DEPLOY/$EL_CONTROL/

cd $EL_DEPLOY/$EL_CONTROL
case "$EL_CONTAINER" in
  "docker")
    case "$EL_OS" in
      "alpine")
        IMAGE="alpine:latest"
        ;;
      "debian")
        IMAGE="stable-slim"
        ;;
    esac
    cat ../../tmpl/Dockerfile | sed 's/\$IMAGENAME/'"$IMAGE"'/' >Dockerfile
    # TODO Build Docker image
    ;;
  "host")
    ./install.sh
    ;;
esac
cd ../..
