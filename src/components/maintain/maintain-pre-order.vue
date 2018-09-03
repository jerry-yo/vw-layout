<template>
  <div class="maintain-pre" flexContainer>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="font">
        订单详情
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
    <Scroll class="container" ref="repairPre">
      <div class="wrapper">
        <storeInfo :type="'noclick'"></storeInfo>
        <div class="bespoke-date">
          <span>预约时间</span>
          <span @click="showFitTime">{{dateTime(orderTime)}}</span>
        </div>
        <div class="car-info">
          <div> <span>服务车辆</span><div class="right"><img v-lazy="carLogoUrl + myCar[0].imageSrc" alt="">{{`${nowCar.manufacturerName} - ${nowCar.evehicleSystem}`}}</div> </div>
          <div> <span>车牌号</span><span class="right">{{nowCar.carNumber}}</span> </div>
          <div> <span>联系人</span><span class="right">{{userInfo.userTel}}</span> </div>
        </div>
        <div class="server-img">
          <div class="con">
            <ul>
              <li class="imgs" v-for="(item) in this.allServerMoney.partList" :key="item.customCode">
                <img v-lazy="imgpartUrl + item.customCode">
              </li>
              <li class="no-by" v-if="this.allServerMoney.partInfos === 0 && this.allServerMoney.servers === 0"></li>
              <li class="no-part" v-if="this.allServerMoney.partInfos === 0 && this.allServerMoney.servers !== 0"></li>
              <li class="eiss" v-if="this.allServerMoney.partList.length > 2"></li>
            </ul>
            <div class="goods-info">
              <span>共{{allServerMoney.partInfos}}个配件、{{allServerMoney.servers}}个服务</span>
              <div >配件总额：<span>{{'￥' + allServerMoney.money}}</span></div >
            </div>
          </div>
        </div>
      </div>
    </Scroll>
    <div class="place-order">
      <div class="server">客服</div>
      <div class="tips">预约不会产生任何费用 具体情况请到店后有技师介绍</div>
      <div class="btn" @click="_goPreOrder">确认下单</div>
    </div>
    <keepFitTime v-if="fitTime" @close="closeMask"></keepFitTime>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import {mapGetters, mapMutations} from 'vuex'
