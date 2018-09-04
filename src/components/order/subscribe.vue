<template>
  <Scroll class="wrapper">
    <ul class="container">
      <li v-for="(item, index) in []" :key="index">
        <div class="order-title" @click="goOrderInfo(item)">
          <div class="img"><img v-lazy="item.carImageSrc" alt="">  </div>
          <span class="car-id">{{item.idCard}}</span>
          <div class="order-states" :class="{'by': item.whichService === 1, 'wx': item.whichService === 2, 'xc': item.whichService === 0}"></div>
        </div>
        <div class="order-content"  @click="goOrderInfo(item)">
          <orderWx v-if="item.whichService === 2" :data="item.userOrderFormRepairCarBean">
          </orderWx>
          <orderBy v-if="item.whichService === 1" :data="item.userOrderFormKeepCarBean">
          </orderBy>
        </div>
        <div class="order-foot">
          <div class="foot">
            <span class="car-state" v-if="isExpiryTime(item)">已过期</span>
            <div class="order-set">
              <div class="del-yy" @click="cancelSubscribe(item)">取消预约</div>
              <div class="call-dz">联系店长</div>
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
import {mapGetters, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  mounted () {
    this._getSubscribeOrder()
  },
  methods: {
    goOrderInfo (res) {
      this.setOrderInfo(res)
      this.$router.push('/orderinfo')
    },
    isExpiryTime (item) {
      let date = Math.round(new Date().getTime() / 1000)
      if (date > item.expiryTime) {
        return true
      } else {
        return false
      }
    },
    cancelSubscribe (item) {
      this.modifyOrderList({
        type: 'cancel',
        id: item.orderId
      })
    },
    _getSubscribeOrder () {
      this.$get(`${this.f6Url}/api/clientOrder`, {
        'Authorization': this.userInfo.token
      }, (res) => {
        console.log(res)
      }, {
        clientAppId: this.userInfo.appId,
        clientUserId: this.userInfo.fUserId,
        userId: this.userInfo.userId,
        orderStatus: 1,
        deleteFlag: 0,
        currentPage: 1,
        pageSize: 10
      })
    },
    ...mapMutations({
      setOrderInfo: 'SET_ORDER_INFO',
      modifyOrderList: 'MODIFY_ORDER_LIST'
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
            color: #ff8040

</style>
