<template>
  <div>
    <h1 class="guest-title text-center pt-5">Guest Portal</h1>
      <div class="wrapper">
      <div class="box">
        <noscript>
          <div style="text-align: left;">
            <h4>Instructions</h4>
            <p>
              If you have a lecture with a key: '<em>mylecture</em>' which is
              <b>being streamed</b>, you can join the live stream by
            </p>
            <ul>
              <li>
                Using any player which can play RTMP streams like
                <a href="https://www.videolan.org/vlc/">VLC</a>. Use this URL:
                <b>rtmp://$DOMAINNAME/live/mylecture</b><br>
              </li>
            </ul>
            <p>
              If you are <b>past</b> the lecture called <em>mylecture</em>, you
              can download MP4 videos from
              <b>https://$DOMAINNAME/videos/mylecture</b>
            </p>
            <p>
              The form below will * <b>NOT</b> * work as you have disabled
              javascript in your browser
            </p>
            <hr />
          </div>
        </noscript>
        <input 
          class="mt-3"
          type="text" 
          id="streamkey" 
          placeholder="Insert your stream key here and press one of the buttons below"
        required />
        <div class="pt-5">
          <button class="link-buttons" v-on:click="registerStreamKey(3);">
            - Listen in Browser -
          </button>
          <button class="link-buttons" v-on:click="registerStreamKey(1);">
            - Listen in App -
          </button>
          <button class="link-buttons" v-on:click="registerStreamKey(4);">
            - Recordings -
          </button>
          <br />
          <button class="link-buttons" v-on:click="registerStreamKey(6);">
            <small>Listen LQ in Browser</small>
          </button>
          <button class="link-buttons" v-on:click="registerStreamKey(5);">
            <small>Listen LQ in App</small>
          </button>
        </div>
          <video-js ref="Player" v-if="showVideo" id="stream-player" width=530 height=300 class="vjs-default-skin" controls>
          </video-js>
      </div>
    </div>
  </div>
</template>
<script>
import videojs from "./video.min.js";
window.videojs = videojs

export default {
  name: "login-as-guest",
  data: function() {
        return {
            showVideo: false
        }
    },
  methods: {
    registerStreamKey(type) {
      this.showVideo = true;
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
          "http://localhost:8000/live/" + streamKey + ".flv";
        var player = videojs(this.$refs.Player);
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

  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');
@import url('video-js.min.css');
  .guest-title {
    text-transform: uppercase;
  }
  .guest-title > h1 {
    font-size: 3.2rem;
  }
.wrapper {
  max-width: 850px;
  margin: 10% auto;
}

.box {
  box-shadow: 0px 0px 10px #afc0d9;
  background-color: #fff;
  padding: 40px;
  border-radius: 0.25rem;
  text-align: center;
}

.box noscript{
  text-align: left !important;
}

input {
  border: 1px solid rgb(220, 219, 235);
  border-radius: 4px;
  font-size: 13px;
  padding: 10px;
  color: #000;
  transition: all 0.15s ease-in;
}

input[type="text"] {
  width: 95%;
  margin-bottom: 1%;
}

.link-buttons {
  border-radius: 4px;
  font-size: 20px;
  padding: 10px;
  transition: all 0.15s ease-in;
  background-color: rgb(53, 114, 210);
  color: #fff;
  border: 1px solid;
  border-color: transparent;
  opacity: 0.8;
  transition: 0.3s;
  cursor: pointer;
  margin: 10px;
}

.link-buttons:hover {
  opacity: 1;
}

input:focus {
  border-color: rgb(53, 114, 210);
  box-shadow: 0px 0px 8px 2px rgba(53, 114, 210, 0.5);
  outline: none;
}

input::placeholder {
  color: #999;
}
</style>
