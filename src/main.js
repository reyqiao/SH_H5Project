import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import IScrollView from 'vue-iscroll-view'
import IScroll from 'iscroll'
import { ToastPlugin, AlertPlugin } from 'vux'
import App from './App'
import store from './store'
import { routes } from './router'
import { limitBehavior } from './util/interaction'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueAwesomeSwiper)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(IScrollView, IScroll)

const router = new VueRouter({
  routes
})

const first = true

Vue.config.productionTip = false

limitBehavior()

/* eslint-disable no-new */
new Vue({
  router,
  store,
  data () {
    return {
      token: undefined,
      first
    }
  },
  render: h => h(App, {
    on: {
      login: (token) => {
        this.token = token
      },
      logout: () => {
        this.token = undefined
      }
    }
  })
}).$mount('#app')
