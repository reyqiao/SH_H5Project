<template>
  <div class="bottom-box">
    <div class="send-box-wrap">
      <div class="item">
        <span class="icon face" @click="handleFaceClick"></span>
      </div>
      <div class="item">
        <div class="enter-msg" contenteditable id="txtMsg" v-html="MsgContent" placeholder="说说你的观点"></div>
      </div>
      <div class="item">
        <x-button mini @click.native="handleSendBtnClick" type="primary">发送</x-button>
      </div>
    </div>
    <div class="face-box-wrap" v-show="EmojiShow">
      <face-pannel></face-pannel>
    </div>
  </div>
</template>

<script>
  import { XButton } from 'vux'
  import FacePannel from './FacePannel'
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import { contentToSend } from '../util/interaction'
  export default {
    name: 'Edit',
    computed: {
      ...mapGetters(['EmojiShow', 'MsgContent', 'UserInfo'])
    },
    mounted () {
      this.showEmoji(false)
      this.msgDom = document.getElementById('txtMsg')
      this.msgDom.addEventListener('focus', () => {
        this.showEmoji(false)
      })
    },
    methods: {
      ...mapMutations(['showEmoji', 'editMsgContent']),
      ...mapActions(['sendMsg']),
      handleInput (e) {
        this.editMsgContent(e.target.innerHTML)
      },
      async handleSendBtnClick () {
        const content = contentToSend(this.msgDom.innerHTML)
        this.msgDom.innerHTML = ''
        this.editMsgContent('')
        this.showEmoji(false)
        const res = await this.sendMsg({
          usertoken: this.UserInfo.userToken,
          roomId: this.UserInfo.roomId,
          content
        })
        console.log(res)
        if (res.code !== 0) {
          this.$vux.toast.text(res.message || '发送失败')
        }
      },
      handleFaceClick () {
        this.showEmoji(!this.EmojiShow)
      }
    },
    components: { XButton, FacePannel }
  }
</script>

<style lang="less">
  .bottom-box {
    width: 100%;
    height: auto;
    min-height: 42px;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 22;
  }
  .weui-btn_primary {
      background-color: rgb(243,189,1) !important;
  }
  [contenteditable=true]:empty:before {
    content: attr(placeholder);
    display: block;
    color: #fff;
    height: 15px;
  }

  .send-box-wrap {
    min-height: 42px;
    background: rgb(44,47,53);
    padding: 0 10px;
    border-top: 0.026667rem solid rgba(221, 221, 221, 0.19);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .item {
      &:nth-child(2) {
        flex: 1 0 68%;
      }
      &:nth-child(3) {
        flex: 1 0 20%;
        text-align: center;
      }
      &:nth-child(1) {
        flex: 1 0 12%;
      }
      .enter-msg {
        word-break: break-all;
        line-height: 1em;
        font-size: 14px;
        &.hide-tip,
        &:focus {
          &:before {
            display: none;
          }
        }
        img {
          position: relative;
          width: 20px;
        }
      }
      .enter-msg,
      input {
        font-size: 14px;
        display: inline-block;
        width: 85%;
        border: 1px solid #ddd;
        padding: 7px 15px;
        margin: 5px 0;
        border-radius: 15px;
        text-align: left;
        &:focus {
          outline: none;
        }
      }
      &:nth-child(2),
      &:nth-child(3) {
        text-align: center;
        position: relative;
      }
      .face {
        background: url('../assets/img/c638127846e4e5bc068269770de457e2.png') no-repeat;
        width: 32px;
        height: 32px;
        background-size: cover;
        text-align: center;
        display: inline-block;
        align-items: center;
        margin-top: 2px;
      }
      button {
        height: 30px;
        margin: 0 auto;
        font-size: 12px;
        line-height: 30px;
        text-align: center;
      }
    }
  }
</style>
