FROM $IMAGENAME

WORKDIR /root
COPY config install.sh pkg-install.sh nginx-conf.sh www-conf.sh env-conf.sh auth-conf.sh convert.sh stream-tokens /root/
RUN ./install.sh
RUN if [ ! -f /usr/sbin/cron ]; then printf "#!/bin/sh\n/usr/sbin/crond" >/usr/sbin/cron && chmod +x /usr/sbin/cron; fi

EXPOSE 80/tcp
EXPOSE 443/tcp
EXPOSE 1935/tcp

VOLUME /var/www/recording
VOLUME /var/www/videos
VOLUME /var/www/stream
VOLUME /var/log

CMD /usr/sbin/cron && /usr/sbin/nginx
#CMD /bin/sh
