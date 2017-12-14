<template>
  <div class="login-tip">
    <div v-if="!IsLogin" class="user-info">
      <div class="index_logo"><img src="../assets/img/index_logo.png" alt="汇交易"></div>
      <x-button mini class="yuanze" type="primary" @click.native="showLoginPanel">登录</x-button>
      <!-- <x-button mini class="bg-blue" @click.native="showRegisterPanel">注册</x-button> -->
    </div>
    <div v-else class="user-info">
      <div class="index_logo"><img src="../assets/img/index_logo.png" alt="汇交易"></div>
      <x-button class="mr-10 yuanze"  mini type="primary">{{UserInfo.nickName}}</x-button>
      <x-button mini class="bg-blue" @click.native="signout">退出</x-button>
    </div>
    <div class="dialog">
      <x-dialog v-model="showLogin" class="login-panel">
        <div class="banner">
            <i @click="toggle()"></i>
            <div class="banner_con">
              <p>登录汇交易</p>
              <span>专注交易者实战教育</span>
            </div>
        </div>
        <div class="dialog-panel login hyz_box">
          
          <!--<div class="dialog-header">
            <span class="title">用户登录</span>
             <span class="close-btn" @click="setLoginShow(false)" v-show="loginClose">X</span>
          </div> -->
          <div class="dialog-body">
            <div class="content">
              <x-input placeholder="输入手机号" v-model="loginModel.mobile">
                <img slot="label" style="padding-right:10px;display:block;" src="../assets/img/phone.png" width="24" height="24">
              </x-input>
              <x-input placeholder="输入密码" type="password" v-model="loginModel.password" class="border-b">
                <img slot="label" style="padding-right:10px;display:block;" src="../assets/img/password.png" width="24" height="24">
              </x-input>
              <div class="tip">
                <!-- <a href="javascript: void 0;" class="f-left" @click="showRegisterPanel">注册</a> -->
                <a href="javascript: void 0;" class="f-right" @click="showForgetPanel">忘记密码</a>
              </div>
            </div>
            <x-button type="primary" class="blue" @click.native="userLogin">登录</x-button>
          </div>
        </div>
      </x-dialog>
      <x-dialog v-model="showRegister">
        <div class="dialog-panel register">
          <div class="dialog-header">
            <span class="title">用户注册</span>
            <span class="close-btn" @click="showRegister = false">X</span>
          </div>
          <div class="dialog-body">
            <div class="content">
              <x-input placeholder="手机号" v-model="registerModel.mobile">
                <img slot="label" style="padding-right:10px;display:block;" src="../assets/img/phone.png" width="24" height="24">
              </x-input>
              <x-input placeholder="验证码" v-model="registerModel.code">
                <img slot="label" style="padding-right:10px;display:block;" src="../assets/img/verifycode.png" width="24" height="24">
                <x-button slot="right" mini type="primary" @click.native="getVerifyCode">{{vcodetxt}}</x-button>
              </x-input>
              <x-input placeholder="密码" type="password" v-model="registerModel.password">
                <img slot="label" style="padding-right:10px;display:block;" src="../assets/img/password.png" width="24" height="24">
              </x-input>
              <x-input placeholder="昵称" v-model="registerModel.nickName" class="border-b">
                <img slot="label" style="padding-right:10px;display:block;" src="../assets/img/nickname.png" width="24" height="24">
              </x-input>
              <div class="tip">
                <a href="javascript: void 0;" class="f-left" @click="showLoginPanel">账号登录</a>
              </div>
            </div>
            <x-button type="primary" @click.native="userRegister" class="bg-blue">注册</x-button>
          </div>
        </div>
      </x-dialog>
      <x-dialog v-model="showForget">
        <div class="banner">
            <i @click="showLoginPanel"></i>
            <div class="banner_con">
              <p>找回密码</p>
              <span>汇交易·专注交易者实战教育</span>
            </div>
        </div>
        <div class="dialog-panel forget hyz_box">
          <!--<div class="dialog-header">
            <span class="title">找回密码</span>
             <span class="close-btn" @click="showForget = false">X</span> 
          </div>-->
          <div class="dialog-body">
            <div class="content">
              <x-input placeholder="手机号" v-model="forgetModel.mobile">
                <img slot="label" style="padding-right:10px;display:block;" src="../assets/img/phone.png" width="24" height="24">
              </x-input>
              <x-input placeholder="短信验证码" v-model="forgetModel.code">
                <img slot="label" style="padding-right:10px;display:block;" src="../assets/img/verifycode.png" width="24" height="24">
                <x-button slot="right" class="write" mini type="primary" @click.native="getForgetVerifyCode">{{fvcodetxt}}</x-button>
              </x-input>
              <x-input placeholder="输入新密码" type="password" v-model="forgetModel.password" class="border-b">
                <img slot="label" style="padding-right:10px;display:block;" src="../assets/img/password.png" width="24" height="24">
              </x-input>
              <div class="tip">
                <!-- <a href="javascript: void 0;" class="f-left" @click="showRegisterPanel">注册</a> -->
                <a href="javascript: void 0;" class="f-right" @click="showLoginPanel">帐号登录</a>
              </div>
            </div>
            <x-button type="primary" @click.native="userForget" class="bg-blue blue">确认找回</x-button>
          </div>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import { XButton, XDialog, Group, XInput, cookie } from 'vux'
  import crypto from '../util/CryptoHelper.js'
  export default {
    name: 'login',
    components: {
      XButton,
      XDialog,
      Group,
      XInput
    },
    data () {
      return {
        showRegister: false,
        showForget: false,
        vcodetxt: '获取验证码',
        fvcodetxt: '获取验证码',
        loginModel: {
          mobile: '',
          password: ''
        },
        registerModel: {
          mobile: '',
          code: '',
          password: '',
          nickName: ''
        },
        forgetModel: {
          channelId: '1',
          mobile: '',
          code: '',
          password: ''
        },
      }
    },
    watch: {
      showLogin() {
        console.log(999999)
      }
    },
    computed: {
      ...mapGetters(['IsLogin', 'UserInfo', 'showLogin', 'loginClose'])
    },
    methods: {
       toggle:function () {
                window.history.go(-1)
            },
      ...mapMutations(['setIsLogin', 'setLoginShow']),
      ...mapActions([
        'login',
        'getVCode',
        'register',
        'forgetPassword',
        'getUserInfoByToken',
        'getYkInfoByToken',
        'userOperationLog'
      ]),
      showLoginPanel () {
        this.showRegister = false
        this.showForget = false
        this.setLoginShow(true)
      },
      showRegisterPanel () {
        this.setLoginShow(false)
        this.showForget = false
        this.showRegister = true
      },
      showForgetPanel () {
        this.setLoginShow(false)
        this.showRegister = false
        this.showForget = true
      },
      signout () {
        this.userOperationLog({
          usertoken: this.$root.token,
          operateType: 2, // 1:登录,2:登出
          source: 2 // 1：web,2:h5
        })
        this.$emit('logout')
        this.setIsLogin(false)
        this.getYkInfoByToken({ usertoken: cookie.get('yk-token'), userid: 0 })
      },
      userLogin () {
        this.login(this.loginModel).then((res) => {
          if (res.result === 1 || res.result === '1') {
             cookie.set('token', res.userInfo.userToken)
            // 删除初始时间
            cookie.remove('time')

            this.$emit('login', res.userInfo.userToken)
            this.getUserInfoByToken({ usertoken: res.userInfo.userToken, userid: 0 })
            this.setLoginShow(false)
          } else {
            this.$vux.alert.show({
              title: '登录失败',
              content: res.message
            })
          }
          return res
        }).then((res) => {
          if (res.result === 1 || res.result === '1') {
            this.userOperationLog({
              usertoken: res.userInfo.userToken,
              operateType: 1, // 1:登录,2:登出
              source: 2 // 1：web,2:h5
            })
          }
        })
      },
      getVerifyCode () {
        let time = 59
        if (this.vcodetxt !== '获取验证码') {
          return false
        }
        if (!/^1[34578]\d{9}$/.test(this.registerModel.mobile)) {
          this.$vux.alert.show({
            title: '手机号验证失败',
            content: '请输入正确的手机号'
          })
          return false
        }
        this.vcodetxt = `60s`
        const djs = setInterval(() => {
          if (time === 0) {
            this.vcodetxt = '获取验证码'
            clearInterval(djs)
          } else {
            this.vcodetxt = `${time}s`
            time--
          }
        }, 1000)

        let regmsg = {}
        regmsg.mobile = this.registerModel.mobile
        regmsg.smsType = 21

        this.getVCode({
          mobileParam: crypto.encode(JSON.stringify(regmsg)),
          sign: crypto.md5(JSON.stringify(regmsg))
        }).then((res) => {
          if (+res.result !== 1) {
            this.$vux.alert.show({
              title: '获取验证码失败',
              content: res.message
            })
          }
        }).catch((err) => {
          console.log(err, '验证码发送错误')
        })
      },
      userRegister () {
        this.register(this.registerModel).then((res) => {
          if (res.result === 1 || res.result === '1') {
            this.$vux.alert.show({
              content: '注册成功'
            })
          } else {
            this.$vux.alert.show({
              title: '注册失败',
              content: res.message
            })
          }
        })
      },
      getForgetVerifyCode () {
        let time = 59
        if (this.fvcodetxt !== '获取验证码') {
          return false
        }
        if (!/^1[34578]\d{9}$/.test(this.forgetModel.mobile)) {
          this.$vux.alert.show({
            title: '手机号验证失败',
            content: '请输入正确的手机号'
          })
          return false
        }
        this.fvcodetxt = `60s`
        const djs = setInterval(() => {
          if (time === 0) {
            this.fvcodetxt = '获取验证码'
            clearInterval(djs)
          } else {
            this.fvcodetxt = `${time}s`
            time--
          }
        }, 1000)

        let forgetmsg = {}
        forgetmsg.mobile = this.forgetModel.mobile
        forgetmsg.smsType = 22

        this.getVCode({
          mobileParam: crypto.encode(JSON.stringify(forgetmsg)),
          sign: crypto.md5(JSON.stringify(forgetmsg))
        }).then((res) => {
          if (+res.result !== 1) {
            this.$vux.alert.show({
              title: '获取验证码失败',
              content: res.message
            })
          }
        }).catch((err) => {
          console.log(err, '验证码发送错误')
        })
      },
      userForget () {
        this.forgetPassword(this.forgetModel).then((res) => {
          if (res.result === 1 || res.result === '1') {
            this.$vux.alert.show({
              content: '重置密码成功！',
              onHide () {
                this.showLoginPanel()
              }
            })
          } else {
            this.$vux.alert.show({
              title: '重置密码失败',
              content: res.message
            })
          }
        })
      }
    }
  }
