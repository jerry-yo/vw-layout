// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import Toast from '@/base/toast'
import Modal from '@/base/modal'

import '@/common/stylus/reast.css'
import '@/common/js/api'

FastClick.attach(document.body)

Vue.use(VueLazyLoad, {
  error: require('@/common/imgs/default.png'),
  loading: require('@/common/imgs/default.png')
})

Vue.config.productionTip = false

// 全局 控件
Vue.prototype.$Toast = Toast
Vue.prototype.$Modal = Modal

Vue.config.productionTip = false
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
