import * as types from './mutation-types'
import {handleMyCar} from '@/common/js/config'
import {saveUserInfo} from '@/common/js/cache.js'

// 用户信息更新
export const updateUserInfo = function ({commit, state}, info) {
  let infos = Object.assign(state.userInfo, info)
  saveUserInfo(infos)
  commit(types.SET_USER_INFO, infos)
}
// 删除用户信息

export const deleteUserInfo = function ({commit}) {
  saveUserInfo({})
  commit(types.SET_USER_INFO, {})
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

export const clearOrderAllInfo = function ({commit, state}) {
  
}
