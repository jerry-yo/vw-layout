import Modal from './modal.js'

let modalInstance

function getModalInstance () {
  modalInstance = modalInstance || Modal.newInstance()
  return modalInstance
}

function confirm (options) {
  let instance = getModalInstance()
  instance.show(options)
}

Modal.remove = function (props = {}) {
  const instance = getModalInstance()
  instance.remove()
  modalInstance = null
}
Modal.confirm = function (props = {}) {
  return confirm(props)
}

export default Modal
