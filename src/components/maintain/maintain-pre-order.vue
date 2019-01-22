<template>
  <div class="maintain-pre" flexContainer>
    <headerBar contentTitle="订单详情" contentColor="#5b5b5b" @leftClick="_goBack"></headerBar>
    <div class="service-flow">
      <span class="bg bg2">选择门店</span>
      <span>-</span>
      <span class="bg bg1">选择服务</span>
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
          <span @click="showFitTime">{{dateTime(updateOrder)}}</span>
        </div>
        <div class="car-info">
          <div> <span>服务车辆</span><div class="right"><img v-lazy="carLogoUrl + nowCar.imageSrc" alt="">{{`${nowCar.manufacturerName} - ${nowCar.evehicleSystem}`}}</div> </div>
          <div> <span>车牌号</span><span class="right">{{nowCar.carNumber}}</span> </div>
          <div> <span>联系人</span><span class="right">{{userInfo.userTel}}</span> </div>
        </div>
        <div class="server-img" @click="lookServerInfo">
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
              <div >总额：<span>{{'￥' + (allServerMoney.partMoney + allServerMoney.serverMoney)}}</span></div >
            </div>
          </div>
        </div>
      </div>
    </Scroll>
    <div class="place-order">
      <div class="server"><a href="tel: 0519-68191385">客服</a></div>
      <div class="tips">预约不会产生任何费用 具体情况请到店后有技师介绍</div>
      <div class="btn" @click="_goPreOrder">确认下单</div>
    </div>
    <keepFitTime v-if="fitTime" @close="closeMask" :store="storeInfos"></keepFitTime>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import headerBar from '@/base/headerBar'
