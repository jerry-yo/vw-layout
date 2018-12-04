<template>
  <div class="repair-pre" flexContainer>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="font">
        订单详情
      </div>
    </div>
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
        <storeInfo :type="'noclick'" :route="'meal'"></storeInfo>
        <div class="bespoke-date">
          <span>预约时间</span>
          <span @click="showFitTime">{{dateTime(updateOrder)}}</span>
        </div>
        <div class="car-info">
          <div> <span>服务车辆</span><div class="right"><img :src="carLogoUrl + nowCar.imageSrc" alt="">{{`${nowCar.manufacturerName} - ${nowCar.evehicleSystem}`}}</div> </div>
          <div> <span>车牌号</span><span class="right">{{nowCar.carNumber}}</span> </div>
          <div> <span>联系人</span><span class="right">{{userInfo.userTel}}</span> </div>
        </div>
        <div class="fault-info" v-if="true">
          <div class="title">
            故障概要
          </div>
          <div class="fault-con" @click="showUpdateInfo">
            <p class="fault-text">{{updateOrder.updateDesc}}</p>
            <div class="fault-img" v-if="updateOrder.updateImgArr.length > 0">
              <ul :class="updateOrder.updateImgArr.length > 2 ? 'more': ''">
                <li v-for="(item, index) in handleImgs" :key="index">
                  <img :src="gt1UpdateImgUrl + item" alt="" >
                </li>
              </ul>
            </div>
          </div>
          <div class="go-img-info"></div>
        </div>
      </div>
    </Scroll>
    <div class="place-order">
      <div class="server"><a href="tel: 0519-68191385">客服</a></div>
      <div class="tips">预约不会产生任何费用 具体情况请到店后有技师介绍</div>
      <div class="btn" @click="_goPreOrder">确认下单</div>
    </div>
    <checkInfo v-if="faultInfoState" :data="updateOrder" :title="'详情显示'" @closemask="closeUpdateInfo"></checkInfo>
    <keepFitTime v-if="fitTime" @close="closeMask" :store="storeInfos"></keepFitTime>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import storeInfo from '@/base/store-info'
