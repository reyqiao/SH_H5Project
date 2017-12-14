<template>
  <div class="chat-view scroll" ref="scroll" id="msg-scroll">
    <div class="msg-list" ref="list" id="list">
      <div class="item" v-for="item in ChatMsg" :key="item.Id" :class="showRole(item)">
        <div class="user-img">
          <div class="img-wrap">
            <img :src="`./static/img/role/flag${item.roleId}.png`" alt="">
          </div>
        </div>
        <div class="user-content-wrap">
          <div class="send">
            <div class="top">
               <template v-if="item.ext.mstype===8">
                  <div class="name gary-color">点击查看策略详情</div>
                  <router-link  :to="{path:'/advance',query: {tid: 54}}">
                         <a href="#" class="todetail" @click="showStrategy($event, item.name)">详情<span class="arrow">>></span></a>
                  </router-link>
               </template>
               <template v-else >
                <div class="name gary-color">{{item.Robotname || item.name}}</div>
                <div class="time gary-color">{{dateFormat(new Date(parseInt(item.addtime+'000', 10)), 'HH:mm:ss')}}</div>
               </template>
            </div>
            <div class="content">
              <template v-if="item.ext.mstype===1">
                <div v-html="faceToImg(item.attach)" :class="item.roleId == '5'?'admin': ''">{{faceToImg(item.attach)}}</div>
              </template>
              <!--喊单消息开始-->
              <template v-else-if="item.ext.mstype===8">
              <div class="chatmsg_cont jiancang" >
                <span class="dot"></span>
                <span class="text">{{item.attach}}</span>
              </div> 
            </template>
              <!--喊单消息结束-->
            <template v-else-if="item.ext.mstype===3||item.ext.mstype===7||item.ext.mstype===5||item.ext.mstype===6">
              <div class="chatmsg_msg f-l">
                  <img :style="{width:'auto',height:(item.ext.height/item.ext.width)*100 +'px'}" :src="item.attach">
              </div>
            </template>
              <template v-else>
                <lightbox album="" :src="item.ext.url" style="width:300px">
                  <img :style="{width:'100px',height:(item.ext.height/item.ext.width)*100 +'px'}" :src="item.attach">
                </lightbox>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { LoadMore, dateFormat } from 'vux'
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import { menu } from '../router'
  import Lightbox from 'vue-lightbox'
  import { faceToImg } from '../util/interaction'
  export default {
    name: 'Chat',
    data(){
      return {
        tid:'',
      }
    },
    computed: {
      ...mapGetters(['IsVisitor', 'Loadding', 'IsLogin', 'UserInfo', 'ChatMsg'])
    },
    methods: {
      ...mapActions(['getChatAddr', 'ykLogin', 'getYkInfoByToken', 'getUserInfoByToken', 'getChatHistoryMsg']),
      ...mapMutations(['setIsLogin']),
      faceToImg,
      dateFormat,
      showRole (item) {
        if (item.name === this.UserInfo.nickName) return 'isMine'
      }
    },
    mounted () {
      //console.log(this.msgcont.userId)
      this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight
    },
    updated () {
      /* eslint-disable no-new */
      this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight
    },
    watch: {
      ChatMsg () {
        this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight
      }
    },
    components: { LoadMore, Lightbox }
  }
</script>
<style lang="less">
  .chat-view {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    //background: rgb(44,47,53);
    .msg-list {
      margin: 10px 16px;
      min-height: 100px;
      padding-bottom: 32px;
      overflow: auto;
      margin-bottom: 90px;
      .item {
        &.isMine {
          overflow: hidden;
          .user-img {
            float: right!important;
          }
          .user-content-wrap {
            float: right;
            .send {
              background: rgb(86,141,238);
              border: none!important;
              margin-left: 0 !important;
              margin-right: 10px !important;
              color: #fff;
              &:after {
                background: rgb(86,141,238) !important;
                left: inherit!important;
                right: -4px!important;
                -webkit-transform: rotate(135deg);
                transform: rotate(135deg);
                border: none;
              }
              .top {
                .name {
                  margin-left: 0;
                  margin-right: 16px;
                }
              }
            }
          }
        }
        margin: 15px 0;
        clear: both;
        .user-img {
          display: inline-block;
          width: 40px;
          vertical-align: top;
          .img-wrap {
            width: 40px;
            img{
              width: 100%;
            }
          }
        }
        .user-content-wrap {
          display: inline-block;
          font-size: 14px;
          max-width: 85%;
          .send {
            position: relative;
            border: 1px solid #ebebeb;
            padding: 5px 10px;
            border-radius: 5px;
            margin-left: 10px;
            background-color: rgb(55,60,70);
            &:after {
              position: absolute;
              background-color: rgb(55,60,70);
              content: ' ';
              display: inline-block;
              width: 8px;
              height: 8px;
              -webkit-transform: rotate(-45deg);
              transform: rotate(-45deg);
              top: 15px;
              left: -5px;
              border-top: 1px solid #ebebeb;
              border-left: 1px solid #ebebeb;
            }
            .top {
              display: flex;
              justify-content: space-between;
              font-size: 12px;
              margin-bottom: 5px;
              height: 18px;
              line-height: 18px;
              color: #fff;
              .name {
                margin-right: 16px;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            .content {
              word-break: break-all;
              word-wrap: break-word;
              color:rgb(212,212,212);
              div {
                display: inline-block;
              }
              .admin {
                color: #fff;
                font-size: 16px;
               // background: rgb(248,136,27);
              }
              img {
                //width: 18px;
                height: 18px;
                position: relative;
                top: 3px;
              }
              .content-img {
                width: 100%;
                height: inherit;
              }
            }
          }
        }
      }
    }
  }
.send-box-wrap .item .enter-msg, .send-box-wrap .item input {
    color: #fff;
    border: 0.026667rem solid #ddd;
}
#msg-scroll + .bottom-box {
    display: block !important;
}
.send-box-wrap {
    min-height: 1.12rem;
    background: #2c2f35;
    padding: 0 0.266667rem;
    border-top: 0.026667rem solid rgba(221, 221, 221, 0.19);
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
}

</style>
