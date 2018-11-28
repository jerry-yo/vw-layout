<template>
  <div class="set-up" flexContainer>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="font">设置</div>
    </div>
    <div class="container">
      <div class="list">
        <span>清楚缓存</span>
        <div class="btn">
          0.00kb
        </div>
      </div>
      <div class="list">
        <span>检查更新</span>
        <div class="btn">
          当前版本v2.0
        </div>
      </div>
    </div>
    <div class="login-btn">
      <div class="btn" @click="setLoginState">
        退出登录
      </div>
    </div>
  </div>
</template>

<script>
import Wx from 'Wx'
import {mapActions} from 'vuex'
export default {
  name: 'setUp',
  data () {
    return {
    }
  },
  methods: {
    _goBack () {
      this.$router.back()
    },
    setLoginState () {
      this.deleteUserInfo()
      Wx.closeWindow()
    },
    ...mapActions([
      'deleteUserInfo'
    ])
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
      margin-top: 20px
      .list
        display: flex
        height: 90px
        background-color: #fff
        margin-bottom: 1px
        line-height: 90px
        padding: 0 30px
        span
          font-size: 26px
          color: #5b5b5b
        .btn
          flex: 1
          padding-right: 28px
          bg-image('../../common/imgs/mind/leftright')
          background-repeat: no-repeat
          background-position: right center
          background-size: 15px 24px
          font-size: 26px
          color: #9f9f9f
          text-align: right
    .login-btn
      height: 140px
      .btn
        width: 630px
        height: 80px
        margin: 0 auto
        background: -webkit-linear-gradient(left, #ff6b08, #ff4d4d)
        border-radius: 15px
        line-height: 80px
        text-align: center
        font-size: 30px
        color: #fff
</style>
