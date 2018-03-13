<template>
  <div class="order-wx">
    <div class="wx-left">
      <img src="../../common/imgs/default.png" alt="">
      <img src="../../common/imgs/default.png" alt="">
    </div>
    <div class="wx-con">
    </div>
    <div class="wx-right">
      <p>我是苏DB5463的车主，我的车子的 前面两个大灯碰了一下墙，不亮了。 引擎盖有明显凸起sdsafasdfasfadsadfsafd</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'orderWx'
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .order-wx
    display: flex
    align-items: center
    height: 147px
    padding: 0px 30px
    .wx-left
      width: 260px
      overflow: hidden
      & > img
        float: left
        box-sizing: border-box
        display: inline-block
        width: 120px
        height: 120px
        border: 1px solid #d2d2d2
        margin-right: 10px
    .wx-con
      width: 27px
      height: 120px
      bg-image('../../common/imgs/ellipsis')
      background-size: 27px 6px
      background-repeat: no-repeat
      background-position: left center
      margin-right: 30px
    .wx-right
      flex: 1
      display: flex
      align-items: center
      height: 90px
      padding-right: 36px
      bg-image('../mind/leftright')
      background-size: 15px 24px
      background-repeat: no-repeat
      background-position: right center
      display: -webkit-box
      -webkit-box-orient: vertical
      -webkit-line-clamp: 3
      overflow: hidden
      p
        font-size: 22px
        color: #9f9f9f
        line-height: 30px
</style>
