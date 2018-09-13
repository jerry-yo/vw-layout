<template>
  <div class="order-by">
    <div class="by-top">
      <ul class="by-left" v-if="data.partListStr.length > 0">
        <li v-for="(item, index) in data.partListStr" :key="index"><img :src="imgpartUrl + item" alt=""/></li>
      </ul>
      <div class="noimgs" v-else :class="showType.defaultImg === 1 ? 'bg-1' : 'bg-2'"></div>
      <div class="by-con" v-if="data.partListStr.length === 0" :class="{'ellipsis': data.partListStr.length > 2}">
        <h2>{{showType.title}}</h2>
        <p>{{showType.txt}}</p>
      </div>
      <div class="by-right" v-if="false">
        <div class="img">
          <img src="../../common/imgs/order/wash-bg@2x.png" alt="">
          <span>赠送</span>
        </div>
      </div>
    </div>
    <div class="by-bottom">
      <div class="by-left">
        <span>共{{data.partInfos}}个配件，{{data.serversNum}}个服务</span>
      </div>
      <div class="by-right" v-if="money === 'all'">
        总额：<span>{{`￥${data.partMoney + data.serverMoney}`}}</span>
      </div>
      <div class="by-right" v-else>
        配件总额：<span>{{`￥${data.partMoney}`}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderBy',
  props: {
    data: {
      type: Object,
      required: true
    },
    money: {
      type: String,
      default: 'all'
    }
  },
  computed: {
    showType () {
      let title = ''
      let txt = ''
      let defaultImg = 1
      if (this.data.partInfos === 0 && this.data.serversNum === 0) {
        title = '到店自选服务'
        txt = '可提前联系店长简要描述需求奥， 以便店长提供更好的服务'
        defaultImg = 1
      } else if (this.data.serversNum > 0) {
        title = '无产品有服务'
        txt = '无产品有服务'
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
  .order-by
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
        padding: 0 30px
        &.ellipsis
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
          font-size: 20px
          color: #444
      .by-right
        width: 154px
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
