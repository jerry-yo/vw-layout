import * as types from './mutation-types'
import {saveCityInfo, saveStoreList, saveCityList, saveMyCar, saveCarBrand, saveAddCar, saveDefaultCar, saveSelectCar, saveDefaultStoreId,
  saveAllServerList, saveStaticServerList, saveAddNewServerLoadNum, saveSeleServersInfo} from '@/common/js/cache'
const mutations = {
  [types.SET_ANIMATETYPE] (state, direction) {
    sessionStorage.setItem('routerAnimate', JSON.stringify(direction.direction))
    state.routerAnimate = direction.direction
  },
  [types.SET_SERACHHIS] (state, list) {
    if (list.type === 'store') {
      state.serachHis.store.push(list.search)
    } else if (list.type === 'brand') {
      state.serachHis.brand.push(list.search)
    } else if (list.type === 'city') {
      state.serachHis.city.push(list.search)
    }
  },
  [types.DELETE_SERACHHIS] (state, list) {
    let arr = []
    if (list.type === 'store') {
      state.serachHis.store.forEach((item, index) => {
        if (index !== list.index) {
          arr.push(item)
        }
      })
      state.serachHis.store = arr
    } else if (list.type === 'brand') {
      state.serachHis.brand.forEach((item, index) => {
        if (index !== list.index) {
          arr.push(item)
        }
      })
      state.serachHis.brand = arr
    } else if (list.type === 'city') {
      state.serachHis.city.forEach((item, index) => {
        if (index !== list.index) {
          arr.push(item)
        }
      })
      state.serachHis.city = arr
    }
  },
  [types.SET_SERACHINFO] (state, info) {
    state.serachInfo = info
  },
  [types.SET_ORDER_INFO] (state, info) {
    state.orderInfo = info
  },
  [types.MODIFY_ORDER_LIST] (state, info) {
    let date = Math.round(new Date().getTime() / 1000)
    state.orderList.forEach((item, index) => {
      if (item.orderId === info.id) {
        if (info.type === 'cancel') {
          item.orderFormState = 5
          item.cancellationTime = date
        } else if (info.type === 'pay') {
          item.orderFormState = 4
          item.paymentTime = date
        }
      }
    })
  },
  [types.DELETE_ORDER_LIST] (state, info) {
    // let date = Math.round(new Date().getTime() / 1000)
    let ret = []
    state.orderList.forEach((item, index) => {
      if (item.orderId !== info.id) {
        ret.push(item)
      }
    })
    state.orderList = ret
  },
  [types.SET_REPAIR_ORDER] (state, info) {
    let obj = {}
    obj = Object.assign(state.repairOrder, info)
    state.repairOrder = obj
  },
  [types.DELETE_REPAIR_ORDER] (state) {
    state.repairOrder = {}
  },
  // loading页面操作
  [types.SET_LOADING_STATE] (state, flag) {
    state.loadingState = flag
  },
  // 用户信息userinfo操作
  [types.SET_USER_INFO] (state, info) {
    state.userInfo = info
  },
  [types.DELETE_USER_INFO] (state) {
    state.userInfo = {}
  },
  // 城市列表cityList 操作
  [types.SET_CITYLIST] (state, list) {
    saveCityList(list)
    state.cityList = list
  },
  // 修改 设置 cityInfo 操作
  [types.SET_CITYINFO] (state, info) {
    let obj = {}
    obj = Object.assign(state.cityInfo, info)
    saveCityInfo(info)
    state.cityInfo = obj
  },
  // 设置门店 storeList 列表
  [types.SET_STORELIST] (state, list) {
    saveStoreList(list)
    state.storeList = list
  },
  // 设置 修改 mycar 车库
  [types.SET_MYCAR] (state, list) {
    saveMyCar(list)
    state.myCar = list
  },
  [types.MODIFY_MYCAR] (state, car) {
    state.myCar[car.id] = car.info
  },
  // 设置默认车辆
  [types.SET_DEFAULTCAR] (state, id) {
    saveDefaultCar(id)
    state.defaultCar = id
  },
  // 服务选择车辆
  [types.SET_SELECTCAR] (state, id) {
    saveSelectCar(id)
    state.selectCar = id
  },
  // 设置，保存 汽车品牌列表 carBrand
  [types.SET_CARBRAND] (state, list) {
    saveCarBrand(list)
    state.carBrand = list
  },
  // 设置删除 添加车辆信息
  [types.SET_ADDCAR] (state, info) {
    let obj = {}
    if (JSON.stringify(info) !== '{}') {
      obj = Object.assign(state.addCar, info)
    }
    state.addCar = obj
    saveAddCar(obj)
  },
  // 设置默认门店
  [types.SET_DEFAULTSTORE_ID] (state, id) {
    saveDefaultStoreId(id)
    state.defaultStoreId = id
  },
  // 设置保养服务列表
  [types.SET_ALL_SERVER_LIST] (state, list) {
    saveAllServerList(list)
    state.allServerList = list
  },
  // 设置参考保养服务列表
  [types.SET_STATIC_SERVER_LIST] (state, list) {
    saveStaticServerList(list)
    state.staticServerList = list
  },
  // 修改保养服务列表信息
  [types.MODIFY_ALL_SERVER_LIST] (state, info) {
    let list = state.allServerList.slice()
    list.forEach(item => {
      if (item.pkId === info.pkId) {
        item = Object.assign(item, info)
      }
    })
    saveAllServerList(list)
    state.allServerList = list
  },
  // 修改保养服务产品信息
  [types.MODIFY_ALL_SETVER_PARTINFO] (state, info) {
    let list = state.allServerList.slice()
    list.forEach(item => {
      if (item.pkId === info.pkId) {
        item.partInfo = Object.assign(item.partInfo, info.obj)
      }
    })
    saveAllServerList(list)
    state.allServerList = list
  },
  // 修改参照保养服务产品信息
  [types.MODIFY_STATIC_SERVER_PARTINFO] (state, info) {
    let list = state.staticServerList.slice()
    list.forEach(item => {
      if (item.pkId === info.pkId) {
        item.partInfo = Object.assign(item.partInfo, info.obj)
      }
    })
    saveStaticServerList(list)
    state.staticServerList = list
  },
  // 设置服务订单信息
  [types.SET_UPDATE_ORDER] (state, info) {
    let obj = {}
    obj = Object.assign(state.updateOrder, info)
    state.updateOrder = obj
  },
  // 删除服务订单信息
  [types.DELETE_UPDATE_ORDER] (state) {
    state.updateOrder = {}
  },
  // 记录新服务加载次数
  [types.SET_ADD_NEW_SERVER_LOAD_NUM] (state, num) {
    saveAddNewServerLoadNum(num)
    state.addNewServerLoadNum = num
  },
  // 服务详情列表
  [types.SET_SELE_SERVERS_INFO] (state, list) {
    saveSeleServersInfo(list)
    state.seleServersInfo = list
  },
  [types.MODIFY_SELE_SERVERS_INFO] (state, info) {
    state.seleServersInfo.forEach(item => {
      if (item.pkId === info.pkId) {
        item = Object.assign(item, {
          state: item.state < 0 ? 0 : -1
        })
      }
    })
  }
}

export default mutations
