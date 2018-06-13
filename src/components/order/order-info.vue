<template>
  <div class="order-info" flexContainer>
    <div class="title">
      <div class="back" @click="goBack" ></div>
      <span>订单详情</span>
    </div>
    <Scroll class="order-content" ref="orderWarpper">
      <div class="order-con">
        <div class="order-img" v-if="orderInfo.orderFormState >= 4 || (isExpiryTime && orderInfo.orderFormState === 1)">
          <div class="order-bg-1 order-bg" v-if="orderInfo.orderFormState === 5 || (isExpiryTime && orderInfo.orderFormState === 1)">
            <div :class="orderInfo.orderFormState === 1 ? 'bg-3' : 'bg-1'">
            </div>
            <div class="bg-font">
              预约{{orderInfo.orderFormState === 1 ? '已过期' : '已取消'}}
            </div>
          </div>
          <div class="order-bg-2 order-bg" v-if="orderInfo.orderFormState === 4">
            <div class="bg-1">
            </div>
            <div class="bg-font">
              <span>服务完成</span>
              <h2>{{orderInfo.store.name}}</h2>
            </div>
          </div>
        </div>
        <div class="order-title">
          <div class="top">
            <div class="top-name">
              <span>{{orderInfo.store.name.slice(8, orderInfo.store.name.length)}}</span>
              <div class="order-states" :class="{'by': orderInfo.whichService === 1, 'wx': orderInfo.whichService === 2}"></div>
            </div>
            <div class="call-dz">
              <a :href="'tel:' + orderInfo.store.phone">联系店长</a>
            </div>
          </div>
          <div class="bottom">
            <span>倪家汇</span>
            <span>{{myCar[0].idCard}}</span>
          </div>
        </div>
        <div class="order-con">
          <orderBy v-if="orderInfo.whichService === 1" :data="orderInfo.userOrderFormKeepCarBean">
          </orderBy>
          <orderBy v-if="(orderInfo.orderFormState > 1 && orderInfo.orderFormState < 5) && orderInfo.whichService === 2" :data="orderInfo.userOrderFormRepairCarBean || orderInfo.userOrderFormKeepCarBean">
          </orderBy>
          <orderXc v-if="orderInfo.whichService === 0" :data="orderInfo.userOrderFormRepairCarBean">
          </orderXc>
          <orderWx v-if="(orderInfo.orderFormState === 1 || orderInfo.orderFormState === 5)&& orderInfo.whichService === 2" :data="orderInfo.userOrderFormRepairCarBean">
          </orderWx>
        </div>
        <div class="order-other">
          <div class="other-info">
            <div class="other-fw" v-if="orderInfo.orderFormState === 3">
              <span>原项目服务费</span>
              <span>{{'￥' + showServerPrice.server}}</span>
            </div>
            <!-- <div class="other-yhq" v-if="orderInfo.orderFormState === 3">
              <div class="yhq-con">
                <span>优惠券</span>
                <div class="yhq">
                  <span>暂无优惠券</span>
                </div>
              </div>
            </div> -->
            <div class="time-yy" v-if="orderInfo.orderFormState === 1 || orderInfo.orderFormState === 5">
              <span>预约时间</span>
              <div class="time">
                <span>{{_getFormatDate(orderInfo.appointmentTime)}}</span>
              </div>
            </div>
            <div class="time-over" v-if="orderInfo.orderFormState === 1">
              <span>到期时间</span>
              <div class="time">
                <span>{{_getFormatDate(orderInfo.expiryTime)}}</span>
              </div>
            </div>
          </div>
          <div class="order-money" v-show="orderInfo.orderFormState >= 3 && orderInfo.orderFormState <= 4">
            <p>配件费 <span>{{'￥' + showServerPrice.product}}</span>  </p>
            <p>总服务费 <span>{{'￥' +  showServerPrice.server}}</span>  </p>
            <p>优惠 <span class="green">{{'￥' + coupon}}</span>  </p>
            <p>实付 <span class="red">{{'￥' + payPrice}}</span>  </p>
          </div>
          <div class="other">
            <p>预约单号:  <span>{{orderInfo.orderId}}</span> </p>
            <p>下单时间:  <span>{{_getFormatDate(orderInfo.orderTime)}}</span> </p>
            <p v-if="orderInfo.orderFormState !== 1">预约时间:  <span>{{_getFormatDate(orderInfo.appointmentTime)}}</span> </p>
            <p v-if="orderInfo.orderFormState === 3 || orderInfo.orderFormState === 4">完工时间:  <span>{{_getFormatDate(orderInfo.completionTime)}}</span> </p>
            <p v-if="orderInfo.orderFormState === 4">付款时间:  <span>{{_getFormatDate(orderInfo.completionTime)}}</span> </p>
            <p v-if="orderInfo.orderFormState === 5">取消时间:  <span>{{_getFormatDate(orderInfo.cancellationTime)}}</span> </p>
          </div>
        </div>
      </div>
    </Scroll>
    <div class="order-btn">
      <div class="order-foot-1 foot" v-if="orderInfo.orderFormState === 1">
        <span class="car-state"  v-if="isExpiryTime">已过期</span>
        <div class="order-set">
          <div class="del-yy" @click="_cancelSubscribe">取消预约</div>
          <div class="call-dz"><a :href="'tel:' + orderInfo.store.phone">联系店长</a></div>
        </div>
      </div>
      <!-- <div class="order-foot-2 foot" v-if="orderInfo.orderFormState === 2">
        <span class="car-state">已到店</span>
        <div class="order-set">
          <div class="call-dz">联系店长</div>
          <div class="ok-go">确认服务</div>
        </div>
      </div> -->
      <div class="order-foot-3" v-if="orderInfo.orderFormState === 3">
        <div class="server"><a href="tel:0519-68191385">客服</a></div>
        <div class="tips">
          <span>共{{orderInfo.whichService > 1 ? orderInfo.userOrderFormRepairCarBean.useServiceNumber : orderInfo.userOrderFormKeepCarBean.useServiceNumber}}项服务</span>
          <span>￥{{payPrice.toFixed(2)}}</span>
        </div>
        <div class="btn" @click="_goPay">付款</div>
      </div>
      <div class="order-foot-4 foot" v-if="orderInfo.orderFormState === 4">
        <span class="car-state">2017年05月06日 15:30</span>
        <div class="order-set">
          <div class="look-order" @click="_showDetectionRecord">查看该次检测</div>
        </div>
      </div>
      <div class="order-foot-5 foot" v-if="orderInfo.orderFormState === 5">
        <div class="order-set">
          <div class="del-order"  @click="_deleteOrder">删除订单</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from '@/base/scroll/scroll'
