const load = path => r => require.ensure([], () => r(require(`../components/${path}.vue`)))
import about from '@/components/about'
import herald from '@/components/herald'
import server from '@/components/server'
import activity from '@/components/activity'
import home from '@/components/home'

export const menu = [{
  path: '/chat',
  name: '聊天空间',
  component: load('Chat')
}, {
  path: '/introduce',
  name: '名师风采',
  component: load('Introduce')
}, {
  path: '/advance',
  name: '即时策略',
  component: load('Advance')
}, {
  path: '/record',
  name: '精彩视频',
  component: load('Record')
}]

export const routes = [{
  path: '/',
  redirect: '/home'
}, {
  path: '/about',
  name: 'about',
  component: about
}, {
  path: '/herald',
  name: 'herald',
  component: herald
}, {
  path: '/server',
  name: 'server',
  component: server
}, {
  path: '/activity',
  name: 'activity',
  component: activity
}, {
  path: '/home',
  name: 'home',
  component: home,
  children: [
    {
      path: '/',
      redirect: '/Chat'
    }, ...menu]
}]
