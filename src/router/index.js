import Vue from 'vue'
import Router from 'vue-router'
import appMain from '@/components/appmain.vue'

const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'GT1-登录'
  },
  component: resolve => { require(['@/components/login/login'], resolve) }
}
const registerRouter = {
  path: '/register',
  name: 'register',
  meta: {
    title: 'GT1 - 注册'
  },
  component: resolve => { require(['@/components/login/register'], resolve) }
}

const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: appMain,
  children: [
    { path: 'home', name: 'home', component: resolve => { require(['@/components/home/home'], resolve) } },
    { path: 'mind', name: 'mind', component: resolve => { require(['@/components/mind/mind'], resolve) } }
  ]
}

const orderRouter = {
  path: '/order',
  name: 'order',
  meta: {
    title: ''
  },
  component: resolve => { require(['@/components/order/all-order'], resolve) }
}
const orderInfoRouter = {
  path: '/orderinfo',
  name: 'orderInfo',
  meta: {
    title: ''
  },
  component: resolve => { require(['@/components/order/order-info'], resolve) }
}

const routers = [
  loginRouter,
  registerRouter,
  otherRouter,
  orderRouter,
  orderInfoRouter
]
Vue.use(Router)

export default new Router({
  linkActiveClass: 'active-on',
  history: true,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: routers
})
