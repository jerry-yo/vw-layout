import * as type from './mutation-types'

const mutations = {
  [type.SET_CARBRAND] (state, carbrand) {
    sessionStorage.setItem('carBrand', carbrand)
    state.carBrand = carbrand
  },
  [type.SET_ANIMATETYPE] (state, direction) {
    sessionStorage.setItem('routerAnimate', direction.direction)
    state.routerAnimate = direction.direction
  },
  [type.SET_ADDCAR] (state, carinfo) {
    sessionStorage.setItem('addCar', Object.assign(state.addCar, carinfo))
    state.addCar = Object.assign(state.addCar, carinfo)
  },
  [type.SET_MYCAR] (state, car) {
    state.myCar.push(car)
    console.log(state.myCar, '------------------------- reface mycar')
  }
}

export default mutations
