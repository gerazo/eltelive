<template>
  <div>
    <div class="pt-5 pb-3">
      <div class="text-center pt-5">
        <h1 id="selenium_output_6" class="pb-3">Guest Portal</h1>
      </div>
      <div class="float-right mr-5">
        <button
          id="selenium_24"
          type="button"
          class="btn btn-primary mr-5"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          Guest Guide
        </button>
      </div>
    </div>
    <div
      class="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="exampleModalLongTitle">
              Streamer Guide
            </h4>
            <button
              id="selenium_26"
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p class="pb-2">
              If stream is not working:
            </p>
            <ol>
              <li class="pb-1">Refresh and re-enter the stream key (wait 15 seconds before refreshing)</li>
              <li class="pb-1">
                Check if the stream key is written correctly
              </li>
              <li class="pb-1">If streamer didn't start the stream, the video won't load</li>
            </ol>
          </div>
          <div class="modal-footer">
            <button
              id="selenium_25"
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
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
                <b>rtmp://$DOMAINNAME/live/mylecture</b><br />
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
          class="input mt-3"
          type="text"
          id="streamkey"
          placeholder="Insert your stream key here and press the button below"
          required
        />
        <div class="pt-4">
          <button id="selenium_27" class="link-buttons mr-5" v-on:click="registerStreamKey(3)">
            - Listen in Browser -
          </button>
        </div>
        <div id="videoElementDisplay" style="display:none">
          <script
            type="application/javascript"
            defer
            src="https://cdn.bootcss.com/flv.js/1.5.0/flv.min.js"
          ></script>
          <video
            id="videoElement"
            class="centeredVideo"
            controls
            autoplay
            width="600"
            height="576"
          >
            Your browser is too old which doesn't support HTML5 video.
          </video>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import flvjs from "flv.js";

export default {
  name: "login-as-guest",
  mounted() {},
  methods: {
    registerStreamKey(type) {
      var showVideo = document.getElementById("stream-player");
      var streamKey = document.getElementById("streamkey").value.trim();

      if (!streamKey) return;
      if (type == "3") {
        //HLS
        var T = document.getElementById("videoElementDisplay");
        T.style.display = "block";
        var videoElement = document.getElementById("videoElement");
        if (flvjs.isSupported()) {
          var flvPlayer = flvjs.createPlayer({
            type: "flv",
            isLive: true,
            url:
              "http://" +
              process.env.VUE_APP_HOST +
              ":8000/live/" +
              streamKey +
              ".flv"
          });
          flvPlayer.attachMediaElement(videoElement);
          flvPlayer.load();
          flvPlayer.play();
        }
      }
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Muli&display=swap");
.guest-title {
  text-transform: uppercase;
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

.box noscript {
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
.input {
  height: 3.5rem;
  font-size: 1.15rem;
}
</style>
