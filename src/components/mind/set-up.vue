<template>
  <div class="set-up" flexContainer>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="font">设置</div>
    </div>
    <div class="container">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'setUp',
  data () {
    return {
    }
  },
  methods: {
    _goBack () {
      this.$router.go(-1)
    }
  },
  components: {
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .set-up
    flex-direction: column
    height: 100vh
    background-color: #f4f4f4
    overflow: hidden
    .action-bar
      display: flex
      height: 88px
      background-color: #fff
      .font
        flex: 1
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        margin-right: 120px
        font-size: 36px
        color: #5b5b5b
        font-weight: bolder
        transform: skewX(-10deg)
      .go-back
        width: 120px
        height: 88px
        bg-image('../../common/imgs/order/back')
        background-repeat: no-repeat
        background-position: 30px center
        background-size: 18px 30px
    .container
      flex: 1
</style>
