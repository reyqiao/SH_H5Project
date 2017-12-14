<template>
  <div id="app">
        <router-view></router-view>
  </div>
</template>
<script>
import { cookie, Tab, TabItem, Loading } from "vux";
import { menu } from "./router";
import { Live, Login, Edit } from "./components";
import { mapActions, mapGetters, mapMutations } from "vuex";
import * as IMHelper from "./util/IMHelper";
export default {
  name: "app",
  data() {
    return {
      menu,
      selected: "",
      timeid: "",
      showLoginTime: 3 * 60 * 1000,
      showList: ["关于我们", "直播预告", "服务体系", "最新活动"],
      listShow: false
    };
  },
  computed: {
    ...mapGetters(["IsVisitor", "Loadding", "IsLogin", "UserInfo", "ChatMsg"]),
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
    ...mapMutations(["setLoadding", "setIsLogin", "setLoginShow"]),

    async chatInit() {
      await this.getChatAddr(this.UserInfo.userToken);
      await this.getChatHistoryMsg({
        direction: "-1",
        order: "1",
        id: "0",
        usertoken: this.UserInfo.userToken,
        roomid: this.UserInfo.roomId,
        type: "up"
      });
      IMHelper.getInstance({
        account: this.UserInfo.accId,
        token: this.UserInfo.accToken,
        chatroomId: this.UserInfo.roomId,
        chatroomAddresses: this.UserInfo.im_addr,
        onconnect: chatroom => {
          console.log("进入聊天室", chatroom);
        },
        onerror: (err, obj) => {
          console.log("发生错误", err, obj);
        },
        onwillreconnect: obj => {
          console.log("即将重连", obj);
        },
        ondisconnect: err => {
          console.log("连接断开", err);
        },
        onmsgs: msg => {
          this.handleOnmsgs(msg);
        }
      });
    },
    handleOnmsgs(msgs) {
      const msg = msgs[0];
      if (!msg.custom) return false;
      console.log(msg);
      const custom = JSON.parse(msg.custom);
      if (custom.ext.mstype === 10) {
        this.$store.dispatch("getPlayLive").then(() => {
          console.log("直播结束 播放录播！");
        });
        return false;
      }
      if (custom.ext.mstype === 9) {
        this.$store.dispatch("getPlayLive").then(() => {
          console.log("直播开始！");
        });
        return false;
      }
      //  显示自己的消息 只显示未审核
      if (this.UserInfo.nickName === msg.fromNick && custom.isAudit === 0) {
        this.$store.commit("addMsgs", msg);
        return false;
      }
      // 机器人
      if (custom.isRobot !== 0) {
        this.$store.commit("addMsgs", msg);
        return false;
      }
      // 管理员显示全部消息 只显示未审核
      if (this.UserInfo.roleId >= 5) {
        if (
          this.UserInfo.nickName === msg.fromNick ||
          custom.isAudit === 0 ||
          custom.roleId >= 5
        ) {
          this.$store.commit("addMsgs", msg);
          return false;
        }
      } else {
        if (this.UserInfo.nickName !== msg.fromNick && custom.isAudit === 1) {
          this.$store.commit("addMsgs", msg);
          return false;
        }
      }
    }
  },
  components: { Tab, TabItem, Live, Loading, Login, Edit },
  async mounted() {
    // 获取直播间设置
    this.setLoginShow(true);   //登录前检测状态
    await this.getLiveMainData();
    await this.getPlayLive();
    //await this.init();
  },
  watch: {
    UserInfo(newVal, oldVal) {
      if (newVal.userToken !== oldVal.userToken) {
        this.chatInit();
      }
    },
    // IsLogin (newVal) {
    //   if (!newVal) {
    //     this.setLoginShow(true)
    //     // let initTime = cookie.get('time')
    //     // if (!initTime) {
    //     //   initTime = (new Date()).getTime()
    //     //   cookie.set('time', initTime)
    //     // }
    //     // const duration = (new Date()).getTime() - initTime
    //     // if (duration > this.showLoginTime) {
    //     //   this.setLoginShow(true)
    //     // } else {
    //     //   this.timeid = setTimeout(() => {
    //     //     this.setLoginShow(true)
    //     //   }, this.showLoginTime - duration)
    //     // }
    //   }
    // }
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
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

#app {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
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
      .c-big {
        position: absolute;
        top: 0;
        right: 0;
        margin-top: 165px;
        margin-right: 15px;
        box-sizing: border-box;
        width: 30px;
        height: 30px;
        z-index: 11;
        background: url(./assets/img/fullscreen@2x.png);
        background-size: cover;
      }
      .nav-click {
        position: absolute;
        top: 0;
        right: 0;
        width: 30px;
        height: 30px;
        background: url(./assets/img/menu@2x.png);
        background-size: cover;
        z-index: 12;
      }
      .nav-list {
        position: absolute;
        top: 0;
        right: 0;
        margin-top: 165px;
        margin-right: 65px;
        width: 30px;
        height: 30px;
        // background: url(./assets/img/menu@2x.png);
        background-size: cover;
        z-index: 11;
        ul {
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
          li:nth-child(4) {
            border-bottom: 0;
          }
          li {
            width: 100%;
            height: 32.5px;
            line-height: 32.5px;
            border-bottom: 1px solid #e7e7e7;
            i {
              background: url(./assets/img/guidance_arrows@2x.png);
              margin-top: 12px;
              margin-right: 10px;
              display: block;
              float: right;
              width: 5.5px;
              height: 9px;
              background-size: cover;
            }
          }
          b {
            display: block;
            width: 100%;
            height: 13.5px;
            background: url(./assets/img/live_control_arrows@2x.png) no-repeat
              center center;
            transform: rotate(90deg);
            margin-top: -5px;
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
  .vux-tab {
    background-color: rgb(31, 34, 39);
  }
  .nav {
    color: #fff !important;
  }
  .vux-tab-ink-bar {
    background-color: #fff;
  }
}
</style>
