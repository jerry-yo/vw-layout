<template>
  <div class="maintain" flexContainer>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="font" @click="_goSelectCar">
        <h2>{{`${nowCar.manufacturerName} - ${nowCar.evehicleSystem}`}}</h2>
        <p><span>{{nowCar.carNumber}}</span><span>丨</span><span>{{nowCar.distance}}km</span></p>
      </div>
    </div>
    <div class="service-flow">
      <span class="bg bg1">选择服务</span>
      <span>-</span>
      <span class="bg bg2">选择门店</span>
      <span>-</span>
      <span class="bg bg3">确认订单</span>
      <span>-</span>
      <span class="bg bg4">到店服务</span>
    </div>
    <Scroll class="container" ref="maintain">
      <div class="wrapper">
        <storeInfo></storeInfo>
        <serverModel v-for="(item, index) in defaultServer" :key="index" :server="item" :serverid="index"></serverModel>
        <div class="add-server" @click="_goAddServer">
          添加新服务
        </div>
        <div class="server-tips">
          不选服务可以下单后到店进行选择哦
        </div>
      </div>
    </Scroll>
    <div class="place-order">
      <div class="server">客服</div>
      <div class="tips">
        <div class="nums">
          不包含服务费
        </div>
        <div class="money">
          <span>共{{''}}项服务</span>
          <span>{{'￥' + ''}}</span>
        </div>
      </div>
      <div class="btn" @click="_goMaintainPreOrder">去预约</div>
    </div>
  </div>
</template>

<script>
import serverModel from '@/base/server-model'
import Scroll from '@/base/scroll/scroll'
import storeInfo from '@/base/store-info'
import {mapGetters, mapMutations} from 'vuex'
import {expireToken, defaultCarInfo} from '@/common/js/mixin'
export default {
  name: 'maintain',
  mixins: [expireToken, defaultCarInfo],
  data () {
    return {}
  },
  created () {
    if (this.allServerList.length !== 30) {
      this._getAllServie()
    }
  },
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
    defaultServer () {
      let defaultList = []
      this.allServerList.forEach(item => {
        if (item.customerServer === 'mr') {
          defaultList.push(item)
        }
      })
      console.log(defaultList)
      return defaultList
    },
    ...mapGetters([
      'selectCar',
      'storeList',
      'userInfo',
      'allServerList'
    ])
  },
  methods: {
    _goBack () {
      this.setDefaultStoreId(0)
      this.setSelectCar(0)
      this.$router.back()
    },
    _goAddServer () {
      this.$router.push('/add-new-server')
    },
    _goMaintainPreOrder () {
      this.$router.push('/maintain-pre-order')
    },
    _goSelectCar () {
      this.$router.push('/garage?type=select')
    },
    _getAllServie () {
      let url = `${this.f6Url}/api/clientOrder/getRecommendList?userCarId=${this.nowCar.userCarId}&mileage=80000
      &stationId=${this.storeList[0].stationId}&clientAppId=${this.userInfo.appId}&clientUserId=${this.userInfo.fUserId}`
      this.$get(url, {
        'Authorization': this.userInfo.token
      }, (res) => {
        if (res.code === 200) {
          this.handleServerList(res.data)
        } else if (res.code === 401) {
          this.refreshToken(this._getAllServie)
        }
      })
    },
    handleServerList (data) {
      let reg = /TJ/
      let arr = []
      data.forEach(item => {
        if (reg.test(item.customCode)) {
          arr.push(Object.assign(item, {
            customerType: 'mr',
            customerServer: 'mr',
            isChecked: false
          }))
        } else {
          arr.push(Object.assign(item, {
            customerType: 'qt',
            customerServer: 'qt',
            isChecked: false
          }))
        }
      })
      this.setAllServerList(arr)
    },
    ...mapMutations({
      setSelectCar: 'SET_SELECTCAR',
      setDefaultStoreId: 'SET_DEFAULTSTORE_ID',
      setMaintainOrder: 'SET_MAINTAIN_ORDER',
      setAllServerList: 'SET_ALL_SERVER_LIST'
    })
  },
  components: {
    serverModel,
    Scroll,
    storeInfo
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.maintain
  height: 100vh
  position: relative
  background-color: #f4f4f4
  flex-direction: column
  .action-bar
    display: flex
    height: 88px
    background-color: #fff
    .font
      flex: 1
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      margin-right: 120px
      h2
        font-size: 30px
        line-height: 42px
        color: #5b5b5b
        font-weight: bolder
        transform: skewX(-10deg)
      p
        font-size: 22px
        color: #5b5b5b
        line-height: 34px
        span:nth-child(2)
          margin: 0 15px
    .go-back
      width: 120px
      height: 88px
      bg-image('../../common/imgs/order/back')
      background-repeat: no-repeat
      background-position: 30px center
      background-size: 18px 30px
  .service-flow
    height: 70px
    background-color: #fff1e4
    padding: 0 30px
    display: flex
    font-size: 22px
    color: #ff803f
    align-items: center
    justify-content: space-between
    .bg
      padding-left: 30px
      background-size: 40px 40px
      background-repeat: no-repeat
      background-position: -10px center
      &.bg1
        bg-image('../../common/imgs/repair/sele_server')
      &.bg2
        bg-image('../../common/imgs/repair/sele_store')
      &.bg3
        bg-image('../../common/imgs/repair/order')
      &.bg4
        bg-image('../../common/imgs/repair/car')
        background-position: -7px center
  .container
    flex: 1
    overflow: hidden
    .wrapper
      position: relative
      .add-server
        margin-top: 30px
        height: 80px
        line-height: 80px
        background-color: #fff
        padding: 0 30px
        padding-left: 85px
        font-size: 26px
        color: #5b5b5b
        bg-image('../../common/imgs/repair/add_server')
        background-size: 20px 20px
        background-repeat: no-repeat
        background-position: 30px center
      .server-tips
        height: 90px
        line-height: 90px
        text-align: center
        font-size: 22px
        color: #969696
  .place-order
    height: 98px
    display: flex
    background-color: #fff
    .server
      width: 133px
      text-align: center
      padding-top: 58px
      font-size: 20px
      color: #626262
      border-right: 1px solid #f2f2f2
      bg-image('../../common/imgs/repair/customer_service')
      background-size: 24px 21px
      background-repeat: no-repeat
      background-position: center 25px
    .tips
      flex: 1
      display: flex
      flex-direction: column
      justify-content: center
      .nums
        height: 35px
        line-height: 35px
        padding-right: 30px
        font-size: 22px
        color: #afafaf
        text-align: right
      .money
        height: 40px
        line-height: 40px
        display: flex
        span
          &:nth-child(1)
            padding-left: 30px
            font-size: 20px
            color: #626262
          &:nth-child(2)
            flex: 1
            font-size: 34px
            color: #ff5050
            font-weight: bold
            padding-right: 30px
            text-align: right
    .btn
      width: 286px
      text-align: center
      line-height: 98px
      font-size: 36px
      color: #fff
      font-weight: bold
      bg-image('../../common/imgs/repair/ordered_btn')
      background-size: 286px 98px
      background-repeat: no-repeat
      background-position: center center
</style>
