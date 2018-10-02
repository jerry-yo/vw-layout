import CryptoJS from 'crypto-js'

// 秘钥

/*
  ** localStorage **
*/
const USER_INFO = '__gt1_user__' // 用户信息操作
const CITY_LIST = '__gt1_citys__' // 城市列表操作
const CAR_BRAND = '__gt1_car_brand__' // 汽车品牌操作
/*
  ** sessionStorage **
*/
const CITY_INFO = '__city_info__' // 定位城市信息
const STORE_LIST = '__store_list__' // 门店列表
const MY_CAR = '__my_car__' // 我的车库
const DEFAULT_CAR = '__default_car__' // 默认车辆信息
const SELECT_CAR = '__select_car__' // 服务选择车辆信息
const ADD_CAR = '__add_car__' // 添加车辆信息
const DEFAULT_STORE_ID = '__default_store_id__' // 默认服务门店ID
const UPDATE_ORDER = '__update_order__' // 保养订单详情
const ALL_SERVER_LIST = '__all_server_list__' // 保养服务列表
const STATIC_SERVER_LIST = '__static_server_list__' // 参考保养服务列表
const ADD_NEW_SERVER_LOAD_NUM = '__add_new_server_load_num__' // 记录打开新增服务页面次数
const CHECKS_OBJ = '__CHECK_OBJ__' // 检测单信息
/*
  ** localStorage **
*/
export function loadUserInfo () { // 用户信息操作
  let local = localStorage.getItem(USER_INFO)
  if (local === null) {
    return {}
  } else {
    return getDAes(local, _key)
  }
}
export function saveUserInfo (info) { // 用户信息操作
  let infos = getAES(JSON.stringify(info), _key)
  localStorage.setItem(USER_INFO, infos)
  return info
}

export function loadCityList () { // 城市列表操作
  let citys = localStorage.getItem(CITY_LIST)
  if (citys === null) {
    return []
  } else {
    return JSON.parse(citys)
  }
}
export function saveCityList (list) { // 城市列表操作
  localStorage.setItem(CITY_LIST, JSON.stringify(list))
  return list
}

export function loadCarBrand () { // 城市列表操作
  let brands = localStorage.getItem(CAR_BRAND)
  if (brands === null) {
    return []
  } else {
    return JSON.parse(brands)
  }
}
export function saveCarBrand (list) { // 城市列表操作
  localStorage.setItem(CAR_BRAND, JSON.stringify(list))
  return list
}
/*
  ** sessionStorage **
*/

export function loadCityInfo () { // 定位城市信息
  let city = sessionStorage.getItem(CITY_INFO)
  if (city === null) {
    return {}
  } else {
    return JSON.parse(city)
  }
}
export function saveCityInfo (info) { // 定位城市信息
  sessionStorage.setItem(CITY_INFO, JSON.stringify(info))
  return info
}

export function loadStoreList () { // 门店列表
  let list = sessionStorage.getItem(STORE_LIST)
  if (list === null) {
    return []
  } else {
    return JSON.parse(list)
  }
}
export function saveStoreList (list) { // 门店列表
  sessionStorage.setItem(STORE_LIST, JSON.stringify(list))
  return list
}

export function loadMyCar () { // 我的车库
  let cars = sessionStorage.getItem(MY_CAR)
  if (cars === null) {
    return []
  } else {
    return JSON.parse(cars)
  }
}
export function saveMyCar (list) { // 我的车库
  sessionStorage.setItem(MY_CAR, JSON.stringify(list))
  return list
}

export function loadAddCar () { // 添加车辆缓存
  let info = sessionStorage.getItem(ADD_CAR)
  if (info === null) {
    return {}
  } else {
    return JSON.parse(info)
  }
}
export function saveAddCar (info) { // 添加车辆缓存
  sessionStorage.setItem(ADD_CAR, JSON.stringify(info))
  return info
}

export function loadDefaultCar () { // 车库默认车辆
  let id = sessionStorage.getItem(DEFAULT_CAR)
  if (id === null) {
    return 0
  } else {
    return parseInt(id)
  }
}
export function saveDefaultCar (id) { // 车库默认车辆
  sessionStorage.setItem(DEFAULT_CAR, id)
  return id
}

export function loadSelectCar () { // 服务选择车辆
  let id = sessionStorage.getItem(SELECT_CAR)
  if (id === null) {
    return 0
  } else {
    return parseInt(id)
  }
}
export function saveSelectCar (id) { // 服务选择车辆
  sessionStorage.setItem(SELECT_CAR, id)
  return id
}

export function loadDefaultStoreId () { // 默认门店ID
  let id = sessionStorage.getItem(DEFAULT_STORE_ID)
  if (id === null) {
    return 0
  } else {
    return parseInt(id)
  }
}
export function saveDefaultStoreId (id) { // 默认门店ID
  sessionStorage.setItem(DEFAULT_STORE_ID, id)
  return id
}

export function loadUpdateOrder () { // 订单信息by wx
  let info = sessionStorage.getItem(UPDATE_ORDER)
  if (info === null) {
    return {}
  } else {
    return JSON.parse(info)
  }
}
export function saveUpdateOrder (info) { // 订单信息by wx
  sessionStorage.setItem(UPDATE_ORDER, JSON.stringify(info))
  return info
}

export function loadAllServerList () { // 保养订单
  let list = sessionStorage.getItem(ALL_SERVER_LIST)
  if (list === null) {
    return []
  } else {
    return JSON.parse(list)
  }
}
export function saveAllServerList (list) { // 保养订单
  sessionStorage.setItem(ALL_SERVER_LIST, JSON.stringify(list))
  return list
}

export function loadStaticServerList () { // 保养订单
  let list = sessionStorage.getItem(STATIC_SERVER_LIST)
  if (list === null) {
    return []
  } else {
    return JSON.parse(list)
  }
}
export function saveStaticServerList (list) { // 保养订单
  sessionStorage.setItem(STATIC_SERVER_LIST, JSON.stringify(list))
  return list
}

export function loadAddNewServerLoadNum () { // 保养订单
  let num = sessionStorage.getItem(ADD_NEW_SERVER_LOAD_NUM)
  if (num === null) {
    return true
  } else {
    return num
  }
}
export function saveAddNewServerLoadNum (num) { // 保养订单
  sessionStorage.setItem(ADD_NEW_SERVER_LOAD_NUM, num)
  return num
}

export function loadChecksObj () { // 获取检测单信息
  let obj = sessionStorage.getItem(CHECKS_OBJ)
  if (obj === null) {
    return {}
  } else {
    return JSON.parse(obj)
  }
}
export function saveChecksObj (obj) { // 保存检测单信息
  sessionStorage.setItem(CHECKS_OBJ, JSON.stringify(obj))
  return obj
}

/*
  ---加密。解密
*/
function getAES (data, key) {
  return CryptoJS.AES.encrypt(data, key)
}

function getDAes (data, key) {
  let decrype = CryptoJS.AES.decrypt(data.toString(), key).toString(CryptoJS.enc.Utf8)
  return JSON.parse(decrype)
}
