import * as types from './mutation-types'

const mutations = {
  [types.SET_CARBRAND] (state, carbrand) {
    sessionStorage.setItem('carBrand', JSON.stringify(carbrand))
    state.carBrand = carbrand
  },
  [types.SET_ANIMATETYPE] (state, direction) {
    sessionStorage.setItem('routerAnimate', JSON.stringify(direction.direction))
    state.routerAnimate = direction.direction
  },
  [types.SET_ADDCAR] (state, carinfo) {
    sessionStorage.setItem('addCar', JSON.stringify(Object.assign(state.addCar, carinfo)))
    state.addCar = Object.assign(state.addCar, carinfo)
  },
  [types.SET_MYCAR] (state, car) {
    if (state.myCar.length > 0) {
      state.myCar.push(Object.assign(car, {
        default: false
      }))
    } else {
      state.myCar.push(Object.assign(car, {
        default: true
      }))
    }
  },
  [types.SET_DEFAULTCAR] (state, car) {
    let arr = []
    state.myCar.forEach((item, index) => {
      if (index === car.id) {
        item.default = true
      } else {
        arr.push(item)
        item.default = false
      }
    })
    arr.unshift(car.item)
    state.myCar = arr
  },
  [types.DELETE_MYCAR] (state, car) {
    car.forEach((item, index) => {
      if (item.check) {
        state.myCar[index] = 0
      }
    })
    let arr = []
    let flag = false
    state.myCar.forEach(item => {
      if (item !== 0) {
        if (item.default) {
          flag = true
        }
        arr.push(item)
      }
    })
    if (arr.length > 0 && !flag) {
      arr[0].default = true
    }
    state.myCar = arr
  },
  [types.MODIFY_MYCAR] (state, car) {
    let obj = {}
    obj = Object.assign(state.myCar[car.id], car.carinfo)
    state.myCar[car.id] = obj
  },
  [types.SET_CITYINFO] (state, city) {
    state.cityInfo = city
  },
  [types.MODIFY_CITYINFO] (state, city) {
    let obj = {}
    obj = Object.assign(state.cityInfo, city)
    state.cityInfo = obj
  },
  [types.SET_CITYLIST] (state, list) {
    state.cityList = list
  },
  [types.SET_STORELIST] (state, list) {
    state.storeList = list
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
  [types.MODIFY_MY_SERVER] (state, list) {
    state.serverList = state.serverList.concat(list)
  },
  [types.DELETE_ALL_SERVER] (state, arr) {
    let ret = []
    arr.forEach((item) => {
      if (item.subnav.length > 0) {
        item.subnav.forEach((res) => {
          delete state.allServerList[item.nav].serviceCon[res]
        })
      }
    })
    state.allServerList.forEach((item) => {
      let server = []
      item.serviceCon.forEach((res) => {
        if (typeof res !== 'undefined') {
          server.push(res)
        }
      })
      if (server.length > 0) {
        ret.push({
          serviceCatalog: item.serviceCatalog,
          serviceId: item.serviceId,
          serviceCon: server
        })
      }
    })
    state.allServerList = ret
  },
  [types.SET_MY_SERVER] (state) {
    state.serverList = state.staticServerList
  },
  [types.SET_ALL_SERVER] (state) {
    state.allServerList = state.staticAllServerList
  },
  [types.SET_DEFAULTSTORE_ID] (state, id) {
    state.defaultStoreId = id
  },
  [types.SET_MAINTAIN_ORDER] (state, info) {
    let obj = {}
    obj = Object.assign(state.maintainOrder, info)
    state.maintainOrder = obj
  },
  [types.DELETE_MAINTAIN_ORDER] (state) {
    state.maintainOrder = {}
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
  [types.SET_LOADING_STATE] (state, flag) {
    state.loadingState = flag
  },
  // 用户信息userinfo操作
  [types.SET_USER_INFO] (state, info) {
    state.userInfo = info
  },
  [types.DELETE_USER_INFO] (state) {
    state.userInfo = {}
  }
}

export default mutations
