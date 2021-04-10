<script src="flv.min.js"></script>
<template>
  <div>
    <p>The Active Streams</p>
    <video id="videoElement"></video>
  </div>
</template>
<script>
export default {
  name: "active-stream",
  mounted(){
    if (flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement');
        var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: 'http://localhost:8000/live/STREAM_NAME.flv'
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
    }
  }
}
</script>
