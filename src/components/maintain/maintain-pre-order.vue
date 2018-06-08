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
        <storeInfo></storeInfo>
        <div class="bespoke-date">
          <span>预约时间</span>
          <span @click="showFitTime">{{dateTime}}</span>
        </div>
        <div class="car-info">
          <div> <span>服务车辆</span><div class="right"><img v-lazy="carLogoUrl + myCar[0].imageSrc" alt="">{{carInfo}}</div> </div>
          <div> <span>车牌号</span><span class="right">{{myCar[0].idCard}}</span> </div>
          <div> <span>联系人</span><span class="right">15251916566</span> </div>
        </div>
        <div class="server-img">
          <div class="con">
            <ul>
              <li class="imgs"></li>
              <li class="imgs"></li>
              <li class="eiss"></li>
            </ul>
            <div class="goods-info">
              <span>共{{getServerSum.num}}个配件、{{getServerSum.server}}个服务</span>
              <div >配件总额：<span>{{'￥' + getServerSum.price}}</span></div >
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

<script type="text/ecmascript-6">
import Scroll from '@/base/scroll/scroll'
import storeInfo from '@/base/store-info'
import {mapGetters, mapMutations} from 'vuex'
import keepFitTime from '@/base/keep-fit-time'
export default {
  name: 'maintain-pre',
  data () {
    return {
      repairPreOrderBScroll: null,
      imgs: [0, 1, 2, 3],
      fitTime: false,
      seleTime: {}
    }
  },
  computed: {
    fillImgs () {
      if (this.imgs.length > 4) {
        let arr = this.imgs.slice(0, 4)
        return arr
      } else {
        return this.imgs
      }
    },
    carInfo () {
      let car = this.myCar[0].name + this.myCar[0].salesVersion
      return car
    },
    dateTime () {
      if (JSON.stringify(this.seleTime) === '{}') {
        return '未选择预约时间'
      } else {
        return `${this.seleTime.today ? '今' : '明'}天  ${this.seleTime.time}`
      }
    },
    getServerSum () {
      let price = 0
      let server = 0
      let num = 0
      this.serverList.forEach((item) => {
        if (item.groupItem.isChecked) {
          server++
          if (item.subItems.length > 0) {
            item.subItems.forEach((res, id) => {
              if (res.isChecked) {
                price += res.keepServiceSecondItemBean.minCommodityNumber * res.keepServiceSecondItemBean.commodityPrice
                num += res.keepServiceSecondItemBean.minCommodityNumber
              }
            })
          } else {
            price += item.groupItem.keepServiceFirstItemBean.serverPrice
          }
        }
      })
      return {
        price: price,
        server: server,
        num: num
      }
    },
    ...mapGetters([
      'myCar',
      'serverList',
      'storeList',
      'defaultStoreId'
    ])
  },
  methods: {
    _goBack () {
      this.$router.go(-1)
    },
    _goPreOrder () {
      if (JSON.stringify(this.seleTime) === '{}') {
        this.$Toast({
          message: '请选择预约时间',
          position: 'bottom'
        })
      } else {
        let _self = this
        this.setSubscribeInfo({
          store: _self.storeList[_self.defaultStoreId],
          time: _self.seleTime
        })
        this.setMyServer()
        this.setAllServer()
        this.$router.push('/reservations?type=by')
      }
    },
    showFitTime () {
      this.fitTime = true
    },
    closeMask (res) {
      if (res.time !== 0 && res.time) {
        this.$set(this.seleTime, 'time', res.time)
        this.$set(this.seleTime, 'today', res.today)
      }
      this.fitTime = false
    },
    ...mapMutations({
      setSubscribeInfo: 'SET_SUBSCRIBE_INFO',
      setMyServer: 'SET_MY_SERVER',
      setAllServer: 'SET_ALL_SERVER'
    })
  },
  components: {
    storeInfo,
    Scroll,
    keepFitTime
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
              border: 1px solid #d2d2d2
              background-color: rgba(0,255,126,0.5)
              margin-right: 10px
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
