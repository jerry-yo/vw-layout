import Wx from 'Wx'
import {mapActions, mapGetters, mapMutations} from 'vuex'

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
export const expireToken = {
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    refreshToken (callback = () => {}) {
      this.$post(`${this.gt1Url}/api/f6-app/getToken`, this.headers_1, (res) => {
        if (res.data.code === 0) {
          this.updateUserInfo({
            token: res.data.data
          })
          setTimeout(() => {
            callback(res.data.data)
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
  methods: {
    queryModal () {
      this.$get(`${this.f6Url}/api/clientUserCar/model?searchContent=${this.content}&searchConditon=${this.conditon}`, this.headers_2, (res) => {
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
      'myCar'
    ])
  },
  methods: {
    modifyCar (info, type, id) {
      // type: 'delete_1'多选删除默认，重新设置默认'delete_2'修改默认'delete_3'普通修改
      this.$put(`${this.f6Url}/api/clientUserCar`, this.headers_2, (res) => {
        if (res.code === 200) {
          if (type === 'delete_1') {
            this.checkInfos.default = false
          }
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
