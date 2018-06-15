
// export const getCarLogo = state => id => {
//   return state.carBrand.find(car => car.id === id)
// }

const getters = {
  carBrand (state) {
    return state.carBrand
  },
  addCar (state) {
    return state.addCar
  },
  area (state) {
    return state.area
  },
  myCar (state) {
    return state.myCar
  },
  cityInfo (state) {
    return state.cityInfo
  },
  cityList (state) {
    return state.cityList
  },
  storeList (state) {
    return state.storeList
  },
  serachHis (state) {
    return state.serachHis
  },
  serachInfo (state) {
    return state.serachInfo
  },
  serverList (state) {
    return state.serverList
  },
  allServerList (state) {
    return state.allServerList
  },
  defaultStoreId (state) {
    return state.defaultStoreId
  },
  subscribeInfo (state) {
    return state.subscribeInfo
  },
  detectionMenus (state) {
    return state.detectionMenus
  },
  orderList (state) {
    return state.orderList
  },
  orderInfo (state) {
    return state.orderInfo
  },
  userInfo (state) {
    return state.userInfo
  },
  repairOrder (state) {
    return state.repairOrder
  }
}

export default getters