import {mapGetters, mapMutations} from 'vuex'
import {getServerCar, expireToken} from '@/common/js/mixin'
import storeInfo from '@/base/store-info'
import keepFitTime from '@/base/keep-fit-time'
import {datePicker, getFormatDateNow, timeToStamp} from '@/common/js/date'
export default {
  name: 'maintain-pre',
  mixins: [getServerCar, expireToken],
  data () {
    return {
      imgs: [0, 1, 2, 3],
      fitTime: false
    }
  },
  computed: {
    allServerMoney () {
      let partMoney = 0
      let serverMoney = 0
      let partInfos = 0
      let servers = 0
      let partList = []
      let partListStr = ''
      this.allServerList.forEach(item => {
        if (item.isChecked && item.customerServer === 'old') {
          serverMoney += item.amount
          servers++
          if (item.partInfo !== null && item.partInfo.isChecked) {
            partMoney += item.partInfo.sellPrice * item.partInfo.number
            partInfos += item.partInfo.number
            partList.push(item.partInfo)
            partListStr += `${item.partInfo.customCode},`
          }
        }
      })
      return {
        partMoney: partMoney,
        serverMoney: serverMoney,
        partInfos: partInfos,
        servers: servers,
        partList: partList,
        partListStr: partListStr
      }
    },
    serverOrder () {
      let list = []
      this.allServerList.forEach(item => {
        if (item.isChecked && item.customerServer === 'old') {
          if (item.partInfo !== null && item.partInfo.isChecked) {
            let remark = `${item.pkId}\uA856${item.partInfo.customCode}\uA856${item.partInfo.brand}\uA856${item.partInfo.supplierCode}\uA856${item.partInfo.spec || ' '}`
            list.push({
              type: 2,
              number: item.partInfo.number,
              genaraprice: item.partInfo.sellPrice,
              retailprice: item.partInfo.sellPrice,
              projectid: item.partInfo.pkId,
              projectname: item.partInfo.name,
              remark: remark
            })
            list.push({
              type: 0,
              projectname: item.name,
              genaraprice: item.amount,
              retailprice: item.amount,
              number: 1,
              projectid: item.pkId,
              remark: item.partInfo.pkId
            })
          } else {
            list.push({
              type: 0,
              projectname: item.name,
              genaraprice: item.amount,
              retailprice: item.amount,
              number: 1,
              projectid: item.pkId
            })
          }
        }
      })
      return list
    },
    storeInfos () {
      return this.storeList[this.defaultStoreId]
    },
    ...mapGetters([
      'allServerList',
      'updateOrder'
    ])
  },
  methods: {
    _goBack () {
      this.$router.go(-1)
    },
    dateTime (res) {
      let str = ''
      if (!res.startPoint2) {
        str = '未选择预约时间'
      } else {
        str = `${res.today ? '今' : '明'}天  ${res.startPoint2}`
      }
      return str
    },
    _goPreOrder () {
      let id = this.defaultStoreId
      if (this.updateOrder.startPoint2) {
        let memo = `${getFormatDateNow()}\uA856${'APP预约保养服务'}\uA856${this.nowCar.imageSrc}\uA856${this.allServerMoney.servers}\uA856${this.allServerMoney.serverMoney}\uA856${this.allServerMoney.partInfos}\uA856${this.allServerMoney.partMoney}\uA856${this.allServerMoney.partListStr}\uA856${this.updateOrder.endTamp}\uA856${this.storeList[id].responserTel || ' '}\uA856${this.storeList[id].stationPositionX || ' '}\uA856${this.storeList[id].stationPositionY || ' '}`
        this.$post(`${this.gt1Url}/api/f6-app/addclientOrder`, this.gt1Header, (res) => {
          if (res.errorCode === 0 && res.data.code === 0) {
            this.$router.push('/reservations?type=by')
          } else if (res.errorCode === 0 && res.data.code !== 0) {
            this.$Toast({
              position: 'bottom',
              message: res.data.msg
            })
          } else {
            this.$Toast({
              position: 'bottom',
              message: '服务器错误'
            })
          }
        }, {
          json: JSON.stringify({
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
            memo: memo,
            orderReserveTime: '',
            price: this.allServerMoney.partMoney + this.allServerMoney.serverMoney, // 价格
            depositAmt: 0,
            deleteFlag: 0,
            orderPartList: this.serverOrder,
            carId: this.nowCar.carId, // 车辆ID
            distance: this.nowCar.distance, // 行驶距离
            stationCode: this.storeList[id].stationCode, // 门店编号
            orderReserveDate: this.updateOrder.dateTime, // 订单预约时间
            orderReserveStart: this.updateOrder.startTime,
            orderReserveEnd: this.updateOrder.endTime,
            employeeMemo: '员工备注',
            finishmemo: '完成备注',
            receivememo: '接受备注'
          })
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
      if (res.startPoint2) {
        let now = datePicker()
        let startTime = null
        let dateTime = null
        let endTime = null
        let endTamp = null
        if (res.today) {
          startTime = `${now.nowYear}-${now.nowMonth > 9 ? now.nowMonth : '0' + now.nowMonth}-${now.nowDay > 9 ? now.nowDay : '0' + now.nowDay} ${res.startPoint2}:00`
          dateTime = `${now.nowYear}-${now.nowMonth > 9 ? now.nowMonth : '0' + now.nowMonth}-${now.nowDay > 9 ? now.nowDay : '0' + now.nowDay}`
          endTime = `${now.nowYear}-${now.nowMonth > 9 ? now.nowMonth : '0' + now.nowMonth}-${now.nowDay > 9 ? now.nowDay : '0' + now.nowDay} ${res.endPoint2}:00`
          endTamp = timeToStamp(now.nowYear, now.nowMonth, now.nowDay, res.endPoint2.split(':')[0])
        } else {
          startTime = `${now.nowYear}-${now.nowMonth > 9 ? now.nowMonth : '0' + now.nowMonth}-${now.nowDay + 1 > 9 ? now.nowDay + 1 : '0' + now.nowDay} ${res.startPoint2}:00`
          dateTime = `${now.nowYear}-${now.nowMonth > 9 ? now.nowMonth : '0' + now.nowMonth}-${now.nowDay + 1 > 9 ? now.nowDay + 1 : '0' + now.nowDay}`
          endTime = `${now.nowYear}-${now.nowMonth > 9 ? now.nowMonth : '0' + now.nowMonth}-${now.nowDay + 1 > 9 ? now.nowDay + 1 : '0' + now.nowDay} ${res.endPoint2}:00`
          endTamp = timeToStamp(now.nowYear, now.nowMonth, now.nowDay + 1, res.endPoint2.split(':')[0])
        }
        this.setUpdateOrder(Object.assign(res, {
          startTime: startTime,
          endTime: endTime,
          dateTime: dateTime,
          endTamp: endTamp
        }))
      }
      this.fitTime = false
    },
    lookServerInfo () {
      if (!this.allServerMoney.partInfos && !this.allServerMoney.servers) {
        this.$Toast({
          position: 'bottom',
          message: '无具体服务项目和材料'
        })
      } else {
        this.$router.push('/server-info')
      }
    },
    ...mapMutations({
      setUpdateOrder: 'SET_UPDATE_ORDER'
    })
  },
  components: {
    Scroll,
    keepFitTime,
    storeInfo,
    headerBar
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"

.maintain-pre
  background-color: #f4f4f4
  flex-direction: column
  height: 100vh
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
      display: flex
      width: 133px
      text-align: center
      padding-top: 58px
      border-right: 1px solid #f2f2f2
      bg-image('../../common/imgs/repair/customer_service')
      background-size: 24px 21px
      background-repeat: no-repeat
      background-position: center 25px
      & > a
        flex: 1
        font-size: 20px
        color: #626262
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
