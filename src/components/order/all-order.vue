<template>
    <div class="order" flexContainer>
      <div class="title">
        <div class="back" @click="goBack" ></div>
        <span>我的订单</span>
      </div>
      <div class="tab-bar">
        <ul>
          <li ><router-link :to="{ name: 'subscribe', path: '/order/subscribe' }"><span>预约中</span></router-link></li>
          <!-- <li ><router-link :to="{ name: 'confirmed', path: '/order/confirmed' }"><span>待确认</span></router-link></li> -->
          <li ><router-link :to="{ name: 'obligation', path: '/order/obligation' }"><span>待付款</span></router-link></li>
          <li ><router-link :to="{ name: 'complete', path: '/order/complete' }"><span>已完成</span></router-link></li>
          <li ><router-link :to="{ name: 'cancel', path: '/order/cancel' }"><span>已取消</span></router-link></li>
        </ul>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'order',
  data () {
    return {
    }
  },
  methods: {
    goBack () {
      this.$router.replace('/mind')
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .order
    flex-direction: column
    height: 100vh
    background-color: #f4f4f4
    overflow: hidden
    .title
      position: relative
      height: 88px
      background-color: #fff
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
    .tab-bar
      display: flex
      height: 82px
      background-color: #fafafa
      margin-bottom: 10px
      & > ul
        flex: 1
        display: flex
        height: 82px
        li
          flex: 1
          margin: 0px 31px
          font-size: 26px
          color: #5b5b5b
          display: flex
          justify-content: center
          align-items: center
          .active-on
            color: #ff8040
    .content
      flex: 1
      display: flex
</style>
