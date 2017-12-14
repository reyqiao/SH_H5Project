<template>
  <div id="testone">
    
    <loading v-model="Loadding"></loading>
    <login @login="token => $emit('login', token)" @logout="() => $emit('logout')"></login>
    <div class="wrapper">
      <div class="top-video-wrap">
        <!-- <live></live> -->
        <div class="video-container">
          <div class="video-wrap" v-if="IsLogin" v-show="showVideo">
            <video autoplay class="live-video video-js vjs-big-play-centered" id="live-video"  webkit-playsinline="true"></video>
          </div>
          <div class="video-mask" v-else  v-show="showVideo">
            <img src="../assets/img/logo.png" />
          </div>
          <!-- <div class="c-big" @click="play()"></div> -->
        </div>
				/*视频上导航*/
				<div class="nav-list" >
          <div class="nav-click" @click="toggle()"></div>
					<ul v-show="listShow">
						<!-- <li v-for="(tmp,index) in showList" :key="index">{{tmp}}<i></i></li> -->
            <li><a href="#/about">关于我们</a></li>
            <li><a href="#/herald">直播预告</a></li>
            <li><a href="#/server">服务体系</a></li>
            <li><a href="#/activity">最新活动</a></li>
            <b></b>
					</ul>
				</div>
        <!-- <div class="c-big" @click="play()"></div> -->
      </div>
      <div class="menu-wrap">
        <tab>
          <tab-item class="vux-center" :selected="item.path === $route.path" v-for="(item, index) in menu" :key="index">
            <router-link :to="item.path" class="nav">{{item.name}}</router-link>
          </tab-item>
        </tab>
      </div>
      <div class="content-wrap">
        <router-view></router-view>
        <Edit v-show="edit" />
      </div>
    </div>
  </div>
</template>



<script>
// require('./assets/video.min.js')
// require('./assets/video-hls-comb.js')
// require('./assets/videojs-contrib-hls.min.js')
  import { cookie, Tab, TabItem, Loading } from 'vux'
  import { menu } from '../router'
  import { Live, Login, Edit } from './'
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import * as IMHelper from '../util/IMHelper'
  // Vue.component('Chat', require('./Chat.vue')); 
  export default {
    name: 'home',
    data () {
      return {
        menu,
        selected: '',
        timeid: '',
        showLoginTime: 3 * 60 * 1000,
        showList:["关于我们","直播预告","服务体系","最新活动"],
        listShow:false
      }
    },
    computed: {
      ...mapGetters(['IsVisitor', 'Loadding', 'IsLogin', 'UserInfo', 'ChatMsg','PlayLive', 'showVideo']),
      edit () {
        return this.$route.path === '/chat'
      },
      player () {
        console.log(6666)
        console.log(this.IsLogin)
        if (this.IsLogin) {
          return window.videojs('live-video', { controls: true })  //有关
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
      ...mapActions([
      "getLiveMainData",
      "getPlayLive",
      "getChatAddr",
      "ykLogin",
      "getYkInfoByToken",
      "getUserInfoByToken",
      "getChatHistoryMsg"
    ]),
    ...mapMutations(["setLoadding", "setIsLogin", "setLoginShow", 'setVideoShow']),
    
    


      toggle:function () {
           this. listShow=!this. listShow
      },
      initVideo (url) {
        console.log(7777, this.player)
        
        if (this.player) {
          console.log(88888)
          console.log(url[1])
          console.log(url[0])
          this.player.pause()
          if (url[1]) {
            this.setVideoShow(false)
            console.log(999999)
          } else {
            this.setVideoShow(true)
            if (url[0].type === 'record') {
              console.log("han1111")  //初始未执行
              this.player.src({
                src: url[0].HLSUrl,
                type: `video/${url[0].HLSUrl.split('.').pop()}`
              })
            } else {
              console.log("han2222")
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
      
    },
    components: { Tab, TabItem, Live, Loading, Login, Edit },
    async mounted () {
      // // 获取直播间设置
       //this.setLoginShow(true)
        await this.getLiveMainData()
        await this.getPlayLive(this.PlayLive)
      // //await this.init()
      
      //console.log(this.IsLogin)
      
    },
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    background-color: #fbf9fe;
    width: 100%;
    height: 100%;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-appearance: none;
    outline: none;
  }

  #testone {
    width: 100%;
    height: 100%;
    position: relative;
   // overflow: hidden;
    .wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      overflow: hidden;
      position: relative;
      .top-video-wrap {
        height: 210px;
        width: 100%;
        overflow: hidden;
        background: #000;
        /*更改部分*/
        position: relative;
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
        .nav-click{
          position: absolute;
          top: 0;
          right: 0;
          width: 30px;
          height: 30px;
          background: url(../assets/img/menu@2x.png);
          background-size: cover;
          z-index: 1999999999992;
        }
        .nav-list{
          position: absolute;
          top: 0;
          right: 0;
          // margin-top: 165px;
          // margin-right: 65px;
          margin-top: 4.0rem;
          margin-right: 1.233333rem;
          width: 30px;
          height: 30px;
         // background: url(./assets/img/menu@2x.png);
          background-size: cover;
          z-index: 11;
          ul{
            position: absolute;
            top: 0;
            right: 0;
            width: 92px;
            height: 129px;
            background: #fff;
            margin-top: -145px;
            margin-right: -30px;
            border-radius: 5px;
            text-align: center;
            li:nth-child(4){
              border-bottom: 0;
            }
            li{
              width: 100%;
              height: 32.5px;
              line-height: 32.5px;
              border-bottom: 1px solid #e7e7e7;
              i{
                background:url(../assets/img/guidance_arrows@2x.png);
                margin-top: 12px;
                margin-right: 10px;
                display: block;
                float: right;
                width: 5.5px;
                height: 9px;
                background-size: cover;
              }
              a{
                color: #000;
              }
            }
            b{
              display:block;
              width:100%;
              height:13.5px;
              background:url(../assets/img/live_control_arrows@2x.png) no-repeat center center;
              transform:rotate(90deg);
              margin-top:-5px;
            }
          }
        }
      }
      .menu-wrap {
        width: 100%;
        height: 45px;
      }
      .content-wrap {
        width: 100%;
        flex: 1;
        position: relative;
        overflow: hidden;
      }
    }
    .nav {
      width: 100%;
      height: 100%;
      display: inline-block;
      text-decoration: none;
    }
    .vux-tab{
      background-color: rgb(31,34,39);
    }
    .nav{ color: #fff !important;}
    .vux-tab-ink-bar{
      background-color: #fff;
    }
  }

//视频直播
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


