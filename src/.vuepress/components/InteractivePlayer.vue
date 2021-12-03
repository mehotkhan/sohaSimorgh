<template>
  <div>
    <div class="player">
      <div class="video-overlay" :hidden="!showOverlay">
        <div
          uk-grid
          class="uk-child-width-expand@s uk-text-center uk-height-1-1"
        >
          <div
            class="
              chapter
              uk-flex uk-flex-middle uk-text-center uk-flex-around uk-height-1-1
            "
            @click="rightChoice"
          >
            <h2>اینوری برو</h2>
          </div>
          <div
            class="
              chapter
              uk-flex uk-flex-middle uk-text-center uk-flex-around uk-height-1-1
            "
            @click="leftChoice"
          >
            <h2>اونوری برو</h2>
          </div>
        </div>
      </div>

      <video
        ref="videoPlayer"
        class="video-js vjs-theme-forest"
        :options="videoOptions"
      ></video>
    </div>
    <div class="uk-flex uk-flex-between">
      <div class="">عنوان سکانس</div>
      <div class="control">
        <span
          class="uk-margin-small-right"
          uk-icon="chevron-double-right"
        ></span>
        <span
          class="uk-margin-small-right"
          uk-icon="play"
          :hidden="playing"
          @click="playMe"
        ></span>
        <span
          class="uk-margin-small-right"
          :hidden="!playing"
          uk-icon="close"
          @click="stopMe"
        ></span>
        <span
          class="uk-margin-small-right"
          uk-icon="chevron-double-left"
        ></span>
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
      showOverlay: true,
      playing: false,
      videoOptions: {
        autoplay: false,
        controls: false,
        preload: "auto",
        sources: [
          {
            src: "https://stream.movajehemovie.ir/Black.Mirror.Bandersnatch.0.mp4",
            type: "video/mp4",
          },
        ],
      },
    };
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.videoOptions, null);

    let self = this;
    this.player.on("timeupdate", function () {
      self.showPopup(this.currentTime(), this.duration());
    });
  },
  computed: {},
  methods: {
    async showPopup(currentTime, duration) {
      if (currentTime > duration - 13) {
        this.showOverlay = true;
      }
    },
    playMe() {
      this.player.play();
      this.playing = true;
    },
    stopMe() {
      this.player.pause();
      this.playing = false;
    },
    rightChoice() {
      console.log("im right");
      console.log(this.player.currentSrc().split("/").pop());
    },
    leftChoice() {
      console.log(this.player.currentSrc().split("/").pop());
      console.log("im left");
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
  // border: 1px solid black;
  // display: inline-block;
  position: relative;
}

.video-js {
  margin: 1rem auto !important;
  width: 100%;
}

.video-overlay .uk-grid {
  margin: 0;
}

.video-overlay {
  position: absolute;
  left: 0px;
  top: 0px;
  padding: 0;
  z-index: 999;
  right: 0;
  bottom: 0;
}

.video-overlay .chapter:hover {
  background: #dfba017d;
}

.video-overlay .chapter {
  background-color: #dfba014f;
  cursor: pointer;
}

.video-overlay h2 {
  font-size: 2rem;
  color: white;
  margin: 0;
}

.vjs_video_3-dimensions {
  height: 600px;
}

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
  z-index: 999;
}
</style>
