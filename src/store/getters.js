
// export const getCarLogo = state => id => {
//   return state.carBrand.find(car => car.id === id)
// }

const getters = {
  carBrand (state) {
    // let carbrand = sessionStorage.getItem('carBrand')
    // state.carBrand = carbrand
    return state.carBrand
  },
  addCar (state) {
    // let addcar = sessionStorage.getItem('addCar')
    // state.addCar = addcar
    return state.addCar
  },
  area (state) {
    return state.area
  },
  myCar (state) {
    // let mycar = sessionStorage.getItem('myCar')
    // state.myCar = mycar
    return state.myCar
  },
  cityInfo (state) {
    return state.cityInfo
  },
  cityList (state) {
    return state.cityList
  }
}

export default getters