import seleDetectionMenu from '@/base/sele-detection-menu'
import checkInfo from '@/base/check-info'
import keepFitTime from '@/base/keep-fit-time'
import {datePicker, timeToStamp, getFormatDateNow} from '@/common/js/date'
import {mapGetters, mapMutations} from 'vuex'
import {getServerCar} from '@/common/js/mixin'
const EXPIRE_DATE = 7 * 24 * 60 * 60 * 1000
const DEFAULT_HOUR = 13 * 60 * 60 * 1000
export default {
  name: 'repairPreOrder',
  mixins: [getServerCar],
  data () {
    return {
      datePickerShow: false,
      faultInfoState: false,
      fitTime: false
    }
  },
  computed: {
    handleImgs () {
      let arr = []
      this.updateOrder.updateImgArr.forEach(item => {
        if (arr.length < 2) {
          arr.push(item)
        }
      })
      return arr
    },
    storeInfos () {
      if (this.updateOrder.mealStoreIds === '0') {
        return this.storeList[this.defaultStoreId]
      } else {
        return this.mealStoreList[this.defaultStoreId]
      }
    },
    selestore () {
      let arr = []
      this.storeList.forEach(item => {
        if (item.type === 1) {
          arr.push(item)
        }
      })
      return arr[this.defaultStoreId]
    },
    ...mapGetters([
      'updateOrder',
      'mealStoreList'
    ])
  },
  methods: {
    seleDate () {
      this.datePickerShow = true
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
    _goPreOrder () {
      let id = this.defaultStoreId
      if (this.updateOrder.startPoint2) {
        let memo = `${getFormatDateNow()}\uA856${'APP预约套餐服务'}\uA856${this.updateOrder.updateTitle}\uA856${this.nowCar.imageSrc}\uA856${this.updateOrder.updateDesc}\uA856${this.updateOrder.updateImgs}\uA856${this.updateOrder.updateMealPrice}\uA856${this.updateOrder.endTamp}\uA856${this.storeList[id].responserTel || ' '}\uA856${this.storeList[id].stationPositionX || ' '}\uA856${this.storeList[id].stationPositionY || ' '}`
        this.$post(`${this.gt1Url}/api/f6-app/addclientOrder`, this.gt1Header, (res) => {
          if (res.errorCode === 0 && res.data.code === 0) {
            this.$router.push('/reservations?type=tc')
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
            price: 0, // 价格
            depositAmt: 0,
            deleteFlag: 0,
            orderPartList: [],
            carId: this.nowCar.carId, // 车辆ID
            distance: this.nowCar.distance, // 行驶距离
            stationCode: this.storeList[id].stationCode, // 门店编号
            orderReserveDate: this.updateOrder.dateTime, // 订单预约时间
            orderReserveStart: this.updateOrder.startTime,
            orderReserveEnd: this.updateOrder.endTime,
            employeeMemo: '',
            finishmemo: '',
            receivememo: ''
          })
        })
      } else {
        this.$Toast({
          message: '请选择预约时间',
          position: 'bottom'
        })
      }
    },
    closePicker (res) {
      this.datePickerShow = false
      let date = datePicker()
      let nowTemp = timeToStamp(date.nowYear, date.nowMonth, date.nowDay)
      let expireTemp = timeToStamp(date.nowYear + 1, date.nowMonth, date.nowDay)
      if (res.temp >= nowTemp && res.temp < expireTemp) {
        this.setUpdateOrder(Object.assign(res, {
          expireTemp: res.temp + EXPIRE_DATE + DEFAULT_HOUR,
          temp: res.temp + DEFAULT_HOUR
        }))
      } else if (res.temp >= expireTemp) {
        this.$Toast({
          position: 'bottom',
          message: '预约日期不得超过一年'
        })
      } else {
        this.$Toast({
          position: 'bottom',
          message: '预约日期不得小于当前时间'
        })
      }
    },
    _goBack () {
      this.$router.back()
    },
    showUpdateInfo () {
      this.faultInfoState = true
    },
    closeUpdateInfo () {
      this.faultInfoState = false
    },
    showFitTime () {
      this.fitTime = true
    },
    ...mapMutations({
      setUpdateOrder: 'SET_UPDATE_ORDER'
    })
  },
  mounted () {
  },
  components: {
    storeInfo,
    checkInfo,
    seleDetectionMenu,
    keepFitTime,
    Scroll
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.repair-pre
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
      .fault-info
        overflow: hidden
        background-color: #fff
        .title
          height: 78px
          background-color: #f2f2f2
          padding: 0 30px
          padding-top: 30px
          line-height: 48px
          font-size: 24px
          color: #ababab
          font-weight: bold
        .fault-con
          overflow: hidden
          margin: 0 30px 0px 30px
          bg-image('../../common/imgs/mind/leftright')
          background-size: 15px 24px
          background-repeat: no-repeat
          background-position: right center
          .fault-text
            background-color: #fff
            margin: 20px 0px
            width: 600px
            font-size: 22px
            color: #5b5b5b
            line-height: 1.5em
            overflow: hidden
            text-overflow: ellipsis
            display: -webkit-box
            -webkit-line-clamp: 2
            -webkit-box-orient: vertical
          .fault-img
            height: 144px
            display: flex
            padding-bottom: 34px
            & > ul
              padding-right: 35px
              display: flex
              li
                width: 110px
                margin-right: 10px
                img
                  display: block
                  width: 110px
                  height: 110px
                  object-fit: cover
              &.more
                bg-image('../../common/imgs/ellipsis')
                background-size: 27px 6px
                background-repeat: no-repeat
                background-position: right center
      .checkout-menu
        overflow: hidden
        .title
          height: 66px
          padding: 0 30px
          padding-top: 20px
          font-size: 22px
          color: #ababab
          line-height: 46px
          span
            letter-spacing: 3px
            margin-left: 15px
  .place-order
    height: 98px
    display: flex
    background-color: #fff
    .server
      width: 133px
      display: flex
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
