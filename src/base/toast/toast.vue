// toast 显示时间 long 3.5s short 2s
<template>
  <transition name='slide-fade'>
    <div class="toast-mask" :class="position" v-show="visible">
      <span class="toast bottom">
        {{message}}
      </span>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'toast',
  data () {
    return {
      visible: false,
      message: '',
      position: ''
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

  .toast-mask
    position: fixed
    width: 100%
    height: auto
    display: flex
    justify-content: center
    align-items: center
    transform: translate(0)
    opacity: 1
    z-index: 9999
    &.slide-fade-enter-active
      transition: all .3s ease
    &.slide-fade-leave-active
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
    &.slide-fade-enter, &.slide-fade-leave-to
      transform: translate(50px)
      opacity: 0
    &.top
      top: 10%
    &.middle
      top: 50%
    &.bottom
      bottom: 10%
    .toast
      padding: 15px 30px
      max-width: 80%
      border-radius: 10px
      background: rgba(0,0,0,0.5)
      font-size: 24px
      color: #fff
      line-height: 30px
      text-align: center
</style>
