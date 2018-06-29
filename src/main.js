// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'
import store from './store'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import Toast from '@/base/toast'
import Modal from '@/base/modal'

import '@/common/stylus/reast.css'
import api from '@/common/js/api'

FastClick.attach(document.body)
Vue.use(Vueaxios, axios)
Vue.use(api)

Vue.use(VueLazyLoad, {
  error: require('@/common/imgs/default.png'),
  loading: require('@/common/imgs/default.png')
})

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://www.gt1.shop/'
// axios.defaults.baseURL = 'http://192.168.0.105:8080/gt/'
Vue.prototype.baseUrl = axios.defaults.baseURL

// 全局 控件
Vue.prototype.$Toast = Toast
Vue.prototype.$Modal = Modal
Vue.prototype.carLogoUrl = 'http://image.carzone.cn'
Vue.config.productionTip = false
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
