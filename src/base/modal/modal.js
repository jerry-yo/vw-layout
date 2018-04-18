import Modal from './modal.vue'

import Vue from 'vue'

Modal.newInstance = properties => {
  const _props = properties || {}
  const Instance = new Vue({
    render (h) {
      return h(Modal, {
        props: _props
      })
    }
  })
  const component = Instance.$mount()
  document.body.appendChild(component.$el)
  const modal = Instance.$children[0]
  return {
    show (props) {
      modal.visible = true
      if ('title' in props) {
        modal.title = props.title
      }
      if ('content' in props) {
        modal.content = props.content
      }

      if ('onCancel' in props) {
        modal.cancel = props.onCancel
      }

      if ('onOk' in props) {
        modal.ok = props.onOk
      }
    },
    remove () {
      component.$el.remove()
    },
    component: modal
  }
}
export default Modal
