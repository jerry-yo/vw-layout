import ToastDom from './toast.vue'
import Vue from 'vue'

const ToastConstructor = Vue.extend(ToastDom)

ToastConstructor.prototype.close = function () {
  this.visible = false
  let _self = this
  this.$el.addEventListener('transitionend', () => {
    _self.$el.remove()
  })
}
const Toast = (options = {}) => {
  var instance = new ToastConstructor().$mount(document.createElement('div'))
  let duration = options.duration || 2.5
  instance.message = typeof options === 'string' ? options : options.message
  instance.position = options.position || 'middle'
  document.body.appendChild(instance.$el)
  Vue.nextTick(() => {
    instance.visible = true
    instance.timer = setTimeout(function () {
      instance.close()
    }, duration * 1000)
  })
  return instance
}

export default Toast
