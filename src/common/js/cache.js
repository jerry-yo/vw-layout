// import storage from 'good-storage'
import CryptoJS from 'crypto-js'

// 秘钥


// 用户信息操作
const USER_INFO = '__gt1_user__'

// 用户信息操作
export function loadUserInfo () {
  let local = localStorage.getItem(USER_INFO)
  if (local === null) {
    return {}
  } else {
    return getDAes(local, _key)
  }
}

export function saveUserInfo (info) {
  let infos = getAES(JSON.stringify(info), _key)
  localStorage.setItem(USER_INFO, infos)
  return info
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
