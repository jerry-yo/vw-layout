<template>
  <Scroll class="wrapper">
    <ul class="container">
      <li v-for="(item, index) in subscribeOrder" :key="index">
        <div class="order-title" @click="goOrderInfo(item)">
          <div class="img"><img v-lazy="item.carImageSrc" alt="">  </div>
          <span class="car-id">{{item.idCard}}</span>
          <div class="order-states" :class="{'by': item.whichService === 1, 'wx': item.whichService === 2, 'xc': item.whichService === 0}"></div>
        </div>
        <div class="order-content"  @click="goOrderInfo(item)">
          <orderBy v-if="item.whichService === 1 || item.whichService === 2" :data="item.userOrderFormRepairCarBean || item.userOrderFormKeepCarBean">
          </orderBy>
          <orderXc v-if="item.whichService === 0" :data="item.washType"></orderXc>
        </div>
        <div class="order-foot">
          <div class="foot">
            <span class="car-state">{{_getFormatDate(item.paymentTime)}}</span>
            <div class="order-set">
              <div class="look-order" @click="showDetectionRecord(item)">查看该次检测</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </Scroll>
</template>

<script type="text/ecmascript-6">
import orderBy from './order-by'
import orderXc from './order-xc'
import Scroll from '@/base/scroll/scroll'
import {mapGetters, mapMutations} from 'vuex'
import {getFormatDate} from '@/common/js/date'

export default {
  computed: {
    subscribeOrder () {
      let ret = []
      this.orderList.forEach((item, index) => {
        if (item.orderFormState === 4) {
          ret.push(item)
        }
      })
      return ret
    },
    ...mapGetters([
      'orderList',
      'myCar'
    ])
  },
  methods: {
    _getFormatDate (time) {
      return getFormatDate(time)
    },
    goOrderInfo (res) {
      this.setOrderInfo(res)
      this.$router.push('/orderinfo')
    },
    showDetectionRecord (item) {
      this.$router.push('/check-list?id=0&carid=0')
    },
    ...mapMutations({
      setOrderInfo: 'SET_ORDER_INFO'
    })
  },
  components: {
    orderBy,
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
