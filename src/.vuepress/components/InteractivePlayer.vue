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
            <h2>{{ this.rightPath }}</h2>
          </div>
          <div
            class="
              chapter
              uk-flex uk-flex-middle uk-text-center uk-flex-around uk-height-1-1
            "
            @click="leftChoice"
          >
            <h2>{{ this.leftPath }}</h2>
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
      <div class="">
        <span>{{
          nextChapterPercentage
            ? parseFloat(nextChapterPercentage * 100).toFixed(2) + "%"
            : ""
        }}</span>
      </div>
      <div class="control">
        <button
          @click="forward"
          class="uk-margin-small-left uk-button uk-button-link"
        >
          <<< ۵ ثانیه
        </button>

        <button
          :hidden="playing"
          @click="playMe"
          class="uk-button uk-button-link"
        >
          پخش کردن
        </button>
        <button
          :hidden="!playing"
          @click="stopMe"
          class="uk-button uk-button-link"
        >
          توقف
        </button>
        <button
          @click="backward"
          class="uk-margin-small-right uk-button uk-button-link"
        >
          ۵ ثانیه >>>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import videojs from "video.js";
import("video.js/dist/video-js.css");
import("@videojs/themes/dist/forest/index.css");
import pathWay from "./pathway.json";

export default {
  name: "InteractivePlayer",
  data() {
    return {
      showOverlay: false,
      currentChapter: null,
      currentChapterTitle: null,
      nextChapter: null,
      nextChapterBlobURL: null,
      nextChapterPercentage: 0,
      rightPath: null,
      leftPath: null,
      playing: false,
      preLoading: false,
      // torrent: null,
      player: null,
      videoOptions: {
        autoplay: false,
        controls: false,
        preload: "auto",
      },
    };
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.videoOptions, null);

    /*
     PReload Strategy:
     
     1 : Preload first chapter on initial loadig
     2 : preload next chapter when user select chapter
     3 : preload default chapter by default 
    
    */

    // 1- preload first chapter by initial loading

    this.preLeload(
      pathWay.initialPlaying.basePath + pathWay.initialPlaying.startFrom
    );

    this.currentChapter = pathWay.initialPlaying.startFrom;

    let self = this;
    this.player.on("timeupdate", function () {
      self.showPopup(this.currentTime(), this.duration());
    });
  },
  computed: {},
  methods: {
    showPopup(currentTime, duration) {
      // check if there is next chapter selector
      // var result = pathWay.chaptertLists.filter((obj) => {
      //   return obj.file === this.currentChapter;
      // });

      // if no next chapter load default chapter
      // if (this.nextChapter === null) {
      //   var result = pathWay.chaptertLists.filter((obj) => {
      //     return obj.file === this.currentChapter;
      //   });
      //   this.currentChapter = result[0].defaultPath;
      // } else {
      //   this.currentChapter = this.nextChapter;
      //   this.nextChapter = null;
      // }

      //load next chapter
      if (currentTime > duration - 0.5) {
        this.player.src({
          type: "video/mp4",
          src: this.nextChapterBlobURL,
        });

        this.preLoading = false;
        this.showOverlay = false;
        this.player.load();
        this.player.play();
      } else if (currentTime > duration - 10 && !this.preLoading) {
        this.preLeload(pathWay.initialPlaying.basePath + result[0].defaultPath);
      } else if (
        currentTime > duration - 13 &&
        result[0].nextPath &&
        !this.nextChapter
      ) {
        this.showOverlay = true;

        //right side
        this.rightPath = pathWay.chaptertLists.filter((obj) => {
          return obj.file === result[0].nextPath[1];
        })[0].title;

        //left side
        this.leftPath = pathWay.chaptertLists.filter((obj) => {
          return obj.file === result[0].nextPath[0];
        })[0].title;
      } else {
        this.showOverlay = false;
      }
    },
    playMe() {
      this.player.src({
        type: "video/mp4",
        src: this.nextChapterBlobURL,
      });
      this.player.play();
      this.playing = true;
    },
    stopMe() {
      this.player.pause();
      this.playing = false;
    },
    rightChoice() {
      this.nextChapter = pathWay.chaptertLists.filter((obj) => {
        return obj.title === this.rightPath;
      })[0].file;
      // 2 : preload next chapter when user select chapter
      this.preLeload(pathWay.initialPlaying.basePath + this.nextChapter);
      this.showOverlay = false;
    },
    leftChoice() {
      this.nextChapter = pathWay.chaptertLists.filter((obj) => {
        return obj.title === this.leftPath;
      })[0].file;

      // 2 : preload next chapter when user select chapter
      this.preLeload(pathWay.initialPlaying.basePath + this.nextChapter);

      this.showOverlay = false;
    },

    forward() {
      this.player.currentTime(this.player.currentTime() + 5);
    },
    backward() {
      this.player.currentTime(this.player.currentTime() - 5);
    },

    preLeload(url) {
      this.preLoading = true;
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "arraybuffer";

      const self = this;
      xhr.onload = function (oEvent) {
        var blob = new Blob([oEvent.target.response], {
          type: "video/mp4",
        });

        self.nextChapterBlobURL = URL.createObjectURL(blob);
        console.log(URL.createObjectURL(blob));
      };

      xhr.onprogress = function (oEvent) {
        if (oEvent.lengthComputable) {
          var percentComplete = oEvent.loaded / oEvent.total;
          console.log(percentComplete);
          self.nextChapterPercentage = percentComplete;
        }
      };
      xhr.send();
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

.video-overlay >div {
  display: flex;
}

.video-overlay .chapter:hover {
  background: #dfba017d;
}

.video-overlay .chapter {
  background-color: #dfba014f;
  cursor: pointer;
  margin: 0;
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
