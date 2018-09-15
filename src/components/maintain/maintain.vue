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
    <Scroll class="container" ref="maintain" :data="allServerList">
      <div class="wrapper">
        <storeInfo :route="'maintain'"></storeInfo>
        <serverModel
          v-for="item in defaultServer"
          :key="item.pkId"
          :server="item"
          @changeNumber="_changeNumberParent"
          @clickServer="_clickServerParent"
          @checkGood="_checkGoodParent"
          @checkServer="_checkServerParent"
          @editServer="_editServerParent"
          @saveServer="_saveServerParent"
          @cancelServer="_cancelServerParent"
        ></serverModel>
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
          <span>共{{allServerMoney.partInfos}}件材料</span>
          <span>包含服务费</span>
        </div>
        <div class="money">
          <span>共{{allServerMoney.servers}}项服务</span>
          <span>{{'￥' + allServerMoney.money}}</span>
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
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {expireToken, getServerCar} from '@/common/js/mixin'
import {handleServerModel} from '@/common/js/servermixin'
export default {
  name: 'maintain',
  mixins: [expireToken, getServerCar, handleServerModel],
  data () {
    return {
      allmileagn: 2000000
    }
  },
  created () {
    if (this.allServerList.length !== 30) {
      this._getAllServie()
    }
  },
  computed: {
    defaultServer () {
      let cg = []
      let tj = []
      let qt = []
      this.allServerList.forEach(item => {
        if (item.customerServer === 'old') {
          if (item.customerType === 'cg') {
            cg.push(item)
          } else if (item.customerType === 'tj') {
            tj.push(item)
          } else if (item.customerType === 'qt') {
            qt.push(item)
          }
        }
      })
      return cg.concat(tj).concat(qt)
    },
    allServerMoney () {
      let money = 0
      let partInfos = 0
      let servers = 0
      this.allServerList.forEach(item => {
        if (item.isChecked && item.customerServer === 'old') {
          money += item.amount
          servers++
          if (item.partInfo !== null && item.partInfo.isChecked) {
            money += item.partInfo.sellPrice * item.partInfo.number
            partInfos++
          }
        }
      })
      return {
        money: money,
        partInfos: partInfos,
        servers: servers
      }
    },
    ...mapGetters([
      'defaultStoreId'
    ])
  },
  methods: {
    _goBack () {
      this.clearOrderAllInfo('by')
      this.$router.back()
    },
    _goAddServer () {
      this.$router.push(`/add-new-server`)
    },
    _goMaintainPreOrder () {
      this.checkSeleServers()
      this.$router.push('/maintain-pre-order')
    },
    checkSeleServers () {
      let cg = []
      let tj = []
      let qt = []
      this.allServerList.forEach(item => {
        if (item.customerServer === 'old' && item.isChecked) {
          if (item.customerType === 'cg') {
            if (item.partInfo && item.partInfo.isChecked) {
              cg.push(item)
            } else {
              cg.push(Object.assign(item, {
                partInfo: null
              }))
            }
          } else if (item.customerType === 'tj') {
            if (item.partInfo && item.partInfo.isChecked) {
              tj.push(item)
            } else {
              tj.push(Object.assign(item, {
                partInfo: null
              }))
            }
          } else if (item.customerType === 'qt') {
            if (item.partInfo && item.partInfo.isChecked) {
              qt.push(item)
            } else {
              qt.push(Object.assign(item, {
                partInfo: null
              }))
            }
          }
        }
      })
      this.setSeleServersInfo(cg.concat(tj).concat(qt))
    },
    _goSelectCar () {
      this.$router.push('/garage?type=select')
    },
    _getAllServie () {
      let id = this.defaultStoreId
      let url = `${this.f6Url}/api/clientOrder/getRecommendList?userCarId=${this.nowCar.userCarId}&mileage=${this.allmileagn}&stationId=${this.storeList[id].stationId}&clientAppId=${this.userInfo.appId}&clientUserId=${this.userInfo.fUserId}`
      this.$get(url, {
        'Authorization': this.userInfo.token,
        'Content-Type': 'application/json'
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
      let i = 0
      data.forEach(item => {
        let obj = null
        let haspartInfo = false
        if (item.partInfo !== null) {
          obj = Object.assign(item.partInfo, {
            isChecked: false,
            number: 1
          })
          haspartInfo = true
        }
        if (!reg.test(item.customCode)) {
          arr.push(Object.assign(item, {
            customerType: 'qt', // cg 常规 tj 推荐 qt 其他
            customerServer: 'new',
            isChecked: false,
            state: -1,
            partInfo: obj
          }))
        } else {
          let flag = (haspartInfo && i === 0) ? 0 : -1
          arr.push(Object.assign(item, {
            customerType: 'cg', // cg 常规 tj 推荐 qt 其他
            customerServer: 'old',
            isChecked: false,
            state: flag,
            partInfo: obj
          }))
          i++
        }
      })
      this.setAllServerList(JSON.parse(JSON.stringify(arr)))
      this.setStaticServerList(JSON.parse(JSON.stringify(arr)))
    },
    ...mapMutations({
      setAllServerList: 'SET_ALL_SERVER_LIST',
      setStaticServerList: 'SET_STATIC_SERVER_LIST',
      modifyAllServerList: 'MODIFY_ALL_SERVER_LIST',
      setSeleServersInfo: 'SET_SELE_SERVERS_INFO'
    }),
    ...mapActions([
      'clearOrderAllInfo'
    ])
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
        display: flex
        height: 35px
        line-height: 35px
        span
          &:nth-child(1)
            padding-left: 30px
            font-size: 20px
            color: #626262
          &:nth-child(2)
            flex: 1
            font-size: 22px
            color: #afafaf
            font-weight: bold
            padding-right: 30px
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
