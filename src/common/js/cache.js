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
