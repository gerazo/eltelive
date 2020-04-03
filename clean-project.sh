#!/bin/sh

echo "Cleaning up everything in the project..."
if [ -f config ] &&. ./config ; then
  docker stop $EL_CONTAINERNAME
  docker rm $EL_CONTAINERNAME
  docker rmi $EL_CONTAINERNAME
fi
rm -rf deploy/generated
