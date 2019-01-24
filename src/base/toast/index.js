import ToastDom from './toast.vue'
import Vue from 'vue'

const ToastConstructor = Vue.extend(ToastDom)

ToastConstructor.prototype.close = function () {
  this.visible = false
  let _self = this
  console.log(this.$el)
  _self.$el.remove()
}
const Toast = (options = {}) => {
  var instance = new ToastConstructor().$mount(document.createElement('div'))
  let duration = options.duration || 1.5
  instance.message = typeof options === 'string' ? options : options.message
  instance.position = options.position || 'middle'
  let toastList = document.getElementsByClassName('toast-mask')
  if (toastList.length < 1) {
    document.body.appendChild(instance.$el)
  }
  Vue.nextTick(() => {
    instance.visible = true
    instance.timer = setTimeout(function () {
      clearTimeout(instance.timer)
      instance.close()
    }, duration * 1000)
  })
  return instance
}

export default Toast
