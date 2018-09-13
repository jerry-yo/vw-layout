<template>
  <Scroll class="wrapper">
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
import Scroll from '@/base/scroll/scroll'
import {mapGetters} from 'vuex'
import {expireToken} from '@/common/js/mixin'
import {handleWxOrder, handleByOrder} from '@/common/js/config'

export default {
  name: 'subscribe',
  mixins: [expireToken],
  data () {
    return {
      orderList: []
    }
  },
  computed: {
    handleOrderList () {
      let arr = []
      this.orderList.forEach(order => {
        if (order.orderStatus === 4 || order.orderStatus === 5) {
          let wxReg = /维修/
          let byReg = /保养/
          let memo = order.memo.split('\uA856')
          if (wxReg.test(memo[1])) {
            arr.push(Object.assign(order, {
              memoInfos: handleWxOrder(memo)
            }))
          }
          if (byReg.test(memo[1])) {
            arr.push(Object.assign(order, {
              memoInfos: handleByOrder(memo)
            }))
          }
        }
      })
      return arr
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  mounted () {
    this._getSubscribeOrder()
  },
  methods: {
    goOrderInfo (res) {
      this.$router.push('/orderinfo?id=' + res.orderId + '&type=yyz')
    },
    isExpiryTime (item) {
      let now = new Date().getTime()
      let str = ''
      if (item.memoInfos.expireTemp < now) {
        str = '已过期'
      } else if (item.orderStatus === 5) {
        str = '已接收'
      }
      return str
    },
    cancelSubscribe (item) {
      // 取消订单
    },
    _getSubscribeOrder () {
      this.$get(`${this.f6Url}/api/clientOrder`, {
        'Authorization': this.userInfo.token
      }, (res) => {
        if (res.code === 200) {
          this.orderList = res.data.list
        } else if (res.code === 401) {
          this.refreshToken(this._getSubscribeOrder)
        }
      }, {
        clientAppId: this.userInfo.appId,
        clientUserId: this.userInfo.fUserId,
        userId: this.userInfo.userId,
        deleteFlag: 0,
        currentPage: 1,
        pageSize: 200
      })
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
