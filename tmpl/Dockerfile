FROM $IMAGENAME

WORKDIR /root
COPY . /root/
# COPY passwd files here
# COPY SSL keys and certificates here
RUN chmod +x install.sh
RUN sh install.sh

EXPOSE 80/tcp
EXPOSE 443/tcp
EXPOSE 1935/tcp

VOLUME /var/www
VOLUME /var/log

CMD ./www-conf.sh && /usr/sbin/cron && /usr/bin/spawn-fcgi -u $FCGIUSERNAME -g www-data -M 660 -s /var/run/fcgiwrap.socket /usr/sbin/fcgiwrap && /usr/sbin/nginx && /bin/sh
