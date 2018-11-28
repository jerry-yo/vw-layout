import Vue from 'vue'
import VueRouter from 'vue-router'
import {routers} from './router'
import store from '../store'

Vue.use(VueRouter)

// 路由配置
const RouterConfig = {
  linkActiveClass: 'active-on',
  // mode: 'history',
  // base: '/weixin/',
  routes: routers
}

export const router = new VueRouter(RouterConfig)

const history = window.sessionStorage
// history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('routers', JSON.stringify([{path: '/', index: 0}]))
// ‘in’ 下一页   ‘out’ 返回 ’
router.beforeEach((to, from, next) => {
  let toIndex = 0
  let fromIndex = 0
  let paths = JSON.parse(history.getItem('routers'))
  paths.forEach(item => {
    if (item.path === to.path) {
      toIndex = item.index
    }
    if (item.path === from.path) {
      fromIndex = item.index
    }
  })

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('SET_ANIMATETYPE', {direction: 'in'})
    } else {
      store.commit('SET_ANIMATETYPE', {direction: 'out'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    paths.push({path: to.path, index: historyCount})
    history.setItem('routers', JSON.stringify(paths))
    if (from.path !== '/') {
      store.commit('SET_ANIMATETYPE', {direction: 'in'})
    }
  }
  if (to.meta.requireAuth) {
    if (store.state.userInfo) {
      if (to.meta.hasCar) {
        if (store.state.myCar.length > 0) {
          next()
        } else {
          Vue.prototype.$Modal.confirm({
            title: '提示信息',
            content: '该服务需要先添加车辆，是否立即添加车辆？',
            onCancel: () => {
              Vue.prototype.$Modal.remove()
            },
            onOk: () => {
              next({path: '/addcar-tabbar?type=add'})
              Vue.prototype.$Modal.remove()
            }
          })
        }
      } else {
        next()
      }
    } else {
      Vue.prototype.$Modal.confirm({
        title: '提示信息',
        content: '此服务需登录，是否登录？',
        onCancel: () => {
          Vue.prototype.$Modal.remove()
        },
        onOk: () => {
          next({path: '/login'})
          Vue.prototype.$Modal.remove()
        }
      })
    }
  } else {
    next()
  }
})
