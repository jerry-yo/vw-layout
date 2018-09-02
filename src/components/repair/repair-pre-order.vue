<template>
  <div class="repair-pre" flexContainer>
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
          <span @click="seleDate">{{repairOrder.appointmentTime > 0 ? _getFormatDateToRepair(repairOrder.appointmentTime) : '选择时间'}}</span>
        </div>
        <div class="car-info">
          <div> <span>服务车辆</span><div class="right"><img v-lazy="carLogoUrl + myCar[0].imageSrc" alt="">{{`${nowCar.manufacturerName} - ${nowCar.evehicleSystem}`}}</div> </div>
          <div> <span>车牌号</span><span class="right">{{nowCar.carNumber}}</span> </div>
          <div> <span>联系人</span><span class="right">{{userInfo.userTel}}</span> </div>
        </div>
        <!-- <div class="fault-info" v-if="repairOrder.faultImgs.length > 0 || repairOrder.faultText.length > 0">
          <div class="title">
            故障概要
          </div>
          <div class="fault-con">
            <p class="fault-text">{{repairOrder.faultText}}</p>
            <div class="fault-img" v-if="repairOrder.faultImgs.length > 0">
              <ul :class="repairOrder.faultImgs.length > 2 ? 'more': ''">
                <li v-for="(item, index) in fillImgs" :key="index">
                  <img src="" alt="">
                </li>
              </ul>
            </div>
          </div>
          <div class="go-img-info"></div>
        </div> -->
        <!-- <div class="checkout-menu" v-if="false">
          <div class="title">
            检测单故障 <span>{{'(1' + '/' + '3)'}}</span>
          </div>
          <seleDetectionMenu :check="false"></seleDetectionMenu>
        </div> -->
      </div>
    </Scroll>
    <div class="place-order">
      <div class="server">客服</div>
      <div class="tips">预约不会产生任何费用 具体情况请到店后有技师介绍</div>
      <div class="btn" @click="goRepairOrder">确认下单</div>
    </div>
    <datePickerMask v-if="datePickerShow" @close="closePicker"></datePickerMask>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import storeInfo from '@/base/store-info'
import seleDetectionMenu from '@/base/sele-detection-menu'
import datePickerMask from '@/base/date-picker'
import {getFormatDateToRepair, datePicker, timeToStamp} from '@/common/js/date'
import {mapGetters, mapMutations} from 'vuex'
import {getServerCar} from '@/common/js/mixin'
export default {
  name: 'repairPreOrder',
  mixins: [getServerCar],
  data () {
    return {
      imgs: [0, 1, 2, 3],
      datePickerShow: false,
      date: {
        date: '',
        temp: 0
      }
    }
  },
  computed: {
    fillImgs () {
      if (this.repairOrder.faultImgs.length > 2) {
        let arr = this.imgs.slice(0, 2)
        return arr
      } else {
        return this.imgs
      }
    },
    carInfo () {
      let car = this.myCar[0].name + this.myCar[0].salesVersion
      return car
    },
    ...mapGetters([
      'myCar',
      'userInfo',
      'repairOrder',
      'storeList',
      'defaultStoreId'
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
      if (res.temp > nowTemp) {
        this.tempInfo = res
      } else {
        this.$Toast({
          position: 'bottom',
          message: '预约日期不得小于当前时间'
        })
      }
    },
    _getFormatDateToRepair (temp) {
      return getFormatDateToRepair(temp / 1000)
    },
    _goBack () {
      this.$router.back()
    },
    goRepairOrder () {
      let _self = this
      if (this.repairOrder.appointmentTime) {
        this.setRepairOrder({
          store: _self.storeList[_self.defaultStoreId]
        })
        this.$router.push('/reservations?type=wx')
      } else {
        this.$Toast({
          message: '请选择预约时间',
          position: 'bottom'
        })
      }
    },
    ...mapMutations({
      setRepairOrder: 'SET_REPAIR_ORDER',
      deleteRepairOrder: 'DELETE_REPAIR_ORDER'
    })
  },
  mounted () {
  },
  components: {
    storeInfo,
    seleDetectionMenu,
    Scroll,
    datePickerMask
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
                  background-color: rgba(0, 255, 0, 0.5)
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
