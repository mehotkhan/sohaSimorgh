<template>
  <div>
    <div class="player">
      <div class="video-overlay">
        
       <div class="uk-flex uk-flex-middle uk-text-center uk-flex-around uk-height-1-1">
          <h2> اینوری برو</h2>
          <h2>اونوری برو</h2>
      </div>
        
        </div>

      <video
        ref="videoPlayer"
        class="video-js vjs-theme-forest"
        :options="videoOptions"
      ></video>
     
    </div>
     <div class="uk-flex uk-flex-between">
        <div class="">
          عنوان سکانس
        </div>
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
      showOverlay: false,
      playing: false,
      videoOptions: {
        autoplay: false,
        controls: false,
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

    // var modal_content =
    //   '<div class="mcwidget-embed" data-widget-id="999999">asdasd asdasd</div><button>asdasd</button>';

    // // where the magic happens
    // var contentEl = document.createElement("div");
    // // probably better to just build the entire thing via DOM methods
    // contentEl.innerHTML = modal_content;

    // this.player.createModal(contentEl);

    // let self = this;
    // this.player.on("timeupdate", function() {
    //   self.showPopup(this.currentTime());
    // });
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
      this.playing = true;
    },
    stopMe() {
      this.player.pause();
      this.playing = false;
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
.video-overlay {
    position: absolute;
    left: 0px;
    top: 0px;
    padding: 0;
    background-color: #dfba014f;
    z-index: 999;
    right: 0;
    bottom: 0;
}
.video-overlay h2{
  color white
  margin:0
}
.vjs_video_3-dimensions {
  height: 600px
}
// video {
//     width: 100%;
//     height: 100%;
// }
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
