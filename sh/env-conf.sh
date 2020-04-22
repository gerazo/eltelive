#!/bin/sh

echo "Setting up helper services and watchdogs..."

case "$EL_OS" in
  "alpine")
    cp stream-tokens /etc/periodic/daily/
    ;;
  "debian")
    cp stream-tokens /etc/cron.daily/
    ;;
esac
