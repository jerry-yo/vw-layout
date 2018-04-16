<template>
  <span v-if="dot" :class="classes" ref="badge">
    <slot></slot>
    <sup :class="dotClasses" v-show="badge"></sup>
  </span>
  <span v-else :class="classes" ref="badge">
    <slot></slot>
    <sup v-if="count" :class="countClasses" v-show="badge">{{ finalCount }}</sup>
  </span>
</template>
<script type="text/ecmascript-6">
const prefixCls = 'ivu-badge'
export default {
  name: 'Badge',
  props: {
    count: [Number, String],
    dot: {
      type: Boolean,
      default: false
    },
    overflowCount: {
      type: [Number, String],
      default: 99
    },
    className: String
  },
  computed: {
    classes () {
      return `${prefixCls}`
    },
    dotClasses () {
      return `${prefixCls}-dot`
    },
    countClasses () {
      return [`${prefixCls}-count`, {[`${this.className}`]: !!this.className, [`${prefixCls}-count-alone`]: this.alone}]
    },
    finalCount () {
      return parseInt(this.count) >= parseInt(this.overflowCount) ? `${this.overflowCount}+` : this.count
    },
    badge () {
      let status = false
      if (this.count) {
        status = !(parseInt(this.count) === 0)
      }
      if (this.dot) {
        status = true
        if (this.count !== null) {
          if (parseInt(this.count) === 0) {
            status = false
          }
        }
      }
      return status
    },
    alone () {
      return this.$slots.default === undefined
    }
  }
}
</script>
<style  scoped lang="stylus" ref="stylesheet/stylus">
.ivu-badge
  position: relative
  display: inline-block
  line-height: 1
  vertical-align: middle
  .ivu-badge-count
      position: absolute
      transform: translateX(50%)
      top: -10px
      right: 0
      height: 30px
      border-radius: 15px
      min-width: 30px
      background: #ed3f14
      color: #fff
      line-height: 30px
      text-align: center
      padding: 0 9px
      font-size: 20px
      white-space: nowrap
      transform-origin: -10% center
      z-index: 10
      a,a:hover
          color: #fff
      .ivu-badge-alone
          top: auto
          display: block
          position: relative
          transform: translateX(0)
  .ivu-badge-dot
      position: absolute
      transform: translateX(-50%)
      transform-origin: 0 center
      top: -8px
      right: -16px
      height: 16px
      width: 16px
      border-radius: 100%
      background: #ed3f14
      z-index: 10
</style>