</script>
<style lang="less">
  .index_logo{
    width: 169px;
    height: 22px;
    margin-top:14px;
    overflow: hidden; 
    position: absolute;
    left: 3px;
  }
  .index_logo>img{
    width: 100%;
    height: 100%;
  }
  .login-tip {
   // position: absolute;
    z-index: 999;
    width: 100%;
    color: #fff;
    line-height: 1;
    text-align: right;
    background: #fff;
   // margin: 9px 0;
    height: 50px;
    .user-info {
      .weui-btn {
       // margin: 0;
       // line-height: 1.5;
        padding: 0;
        &:last-child {
          margin-right: 5px;
          height: 32px;
          width: 77px;
          border-radius: 1.266667rem;
          line-height: 32px;
          //margin-top: 9px;
        }
      }
    }
    .dialog {
      .login-panel {
        .weui-dialog{
          top: 150px;
        }
      }
      .weui-dialog {
        width: 300px;
      }
      .dialog-panel {
        width: 300px;
        color: #000;
        .dialog-header {
          padding-top: 15px;
          .close-btn {
            position: absolute;
            right: 5px;
            color: #aaa;
            width: 20px;
            height: 20px;
            text-align: center;
          }
        }
        .dialog-body {
          padding: 10px;
          .content {
            margin-bottom: 20px;
            .border-b::after {
              content: " ";
              position: absolute;
              left: 0;
              bottom: 0;
              right: 0;
              height: 1px;
              border-top: 1px solid #D9D9D9;
              color: #D9D9D9;
              -webkit-transform-origin: 0 0;
              transform-origin: 0 0;
              -webkit-transform: scaleY(0.5);
              transform: scaleY(0.5);
              left: 15px;
            }
            .tip {
              a {
                color: #458cf5 ;
              }
              .f-left {
                margin: 10px 0;
                float: left;
                margin-left: 20px;
              }
              .f-right {
                margin: 10px 0;
                float: right;
              }
            }
          }
        }
      }
    }
    .weui-input{font-size: 18px}
    .yuanze{ 
      background: rgb(248,136,27) !important;
      height: 32px;
      width: 77px;
      border-radius: 1.266667rem;
      line-height: 32px;
      margin-top: 9px !important;
    }
    .weui-btn.bg-blue {
      background: rgb(248,136,27);
      color: #fff;
    }
    .mr-10 {
      margin-left: 10px;
    }
    .weui-dialog {
      height: 100%;
      width: 100% !important;
      top: 50% !important;
      max-width: 750px;
      max-height: none;
      margin: 0;
   }
    .banner{
      width: 100%;
      min-height: 130px;
      background:rgb(105,172,249) !important;
      text-align: center;
    }
    .banner .banner_con{
      width: 100%;
      height: auto;
      padding-top: 30px;
    }
    .banner i{
      width: 19px;
      height: 32px;
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      margin-top:15px;
      margin-left:15px; 
      background-image: url(../assets/img/banner_pro.png);
      background-repeat: no-repeat;
      background-size:contain;
      transform:rotate(180deg);
      -ms-transform:rotate(180deg); /* IE 9 */
      -moz-transform:rotate(180deg); /* Firefox */
      -webkit-transform:rotate(180deg); /* Safari and Chrome */
      -o-transform:rotate(180deg); /* Opera */
          }
     .banner .banner_con p{
      font-size: 19px;
      color: rgb(254,254,255);
      line-height: 30px;
    }
     .banner .banner_con span{
      font-size: 13px;
      color: rgb(254,254,255);
      line-height: 20px;
    }
    .hyz_box {
      margin: 0 auto;
      margin-top: 50px;
    }
    .weui-cell__hd img {
        width: 100%;
        height: 100%;
    }
    .vux-x-input.weui-cell {
        height: 62.5px;
        width: 100%;
        margin: 0;
        padding: 0;
        line-height: 62.5px;
    }
    .f-right{
          float: left !important;
        font-size: 16px !important;
        margin: 15px 0 40px 0 !important;
    }
    input#vux-x-input-o0g0v,input#vux-x-input-luwt6,input#vux-x-input-wg5os,input#vux-x-input-gn63d,input#vux-x-input-632od {
        margin: 0 !important;
        padding: 0;
        height: 100%;

    }
    .weui-dialog .banner i{
      width: 19px;
      height: 32px;
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      margin-top:15px;
      margin-left:15px; 
      background-image: url(../assets/img/banner_pro.png);
      background-repeat: no-repeat;
      background-size:contain;
      transform:rotate(180deg);
      -ms-transform:rotate(180deg); /* IE 9 */
      -moz-transform:rotate(180deg); /* Firefox */
      -webkit-transform:rotate(180deg); /* Safari and Chrome */
      -o-transform:rotate(180deg); /* Opera */
    }
    button.blue{
      background: #26a2ff !important;
    }
    button.write{
      background:#fff !important;
      color: #26a2ff !important;
    }
  }
  .login-tip .user-info .weui-btn:last-child {
    margin-top: 9px !important;
}
</style>
