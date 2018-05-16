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
const addcarTabbar = {
  path: '/addcar-tabbar',
  name: 'addcarTabbar',
  component: resolve => { require(['@/components/mycar/addcar-tabbar'], resolve) }
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
const storeList = {
  path: '/store-list',
  name: 'storeList',
  component: resolve => { require(['@/components/store/store-list'], resolve) }
}
const repairRouter = {
  path: '/repair',
  name: 'repair',
  component: resolve => { require(['@/components/repair/repair'], resolve) }
}
const repairPreOrder = {
  path: '/repair-pre-order',
  name: 'repairPreOrder',
  component: resolve => { require(['@/components/repair/repair-pre-order'], resolve) }
}
const Reservations = {
  path: '/reservations',
  name: 'Reservations',
  component: resolve => { require(['@/components/repair/reservations'], resolve) }
}
const maintainPreOrder = {
  path: '/maintain-pre-order',
  name: 'maintainPreOrder',
  component: resolve => { require(['@/components/maintain/maintain-pre-order'], resolve) }
}
const maintain = {
  path: '/maintain',
  name: 'maintain',
  component: resolve => { require(['@/components/maintain/maintain'], resolve) }
}
const addNewServer = {
  path: '/add-new-server',
  name: 'addNewServer',
  component: resolve => { require(['@/components/maintain/add-new-server'], resolve) }
}
// const searchCar = {
//   path: '/search-car',
//   name: 'searchCar',
//   component: resolve => { require(['@/components/mycar/search-car'], resolve) }
// }
const payOver = {
  path: '/pay-over',
  name: 'payOver',
  component: resolve => { require(['@/components/pay/pay-over'], resolve) }
}
const washCar = {
  path: '/washcar',
  name: 'washCar',
  component: resolve => { require(['@/components/washcar/washcar'], resolve) }
}
const searchWashStore = {
  path: '/search-wash-store',
  name: 'searchWashStore',
  component: resolve => { require(['@/components/washcar/search_wash_store'], resolve) }
}
const setUp = {
  path: '/set-up',
  name: 'setUp',
  component: resolve => { require(['@/components/mind/set-up'], resolve) }
}
const myInfo = {
  path: '/my-info',
  name: 'myInfo',
  component: resolve => { require(['@/components/mind/my-info'], resolve) }
}
const checkList = {
  path: '/check-list',
  name: 'checkList',
  component: resolve => { require(['@/components/checklist/checklist'], resolve) }
}
const seleCity = {
  path: '/sele-city',
  name: 'seleCity',
  component: resolve => { require(['@/components/city/sele-city'], resolve) }
}
export const routers = [
  loginRouter,
  registerRouter,
  setcodeRouter,
  setpwdRouter,
  otherRouter,
  orderRouter,
  orderInfoRouter,
  addcarAge,
  addcarModels,
  addcarTabbar,
  addcarDisplacement,
  carOwner,
  carSharing,
  detectionRecord,
  Garage,
  vehicleManagement,
  addCarSharing,
  addCarIdcard,
  storeList,
  repairRouter,
  repairPreOrder,
  Reservations,
  maintainPreOrder,
  maintain,
  addNewServer,
  seleCity,
  payOver,
  washCar,
  searchWashStore,
  setUp,
  myInfo,
  checkList
]
