<template>
  <div class="order-xc">
    <div class="xc-left">
    </div>
    <div class="xc-con">
      <h3>普洗</h3>
      <p>整车泡沫冲洗擦干、轮胎轮毂冲洗清洁、车内吸尘、内饰脚垫等简单除尘沙发沙发沙发上发生的发生发生沙发的发放</p>
    </div>
    <div class="xc-right">
      <span>￥30.00</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'orderXc'
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .order-xc
    display: flex
    align-items: center
    height: 147px
    padding-right: 30px
    .xc-left
      box-sizing: border-box
      width: 124px
      height: 70px
      overflow: hidden
      bg-image('../../common/imgs/order/wash-bg')
      background-size: 124px 70px
      background-repeat: no-repeat
      background-position: right center
      margin-right: 38px
    .xc-con
      flex: 1
      height: 147px
      display: flex
      flex-direction: column
      align-items: center
      h3
        padding-top: 32px
        height: 60px
        width: 100%
        text-align: left
        fonts-size: 28px
        color: #5b5b5b
        margin-bottom: 20px
      p
        font-size: 22px
        color: #9f9f9f
        height: 52px
        line-height: 26px
        no-wrap-many('2')
    .xc-right
      width: 170px
      height: 70px
      line-height: 70px
      font-size: 22px
      text-align: right
      color: #ff7a7a
</style>
