import Wx from 'Wx'
import {mapActions, mapGetters, mapMutations} from 'vuex'
// 微信权限操作
export const wxMixin = {
  mounted () {
    this.wxReady()
  },
  methods: {
    wxReady () {
      Wx.ready(() => {
        Wx.hideAllNonBaseMenuItem()
      })
    }
  }
}
// 刷新token
export const expireToken = {
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    refreshToken (callback = () => {}) {
      this.$post(`${this.gt1Url}/api/f6-app/getToken`, this.gt1Header, (res) => {
        if (res.data.code === 0) {
          this.updateUserInfo({
            token: res.data.data
          })
          setTimeout(() => {
            callback()
          }, 0)
        }
      }, {
        orderToken: this.userInfo.token
      })
    },
    ...mapActions([
      'updateUserInfo'
    ])
  }
}
// 车型， 车系， 排量， 年份， 品牌查询接口
export const queryCarModal = {
  mixins: [expireToken],
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    queryModal () {
      this.$get(`${this.f6Url}/api/clientUserCar/model?searchContent=${this.content}&searchConditon=${this.conditon}`, {
        'Authorization': this.userInfo.token,
        'Content-Type': 'application/json'
      }, (res) => {
        if (res.code === 200) {
          if (this.content === 'brand_name') {
            this.setCarBrand(res.data)
          } else if (this.content === 'manufacturer_name%2Ce_vehicle_system') {
            this.carSeries = res.data
          } else if (this.content === 'exhaust_volume') {
            this.displacement = res.data
          } else if (this.content === 'year%2Cvehicle_system%2Ctransmission_desc') {
            this.ages = res.data
          }
        } else if (res.code === 401) {
          this.refreshToken(this.queryModal)
        }
      })
    },
    ...mapMutations({
      setCarBrand: 'SET_CARBRAND'
    })
  }
}

// 车辆信息修改
export const modifyCarInfo = {
  mixins: [expireToken],
  computed: {
    ...mapGetters([
      'myCar',
      'userInfo'
    ])
  },
  methods: {
    modifyCar (info, callback = () => {}) {
      this.$put(`${this.f6Url}/api/clientUserCar`, {
        'Authorization': this.userInfo.token
      }, (res) => {
        if (res.code === 200) {
          callback()
        } else if (res.code === 401) {
          this.refreshToken(this.modifyCar)
        }
      }, {
        carBrandLogo: info.carBrandLogo,
        carId: info.carId,
        carNumber: info.carNumber,
        carVin: info.carVin,
        clientAppId: info.clientAppId,
        clientUserId: info.clientUserId,
        defaultFlag: info.defaultFlag,
        distance: info.distance,
        externalUserId: info.externalUserId,
        userCarId: info.userCarId,
        userId: info.userId
      })
    }
  }
}
// 获取车辆默认ID
export const defaultCarInfo = {
  computed: {
    getDefaultCarInfo () {
      let info = {}
      this.myCar.forEach(item => {
        if (item.userCarId === this.defaultCar) {
          info = item
        }
      })
      return info
    },
    ...mapGetters([
      'defaultCar',
      'myCar'
    ])
  }
}

export const getServerCar = {
  computed: {
    nowCar () {
      let id = this.defaultCar
      let info = {}
      if (this.selectCar) {
        id = this.selectCar
      }
      this.myCar.forEach(item => {
        if (id === item.userCarId) {
          info = item
        }
      })
      return info
    },
    ...mapGetters([
      'myCar',
      'selectCar',
      'storeList',
      'userInfo',
      'defaultCar',
      'defaultStoreId'
    ])
  }
}
