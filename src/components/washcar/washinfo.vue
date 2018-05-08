<template>
  <transition name="show">
    <div class="wash-info">
      <div class="header">
        <h2>洗车服务详情</h2>
        <div class="close" @click="closewindow"></div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  methods: {
    closewindow () {
      this.$emit('closewindow', false)
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .show-enter-active, .show-leave-active
    transition:  all .3s
  .show-enter, .show-leave-to
    transform: translateY(100%)
    opacity: 0
  .wash-info
    position: absolute
    left: 0
    bottom: 0
    width: 100%
    min-height: 260px
    overflow: hidden
    background-color: #fff
    box-shadow: 0 -6px 10px rgba(0, 0, 0, 0.1)
    z-index: 200
    opacity: 1
    .header
      display: flex
      height: 78px
      h2
        flex: 1
        padding-left: 30px
        font-size: 28px
        color: #6c6c6c
        line-height: 78px
        font-weight: bold
      .close
        width: 78px
        bg-image('../../common/imgs/washcar/close')
        background-position: center center
        background-repeat: no-repeat
        background-size: 20px 20px
</style>
