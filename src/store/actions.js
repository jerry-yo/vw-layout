import * as types from './mutation-types'
import {saveUserInfo} from '@/common/js/cache.js'

// 用户信息更新
export const updateUserInfo = function ({commit, state}, info) {
  let infos = Object.assign(state.userInfo, info)
  saveUserInfo(infos)
  commit(types.SET_USER_INFO, infos)
}
