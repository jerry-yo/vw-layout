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