import {getServerCar, expireToken} from '@/common/js/mixin'
import storeInfo from '@/base/store-info'
import keepFitTime from '@/base/keep-fit-time'
import {datePicker} from '@/common/js/date'
export default {
  name: 'maintain-pre',
  mixins: [getServerCar, expireToken],
  data () {
    return {
      imgs: [0, 1, 2, 3],
      fitTime: false,
      orderTime: {}
    }
  },
  computed: {
    allServerMoney () {
      let money = 0
      let partInfos = 0
      let servers = 0
      let partList = []
      this.allServerList.forEach(item => {
        if (item.isChecked && item.customerServer === 'old') {
          money += item.amount
          servers++
          if (item.partInfo !== null && item.partInfo.isChecked) {
            money += item.partInfo.sellPrice * item.partInfo.number
            partInfos++
            partList.push(item.partInfo)
          }
        }
      })
      return {
        money: money,
        partInfos: partInfos,
        servers: servers,
        partList: partList
      }
    },
    serverOrder () {
      let list = []
      this.allServerList.forEach(item => {
        if (item.isChecked && item.customerServer === 'old') {
          if (item.partInfo !== null && item.partInfo.isChecked) {
            list.push({
              type: 2,
              number: item.partInfo.number,
              genaraprice: item.partInfo.sellPrice,
              retailprice: item.partInfo.sellPrice,
              projectid: item.partInfo.pkId,
              projectname: item.partInfo.name
            })
          }
          list.push({
            type: 0,
            projectname: item.name,
            genaraprice: item.amount,
            retailprice: item.amount,
            number: 1,
            projectid: item.pkId
          })
        }
      })
      return list
    },
    ...mapGetters([
      'allServerList'
    ])
  },
  methods: {
    _goBack () {
      this.$router.go(-1)
    },
    dateTime (res) {
      let str = ''
      if (!res.time) {
        str = '未选择预约时间'
      } else {
        str = `${res.today ? '今' : '明'}天  ${res.time}`
      }
      return str
    },
    _goPreOrder () {
      let id = this.defaultStoreId
      if (this.orderTime.time && this.orderTime.time !== 0) {
        this.$f6post(`${this.f6Url}/api/clientOrder`, {
          'Authorization': this.userInfo.token,
          'Content-Type': 'application/json'
        }, (res) => {
          if (res.code === 401) {
            this.refreshToken(this._goPreOrder)
          } else if (res.code === 200) {
            this.setUpdateOrder(Object.assign(this.storeList[id], this.orderTime))
            this.$router.push('/reservations?type=by')
          }
        }, {
          clientAppId: this.userInfo.appId,
          clientUserId: this.userInfo.fUserId,
          orderStationId: this.storeList[id].stationId, // 用户车辆主键
          stationName: this.storeList[id].stationName,
          employeeId: '',
          employeeName: '',
          userContactTel: this.userInfo.userTel, // 联系电话
          orderUserName: this.userInfo.userName, // 订单用户名
          userCarUnmber: this.nowCar.carNumber, // 车牌号
          userCarId: this.nowCar.userCarId,
          userId: this.userInfo.userId,
          OrderStatus: 4,
          memo: '',
          orderReserveTime: '',
          price: this.allServerMoney.money, // 价格
          depositAmt: 0,
          deleteFlag: 0,
          orderPartList: this.serverOrder,
          carId: this.nowCar.carId, // 车辆ID
          distance: this.nowCar.distance, // 行驶距离
          stationCode: this.storeList[id].stationCode, // 门店编号
          orderReserveDate: this.orderTime.dateTime, // 订单预约时间
          orderReserveStart: this.orderTime.startTime,
          orderReserveEnd: this.orderTime.endTime
        })
      } else {
        this.$Toast({
          message: '请选择预约时间',
          position: 'bottom'
        })
      }
    },
    showFitTime () {
      this.fitTime = true
    },
    closeMask (res) {
      if (res.time !== 0 && res.time) {
        let now = datePicker()
        let end = res.time.split(':')
        let end1 = parseInt(end[0]) + 1
        let startTime = `${now.nowYear}-${now.nowMonth > 9 ? now.nowMonth : '0' + now.nowMonth}-${now.nowDay > 9 ? now.nowDay : '0' + now.nowDay} ${res.time}:00`
        let dateTime = `${now.nowYear}-${now.nowMonth > 9 ? now.nowMonth : '0' + now.nowMonth}-${now.nowDay > 9 ? now.nowDay : '0' + now.nowDay}`
        let endTime = `${now.nowYear}-${now.nowMonth > 9 ? now.nowMonth : '0' + now.nowMonth}-${now.nowDay > 9 ? now.nowDay : '0' + now.nowDay} ${end1 > 9 ? end1 : '0' + end1}:${end[1]}:00`
        this.orderTime = Object.assign(res, {
          startTime: startTime,
          endTime: endTime,
          dateTime: dateTime,
          showTime: this.dateTime(res)
        })
      }
      this.fitTime = false
    },
    ...mapMutations({
      setUpdateOrder: 'SET_UPDATE_ORDER'
    })
  },
  components: {
    Scroll,
    keepFitTime,
    storeInfo
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"

.maintain-pre
  background-color: #f4f4f4
  flex-direction: column
  height: 100vh
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
      font-size: 36px
      color: #5b5b5b
      font-weight: bolder
      transform: skewX(-10deg)
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
      .bespoke-date
        height: 90px
        display: flex
        line-height: 90px
        margin-bottom: 10px
        padding: 0 30px
        background-color: #fff
        span
          flex: 1
          &:nth-child(1)
            font-size: 24px
            color: #ababab
          &:nth-child(2)
            font-size: 22px
            color: #ff8040
            padding-right: 50px
            text-align: right
            bg-image('../../common/imgs/repair/go')
            background-repeat: no-repeat
            background-size: 15px 24px
            background-position: right center
      .car-info
        height: 180px
        display: flex
        flex-direction: column
        padding: 10px 30px
        margin-bottom: 10px
        background-color: #fff
        & > div
          flex: 1
          display: flex
          line-height: 60px
          span:nth-child(1)
            flex: 1
            font-size: 24px
            color: #ababab
          .right
            display: flex
            align-items: center
            padding-left: 60px
            text-align: center
            font-size: 22px
            color: #5b5b5b
            img
              display: inline-block
              width: 50px
              height: overflow
              margin-right: 15px
      .server-img
        height: 190px
        display: flex
        background-color: #fff
        padding: 18px 30px
        .con
          flex: 1
          display: flex
          flex-direction: column
          bg-image('../../common/imgs/mind/leftright')
          background-repeat: no-repeat
          background-size: 15px 24px
          background-position: right center
          ul
            height: 120px
            display: flex
            .imgs
              box-sizing: border-box
              width: 120px
              height: 120px
              margin-right: 10px
            .no-part
              box-sizing: border-box
              width: 120px
              height: 120px
              bg-image('../../common/imgs/order/have_server')
              background-repeat: no-repeat
              background-size: 120px 120px
              background-position: center center
            .no-by
              box-sizing: border-box
              width: 120px
              height: 120px
              bg-image('../../common/imgs/order/no_by')
              background-repeat: no-repeat
              background-size: 120px 120px
              background-position: center center
            .eiss
              width: 27px
              bg-image('../../common/imgs/ellipsis')
              background-repeat: no-repeat
              background-size: 27px 6px
              background-position: center center
          .goods-info
            flex: 1
            display: flex
            padding-top: 10px
            font-size: 18px
            & > span
              flex: 1
              color: #5b5b5b
            & > div
              color: #5b5b5b
              span
                color: #ff3e3e
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
      justify-content: center
      align-items: center
      padding: 0 28px
      font-size: 20px
      color: #b9b9b9
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
