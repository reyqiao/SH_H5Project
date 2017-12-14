import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 游客模式
    IsVisitor: false,
    // 是否登陆
    IsLogin: false,
    // 通告
    Notice: '',
    // Banner
    TopBanner: '',
    // 跑马灯
    Marquee: [],
    // 老师列表
    teacherList: [],
    // 精彩视频列表
    liveVideoList: [],
    // 节目预告列表
    liveNoticeList: [],
    // 节目预告图片
    liveVideoTypeList: [],
    liveVideo: {
      typeId: 0,
      list: [],
      size: 5,
      page: 1,
      total: 0
    },
    liveNoticePic: '',
    // 显示控制
    show: {
      // 跑马灯
      marquee: true,
      // 加载
      loadding: false,
      // 表情栏
      emoji: false,
      // 登陆框
      login: false,
      // 关闭按钮
      close: true
    },
    // 用户信息
    userInfo: {},
    // 直播地址
    playLive: [],
    // 当前视频
    currentLive: {},
    // 聊天室消息
    chatMsgList: [],
    // 当前消息
    msgContent: '',
    showVideo: false
  },
  actions,
  getters,
  mutations
})
