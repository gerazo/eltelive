function registerStreamKey(type) {
  var streamKey = document.getElementById("streamkey").value;
  if(!streamKey)
    return;
  if (type == "1") {
    // RTMP
    var streamLink = "rtmp://$DOMAINNAME/live/" + streamKey;
    window.open(streamLink, "_blank");
  } else if (type == "2") {
    //MPEG-DASH
    var streamLink =
      "https://$DOMAINNAME/livedash/" + streamKey + ".mpd";
    var player = videojs('stream-player');
    player.src({src: streamLink, type: 'application/dash+xml'});
    player.play();
  } else if (type == "3") {
    //HLS
    var streamLink =
      "https://$DOMAINNAME/livehls/" + streamKey + ".m3u8";
    var player = videojs('stream-player');
    player.src({src: streamLink, type: 'application/x-mpegURL'});
    player.play();
  } else if (type == "4") {
    //Recorded videos
    var streamLink =
      "https://$DOMAINNAME/videos/" + streamKey;
    window.open(streamLink, "_blank");
  } else if (type == "5") {
    //RTMP low quality
    var streamLink = "rtmp://$DOMAINNAME/livelq/" + streamKey;
    window.open(streamLink, "_blank");
  } else if (type == "6") {
    //HLS low quality
    var streamLink =
      "https://$DOMAINNAME/livehlslq/" + streamKey + ".m3u8";
    var player = videojs('stream-player');
    player.src({src: streamLink, type: 'application/x-mpegURL'});
    player.play();
  }
}
