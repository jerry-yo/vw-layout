/**
 * Created by long on 2017/7/5.
 */
import Vue from 'vue'
import axios from 'axios'
import store from '../../store'

// F6 接口使用 headersOther , 本地接口用headersCommon
Vue.prototype.headers_1 = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8;'
}
Vue.prototype.headers_2 = {
  'Authorization': store.getters.userInfo.token
}
Vue.prototype.headers_3 = {
  'Authorization': store.getters.userInfo.token,
  'Content-Type': 'application/json'
}

Vue.prototype.handleRrror = function (error) {
  if (error.response) {
    switch (error.response.code) {
      case 401:
        console.log('token 过期')
        break
      case 405:
        console.log('接口请求方法不支持')
        break
      case 404:
        console.log('请求的接口不存在')
        break
      case 500:
        console.log('接口异常')
        break
    }
  }
}

Vue.prototype.$get = function (url, headersCode, callback = function () {}, params = {}) {
  var _self = this
  axios.get(url, {
    headers: headersCode,
    params: params
  }).then((response) => {
    callback(response.data)
  }).catch(function (error) {
    _self.handleRrror(error)
  })
}

Vue.prototype.$post = function (url, headersCode, callback = function () {}, params = {}) {
  var _self = this
  axios({
    url: url,
    method: 'post',
    data: params,
    headers: headersCode,
    transformRequest: [function (data) {
      // Do whatever you want to transform the data
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  }).then((response) => {
    callback(response.data)
  }).catch(function (error) {
    _self.handleRrror(error)
  })
}

Vue.prototype.$f6post = function (url, headersCode, callback = function () {}, params = {}) {
  var _self = this
  axios({
    url: url,
    method: 'post',
    data: params,
    headers: headersCode
  }).then((response) => {
    callback(response.data)
  }).catch(function (error) {
    _self.handleRrror(error)
  })
}

Vue.prototype.$put = function (url, headersCode, callback = function () {}, params = {}) {
  var _self = this
  axios.put(url, params, {
    headers: headersCode
  }).then((response) => {
    callback(response.data)
  }).catch(function (error) {
    _self.handleRrror(error)
  })
}

Vue.prototype.$patch = function (url, headersCode, callback = function () {}, params = {}) {
  var _self = this
  axios.patch(url, params, {
    headers: headersCode
  }).then((response) => {
    callback(response.data)
  }).catch(function (error) {
    _self.handleRrror(error)
  })
}

Vue.prototype.$delete = function (url, headersCode, callback = function () {}, params = {}) {
  var _self = this
  axios.delete(url, {
    headers: headersCode,
    data: params
  }).then((response) => {
    callback(response.data)
  }).catch(function (error) {
    _self.handleRrror(error)
  })
}

Vue.prototype.$file = function (url, fromData, callback = function () {}, params = {}) {
  let _self = this
  axios({
    url: url,
    method: 'post',
    data: fromData
  }).then((response) => {
    callback(response.data)
  }).catch(function (error) {
    _self.handleRrror(error)
  })
}
