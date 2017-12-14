import Vue from 'vue'
import {
  SET_LIVE_VIDEO_TYPE,
  SET_LIVE_VIDEO_LIST,
  SET_LIVE_NOTICE_PIC
} from './mutationsType.js'

const BEFORE = 'http://www.naniu88.com/api/BeforeApi.ashx'
const BASE = 'http://www.naniu88.com'

function get (url, arg) {
  return new Promise((resolve, reject) => {
    Vue.http.get(url, {
      params: arg
    }).then((res) => {
      resolve(res.data)
    }, reject)
  })
}

function post (url, arg) {
  return new Promise((resolve, reject) => {
    Vue.http.post(url, arg, {
      emulateJSON: true
    }).then((res) => {
      resolve(res.data)
    }, reject)
  })
}

export default {
  // 直播间数据
  async getLiveMainData ({ commit }) {
    const res = await get(BEFORE, { action: 'GetLiveMainData' })
    commit('setLiveMainData', res)
  },
  // 精品视频栏目
  async getLiveVideoType ({ commit }) {
    const res = await get(BEFORE, { action: 'GetLiveVideoType' })
    if (res.code === '0' || res.code === 0) {
      commit(SET_LIVE_VIDEO_TYPE, res.list)
      if (res.list.length > 0) {
        commit(SET_LIVE_VIDEO_LIST, {
          typeId: res.list[0].Id,
          page: 1,
          list: [],
          total: res.list[0].TotalCount
        })
      }
    }
  },
  initSelectedLiveVideoType ({ commit }, payload) {
    commit(SET_LIVE_VIDEO_LIST, {
      typeId: payload.Id,
      page: 1,
      list: [],
      total: payload.TotalCount
    })
  },
  // 精品视频列表
  async getLiveVideo ({ commit }, payload) {
    const res = await get(BEFORE, {
      ...payload,
      action: 'GetLiveVideo'
    })
    if (res.code === 0 || res.code === '0') {
      commit(SET_LIVE_VIDEO_LIST, {
        list: res.list,
        total: res.totalCount
      })
    }
  },
  // 老师列表
  async getLiveTeacherList ({ commit }) {
    const res = await get(BEFORE, { action: 'GetLiveTeacherList' })
    commit('setLiveTeacherList', res)
  },
  // 节目预告
  async getLiveNoticeDay ({ commit }) {
    const res = await get(BEFORE, { action: 'GetLiveNoticeDay' })
    commit('setLiveNoticeDay', res)
  },
  // 节目预告图片
  async getLiveNoticePic ({ commit }) {
    const res = await get(BEFORE, { action: 'GetLiveNoticePic' })
    if (res.code === 0 || res.code === '0') {
      commit(SET_LIVE_NOTICE_PIC, res.NoticePic)
    }
  },
  // 游客注册
  async ykLogin ({commit}, arg) {
    const res = await get(`${BASE}/user/api/userAnonymous/register`, arg)
    commit('setUserInfo', res.userInfo)
  },
  // 根据游客token获取游客信息
  async getYkInfoByToken ({commit}, arg) {
    const res = await get(`${BASE}/user/api/userAnonymous/getUserInfo`, arg)
    commit('setUserInfo', {...res.userInfo, userToken: arg.usertoken})
  },
  // 获取验证码
  async getVCode ({commit}, arg) {
    const res = await get(`${BASE}/user/api/sms/getverifycode`, arg)
    return res
  },
  // 用户注册
  async register ({commit}, arg) {
    const res = await get(`${BASE}/user/api/user/register`, arg)
    if (res.result === 1 || res.result === '1') {
      commit('setUserInfo', res.userInfo)
      commit('setIsLogin', true)
    }
    return res
  },
  // 用户登录
  async login ({commit}, arg) {
    const res = await post(`${BASE}/user/api/user/login`, arg)
    if (res.result === 1 || res.result === '1') {
      commit('setUserInfo', res.userInfo)
      commit('setIsLogin', true)
    }
    return res
  },
  async forgetPassword ({commit}, arg) {
    const res = await get(`${BASE}/user/api/user/resetPassword`, arg)
    return res
  },
  // 即时策略
  async advance ({commit}, arg) {
    const res = await get('http://www.naniu88.com//api/LiveMesMag.ashx?action=getcallorderlist', arg)
    return res
  },
  // 老师列表
  async teachers ({commit}, arg) {
    const res = await get('http://www.naniu88.com//api/LiveMesMag.ashx?action=getallteacherlist', arg)
    return res
  },
  // 根据登录token获取用户信息
  async getUserInfoByToken ({commit}, arg) {
    const res = await get(`${BASE}/user/api/user/getUserInfo`, arg)
    if (res.code === 0) commit('setUserInfo', {...res.userInfo, userToken: arg.usertoken})
  },
  // 获取直播间地址
  async getPlayLive ({commit}) {
    const res = await get(`${BASE}/video/VideoList/PlayLive`)
    if (res && res.code === 0) {
      commit('setPlayLive', res.data)
      commit('setCurrentLive', res.data[0])
    }
  },
  // 获取云信直播间地址
  async getChatAddr ({commit}, arg) {
    const { accToken, accId, im_addr, roomId } = await post(`${BASE}/chatroom/chartroom/RequestAddr`, { usertoken: arg })
    commit('setUserInfo', { accToken, accId, im_addr, roomId })
  },
  // 获取历史消息
  async getChatHistoryMsg ({commit}, payload) {
    const res = await post(`${BASE}/chatroom/chartroom/detail`, payload)
    if (res && res.code === 0 && payload.type === 'up') {
      commit('addUpMsgHistory', res.im_data)
    } else if (res && res.code === 0 && payload.type === 'down') {
      commit('addMsgHistory', res.im_data)
    } else {
      return false
    }
  },
  // 发送消息
  async sendMsg ({commit}, arg) {
    return post(`${BASE}/chatroom/chartroom/sendmsg`, arg)
  },
  /**
  * 添加登录登出日志
  */
  async userOperationLog ({commit}, payload) {
    return get(`${BASE}/user/api/user/userOperationLog`, payload)
  }
}
