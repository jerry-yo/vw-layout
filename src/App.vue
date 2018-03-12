<template>
  <div id="app" flexContainer @touchmove.prevent>
    <transition :name="'screen-' + (direction === 'next' ? 'in' : 'out')">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      direction: 'next'
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  #app
    height: 100vh
    .screen-out-enter-active,
    .screen-out-leave-active,
    .screen-in-enter-active,
    .screen-in-leave-active
      will-change: transform
      transition: all 300ms
      height: 100%
      top: 0
      position: absolute
      backface-visibility: hidden
      perspective: 1000
    .screen-out-enter
      // opacity: 0
      transform: translate3d(-100%, 0, 0)
    .screen-out-leave-active
      // opacity: 0
      // transform: translate3d(100%, 0, 0)
    .screen-in-enter
      // opacity: 0
      transform: translate3d(100%, 0, 0)
    .screen-in-leave-active
      // opacity: 0
      // transform: translate3d(-100%, 0, 0)
</style>
