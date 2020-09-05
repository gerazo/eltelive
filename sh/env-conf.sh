#!/bin/sh

echo "Setting up helper services and watchdogs..."

case "$EL_OS" in
  "alpine")
    cp stream-tokens /etc/periodic/daily/
    chmod +x /etc/periodic/daily/stream-tokens
    ;;
  "debian")
    cp stream-tokens /etc/cron.daily/
    chmod +x /etc/cron.daily/stream-tokens
    ;;
esac
