<template>
  <div class="header-bar" :style="{backgroundColor: backgroundColor}">
    <slot name="left">
      <div class="left-icon" :class="leftIcon" @click="leftClick"></div>
    </slot>
    <slot name="content">
      <span class="universal-title" v-if="contentTitle" :style="{color: contentColor, fontSize: contentFontSize + 'px'}">{{contentTitle}}</span>
      <div class="special-title" v-if="showInfo" @click="contentClick">
        <h2>{{`${contentInfo.manufacturerName} - ${contentInfo.evehicleSystem}`}}</h2>
        <p><span>{{contentInfo.carNumber}}</span><span>丨</span><span>{{contentInfo.distance}}km</span></p>
      </div>
    </slot>
    <slot name="right">
      <div class="right-icon" v-if="rightIcon" :class="rightIcon" @click="rightClick"></div>
      <div class="right-font" v-if="rightTitle" :style="{color: rightColor}" @click="rightClick">
        {{rightTitle}}
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    leftIcon: {
      type: String,
      default: 'yellow'
    },
    backgroundColor: {
      type: String,
      default: '#fff'
    },
    contentTitle: {
      type: String,
      default: ''
    },
    contentInfo: {
      type: Object,
      default: function () { return {} }
    },
    contentColor: {
      type: String,
      default: '#fff'
    },
    contentFontSize: {
      type: Number,
      default: 18
    },
    rightIcon: {
      type: String,
      default: ''
    },
    rightTitle: {
      type: String,
      default: ''
    },
    rightColor: {
      type: String,
      default: '#5b5b5b'
    }
  },
  computed: {
    showInfo () {
      return Object.keys(this.contentInfo).length
    }
  },
  methods: {
    leftClick () {
      this.$emit('leftClick')
    },
    rightClick () {
      this.$emit('rightClick')
    },
    contentClick () {
      this.$emit('contentClick')
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "../common/stylus/mixin.styl"
  .header-bar
    position: relative
    height: 88px
    .left-icon
      position: absolute
      left: 0
      top: 0
      width: 120px
      height: 88px
      &.yellow
        bg-image('../common/imgs/order/back')
        background-repeat: no-repeat
        background-position: 30px center
        background-size: 18px 30px
      &.white
        bg-image('../common/imgs/car/back')
        background-repeat: no-repeat
        background-position: 30px center
        background-size: 18px 30px
    .universal-title
      position: absolute
      left: 0
      right: 0
      top: 0
      bottom: 0
      margin: auto
      display: inline-block
      width: 300px
      line-height: 88px
      text-align: center
      color: #fff
      font-size: 40px
      font-weight: 600
      transform: skewX(-10deg)
    .special-title
      position: absolute
      left: 0
      right: 0
      top: 0
      bottom: 0
      margin: auto
      width: 390px
      height: 88px
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      h2
        font-size: 30px
        line-height: 42px
        color: #5b5b5b
        font-weight: bolder
        transform: skewX(-10deg)
      p
        font-size: 22px
        color: #5b5b5b
        line-height: 34px
        span:nth-child(2)
          margin: 0 15px
    .right-icon
      position: absolute
      right: 0
      top: 0
      width: 120px
      height: 88px
      &.search
        bg-image('../common/imgs/washcar/search')
        background-repeat: no-repeat
        background-position: 54px center
        background-size: 36px 36px
    .right-font
      position: absolute
      right: 0
      top: 0
      width: 120px
      height: 88px
      overflow: hidden
      padding-right: 30px
      line-height: 88px
      text-align: right
      font-size: 26px
</style>
