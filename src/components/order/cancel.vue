<template>
  <Scroll class="wrapper">
    <ul class="container">
      <li v-for="(item, index) in subscribeOrder" :key="index">
        <div class="order-title" @click="goOrderInfo(item)">
          <div class="img"><img v-lazy="carLogoUrl + myCar[0].imageSrc" alt="">  </div>
          <span class="car-id">{{myCar[0].idCard}}</span>
          <div class="order-states" :class="{'by': item.whichService === 1, 'wx': item.whichService === 2, 'xc': item.whichService === 0}"></div>
        </div>
        <div class="order-content"  @click="goOrderInfo(item)">
          <orderBy v-if="item.whichService === 1 || item.whichService === 2" :data="item.userOrderFormRepairCarBean || item.userOrderFormKeepCarBean">
          </orderBy>
        </div>
        <div class="order-foot">
          <div class="foot">
            <div class="order-set">
              <div class="del-order">删除订单</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </Scroll>
</template>

<script type="text/ecmascript-6">
import orderBy from './order-by'
import Scroll from '@/base/scroll/scroll'
import {mapGetters, mapMutations} from 'vuex'

export default {
  computed: {
    subscribeOrder () {
      let ret = []
      this.orderList.forEach((item, index) => {
        if (item.orderFormState === 5 && item.whichService !== 0) {
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
    goOrderInfo (res) {
      this.setOrderInfo(res)
      this.$router.push('/orderinfo')
    },
    ...mapMutations({
      setOrderInfo: 'SET_ORDER_INFO'
    })
  },
  components: {
    orderBy,
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
          .del-order
            border: 1px solid #5b5b5b
            border-radius: 5px
            color: #5b5b5b

</style>
