import {
  SET_LIVE_VIDEO_TYPE,
  SET_LIVE_VIDEO_LIST,
  SET_LIVE_NOTICE_PIC
} from './mutationsType.js'
export default {
  // 基础数据
  setLiveMainData (state, payload) {
    if (payload && payload.code === '0') {
      state.IsVisitor = !!payload.IsVisitor
      state.Notice = payload.Notice
      state.TopBanner = payload.TopBanner
      state.Marquee = payload.Marquee
    }
  },
  // 精品课程栏目
  [SET_LIVE_VIDEO_TYPE] (state, payload) {
    state.liveVideoTypeList = payload || []
  },
  [SET_LIVE_VIDEO_LIST] (state, payload) {
    state.liveVideo = {
      ...state.liveVideo,
      ...payload
    }
  },
  // 节目预告
  setLiveNoticeDay (state, payload) {
    if (payload && payload.code === '0') {
      state.liveNoticeList = payload.list || []
    }
  },
  // 老师列表
  setLiveTeacherList (state, payload) {
    if (payload && payload.code === '0') {
      state.teacherList = payload.list || []
    }
  },
  // 节目预告图片
  [SET_LIVE_NOTICE_PIC] (state, payload) {
    state.liveNoticePic = payload
  },
  // 设置加载
  setLoadding (state, payload) {
    state.show.loadding = payload
  },
  // 设置登录状态
  setIsLogin (state, payload) {
    state.IsLogin = payload
  },
  // 设置用户信息
  setUserInfo (state, payload) {
    state.userInfo = Object.assign({}, state.userInfo, payload)
  },
  // 设置直播地址
  setPlayLive (state, payload) {
    state.playLive = Object.assign({}, payload)
  },
  // 设置当前视频
  setCurrentLive (state, payload) {
    state.currentLive = payload
  },
  addMsgs (state, payload) {
    const {
      custom
    } = payload
    const jsoncustom = JSON.parse(custom)
    state.chatMsgList.push(jsoncustom)
  },
  clearScreen (state) {
    state.chatMsgList = []
  },
  addMsgHistory (state, payload) {
    state.chatMsgList.push(payload)
  },
  addUpMsgHistory (state, payload) {
    state.chatMsgList = payload
  },
  clearMsgHistory (state) {
    state.chatMsgList = []
  },
  deleteMsg (state, payload) {
    const tmp = state.chatMsgList.filter(item => item.msgId !== payload)
    state.chatMsgList = tmp
  },
  showEmoji (state, payload) {
    state.show.emoji = payload
  },
  editMsgContent (state, payload) {
    state.msgContent = payload
  },
  setVideoShow (state, payload) {
    state.showVideo = payload
  },
  setLoginShow (state, payload) {
    console.log(123131)
    state.show.login = payload
  },
  setLoginClose (state, payload) {
    state.show.close = payload
  }
}
