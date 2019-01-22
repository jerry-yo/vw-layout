<template>
  <div class="repair-pre" flexContainer>
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
        <storeInfo :type="'noclick'" :route="'repair'"></storeInfo>
        <div class="bespoke-date">
          <span>预约时间</span>
          <span @click="seleDate">{{updateOrder.falutDate ? updateOrder.falutDate : '选择时间'}}</span>
        </div>
        <div class="car-info">
          <div> <span>服务车辆</span><div class="right"><img v-lazy="carLogoUrl + nowCar.imageSrc" alt="">{{`${nowCar.manufacturerName} - ${nowCar.evehicleSystem}`}}</div> </div>
          <div> <span>车牌号</span><span class="right">{{nowCar.carNumber}}</span> </div>
          <div> <span>联系人</span><span class="right">{{userInfo.userTel}}</span> </div>
        </div>
        <div class="fault-info" v-if="updateOrder.faultText.length > 0 || updateOrder.imgArr.length > 0">
          <div class="title">
            故障概要
          </div>
          <div class="fault-con" @click="showFaultInfo">
            <p class="fault-text">{{updateOrder.faultText}}</p>
            <div class="fault-img" v-if="updateOrder.imgArr.length > 0">
              <ul :class="updateOrder.imgArr.length > 2 ? 'more': ''">
                <li v-for="(item, index) in handleImgs" :key="index">
                  <img :src="item" alt="" >
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
      <div class="btn" @click="goRepairOrder">确认下单</div>
    </div>
    <datePickerMask v-if="datePickerShow" @close="closePicker"></datePickerMask>
    <checkInfo v-if="faultInfoState" :data="updateOrder" @closemask="closeCheckInfo"></checkInfo>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import storeInfo from '@/base/store-info'
import headerBar from '@/base/headerBar'
import seleDetectionMenu from '@/base/sele-detection-menu'
import datePickerMask from '@/base/date-picker'
import checkInfo from '@/base/check-info'
import {datePicker, timeToStamp, getFormatDateNow, formatDate} from '@/common/js/date'
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
      faultInfoState: false
    }
  },
  computed: {
    handleImgs () {
      let arr = []
      this.updateOrder.imgArr.forEach(item => {
        if (arr.length < 2) {
          arr.push(item)
        }
      })
      return arr
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
      'updateOrder'
    ])
  },
  methods: {
    seleDate () {
      this.datePickerShow = true
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
    goRepairOrder () {
      if (this.updateOrder.falutDate) {
        let memo = `${getFormatDateNow()}\uA856${'APP预约维修服务'}\uA856${this.updateOrder.faultText ? this.updateOrder.faultText : ''}\uA856${this.nowCar.imageSrc}\uA856${this.updateOrder.faultImgs}\uA856${this.updateOrder.expireTemp}\uA856${this.selestore.responserTel || ' '}\uA856${this.selestore.stationPositionX || ' '}\uA856${this.selestore.stationPositionY || ' '}`
        this.$post(`${this.gt1Url}/api/f6-app/addclientOrder`, this.gt1Header, (res) => {
          if (res.errorCode === 0 && res.data.code === 0) {
            this.$router.push('/reservations?type=wx')
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
            orderStationId: this.selestore.stationId, // 用户车辆主键
            stationName: this.selestore.stationName,
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
            stationCode: this.selestore.stationCode, // 门店编号
            orderReserveDate: formatDate('YYYY-MM-DD', this.updateOrder.temp), // 订单预约时间
            orderReserveStart: formatDate('YYYY-MM-DD hh:mm:ss', this.updateOrder.temp),
            orderReserveEnd: formatDate('YYYY-MM-DD hh:mm:ss', this.updateOrder.expireTemp),
            employeeMemo: '员工备注',
            finishmemo: '完成备注',
            receivememo: '接受备注'
          })
        })
        this.$router.push('/reservations?type=wx')
      } else {
        this.$Toast({
          message: '请选择预约时间',
          position: 'bottom'
        })
      }
    },
    showFaultInfo () {
      this.faultInfoState = true
      console.log(this.faultInfoState, this.updateOrder)
    },
    closeCheckInfo () {
      this.faultInfoState = false
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
    Scroll,
    datePickerMask,
    headerBar
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.repair-pre
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
