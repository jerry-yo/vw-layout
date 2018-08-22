import storage from 'good-storage'
// 用户信息操作
const USER_INFO = '__gt1_userinfo__'

// 用户信息操作
export function loadUserInfo () {
  return storage.session.get(USER_INFO, {})
}

export function saveUserInfo (info) {
  storage.session.set(USER_INFO, info)
  return info
}
