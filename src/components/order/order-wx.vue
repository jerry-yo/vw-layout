<template>
  <div class="order-wx">
    <div class="by-top">
      <ul class="by-left" v-if="data.faultImgs.length > 0">
        <li v-for="(item, index) in data.faultImgs" :key="index"><img v-lazy="item" alt=""/></li>
      </ul>
      <div class="noimgs" v-else :class="showType.defaultImg === 1 ? 'bg-1' : 'bg-2'"></div>
      <div class="by-con" :class="{'ellipsis': data.faultImgs.length > 2}">
        <h2 v-if="data.faultText.length === 0">{{showType.title}}</h2>
        <p>{{showType.txt}}</p>
      </div>
      <div class="by-right" v-if="false">
        <div class="img">
          <img src="../../common/imgs/order/wash-bg@2x.png" alt="">
          <span>赠送</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderWx',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    showType () {
      let title = ''
      let txt = ''
      let defaultImg = 1
      if (this.data.faultText.length === 0) {
        defaultImg = 1
        title = '到店检查'
        txt = '可提前联系店长简要描述需求奥， 以便店长提供更好的服务'
      } else {
        txt = this.data.faultText
        defaultImg = 2
      }
      return {
        title: title,
        txt: txt,
        defaultImg: defaultImg
      }
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .order-wx
    display: flex
    align-items: center
    height: 147px
    padding: 0px 30px
    .by-top
      flex: 1
      display: flex
      padding: 20px 15px 20px 0px
      bg-image('../../common/imgs/mind/leftright')
      background-size: 15px 24px
      background-repeat: no-repeat
      background-position: right center
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
      .noimgs
        overflow: hidden
        width: 120px
        height: 120px
        border: 1px solid #d2d2d2
        &.bg-1
          bg-image('../../common/imgs/order/no_by')
          background-size: 120px 120px
          background-repeat: no-repeat
          background-position: center center
        &.bg-2
          bg-image('../../common/imgs/order/have_server')
          background-size: 120px 120px
          background-repeat: no-repeat
          background-position: center center
      .by-con
        flex: 1
        display: flex
        flex-direction: column
        justify-content: center
        padding: 0px 20px
        &.ellipsis
          padding-left: 37px
          bg-image('../../common/imgs/ellipsis')
          background-size: 27px 6px
          background-repeat: no-repeat
          background-position: left center
        h2
          line-height: 40px
          font-size: 24px
          color: #444
          font-weight: bold
        p
          line-height: 30px
          height: 90px
          font-size: 20px
          color: #444
          overflow : hidden
          text-overflow: ellipsis
          display: -webkit-box
          -webkit-line-clamp: 3
          -webkit-box-orient: vertical
      .by-right
        width: 134px
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
</style>
