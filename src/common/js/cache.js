import storage from 'good-storage'

const TOKEN_INFO = '__gt1_token__'
// const NOW_CLASSIFY = '__gt1_now_classify__'
// const BRAND_LIST = '__brand_list__'

export function loadToken () {
  return storage.session.get(TOKEN_INFO, [])
}

export function saveToken (token) {
  storage.session.set(TOKEN_INFO, token)
  return token
}

// export function loadNowClassify () {
//   return storage.session.get(NOW_CLASSIFY, {})
// }
//
// export function saveNowClassify (classify) {
//   storage.session.set(NOW_CLASSIFY, classify)
//   return classify
// }
//
// export function loadBrandList () {
//   return storage.session.get(BRAND_LIST, [])
// }
//
// export function saveBrandList (list) {
//   storage.session.set(BRAND_LIST, list)
//   return list
// }
