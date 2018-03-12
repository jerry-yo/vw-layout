<template>

    <div class="order" flexContainer>
      <div class="title">
        <div class="back" @click="goBack" ></div>
        <span>我的订单</span>
      </div>
      <div class="tab-bar">
        <ul>
          <li :class="{'active-on':orderType === 1}" @click="setOrderType(1)"><span>预约中</span> </li>
          <li :class="{'active-on':orderType === 2}" @click="setOrderType(2)"><span>待确认</span> </li>
          <li :class="{'active-on':orderType === 3}" @click="setOrderType(3)"><span>待付款</span></li>
          <li :class="{'active-on':orderType === 4}" @click="setOrderType(4)"><span>已完成</span></li>
          <li :class="{'active-on':orderType === 5}" @click="setOrderType(5)"><span>已取消</span></li>
        </ul>
      </div>
      <div class="order-container">

      </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'order',
  data () {
    return {
      orderType: 1
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    setOrderType (id) {
      this.orderType = id
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .order
    flex-direction: column
    background-color: #f4f4f4
    .title
      position: relative
      height: 86px
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
        bg-image('back')
        background-size: 18px 30px
        background-repeat: no-repeat
        background-position: 30px center
    .tab-bar
      display: flex
      justify-content: center
      height: 82px
      background-color: #fafafa
      margin-bottom: 10px
      & > ul
        display: flex
        height: 82px
        li
          margin: 0px 31px
          font-size: 26px
          color: #5b5b5b
          line-height: 82px
          &.active-on
            color: #ff8040
    .order-container
      flex: 1
      background-color: #fff

</style>
