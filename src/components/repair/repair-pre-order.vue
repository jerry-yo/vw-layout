<template>
  <div class="repair-pre" flexContainer>
    <div class="action-bar">
      <div class="go-back"></div>
      <div class="font">
        订单详情
      </div>
    </div>
    <div class="service-flow">

    </div>
    <div class="container">

    </div>
    <div class="go-next">

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'repairPreOrder',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.repair-pre
  background-color: #f4f4f4
  flex-direction: column
  height: 100vh
  .action-bar
    display: flex
    height: 88px
    background-color: #fff
    margin-bottom: 10px
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
  .service-flow
    height: 70px
    background-color: #fff1e4
    padding: 0 30px
</style>
