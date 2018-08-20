<template>
  <div class="footer" w-750-98 aspectratio aspect-ratio="750/98">
    <router-link :to="{ name: 'home', path: '/home' }" tag="div" class="home"></router-link>
    <router-link :to="{ name: 'mind', path: '/mind' }" tag="div" class="mind"></router-link>
  </div>
</template>

<script>
export default {
  name: 'vfooter',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  [w-750-98]
    display: flex
    width: 750px
    background: #fff
    overflow: hidden
  [w-750-98]
    aspect-ratio:'750:98'
  .footer
    height: 98px
    -webkit-box-shadow:0 0 10px rgba(0, 0, 0, .1)
    -moz-box-shadow:0 0 10px rgba(0, 0, 0, .1)
    box-shadow:0 0 10px rgba(0, 0, 0, .1)
    & > div
      flex: 1
      display: flex
      justify-content: center
      align-items: center
      font-style: italic
      font-size: 20px
      color: #8a8989
    .home
      bg-image('../../common/imgs/footer/home')
      background-size: 55px 63px
      background-position: center center
      background-repeat: no-repeat
      &.active-on
        bg-image('../../common/imgs/footer/home-active')
    .mind
      bg-image('../../common/imgs/footer/mind')
      background-size: 55px 63px
      background-position: center center
      background-repeat: no-repeat
      &.active-on
        bg-image('../../common/imgs/footer/mind-active')
</style>
