<template>
  <div class="order-info" flexContainer>
    <div class="title">
      <div class="back" @click="goBack" ></div>
      <span>订单详情</span>
    </div>
    <Scroll class="order-content" ref="orderWarpper">
      <div class="order-con">
        <div class="order-img" v-if="orderInfo.go >= 4">
          <div class="order-bg-1 order-bg" v-if="orderInfo.go === 5">
            <div class="bg-1">
            </div>
            <div class="bg-font">
              预约已取消
            </div>
          </div>
          <div class="order-bg-2 order-bg" v-if="orderInfo.go === 4">
            <div class="bg-1">
            </div>
            <div class="bg-font">
              <span>服务完成</span>
              <h2>奇特异快速保养-华润店sdsadsa</h2>
            </div>
          </div>
        </div>
        <div class="order-title">
          <div class="top">
            <div class="top-name">
              <span>奇特异快速保养-华润店</span>
              <div class="order-states" :class="{'by': orderInfo.state === 1, 'wx': orderInfo.state === 2, 'xc': orderInfo.state === 3}"></div>
            </div>
            <div class="call-dz">
              联系店长
            </div>
          </div>
          <div class="bottom">
            <span>倪家汇</span>
            <span>苏DB5463</span>
          </div>
        </div>
        <div class="order-con">
          <orderBy v-if="orderInfo.state === 1">
          </orderBy>
          <orderWx v-if="orderInfo.state === 2">
          </orderWx>
          <orderXc v-if="orderInfo.state === 3">
          </orderXc>
        </div>
        <div class="order-other">
          <div class="other-info">
            <div class="other-fw">
              <span>原项目服务费</span>
              <span>{{'￥' + 20.00}}</span>
            </div>
            <div class="other-yhq" v-if="orderInfo.go === 3">
              <div class="yhq-con">
                <span>优惠券</span>
                <div class="yhq">
                  <span>暂无优惠券</span>
                </div>
              </div>
            </div>
            <orderTest v-if="orderInfo.go === 2"></orderTest>
            <div class="time-yy" v-if="orderInfo.go === 1 || orderInfo.go === 5">
              <span>预约时间</span>
              <div class="time">
                <span>今天</span>
                <span>15:55</span>
              </div>
            </div>
            <div class="time-over" v-if="orderInfo.go === 1 || orderInfo.go === 5">
              <span>到期时间</span>
              <div class="time">
                <span>今天</span>
                <span>15:55</span>
              </div>
            </div>
          </div>
          <div class="order-money" v-if="orderInfo.go === 4">
            <p v-if="orderInfo.state !== 3"> 配件费 <span>{{'￥' + '200.00'}}</span>  </p>
            <p v-if="orderInfo.state !== 3">总服务费 <span>{{'￥' + '20.00'}}</span>  </p>
            <p v-if="orderInfo.state === 3">总金额 <span>{{'￥' + '220.00'}}</span>  </p>
            <p>优惠 <span class="green">{{'￥' + '5.00'}}</span>  </p>
            <p>实付 <span class="red">{{'￥' + '215.00'}}</span>  </p>
          </div>
          <div class="other">
            <p>预约单号:  <span>2055056652555555</span> </p>
            <p>下单时间:  <span>2018年12月12日 15:30</span> </p>
            <p v-if="orderInfo.state !== 3">预约时间:  <span>2018年12月12日 15:30</span> </p>
            <!-- <p>到店时间:  <span>2018年12月12日 15:30</span> </p>
            <p>服务时间:  <span>2018年12月12日 15:30</span> </p>
            <p>取消时间:  <span>2018年12月12日 15:30</span> </p> -->
          </div>
        </div>
      </div>
    </Scroll>
    <div class="order-btn">
      <div class="order-foot-1 foot" v-if="orderInfo.go === 1">
        <span class="car-state">已过期</span>
        <div class="order-set">
          <div class="del-yy">取消预约</div>
          <div class="call-dz">联系店长</div>
        </div>
      </div>
      <div class="order-foot-2 foot" v-if="orderInfo.go === 2">
        <span class="car-state">已到店</span>
        <div class="order-set">
          <div class="call-dz">联系店长</div>
          <div class="ok-go">确认服务</div>
        </div>
      </div>
      <div class="order-foot-3 foot" v-if="orderInfo.go === 3">
        <span class="car-state">服务进行中</span>
        <div class="order-set">
          <div class="go-pay">付款</div>
        </div>
      </div>
      <div class="order-foot-4 foot" v-if="orderInfo.go === 4">
        <span class="car-state">2017年05月06日 15:30</span>
        <div class="order-set">
          <div class="look-order">查看该次检测</div>
        </div>
      </div>
      <div class="order-foot-5 foot" v-if="orderInfo.go === 5">
        <div class="order-set">
          <div class="del-order">删除订单</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from '@/base/scroll/scroll'
import orderBy from '@/components/order/order-by'
import orderWx from '@/components/order/order-wx'
import orderXc from '@/components/order/order-xc'
import orderTest from '@/components/order/order-test'
export default {
  name: 'orderInfo',
  data () {
    return {
      orderInfo: {},
      orderScroll: null
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.orderInfo = JSON.parse(this.$route.query.res)
  },
  components: {
    orderBy,
    orderWx,
    orderXc,
    orderTest,
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
      height: 78px
      background-color: #fff
      padding: 0px 30px
      .foot
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
          color: #acacac
          font-size: 20px
        .order-set
          .del-yy
            border: 1px solid #bcbcbc
            border-radius: 5px
            color: #bcbcbc
          .call-dz
            border: 1px solid #ff8040
            border-radius: 5px
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
        .car-state
          float: left
          line-height: 78px
          color: #ff8040
          font-size: 20px
        .order-set
          .go-pay
            bg-image('../../common/imgs/btn-bg')
            color: #fff
          .ungo-pay
            background-image: #c5c5c5
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
