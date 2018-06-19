<template>
  <div class="order-xc">
    <div class="xc-left" :class="'wash-bg-' + washCarInfo.icon">
    </div>
    <div class="xc-con">
      <h3>{{washCarInfo.title}}</h3>
      <p>{{washCarInfo.txt}}</p>
    </div>
    <div class="xc-right">
      <span>￥{{washCarInfo.price.toFixed(2)}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'orderXc',
  props: {
    data: {
      type: Number,
      required: true
    }
  },
  computed: {
    washCarInfo () {
      let icon = 0
      let title = ''
      let txt = ''
      let price = 0
      if (this.data === 0) {
        icon = 0
        title = '普洗'
        txt = '整车泡沫冲洗擦干、轮胎轮毂冲洗清洁、车内吸尘、内饰脚垫等简单除尘沙发沙发沙发上发生的发生发生沙发的发放'
        price = 30
      } else if (this.data === 1) {
        icon = 1
        title = '精洗'
        txt = '整车泡沫冲洗擦干、轮胎轮毂冲洗清洁、车内吸尘、内饰脚垫等简单除尘沙发沙发沙发上发生的发生发生沙发的发放'
        price = 60
      } else if (this.data === 2) {
        icon = 2
        title = '超精洗'
        txt = '整车泡沫冲洗擦干、轮胎轮毂冲洗清洁、车内吸尘、内饰脚垫等简单除尘沙发沙发沙发上发生的发生发生沙发的发放'
        price = 90
      }
      return {
        icon: icon,
        title: title,
        txt: txt,
        price: price
      }
    }
  },
  mounted () {
    console.log(this.data)
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .order-xc
    display: flex
    align-items: center
    height: 147px
    padding-right:30px
    background: #fafafa
    .xc-left
      width: 124px
      height: 70px
      overflow: hidden
      margin-right: 38px
      background-size: 124px 70px
      background-repeat: no-repeat
      background-position: right center
      &.wash-bg-0
        bg-image('../../common/imgs/washcar/p_wash')
      &.wash-bg-1
        bg-image('../../common/imgs/washcar/j_wash')
      &.wash-bg-2
        bg-image('../../common/imgs/washcar/super_wash')
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
        word-break: break-all
        overflow : hidden
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
    .xc-right
      width: 170px
      height: 70px
      line-height: 70px
      font-size: 22px
      text-align: right
      color: #ff7a7a
</style>
