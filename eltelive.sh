#!/bin/sh

EL_CONFIG="config"
EL_DEPLOY="deploy"
EL_GEN="generated"
EL_DATA="data"
EL_LOG="log"

echo "ELTELive Control Script"

# Help
if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
  echo "Installs and runs the service according to the given configuration."
  echo "   -h --help   Shows this help"
  exit 0
fi

# Configuration generation
if [ ! -f $EL_DEPLOY/$EL_CONFIG ]; then
  echo "No configuration was found, creating a default one..."
  mkdir -p $EL_DEPLOY
  cp tmpl/$EL_CONFIG $EL_DEPLOY/$EL_CONFIG
  chmod +x $EL_DEPLOY/$EL_CONFIG
  echo "Please edit the configuration file \"$EL_DEPLOY/$EL_CONFIG\" and rerun this script."
  exit 1
fi

# Reading configuration
if ! . ./$EL_DEPLOY/$EL_CONFIG ; then
  echo "Could not read configuration. Executable rights problem?"
  exit 2
fi

# Installing 3rd party libs
if [ ! -d "3rdparty/videojs" ]; then
  if [ "$( command -v curl )" = "" ] && [ "$( command -v wget )" = "" ]; then
    echo "Cannot download 3rd party libraries without curl or wget. Please install on of them!"
    exit 4
  fi
  if [ "$( command -v unzip )" = "" ]; then
    echo "Cannot unpack downloaded files. Please install unzip!"
    exit 6
  fi

  echo "Downloading 3rd party VideoJS library..."
  mkdir -p "3rdparty/videojs"
  cd "3rdparty"
  if [ ! "$( command -v curl )" = "" ]; then
    DOWNLOAD_COMMAND="curl -sL "$EL_VIDEOJS_VERSION" --output "$( basename $EL_VIDEOJS_VERSION )
  else
    DOWNLOAD_COMMAND="wget -q "$EL_VIDEOJS_VERSION
  fi
  if ! $DOWNLOAD_COMMAND ; then
    echo "There was an error downloading 3rd party library from "$EL_VIDEOJS_VERSION "Please download manually!"
    exit 5
  fi
  cd videojs
  unzip -q ../$( basename $EL_VIDEOJS_VERSION )
  cd ..
  rm $( basename $EL_VIDEOJS_VERSION )
  cd ..
fi

# Checking docker requirements
if [ "$EL_CONTAINER" = "docker" ] && [ "$( command -v docker )" = "" ]; then
  echo "You want to create a container and you do not have Docker on your system. Please install it first!"
  exit 3
fi

# Copy raw files to source place of generation and usage
mkdir -p $EL_DEPLOY/$EL_GEN

cd $EL_DEPLOY
EL_PUBLISHERAUTHFILE=$( realpath -q "$EL_PUBLISHERAUTHFILE" )
EL_VIEWERAUTHFILE=$( realpath -q "$EL_VIEWERAUTHFILE" )
EL_SSLCERTIFICATE=$( realpath -q "$EL_SSLCERTIFICATE" )
EL_SSLSECRETKEY=$( realpath -q "$EL_SSLSECRETKEY" )
cd ..

