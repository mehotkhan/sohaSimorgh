<template>
  <div class="player">
    <video
      ref="videoPlayer"
      class="video-js vjs-theme-city"
      :options="videoOptions"
    ></video>
  </div>
</template>

<script>
import videojs from "video.js";
import("video.js/dist/video-js.css");
import("@videojs/themes/dist/city/index.css");

export default {
  name: "InteractivePlayer",
  data() {
    return {
      videoOptions: {
        autoplay: false,
        controls: true,
        sources: [
          {
            src: "https://lamberta.github.io/html5-animation/examples/ch04/assets/movieclip.mp4",
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
  },
  computed: {},
  methods: {},
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>


<style lang="stylus">
// @import ('video.js/dist/video-js.css');
.video-js {
  margin: 1rem auto !important;
  width: 100%;
}

.video_contain {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
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
</style>