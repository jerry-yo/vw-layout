import * as types from './mutation-types'
import {handleMyCar} from '@/common/js/config'

// 用户信息更新
export const updateUserInfo = function ({commit, state}, info) {
  let infos
  if (state.userInfo) {
    infos = Object.assign(state.userInfo, info)
  } else {
    infos = Object.assign({}, info)
  }
  commit(types.SET_USER_INFO, infos)
}
// 删除用户信息

export const deleteUserInfo = function ({commit}) {
  let count = sessionStorage.getItem('count')
  let routerAnimate = sessionStorage.getItem('routerAnimate')
  let routers = sessionStorage.getItem('routers')
  let cityInfo = sessionStorage.getItem('__city_info__')
  sessionStorage.clear()
  sessionStorage.setItem('__city_info__', cityInfo)
  sessionStorage.setItem('count', count)
  sessionStorage.setItem('routerAnimate', routerAnimate)
  sessionStorage.setItem('routers', routers)
  commit(types.SET_USER_INFO, null)
}

// 我的车库信息设置
export const updateCarList = function ({commit}, list) {
  let newList = handleMyCar(list)
  let arr = []
  newList.forEach(item => {
    if (item.defaultFlag === 1) {
      arr.unshift(item)
      commit(types.SET_DEFAULTCAR, item.userCarId)
    } else {
      arr.push(item)
    }
  })
  commit(types.SET_MYCAR, arr)
}

// 我的车库更新默认
export const updateCarDefault = function ({commit, state}, info) {
  let arr = state.myCar.slice()
  arr.forEach((item, index) => {
    if (item.userCarId === info.defaultId) {
      item.defaultFlag = 0
    } else if (item.userCarId === info.modifyId) {
      item.defaultFlag = 1
      commit(types.SET_DEFAULTCAR, item.userCarId)
    }
  })
  commit(types.SET_MYCAR, arr)
}

export const updateCarWay = function ({commit, state}, info) {
  let arr = state.myCar.slice()
  arr.forEach((item, index) => {
    if (item.userCarId === info.index) {
      item = Object.assign(item, info.obj)
    }
    if (item.defaultFlag) {
      commit(types.SET_DEFAULTCAR, item.userCarId)
    }
  })
  commit(types.SET_MYCAR, arr)
}

export const clearOrderAllInfo = function ({commit, state}, type) {
  commit(types.DELETE_UPDATE_ORDER)
  commit(types.SET_DEFAULTSTORE_ID, 0)
  commit(types.SET_SELECTCAR, 0)
  if (type === 'by') {
    commit(types.SET_ALL_SERVER_LIST, [])
    commit(types.SET_STATIC_SERVER_LIST, [])
    commit(types.SET_ADD_NEW_SERVER_LOAD_NUM, true)
  }
}

export const initAddNewServer = function ({commit, state}) {
  let allServer = state.allServerList.slice()
  let staticServer = state.staticServerList.slice()
  let list = []
  allServer.forEach(item => {
    if (item.customerServer === 'old') {
      list.push(item)
    }
  })
  staticServer.forEach(item => {
    if (item.customerServer === 'new') {
      list.push(item)
    }
  })
  commit(types.SET_ALL_SERVER_LIST, list)
  commit(types.SET_STATIC_SERVER_LIST, JSON.parse(JSON.stringify(list)))
}

export const clearUser = function ({commit, state}) {

}
