<template>
  <div class="reservations" flexContainer>
    <div class="action-bar">
      <div class="go-back"></div>
      <div class="font">
        预约成功
      </div>
    </div>
    <div class="container">

    </div>
    <div class="button">
      <div class="go-index">
        返回主页
      </div>
      <div class="look-order">
        查看订单
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
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
    bg-image('../../common/imgs/mindbg')
    background-size: 100% 200px
    background-repeat: no-repeat
    background-position: center center
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
