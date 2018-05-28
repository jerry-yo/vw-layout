import * as type from './mutation-types'

const mutations = {
  [type.SET_CARBRAND] (state, carbrand) {
    sessionStorage.setItem('carBrand', JSON.stringify(carbrand))
    state.carBrand = carbrand
  },
  [type.SET_ANIMATETYPE] (state, direction) {
    sessionStorage.setItem('routerAnimate', JSON.stringify(direction.direction))
    state.routerAnimate = direction.direction
  },
  [type.SET_ADDCAR] (state, carinfo) {
    sessionStorage.setItem('addCar', JSON.stringify(Object.assign(state.addCar, carinfo)))
    state.addCar = Object.assign(state.addCar, carinfo)
  },
  [type.SET_MYCAR] (state, car) {
    if (state.myCar.length > 0) {
      state.myCar.push(Object.assign(car, {
        default: false
      }))
    } else {
      state.myCar.push(Object.assign(car, {
        default: true
      }))
    }
  },
  [type.SET_DEFAULTCAR] (state, car) {
    state.myCar.forEach((item, index) => {
      if (index === car.id) {
        item.default = true
      } else {
        item.default = false
      }
    })
  },
  [type.DELETE_MYCAR] (state, car) {
    car.forEach((item, index) => {
      if (item.check) {
        state.myCar[index] = 0
      }
    })
    let arr = []
    let flag = false
    state.myCar.forEach(item => {
      if (item !== 0) {
        if (item.default) {
          flag = true
        }
        arr.push(item)
      }
    })
    if (arr.length > 0 && !flag) {
      arr[0].default = true
    }
    state.myCar = arr
  },
  [type.MODIFY_MYCAR] (state, car) {
    let obj = {}
    obj = Object.assign(state.myCar[car.id], car.carinfo)
    state.myCar[car.id] = obj
  },
  [type.SET_CITYINFO] (state, city) {
    state.cityInfo = city
  },
  [type.MODIFY_CITYINFO] (state, city) {
    let obj = {}
    obj = Object.assign(state.cityInfo, city)
    state.cityInfo = obj
  },
  [type.SET_CITYLIST] (state, list) {
    state.cityList = list
  },
  [type.SET_STORELIST] (state, list) {
    state.storeList = list
  }
}

export default mutations
