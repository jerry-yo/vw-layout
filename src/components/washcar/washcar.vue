<template>
  <div class="detection-record" flexContainer>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="font">
        <h2>东风本田-思域</h2>
        <p><span>苏DB5A68</span><span>丨</span><span>2300km</span></p>
      </div>
      <div class="search"></div>
    </div>
    <div class="container" ref="container">

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  methods: {
    _goBack () {
      this.$router.go(-1)
    }
  },
  created () {
    var map = new AMap.Map(this.$refs.container, {
      resizeEnable: true,
      zoom:11,
      center: [116.397428, 39.90923]
    })
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .detection-record
    background-color: #f4f4f4
    flex-direction: column
    height: 100vh
    .action-bar
      display: flex
      height: 88px
      background-color: #fff
      margin-bottom: 10px
      .font
        flex: 1
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
      .go-back
        width: 120px
        height: 88px
        bg-image('../../common/imgs/order/back')
        background-repeat: no-repeat
        background-position: 30px center
        background-size: 18px 30px
      .search
        width: 120px
        bg-image('../../common/imgs/washcar/search')
        background-repeat: no-repeat
        background-position: 54px center
        background-size: 36px 36px
    .container
      flex: 1
</style>
