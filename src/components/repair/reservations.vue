<template>
  <div class="reservations" flexContainer>
    <div class="action-bar">
      <!-- <div class="go-back" @click="_goBack"></div> -->
      <div class="font">
        预约成功
      </div>
    </div>
    <div class="container">
      <div class="bg">

      </div>
      <div class="info">
        <div class="store">{{type === 'by' ? subscribeInfo.store.name : repairOrder.store.name}}</div>
        <div class="time" v-if="type === 'by'">预约时间：{{getDate}}<span>{{subscribeInfo.time.time}}</span></div>
        <div class="time" v-else>预约时间：{{getDate}}</span></div>
        <div class="tips" >请尽快至门店服务，奇特异祝您用车愉快</div>
      </div>
    </div>
    <div class="button">
      <div class="go-index" @click="_goHome">
        返回主页
      </div>
      <div class="look-order" @click="_lookOrder">
        查看订单
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
export default {
  name: 'reservations',
  data () {
    return {
      type: ''
    }
  },
  computed: {
    getDate () {
      let date = ''
      if (this.type === 'by') {
        date = this.subscribeInfo.time.today ? '今天' : '明天'
      } else if (this.type === 'wx') {
        date = this.repairOrder.appointmentTime
      }
      return date
    },
    ...mapGetters([
      'subscribeInfo',
      'repairOrder'
    ])
  },
  created () {
    this.type = this.$route.query.type
  },
  methods: {
    // _goBack () {
    //   this.$router.go(-3)
    // },
    _goHome () {
      this.$router.push('/home')
    },
    _lookOrder () {
      this.$router.push('/order')
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.reservations
  height: 100vh
  background-color: #f4f4f4
  flex-direction: column
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
  .container
    height: 200px
    display: flex
    bg-image('../../common/imgs/mindbg')
    background-size: 100% 200px
    background-repeat: no-repeat
    background-position: center center
    .bg
      width: 266px
      bg-image('../../common/imgs/orderinfo/order-bg-2')
      background-repeat: no-repeat
      background-size: 184px 103px
      background-position: right center
      margin-right: 84px
    .info
      flex: 1
      display: flex
      flex-direction: column
      justify-content: center
      .store
        height: 35px
        line-height: 35px
        font-size: 26px
        color: #fffefe
        font-weight: bold
      .time
        height: 36px
        line-height: 36px
        color: #fff
        font-size: 24px
        font-weight: bold
        span
          padding: 5px 8px
          background-color: #fff
          margin-left: 10px
          border-radius: 3px
          color: #ff815b
      .tips
        height: 30px
        line-height: 30px
        font-size: 18px
        color: #fff
        padding-left: 30px
        bg-image('../../common/imgs/mind/sj')
        background-repeat: no-repeat
        background-size: 15px 15px
        background-position: left center
  .button
    height: 110px
    padding-top: 40px
    display: flex
    align-items: center
    justify-content: center
    .go-index
      width: 240px
      height: 70px
      font-size: 26px
      color: #ff8058
      background-color: #fff
      border-radius: 3px
      text-align: center
      line-height: 70px
    .look-order
      width: 240px
      height: 70px
      font-size: 26px
      color: #fff
      background-color: #ff8058
      border-radius: 3px
      margin-left: 80px
      text-align: center
      line-height: 70px
</style>