import orderBy from '@/components/order/order-by'
import orderWx from '@/components/order/order-wx'
import {mapGetters, mapMutations} from 'vuex'
import {getFormatDate} from '@/common/js/date'
export default {
  name: 'orderInfo',
  data () {
    return {
      coupon: 4
    }
  },
  computed: {
    payPrice () {
      let price = 0
      if (this.orderInfo.whichService === 2) {
        price = this.orderInfo.userOrderFormRepairCarBean.useServicePrice + this.orderInfo.userOrderFormRepairCarBean.productAllPrice
      } else if (this.orderInfo.whichService === 1) {
        price = this.orderInfo.userOrderFormKeepCarBean.useServicePrice + this.orderInfo.userOrderFormKeepCarBean.productAllPrice
      }
      return price - this.coupon
    },
    isExpiryTime () {
      let date = Math.round(new Date().getTime() / 1000)
      if (date > this.orderInfo.expiryTime) {
        return true
      } else {
        return false
      }
    },
    showServerPrice () {
      let price = {
        server: 0,
        product: 0
      }
      if (this.orderInfo.whichService === 2) {
        price.server = this.orderInfo.userOrderFormRepairCarBean.useServicePrice
        price.product = this.orderInfo.userOrderFormRepairCarBean.productAllPrice
      } else if (this.orderInfo.whichService === 1) {
        price.server = this.orderInfo.userOrderFormKeepCarBean.useServicePrice
        price.product = this.orderInfo.userOrderFormKeepCarBean.productAllPrice
      }
      return price
    },
    ...mapGetters([
      'orderInfo',
      'myCar'
    ])
  },
  methods: {
    _getFormatDate (stamp) {
      return getFormatDate(stamp)
    },
    goBack () {
      this.$router.back()
    },
    _cancelSubscribe () {
      let _self = this
      this.modifyOrderList({
        type: 'cancel',
        id: _self.orderInfo.orderId
      })
      this.goBack()
    },
    _goPay (item) {
      let _self = this
      if (this.orderInfo.serviceIsAlreadyFinish) {
        this.modifyOrderList({
          type: 'pay',
          id: _self.orderInfo.orderId
        })
      }
      this.goBack()
    },
    _showDetectionRecord () {
      this.$router.push('/check-list?id=0&carid=0')
    },
    _deleteOrder () {
      let _self = this
      this.deleteOrderList({
        id: _self.orderInfo.orderId
      })
      this.goBack()
    },
    ...mapMutations({
      modifyOrderList: 'MODIFY_ORDER_LIST',
      deleteOrderList: 'DELETE_ORDER_LIST'
    })
  },
  components: {
    orderBy,
    orderWx,
    Scroll
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .order-info
    flex-direction: column
    height: 100vh
    background-color: #f4f4f4
    overflow: hidden
    .title
      position: relative
      height: 88px
      background-color: #fff
      margin-bottom: 10px
      & > span
        position: absolute
        left: 0
        top: 0
        right: 0
        bottom: 0
        margin: auto
        display: inline-block
        width: 160px
        height: 88px
        text-align: center
        line-height: 88px
        font-weight: 600
        font-size: 36px
        color: #5b5b5b
        transform: skewX(-15deg)
      .back
        width: 120px
        height: 100%
        bg-image('../../common/imgs/order/back')
        background-size: 18px 30px
        background-repeat: no-repeat
        background-position: 30px center
    .order-content
      flex: 1
      overflow: hidden
      .order-con
        position: relative
      .order-img
        display: flex
        height: 200px
        margin-bottom: 10px
        .order-bg
          position: relative
          flex: 1
          background-color: #fff
          background-size: 750px 200px
          background-repeat: no-repeat
          background-position: center center
          .bg-1
            position: absolute
            left: 116px
            top: 0px
            width: 184px
            height: 200px
            background-repeat: no-repeat
          .bg-3
            position: absolute
            left: 132px
            top: 30px
            width: 205px
            height: 139px
            background-repeat: no-repeat
          .bg-font
            display: flex
            flex-direction: column
            justify-content: center
            position: absolute
            height: 200px
        .order-bg-1
          bg-image('../../common/imgs/orderinfo/order-infobg-1')
          .bg-1
            bg-image('../../common/imgs/orderinfo/order-bg-1')
            background-position: center center
            background-size: 114px 120px
          .bg-3
            bg-image('../../common/imgs/orderinfo/order-bg-3')
            background-position: center center
            background-size: 205px 139px
          .bg-font
            left: 395px
            line-height: 200px
            font-size: 24px
            color: #fff
        .order-bg-2
          bg-image('../../common/imgs/orderinfo/order-infobg-2')
          .bg-1
            bg-image('../../common/imgs/orderinfo/order-bg-2')
            background-size: 184px 103px
            background-position: left 63px
          .bg-font
            left: 354px
            h2, span
              font-size: 24px
              line-height: 38px
              color: #fff
      .order-title
        height: 110px
        background-color: #fff
        padding: 0px 30px
        .top
          display: flex
          padding-top: 10px
          height: 60px
          .top-name
            flex: 1
            display: flex
            line-height: 50px
            font-size: 30px
            span
              color: #5b5b5b
              margin-right: 20px
            .order-states
              width: 76px
              height: 50px
              background-size: 100% 100%
              background-repeat: no-repeat
              background-position: center center
              &.by
                bg-image('../../common/imgs/order/by')
              &.wx
                bg-image('../../common/imgs/order/repair')
              &.xc
                bg-image('../../common/imgs/order/wash')
          .call-dz
            width: 143px
            text-align: right
            line-height: 44px
            font-size: 24px
            color: #ababab
            bg-image('../../common/imgs/orderinfo/call-dz')
            background-size: 29px 28px
            background-repeat: no-repeat
            background-position: left center
        .bottom
          height: 42px
          line-height: 42px
          font-size: 22px
          color: #5b5b5b
          span
            margin-right: 46px
      .order-other
        height: auto
        overflow: hidden
        .other-info
          overflow: hidden
          .other-fw
            display: flex
            padding: 0px 30px
            height: 72px
            line-height: 72px
            background-color: #fff
            margin-bottom: 10px
            span:nth-child(1)
              flex: 1
              font-size: 24px
              color: #ababab
            span:nth-child(2)
              flex: 1
              font-size: 24px
              color: #ff6868
              text-align: right
          .other-yhq
            display: flex
            padding: 0px 30px
            margin-bottom: 10px
            height: 72px
            background-color: #fff
            .yhq-con
              flex: 1
              display: flex
              font-size: 24px
              color: #868686
              line-height: 72px
              bg-image('../../common/imgs/mind/yhq')
              background-size: 25px 25px
              background-repeat: no-repeat
              background-position: left center
              & > span
                margin-left: 55px
              .yhq
                flex: 1
                text-align: right
                padding-right: 35px
                bg-image('../../common/imgs/mind/leftright')
                background-size: 15px 24px
                background-repeat: no-repeat
                background-position: right center
          .time-yy
            display: flex
            height: 60px
            padding: 0px 30px
            background-color: #fff
            line-height: 60px
            span
              flex: 1
              font-size: 24px
              color: #ababab
            .time
              flex: 1
              text-align: right
              font-size: 24px
              span
                margin-left: 10px
                color: #ff8040
          .time-over
            display: flex
            height: 60px
            padding: 0px 30px
            background-color: #fff
            line-height: 60px
            span
              flex: 1
              font-size: 24px
              color: #ababab
            .time
              flex: 1
              text-align: right
              font-size: 24px
              span
                margin-left: 10px
                color: #5b5b5b
        .order-money
          padding: 0px 30px
          overflow: hidden
          background-color: #fff
          p
            height: 60px
            line-height: 60px
            font-size: 24px
            color: #5b5b5b
            span
              float: right
            .green
              color: #68e07e
            .red
              color: #ff7474
        .other
          padding: 30px
          background-color: #f2f2f2
          p
            font-size: 20px
            color: #9c9c9c
            line-height: 32px
            span
              margin-left: 15px
    .order-btn
      display: flex
      height: 98px
      background-color: #fff
      .foot
        padding: 0px 30px
        flex: 1
        .order-set
          display: flex
          height: 78px
          align-items: center
          float: right
          overflow: hidden
          & > div
            width: 120px
            height: 48px
            margin-left: 18px
            font-size: 20px
            line-height: 48px
            text-align: center
            background-size: 100% 100%
            background-repeat: no-repeat
            background-position: center center
      .order-foot-1
        .car-state
          float: left
          line-height: 78px
          color: #ff8040
          font-size: 20px
        .order-set
          .del-yy
            border: 1px solid #bcbcbc
            border-radius: 5px
            color: #bcbcbc
          .call-dz
            border: 1px solid #ff8040
            border-radius: 5px
            a
              color: #ff8040
      .order-foot-2
        .car-state
          float: left
          line-height: 78px
          color: #ff8040
          font-size: 20px
        .order-set
          .ok-go
            bg-image('../../common/imgs/btn-bg')
            color: #ff
          .call-dz
            border: 1px solid #ff8040
            border-radius: 5px
            color: #ff8040
      .order-foot-3
        flex: 1
        display: flex
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
          padding: 0 10px
          display: flex
          padding-top: 48px
          line-height: 50px
          span:nth-child(1)
            color: #999999
            font-size: 12px
          span:nth-child(2)
            flex: 1
            display: flex
            justify-content: flex-end
            color: #de3e56
            font-size: 14px
            font-weight: bold
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
      .order-foot-4
        .car-state
          float: left
          line-height: 78px
          color: #acacac
          font-size: 20px
        .order-set
          .look-order
            width: 160px
            border: 1px solid #ff8040
            border-radius: 5px
            color: #ff8040
      .order-foot-5
        .order-set
          .del-order
            border: 1px solid #5b5b5b
            border-radius: 5px
            color: #5b5b5b
</style>
