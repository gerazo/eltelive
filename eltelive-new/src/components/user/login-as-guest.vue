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
          <button class="link-buttons mr-5" v-on:click="registerStreamKey(3)">
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

export default {
  name: "login-as-guest",
  mounted() {
 
  },
  methods: {
    registerStreamKey(type) {
      var showVideo = document.getElementById("stream-player");
      var streamKey = document.getElementById("streamkey").value.trim();

      if (!streamKey) return;
      if (type == "3") {
        //HLS
        var T = document.getElementById("videoElementDisplay");
        T.style.display = "block";
        if (flvjs.isSupported()) {
          var videoElement = document.getElementById("videoElement");
          var flvPlayer = flvjs.createPlayer({
            type: "flv",
            isLive: true,
            url: "http://" + process.env.VUE_APP_HOST + ":8000/live/" + streamKey + ".flv"
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
  height:3.5rem;
  font-size: 1.15rem;
}
</style>
