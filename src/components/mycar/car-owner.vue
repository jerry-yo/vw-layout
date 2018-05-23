// 车主认证

<template>
  <div class="car-owner" flexContainer>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="font">车主认证</div>
    </div>
    <div class="container">
      <vehicleCertification :vin-type="vinType"></vehicleCertification>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import vehicleCertification from './vehicle-certification'
export default {
  name: 'carOwner',
  data () {
    return {
      vinType: 0
    }
  },
  methods: {
    _goBack () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.vinType = parseInt(this.$route.query.carid)
  },
  components: {
    vehicleCertification
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.car-owner
  background-color: #f4f4f4
  flex-direction: column
  height: 100vh
  .action-bar
    position: relative
    height: 88px
    background-color: #fff
    .font
      position: absolute
      left: 0
      top: 0
      right: 0
      bottom: 0
      margin: auto
      width: 180px
      height: 88px
      line-height: 88px
      text-align: center
      font-size: 36px
      color: #5b5b5b
      font-weight: bold
      transform: skewX(-10deg)
    .go-back
      display: inline-block
      float: left
      width: 120px
      height: 88px
      bg-image('../../common/imgs/order/back')
      background-repeat: no-repeat
      background-position: 30px center
      background-size: 18px 30px
  .container
    flex: 1
    display: flex
</style>
