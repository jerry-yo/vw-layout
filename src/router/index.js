import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Home from '@/components/home'
import Mind from '@/components/mind'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active-on',
  history: true,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    name: 'home',
    component: Home
  }, {
    name: 'login',
    path: '/login',
    component: Login
  }, {
    name: 'mind',
    path: '/mind',
    component: Mind
  }]
})
