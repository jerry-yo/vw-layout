/**
 * Created by long on 2017/7/5.
 */
exports.install = function (Vue) {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8;'
  }
  Vue.prototype.handle_error = function (error) {
    if (error.response) {
      switch (error.response.code) {
        case 401:
          break
        case 405:
          alert('接口请求方法不支持')
          break
        case 404:
          alert('请求的接口不存在')
          break
        case 500:
          alert('接口异常')
          break
      }
    } else if (error.request) {
    } else {
    }
  }

  Vue.prototype.api_get = function (url, callback = function () {}, params = {}) {
    var _self = this
    if (window.localStorage.getItem('token')) {
      params.token = window.localStorage.getItem('token')
    }
    if (window.localStorage.getItem('userid')) {
      params.userId = window.localStorage.getItem('userid')
    }
    this.axios.get(url, {
      headers: headers,
      params: params
    }).then((response) => {
      if (response.data.errorCode === 101 || response.data.errorCode === 102 || response.data.errorCode === 103) {
        _self.$router.replace('/login')
      } else {
        callback(response.data)
      }
    }).catch(function (error) {
      _self.handle_error(error)
    })
  }

  Vue.prototype.api_post = function (url, callback = function () { }, params = { }) {
    if (window.localStorage.getItem('token')) {
      params.token = window.localStorage.getItem('token')
    }
    if (window.localStorage.getItem('userid')) {
      params.userId = window.localStorage.getItem('userid')
    }
    let _self = this
    this.axios({
      url: url,
      method: 'post',
      data: params,
      headers: headers,
      transformRequest: [function (data) {
        // Do whatever you want to transform the data
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }]
    }).then((response) => {
      if (response.data.errorCode === 101 || response.data.errorCode === 102 || response.data.errorCode === 103) {
        _self.$router.replace('/login')
      } else {
        callback(response.data)
      }
    }).catch(function (error) {
      _self.handle_error(error)
    })
  }

  Vue.prototype.api_put = function (url, callback = function () {}, params = {}) {
    if (window.localStorage.getItem('token')) {
      var _self = this
      this.axios.put(url, params, {
        headers: headers
      }).then((response) => {
        callback(response.data)
      }).catch(function (error) {
        _self.handle_error(error)
      })
    }
  }

  Vue.prototype.api_patch = function (url, callback = function () {}, params = {}) {
    var _self = this
    this.axios.patch(url, params, {
      headers: headers
    }).then((response) => {
      callback(response.data)
    }).catch(function (error) {
      _self.handle_error(error)
    })
  }

  Vue.prototype.api_delete = function (url, callback = function () {}, params = {}) {
    var _self = this
    this.axios.delete(url, {
      headers: headers,
      params: params
    }).then((response) => {
      callback(response.data)
    }).catch(function (error) {
      _self.handle_error(error)
    })
  }

  Vue.prototype.api_file = function (url, fromData, callback = function () {}, params = {}) {
    let _self = this
    this.axios({
      url: url,
      method: 'post',
      data: fromData
    }).then((response) => {
      callback(response.data)
    }).catch(function (error) {
      _self.handle_error(error)
    })
  }
  // Vue.prototype.getUserinfo = function (callback) {
  //   if(window.localStorage.getItem('token')) {
  //     if(!window.localStorage.getItem('user_avatar') || !window.localStorage.getItem('user_info')) {
  //       var _JSON = JSON
  //       Vue.prototype.api_get('/user', function (response) {
  //         window.localStorage.setItem('user_avatar', response.data.user_avatar)
  //         window.localStorage.setItem('user_info', _JSON.stringify(response.data))
  //         callback()
  //       })
  //     }
  //   }
  // }
}
