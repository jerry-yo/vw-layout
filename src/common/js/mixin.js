import Wx from 'Wx'
import {formatDate} from '@/common/js/date'
import {mapActions, mapGetters, mapMutations} from 'vuex'
import {handleWxOrder, handleByOrder} from '@/common/js/config'
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

// 获取预约中 已取消订单列表
export const getOrderListForYy = {
  created () {
    this._getSubscribeOrder()
  },
  computed: {
    handleOrderList () {
      let arr = []
      this.orderList.forEach(order => {
        if ((order.orderStatus === 4 || order.orderStatus === 5) && order.carNumber !== '京A88888') {
          let wxReg = /维修/
          let byReg = /保养/
          let memo = order.memo.split('\uA856')
          if (wxReg.test(memo[1])) {
            arr.push(Object.assign(order, {
              memoInfos: handleWxOrder(memo)
            }))
          }
          if (byReg.test(memo[1])) {
            arr.push(Object.assign(order, {
              memoInfos: handleByOrder(memo)
            }))
          }
        }
      })
      return arr
    }
  },
  methods: {
    isExpiryTime (item) {
      let now = new Date().getTime()
      let str = ''
      if (item.memoInfos.expireTemp < now) {
        str = '已过期'
      } else if (item.orderStatus === 5) {
        str = '已接收'
      }
      return str
    },
    _getSubscribeOrder () {
      this.$get(`${this.f6Url}/api/clientOrder`, {
        'Authorization': this.userInfo.token
      }, (res) => {
        if (res.code === 200) {
          this.orderList = res.data.list
        } else if (res.code === 401) {
          this.refreshToken(this._getSubscribeOrder)
        }
      }, {
        clientAppId: this.userInfo.appId,
        clientUserId: this.userInfo.fUserId,
        userId: this.userInfo.userId,
        deleteFlag: this.ordetType === 'yqx' ? 1 : 0,
        currentPage: 1,
        pageSize: 200
      })
    }
  }
}

// 取消预约单
export const cancelOrderYy = {
  methods: {
    cancelOrderState () {
      this.$post(`${this.gt1Url}/api/f6-app/cancelclientOrder`, this.gt1Header, (res) => {
        if (res.errorCode === 0) {
          if (res.data.code === 0) {
            if (this.$route.name === 'subscribe') {
              this._getSubscribeOrder()
            } else {
              this.$router.push('/subscribe')
            }
          } else {
            this.$Toast({
              position: 'bottom',
              message: res.data.msg
            })
          }
        } else if (res.errorCode !== 0) {
          this.$Toast({
            position: 'bottom',
            message: res.errorMsg
          })
        }
      }, {
        clientAppId: this.userInfo.appId,
        clientUserId: this.userInfo.fUserId,
        type: this.cancelOrderInfo.memoInfos.serverState,
        userCarUnmber: this.cancelOrderInfo.carNumber,
        stationCode: this.cancelOrderInfo.stationCode,
        orderReserveDate: formatDate('YYYY-MM-DD', this.cancelOrderInfo.orderReserveDate + this.cancelOrderInfo.orderReserveStart + 8 * 60 * 60 * 1000),
        orderTime: this.cancelOrderInfo.memoInfos.orderTime.replace(/年|月/g, '-').replace(/日/g, ''),
        orderId: this.cancelOrderInfo.orderId
      })
    }
  }
}

// 维保记录
export const clientMaintain = {
  mixins: [expireToken],
  computed: {
    obligationOrder () {
      let overOrder = []
      let unOverOrder = []
      this.orderList.forEach((item, index) => {
        if (item.carNoWhole !== '京A88888') {
          item = Object.assign(item, {
            stationType: item.businessTypeName === '保养' ? 1 : item.businessTypeName === '维修' ? 2 : 0,
            handleComplateDate: item.complateDate.replace(/-/, '年').replace(/-/, '月').replace(/ /, '日 ').split('.')[0]
          })
          if ((item.balanceStatus === '7000' || item.balanceStatus === '7200') && (item.stationType === 1 || item.stationType === 2)) {
            unOverOrder.push(item)
          } else if (item.balanceStatus === '7100' && (item.stationType === 1 || item.stationType === 2)) {
            overOrder.push(item)
          }
        }
      })
      return {
        overOrder: overOrder,
        unOverOrder: unOverOrder
      }
    }
  },
  methods: {
    getMaintainOrder () {
      this.$get(`${this.f6Url}/api/clientMaintain/list`, {
        'Authorization': this.userInfo.token,
        'Content-Type': 'application/json'
      }, (res) => {
        if (res.code === 200) {
          this.orderList = res.data.list
        } else if (res.code === 401) {
          this.refreshToken(this.getMaintainOrder)
        }
      }, {
        userId: this.userInfo.userId,
        pageSize: 100,
        currentPage: 1,
        clientAppId: this.userInfo.appId,
        clientUserId: this.userInfo.fUserId
      })
    }
  }
}