cp sh/* $EL_DEPLOY/$EL_GEN/
cp tmpl/rtmp.conf tmpl/stream tmpl/rtmp_stats.xsl tmpl/*.html tmpl/*.css tmpl/*.js tmpl/*.cgi tmpl/*.jpeg tmpl/*.ico $EL_DEPLOY/$EL_GEN/
cp $EL_DEPLOY/$EL_CONFIG $EL_DEPLOY/$EL_GEN/
cp -r 3rdparty/videojs $EL_DEPLOY/$EL_GEN/

if [ -f "$EL_PUBLISHERAUTHFILE" ]; then
  cp "$EL_PUBLISHERAUTHFILE" $EL_DEPLOY/$EL_GEN/
fi
if [ -f "$EL_VIEWERAUTHFILE" ]; then
  cp "$EL_VIEWERAUTHFILE" $EL_DEPLOY/$EL_GEN/
fi

if [ -n "$EL_SSLCERTIFICATE" ] && [ -n "$EL_SSLSECRETKEY" ]; then
  cp "$EL_SSLCERTIFICATE" "$EL_SSLSECRETKEY" $EL_DEPLOY/$EL_GEN/
fi

# Start installation scripts
case "$EL_CONTAINER" in
  "docker")
    case "$EL_OS" in
      "alpine")
        IMAGE="alpine:latest"
        FCGIUSER="fcgiwrap"
        ;;
      "debian")
        IMAGE="debian:stable-slim"
        FCGIUSER="www-data"
        ;;
    esac

    PASSWDCOPY=""
    if [ -f "$EL_PUBLISHERAUTHFILE" ] && [ -f "$EL_VIEWERAUTHFILE" ]; then
      PASSWDCOPY='; s|^# COPY passwd.*$|COPY '"$( basename $EL_PUBLISHERAUTHFILE ) $( basename $EL_VIEWERAUTHFILE )"' /root/|'
    elif [ -f "$EL_PUBLISHERAUTHFILE" ]; then
      PASSWDCOPY='; s|^# COPY passwd.*$|COPY '"$( basename $EL_PUBLISHERAUTHFILE )"' /root/|'
    elif [ -f "$EL_VIEWERAUTHFILE" ]; then
      PASSWDCOPY='; s|^# COPY passwd.*$|COPY '"$( basename $EL_VIEWERAUTHFILE )"' /root/|'
    fi

    SSLCOPY=""
    if [ -n "$EL_SSLCERTIFICATE" ] && [ -n "$EL_SSLSECRETKEY" ]; then
      SSLCOPY='; s|^# COPY SSL.*$|COPY '"$( basename $EL_SSLCERTIFICATE ) $( basename $EL_SSLSECRETKEY )"' /etc/ssl/private/|'
    fi

    cd $EL_DEPLOY
    mkdir -p $EL_DATA
    mkdir -p $EL_LOG

    cd $EL_GEN
    cat ../../tmpl/Dockerfile | sed 's/\$IMAGENAME/'"$IMAGE"'/; s/\$FCGIUSERNAME/'"$FCGIUSER"'/'"$SSLCOPY""$PASSWDCOPY" >Dockerfile

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
    echo "Creating container..."
    MSYS_NO_PATHCONV=1 docker create -h stream -it --name $EL_CONTAINERNAME -v $( pwd )/../$EL_DATA:/var/www -v $( pwd )/../$EL_LOG:/var/log -p 80:80/tcp -p 443:443/tcp -p 1935:1935/tcp $EL_CONTAINERNAME
    echo "Starting container..."
    docker start $EL_CONTAINERNAME
    if [ "$( docker ps | grep $EL_CONTAINERNAME )" = "" ]; then
      echo "!!! Something went wrong with the container creation. See the errors above!"
      exit 4
    fi
    cd ../..

    echo "Container \"$EL_CONTAINERNAME\" was started, services are running inside."
    echo "You can find the data under $EL_DEPLOY/$EL_DATA and the logs under $EL_DEPLOY/$EL_LOG"
    echo "To control, use:"
    echo "  docker stop $EL_CONTAINERNAME # to stop the container"
    echo "  docker start $EL_CONTAINERNAME # to start it again"
    echo "  docker attach $EL_CONTAINERNAME # to log in for inspection"
    echo "  To detach without termination, use Ctrl+P+Q. Using the exit command will shut the container down."
    ;;
  "host")
    cd $EL_DEPLOY
    ln -s /var/www $EL_DATA
    ln -s /var/log $EL_LOG

    cd $EL_GEN
    ./install.sh
    cd ../..

    echo "Services were installed and started (nginx). You can control them with your distribution's service manager (See systemd!)."
    echo "You can find the data linked under $EL_DEPLOY/$EL_DATA and the logs under $EL_DEPLOY/$EL_LOG"
    ;;
esac

echo "TCP ports HTTP(80), HTTPS(443) and RTMP(1935) are used by the service and are now open. Open them on your firewall if you use any to let the outside world connect."
echo "Have fun!"
exit 0
