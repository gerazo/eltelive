FROM $IMAGENAME
WORKDIR /root
COPY *.sh /root/
RUN ./install.sh
CMD cron && nginx
