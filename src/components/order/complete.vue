<template>
  <Scroll class="wrapper">
    <ul class="container">
      <li v-for="(item, index) in obligationOrder.overOrder" :key="index">
        <div class="order-title" @click="goOrderInfo(item)">
          <span class="car-id">{{item.carNoWhole}}</span>
          <div class="order-states" :class="{'by': item.stationType === 1, 'wx': item.stationType === 2}"></div>
        </div>
        <div class="order-content"  @click="goOrderInfo(item)">
          <orderOther :data="item" :index="index"></orderOther>
        </div>
        <div class="order-foot">
          <div class="foot">
            <span class="car-state">{{item.handleComplateDate}}</span>
            <div class="order-set" v-if="false">
              <div :class="false ? 'go-pay' : 'ungo-pay'" @click="_goPay(item)">付款</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </Scroll>
</template>

<script>
import orderOther from './order-other'
import Scroll from '@/base/scroll/scroll'
import {clientMaintain} from '@/common/js/mixin'

export default {
  name: 'complete',
  mixins: [clientMaintain],
  data () {
    return {
      orderList: []
    }
  },
  created () {
    this.getMaintainOrder()
  },
  methods: {
    goOrderInfo (res) {
      this.$router.push('/pay-order-info?pkid=' + res.pkId + '&type=ywc&station=' + res.abbreviation)
    },
    showDetectionRecord (item) {
      this.$router.push('/check-list?id=0&carid=0')
    }
  },
  components: {
    orderOther,
    Scroll
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .wrapper
    flex: 1
    overflow: hidden
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
          color: #acacac
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
          .look-order
            width: 160px
            border: 1px solid #ff8040
            border-radius: 5px
            color: #ff8040

</style>
