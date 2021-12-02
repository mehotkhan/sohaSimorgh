<template>
  <div>
    <div class="player">
      <video
        ref="videoPlayer"
        class="video-js vjs-theme-forest"
        :options="videoOptions"
      ></video>
      <div class="overlay" :hidden="!showOverlay">
        <p uk-margin>
          <button class="uk-button uk-button-default" @click="playMe">
            play me
          </button>
        </p>
        <p uk-margin>
          <button class="uk-button uk-button-default" @click="stopMe">
            stop me
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import videojs from "video.js";
import("video.js/dist/video-js.css");
import("@videojs/themes/dist/forest/index.css");

export default {
  name: "InteractivePlayer",
  data() {
    return {
      showOverlay: false,
      videoOptions: {
        autoplay: false,
        controls: true,
        sources: [
          {
            src:
              "https://lamberta.github.io/html5-animation/examples/ch04/assets/movieclip.mp4",
            type: "video/mp4",
          },
        ],
      },
    };
  },
  mounted() {
    // const src =
    // "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8";
    // this.playVideo(src);
    this.player = videojs(
      this.$refs.videoPlayer,
      this.videoOptions,
      function onPlayerReady() {
        console.log("onPlayerReady", this);
      }
    );

    // Modals are temporary by default. They dispose themselves when they are
    // closed; so, we can create a new one each time the player is paused and
    // not worry about leaving extra nodes hanging around.

    var modal_content =
      '<div class="mcwidget-embed" data-widget-id="999999">asdasd asdasd</div><button>asdasd</button>';

    // where the magic happens
    var contentEl = document.createElement("div");
    // probably better to just build the entire thing via DOM methods
    contentEl.innerHTML = modal_content;

    this.player.createModal(contentEl);

    let self = this;
    this.player.on("timeupdate", function() {
      self.showPopup(this.currentTime());
    });
  },
  computed: {},
  methods: {
    async showPopup(currentTime) {
      if (currentTime >= 3) {
        this.showOverlay = true;
        // console.log(currentTime);
        // this.player.pause();
      }
    },
    playMe() {
      this.player.play();
    },
    stopMe() {
      this.player.pause();
    },
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style lang="stylus">
.player {
  position: relative;
}

.video-js {
  margin: 1rem auto !important;
  width: 100%;
}

// .video_contain {
//   position: absolute;
//   top: -50%;
//   left: -50%;
//   width: 200%;
//   height: 200%;
// }

video {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  min-height: 50%;
  min-width: 50%;
}

.overlay {
  position: absolute;
  color: #fff;
  text-align: center;
  font-size: 20px;
  background-color: #9797979c;
  z-index: 2147483647;
  width: 100%;
  top: 0;
  bottom: 3rem;
}
.vjs-control-bar {
  z-index:999
}
</style>
