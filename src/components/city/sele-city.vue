<template>
    <div class="order" flexContainer>
      <div class="action-bar">
        <div class="back" @click="_goBack" ></div>
        <span>选择城市</span>
      </div>
      <div class="search-bar">

      </div>
      <div class="location-bar">

      </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'seleCity',
  methods: {
    _goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .order
    flex-direction: column
    height: 100vh
    background-color: #f4f4f4
    overflow: hidden
    .action-bar
      position: relative
      height: 88px
      background-color: #fff
      & > span
        position: absolute
        left: 0
        top: 0
        right: 0
        bottom: 0
        margin: auto
        display: inline-block
        width: 160px
        height: 86px
        text-align: center
        line-height: 86px
        font-weight: 600
        font-size: 36px
        color: #5b5b5b
        transform: skewX(-15deg)
      .back
        width: 120px
        height: 100%
        bg-image('../../common/imgs/order/back')
        background-size: 18px 30px
        background-repeat: no-repeat
        background-position: 30px center
        color: #5b5b5b
</style>
