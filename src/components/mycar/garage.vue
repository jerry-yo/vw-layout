// 我的车库
<template>
  <div class="garage" flexContainer>
    <div class="action-bar">
      <div class="go-back"></div>
      <div class="font">我的车库</div>
      <div class="vehicle-management">管理</div>
    </div>
    <div class="slider">
adafdsa
    </div>
    <div class="car-menu">

    </div>
    <div class="car-info">
      <div class="car-models">

      </div>
      <div class="car-others">
        <div class="car-displacement">

        </div>
        <div class="car-age">

        </div>
        <div class="car-far">

        </div>
        <div class="car-time">

        </div>
      </div>
    </div>
    <div class="box">

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'garage'
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .garage
    background-color: #f4f4f4
    flex-direction: column
    min-height: 100vh
    bg-image('../../common/imgs/mindbg')
    background-repeat: no-repeat
    background-position: center top
    background-size: 750px 281px
    overflow: hidden
    .action-bar
      position: relative
      height: 88px
      display: flex
      .font
        flex: 1
        line-height: 88px
        text-align: center
        font-size: 36px
        color: #ffffff
        font-weight: bold
        transform: skewX(-10deg)
      .go-back
        position: absolute
        left: 0px
        width: 120px
        height: 88px
        bg-image('../../common/imgs/car/back')
        background-repeat: no-repeat
        background-position: 30px center
        background-size: 18px 30px
      .vehicle-management
        position: absolute
        right: 0px
        width: 120px
        height: 88px
        padding-right: 30px
        font-size: 26px
        color: #fff
        line-height: 88px
        text-align: right
    .slider
      height: 275px
      line-height: 275px
      margin-bottom: 18px
      background-color: yellow
    .car-menu
      height: 154px
      background-color: red
    .car-info
      height: 271px
      background-color: blue
    .box
      flex: 1
      background-color: pink
</style>
