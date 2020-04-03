FROM $IMAGENAME

WORKDIR /root
COPY config install.sh pkg-install.sh nginx-conf.sh www-conf.sh env-conf.sh auth-conf.sh convert.sh stream-tokens rtmp.conf /root/
RUN ./install.sh

EXPOSE 80/tcp
EXPOSE 443/tcp
EXPOSE 1935/tcp

VOLUME /var/www
VOLUME /var/log

CMD /usr/sbin/cron && /usr/bin/spawn-fcgi -u $FCGIUSERNAME -g www-data -s /var/run/fcgiwrap.socket /usr/sbin/fcgiwrap && mkdir -p /var/log/nginx && /usr/sbin/nginx -g "pid /var/run/nginx.pid;" && /bin/sh
