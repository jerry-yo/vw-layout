import Vue from 'vue'
import Router from 'vue-router'
import appMain from '@/components/appmain.vue'

const loginRouter = {
  path: '/login',
  name: 'login',
  component: resolve => { require(['@/components/login/login'], resolve) }
}
const registerRouter = {
  path: '/register',
  name: 'register',
  component: resolve => { require(['@/components/login/register'], resolve) }
}
const setpwdRouter = {
  path: '/setpwd',
  name: 'setpwd',
  component: resolve => { require(['@/components/login/set-pwd'], resolve) }
}
const setcodeRouter = {
  path: '/setcode',
  name: 'setcode',
  component: resolve => { require(['@/components/login/set-code'], resolve) }
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
  component: resolve => { require(['@/components/order/all-order'], resolve) }
}
const orderInfoRouter = {
  path: '/orderinfo',
  name: 'orderInfo',
  component: resolve => { require(['@/components/order/order-info'], resolve) }
}
const addcarAge = {
  path: '/addcar-age',
  name: 'addcarAge',
  component: resolve => { require(['@/components/mycar/addcar-age'], resolve) }
}
const addcarBrand = {
  path: '/addcar-brand',
  name: 'addcarBrand',
  component: resolve => { require(['@/components/mycar/addcar-brand'], resolve) }
}
const addcarDisplacement = {
  path: '/addcar-displacement',
  name: 'addcarDisplacement',
  component: resolve => { require(['@/components/mycar/addcar-displacement'], resolve) }
}
const addcarModels = {
  path: '/addcar-models',
  name: 'addcarModels',
  component: resolve => { require(['@/components/mycar/addcar-models'], resolve) }
}
const carOwner = {
  path: '/car-owner',
  name: 'carOwner',
  component: resolve => { require(['@/components/mycar/car-owner'], resolve) }
}
const carSharing = {
  path: '/car-sharing',
  name: 'carSharing',
  component: resolve => { require(['@/components/mycar/car-sharing'], resolve) }
}
const detectionRecord = {
  path: '/detection-record',
  name: 'detectionRecord',
  component: resolve => { require(['@/components/mycar/detection-record'], resolve) }
}
const Garage = {
  path: '/garage',
  name: 'Garage',
  component: resolve => { require(['@/components/mycar/garage'], resolve) }
}
const vehicleManagement = {
  path: '/vehicle-management',
  name: 'vehicleManagement',
  component: resolve => { require(['@/components/mycar/vehicle-management'], resolve) }
}
const addCarSharing = {
  path: '/add-car-sharing',
  name: 'addCarSharing',
  component: resolve => { require(['@/components/mycar/add-car-sharing'], resolve) }
}
const addCarIdcard = {
  path: '/addcar-idcard',
  name: 'addCarIdcard',
  component: resolve => { require(['@/components/mycar/addcar-idcard'], resolve) }
}
const routers = [
  loginRouter,
  registerRouter,
  setcodeRouter,
  setpwdRouter,
  otherRouter,
  orderRouter,
  orderInfoRouter,
  addcarAge,
  addcarModels,
  addcarBrand,
  addcarDisplacement,
  carOwner,
  carSharing,
  detectionRecord,
  Garage,
  vehicleManagement,
  addCarSharing,
  addCarIdcard
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
