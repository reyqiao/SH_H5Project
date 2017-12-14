import IScroll from 'iscroll'
const VIScroll = {
  install: function (Vue, options) {
    Vue.directive('iscroll', {
      inserted: function (el, binding, vnode, oldVnode) {
        var callBack
        var iscrollOptions = options
        var vtype = binding.value ? [].toString.call(binding.value) : undefined
        switch (vtype) {
          case '[object Function]':
            callBack = binding.value
            break
          case '[object Object]':
            iscrollOptions = binding.value
            break
          default:
            break
        }
        vnode.scroll = new IScroll(el, iscrollOptions)
        if (callBack) callBack(vnode.scroll)
      },
      componentUpdated: function (el, binding, vnode, oldVnode) {
        vnode.scroll = oldVnode.scroll
        vnode.scroll.refresh()
      },
      unbind: function (el, binding, vnode, oldVnode) {
        vnode.scroll = oldVnode.scroll
        vnode.scroll.destroy()
        vnode.scroll = null
      }
    })
  }
}
export default VIScroll
