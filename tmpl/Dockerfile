FROM $IMAGENAME

WORKDIR /root
COPY config install.sh pkg-install.sh nginx-conf.sh www-conf.sh env-conf.sh auth-conf.sh convert.sh stream-tokens /root/
RUN ./install.sh

EXPOSE 80/tcp
EXPOSE 443/tcp
EXPOSE 1935/tcp

VOLUME /var/www/recording
VOLUME /var/www/videos
VOLUME /var/www/stream
VOLUME /var/log

CMD /usr/sbin/cron && /usr/bin/spawn-fcgi -s /var/run/fcgiwrap.socket start && /usr/sbin/nginx
#CMD /bin/sh
