<template>
  <div class="order-by">
    <div class="by-top">
      <ul class="by-left">
        <li v-for="(item, index) in imgs" :key="index"><img v-lazy="item" alt=""></li>
      </ul>
      <div class="by-con" :class="{'ellipsis': data.useProductIconUrls.length > 2}">
      </div>
      <div class="by-right" v-if="data.freeServiceOrProductIconUrl !== ''">
        <div class="img">
          <img src="../../common/imgs/order/wash-bg@2x.png" alt="">
          <span>赠送</span>
        </div>
      </div>
    </div>
    <div class="by-bottom">
      <div class="by-left">
        <span>共{{data.useProductNumber}}个配件，{{data.useServiceNumber}}个服务</span>
      </div>
      <div class="by-right">
        配件总额：<span>{{'￥' + data.productAllPrice}}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'orderBy',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    imgs () {
      let ret = []
      if (this.data.useProductIconUrls.length > 2) {
        this.data.useProductIconUrls.forEach((item, index) => {
          if (index < 2) {
            ret.push(item)
          }
        })
      } else {
        ret = this.data.useProductIconUrls
      }
      return ret
    }
  }
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
        display: flex
        overflow: hidden
        li
          margin-right: 10px
        img
          box-sizing: border-box
          display: inline-block
          width: 120px
          height: 120px
          border: 1px solid #d2d2d2
      .by-con
        flex: 1
        &.ellipsis
          bg-image('../../common/imgs/ellipsis')
          background-size: 27px 6px
          background-repeat: no-repeat
          background-position: left center
      .by-right
        width: 154px
        bg-image('../../common/imgs/mind/leftright')
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
          line-height: 30px
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
