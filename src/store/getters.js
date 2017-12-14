export default {
  // 获取公告
  Notice (state) {
    return state.Notice
  },
  // 登录状态
  IsLogin (state) {
    return state.IsLogin
  },
  // 获取加载
  Loadding (state) {
    return state.show.loadding
  },
  // 获取bannner
  Banner (state) {
    return state.TopBanner
  },
  // 游客模式
  IsVisitor (state) {
    return state.IsVisitor
  },
  // 跑马灯显示
  MarqueeSate (state) {
    return state.show.marquee
  },
  // 跑马灯数据
  Marquee (state) {
    return state.Marquee
  },
  // 老师列表
  LiveTeacherList (state) {
    return state.teacherList
  },
  // 节目预告
  LiveNoticeList (state) {
    return state.liveNoticeList
  },
  // 节目预告图片
  LiveNoticePic (state) {
    return state.liveNoticePic
  },
  // 用户信息
  UserInfo (state) {
    return state.userInfo
  },
  // 获取直播
  PlayLive (state) {
    return state.playLive
  },
   /**
   * 获取直播视频地址
   */
  VideoUrl (state) {
    return state.viedoStruct
  },
  // 全部精彩视频列表
  LiveVideoTypeList (state) {
    return state.liveVideoTypeList
  },
  // 精彩视频列表
  LiveVideoList (state) {
    return state.liveVideoList
  },
  // 直播列表
  LiveVideo (state) {
    return state.liveVideo
  },
  // 当前直播
  CurrentLive (state) {
    return state.currentLive
  },
  // 获取聊天消息
  ChatMsg (state) {
    return state.chatMsgList
  },
  // 表情栏
  EmojiShow (state) {
    return state.show.emoji
  },
  // 获取当前消息
  MsgContent (state) {
    return state.msgContent
  },
  showVideo (state) {
    return state.showVideo
  },
  showLogin (state) {
    return state.show.login
  },
  loginClose (state) {
    return state.show.close
  }
}
