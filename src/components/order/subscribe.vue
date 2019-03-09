<template>
  <Scroll class="wrapper" v-show="handleOrderList" :data="handleOrderList" :class="handleOrderList.length === 0 ? 'bg' : ''">
    <ul class="container">
      <li v-for="(item, index) in handleOrderList" :key="index">
        <div class="order-title" @click="goOrderInfo(item)">
          <div class="img"><img :src="carLogoUrl + item.memoInfos.imageSrc" alt="">  </div>
          <span class="car-id">{{item.carNumber}}</span>
          <div class="order-states" :class="{'by': item.memoInfos.serverState === 1, 'wx': item.memoInfos.serverState === 2, 'xc': item.memoInfos.serverState === 4}"></div>
        </div>
        <div class="order-content"  @click="goOrderInfo(item)">
          <orderWx v-if="item.memoInfos.serverState === 2 || item.memoInfos.serverState === 3" :data="item.memoInfos">
          </orderWx>
          <orderBy v-if="item.memoInfos.serverState === 1" :data="item.memoInfos">
          </orderBy>
          <orderXc v-if="item.memoInfos.serverState === 4" :info="item.memoInfos">
          </orderXc>
        </div>
        <div class="order-foot">
          <div class="foot">
            <span class="car-state">{{isExpiryTime(item)}}</span>
            <div class="order-set">
              <div class="del-yy" @click="cancelSubscribe(item)">取消预约</div>
              <div class="call-dz"><a :href="'tel:' + item.memoInfos.responserTel">联系店长</a></div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </Scroll>
</template>

<script>
import orderBy from './order-by'
import orderWx from './order-wx'
import orderXc from './order-xc'
import Scroll from '@/base/scroll/scroll'
import {expireToken, getOrderListForYy, cancelOrderYy} from '@/common/js/mixin'

export default {
  name: 'subscribe',
  mixins: [expireToken, getOrderListForYy, cancelOrderYy],
  data () {
    return {
      orderList: [],
      orderType: 'yyz',
      cancelOrderInfo: {}
    }
  },
  methods: {
    goOrderInfo (res) {
      this.$router.push('/orderinfo?id=' + res.orderId + '&type=yyz&code=' + res.stationCode)
    },
    cancelSubscribe (item) {
      let _self = this
      this.$Modal.confirm({
        title: '提示信息',
        content: '是否取消预约订单？',
        onCancel: () => {
          _self.$Modal.remove()
        },
        onOk: () => {
          _self.cancelOrderInfo = item
          _self.cancelOrderState()
          _self.$Modal.remove()
        }
      })
    }
  },
  components: {
    orderBy,
    orderWx,
    orderXc,
    Scroll
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .wrapper
    flex: 1
    overflow: hidden
    &.bg
      bg-image('../../common/imgs/noorder')
      background-position: center center
      background-repeat: no-repeat
      background-size: 750px 381px
  .container
    position: relative
    li
      margin-bottom: 10px
    .order-title
      display: flex
      align-items: center
      height: 70px
      background-color: #fff
      line-height: 70px
      padding: 0px 30px
      .img
        width: 40px
        height: 40px
        margin-right: 28px
      .car-id
        font-size: 26px
        color: #5b5b5b
        margin-right: 29px
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
        &.tc
          bg-image('../../common/imgs/order/by')
    .order-content
      overflow: hidden
    .order-foot
      display: flex
      height: 78px
      background-color: #fff
      padding: 0px 30px
      .foot
        flex: 1
        display: flex
        .car-state
          line-height: 78px
          color: #ff8040
          font-size: 20px
        .order-set
          flex: 1
          display: flex
          justify-content: flex-end
          align-items: center
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
          .del-yy
            border: 1px solid #bcbcbc
            border-radius: 5px
            color: #bcbcbc
          .call-dz
            border: 1px solid #ff8040
            border-radius: 5px
            a
              color: #ff8040
              font-size: 20px
</style>
