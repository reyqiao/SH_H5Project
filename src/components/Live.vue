<template>
  <div class="video-container">
    <div class="video-wrap" v-if="IsLogin" v-show="showVideo">
      <video autoplay class="live-video video-js vjs-big-play-centered" id="live-video"  webkit-playsinline="true"></video>
    </div>
    <div class="video-mask" v-else  v-show="!showVideo">
      <img src="../assets/img/logo.png" />
    </div>
    <!-- <div class="c-big" @click="play()"></div> -->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'live',
  computed: {
    ...mapGetters(['PlayLive', 'showVideo', 'IsLogin']),
    player () {
      console.log(6666)
      if (this.IsLogin) {
        return window.videojs('live-video', { controls: true })
      }
      return undefined
    }
  },
  watch: {
    PlayLive (url) {
      this.initVideo(url)
    },
    IsLogin (newLogin) {
      if (newLogin) {
        console.log('成功登录，视频播放')
        this.$nextTick(() => {
          this.initVideo(this.PlayLive)
        })
      }
    }
  },
  methods: {
    ...mapMutations(['setVideoShow']),
    initVideo (url) {
      console.log(7777, this.player)
      if (this.player) {
        console.log(88888)
        this.player.pause()
        if (url[1]) {
          this.setVideoShow(false)
        } else {
          this.setVideoShow(true)
          if (url[0].type === 'record') {
            this.player.src({
              src: url[0].HLSUrl,
              type: `video/${url[0].HLSUrl.split('.').pop()}`
            })
          } else {
            this.player.src({
              src: url[0].HLSUrl,
              type: 'application/x-mpegURL'
            })
          }
        }
        this.player.load()
        this.player.play()
      }
    },
    // play:function () {
    //     var myVideo=document.getElementById("live-video");
    //     myVideo.play();
    // }
  }
}
</script>

<style lang="less">
.video-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 10;
  .video-mask {
    width: 100%;
    height: 100%;
    position: relative;
    text-align: center;
    background: #000;
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .video-wrap {
    background: #000;
    height: 100%;
    width: 100%;
    .live-video {
      width: 100%;
      background: #000;
      height: 100%;
    }
    video {
      height: 100%;
      width: 100%;
      display: block;
      position: absolute;
    }
  }
}
.vjs-big-play-centered .vjs-big-play-button {
    border-radius: 100%;
    margin-top: -1em;
    margin-left: -1em;
}
.video-js .vjs-big-play-button {
    line-height: 2em;
    height: 2em;
    width: 2em;
}
.video-js {
    height: 230px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0);
}
.video-container .video-mask {
    background: url(../assets/img/mask_bg.png) no-repeat center;
    background-size: cover;
}
.c-big{
          position:absolute;
          top:0;
          right:0;
          margin-top:165px;
          margin-right:15px;
          box-sizing:border-box;
          width:30px;
          height:30px;
          z-index: 11;
          background:url(../assets/img/fullscreen@2x.png);
          background-size:cover;
        }
</style>
