<template>
  <div class="order-by">
    <div class="by-top">
      <div class="by-left">
        <img src="../../common/imgs/default.png" alt="">
        <img src="../../common/imgs/default.png" alt="">
      </div>
      <div class="by-con">
      </div>
      <div class="by-right">
        <div class="img">
          <img src="./wash-bg@2x.png" alt="">
          <span>赠送</span>
        </div>
      </div>
    </div>
    <div class="by-bottom">
      <div class="by-left">
        <span>共2个配件，1个服务</span>
      </div>
      <div class="by-right">
        配件总额：<span>{{'￥' + 200.00}}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'orderBy'
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .order-by
    display: flex
    flex-direction: column
    height: 200px
    padding: 0px 30px
    .by-top
      flex: 1
      display: flex
      padding-top: 19px
      .by-left
        width: 260px
        overflow: hidden
        & > img
          box-sizing: border-box
          display: inline-block
          width: 120px
          height: 120px
          border: 1px solid #d2d2d2
      .by-con
        flex: 1
        bg-image('../../common/imgs/ellipsis')
        background-size: 27px 6px
        background-repeat: no-repeat
        background-position: left center
      .by-right
        width: 154px
        bg-image('../mind/leftright')
        background-size: 15px 24px
        background-repeat: no-repeat
        background-position: right center
        .img
          position: relative
          float: left
          box-sizing: border-box
          display: inline-block
          width: 120px
          height: 120px
          border: 1px solid #d2d2d2
          overflow: hidden
        img
          display: inline-block
          position: absolute
          right: 11px
          top: 24px
          height: 70px
          width: auto
        span
          display: inline-block
          position: absolute
          bottom: 0px
          right: 0px
          width: 47px
          height: 28px
          text-align: center
          line-height: 28px
          font-size: 18px
          color: #ffffff
          background-color: #ff8040
    .by-bottom
      display: flex
      height: 56px
      line-height: 56px
      font-size: 18px
      color: #5b5b5b
      .by-left
        flex: 1
      .by-right
        flex: 1
        text-align: right
        span
          font-size: 24px
          margin-left: 20px
          color: #ff6868
</style>
