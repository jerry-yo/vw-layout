<template>
  <div class="order-other">
    <div class="by-top">
      <div class="noimgs bg-1"></div>
      <div class="order-info">
        <h3>服务门店</h3>
        <h2>奇特异车业-{{data.abbreviation}}</h2>
        <p>合计： <span>￥ {{data.amountAll}}</span> </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderother',
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .order-other
    display: flex
    flex-direction: column
    height: 200px
    padding: 0px 30px
    .by-top
      flex: 1
      display: flex
      padding-top: 19px
      bg-image('../../common/imgs/mind/leftright')
      background-size: 15px 24px
      background-repeat: no-repeat
      background-position: right center
      .noimgs
        overflow: hidden
        width: 120px
        &.bg-1
          bg-image('../../common/imgs/order/no_by')
          background-size: 120px 120px
          background-repeat: no-repeat
          background-position: center center
      .order-info
        flex: 1
        display: flex
        flex-direction: column
        justify-content: center
        padding-left: 30px
        h3
          height: 30px
          line-height: 30px
          font-size: 20px
          color: #bdbdbd
        h2
          height: 40px
          line-height: 40px
          padding-bottom: 10px
          font-size: 26px
          color: #585858
        p
          height: 30px
          line-height: 30px
          font-size: 20px
          color: #575757
          span
            font-size: 30px
            font-weight: bolder
            color: #ff6367
            margin-left: 30px
</style>
