<template>
  <Scroll class="wrapper" :data="handleOrderList">
    <ul class="container">
      <li v-for="(item, index) in handleOrderList" :key="index">
        <div class="order-title" @click="goOrderInfo(item)">
          <div class="img"><img :src="carLogoUrl + item.memoInfos.imageSrc" alt="">  </div>
          <span class="car-id">{{item.carNumber}}</span>
          <div class="order-states" :class="{'by': item.memoInfos.serverState === 1, 'wx': item.memoInfos.serverState === 2}"></div>
        </div>
        <div class="order-content"  @click="goOrderInfo(item)">
          <orderWx v-if="item.memoInfos.serverState === 2" :data="item.memoInfos">
          </orderWx>
          <orderBy v-if="item.memoInfos.serverState === 1" :data="item.memoInfos">
          </orderBy>
        </div>
        <div class="order-foot">
          <div class="foot">
            <div class="order-set">
              <div class="del-order" @click="goOrderInfo(item)">查看订单详情</div>
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
import Scroll from '@/base/scroll/scroll'
import {expireToken, getOrderListForYy} from '@/common/js/mixin'

export default {
  name: 'cancel',
  mixins: [expireToken, getOrderListForYy],
  data () {
    return {
      orderList: [],
      ordetType: 'yqx'
    }
  },
  methods: {
    goOrderInfo (res) {
      this.$router.push('/orderinfo?id=' + res.orderId + '&type=yqx')
    }
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
            width: 180px
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
