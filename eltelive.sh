#!/bin/sh

EL_CONFIG="config"
EL_DEPLOY="deploy"
EL_CONTROL="control"
EL_DATA="data"
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
mkdir -p $EL_DEPLOY/$EL_DATA
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
    if [ "$( docker ps | grep $EL_CONTAINERNAME )" != "" ]; then
      echo "Stopping running container..."
      docker stop $EL_CONTAINERNAME
    fi
    if [ "$( docker ps -a | grep $EL_CONTAINERNAME )" != "" ]; then
      echo "Removing previously created container..."
      docker rm $EL_CONTAINERNAME
    fi
    if [ "$( docker images | grep $EL_CONTAINERNAME )" != "" ]; then
      echo "Removing previously built image..."
      docker rmi $EL_CONTAINERNAME
    fi
    echo "Building image..."
    docker build -t $EL_CONTAINERNAME .
    RESTART=""
    if [ "$EL_AUTORESTART" = "yes" ]; then
      RESTART="--restart yes"
    fi
    echo "Creating container..."
    docker create $RESTART -h stream -it --name $EL_CONTAINERNAME -v $( pwd )/../$EL_DATA:/var/www -v $( pwd )/../$EL_LOG:/var/log -p 80:80/tcp -p 443:443/tcp -p 1935:1935/tcp $EL_CONTAINERNAME
    echo "Starting container..."
    docker start $EL_CONTAINERNAME
    if [ "$( docker ps | grep $EL_CONTAINERNAME )" = "" ]; then
      echo "!!! Something went wrong with the container creation. See the errors above!"
      exit 4
    fi
    echo "Container \"$EL_CONTAINERNAME\" was started, services are running inside."
    echo "You can find the data under $EL_DEPLOY/$EL_DATA and the logs under $EL_DEPLOY/$EL_LOG"
    echo "To control, use:"
    echo "docker stop $EL_CONTAINERNAME # to stop the container"
    echo "docker start $EL_CONTAINERNAME # to start it again"
    echo "docker attach $EL_CONTAINERNAME # to log in for inspection"
    echo "To detach without termination, use Ctrl+P+Q. Using the exit command will shut the container down."
    ;;
  "host")
    ./install.sh
    echo "Services were installed and started. You can control them with your distribution's service manager (See systemd!)."
    ;;
esac
cd ../..
echo "TCP ports HTTP(80), HTTPS(443) and RTMP(1935) are used by the service and are now open. Open them on your firewall if you use any to let the outside world connect."
echo "Have fun!"
exit 0
