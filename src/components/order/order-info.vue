<template>
  <div class="order-info" flexContainer>
    <div class="order-img">
      <div class="order-bg-1 orderbg">
      </div>
      <div class="order-bg-2 orderbg">
      </div>
    </div>
    <div class="title">
      <div class="back" @click="goBack" ></div>
      <span>订单详情</span>
    </div>
    <div class="order-title">
      <div class="top">
        <h2>奇特异快速保养-华润店</h2>
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

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import orderBy from '@/components/order/order-by'
import orderWx from '@/components/order/order-wx'
import orderXc from '@/components/order/order-xc'
export default {
  name: 'orderInfo',
  data () {
    return {
      orderInfo: {}
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
    orderXc
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
    .order-img
      margin-bottom: 10px
    .title
      position: relative
      height: 86px
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
        height: 86px
        text-align: center
        line-height: 86px
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
    .order-title
      height: 110px
      background-color: #fff
      padding: 0px 30px
      .top
        display: flex
        padding-top: 20px
        height: 60px
        h2
          flex: 1
          line-height: 40px
          font-size: 30px
          color: #5b5b5b
        .call-dz
          width: 143px
          text-align: right
          line-height: 40px
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

</style>
