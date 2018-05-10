import Vue from 'vue'
import VueRouter from 'vue-router'
import {routers} from './router'
import store from '../store'

Vue.use(VueRouter)

// 路由配置
const RouterConfig = {
  linkActiveClass: 'active-on',
  // mode: 'history',
  routes: routers
}

export const router = new VueRouter(RouterConfig)

const history = window.sessionStorage
history.clear()
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
      store.commit('setRouterAnimate', {direction: 'in'})
    } else {
      store.commit('setRouterAnimate', {direction: 'out'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    paths.push({path: to.path, index: historyCount})
    history.setItem('routers', JSON.stringify(paths))
    if (from.path !== '/') {
      store.commit('setRouterAnimate', {direction: 'in'})
    }
  }
  next()
  console.log(window.history)
})
