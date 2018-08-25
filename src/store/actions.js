import * as types from './mutation-types'
import {handleMyCar} from '@/common/js/config'
import {saveUserInfo} from '@/common/js/cache.js'

// 用户信息更新
export const updateUserInfo = function ({commit, state}, info) {
  let infos = Object.assign(state.userInfo, info)
  saveUserInfo(infos)
  commit(types.SET_USER_INFO, infos)
}

// 我的车库信息设置
export const updateCarList = function ({commit}, list) {
  let newList = handleMyCar(list)
  let arr = []
  newList.forEach(item => {
    if (item.defaultFlag === 1) {
      arr.unshift(item)
      commit(types.SET_DEFAULTCAR, item)
    } else {
      arr.push(item)
    }
  })
  commit(types.SET_MYCAR, arr)
}
