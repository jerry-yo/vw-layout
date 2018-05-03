<template>
  <div class="login">
    <div class="title">
      <div class="register">
        注册
      </div>
    </div>
    <div class="section">
      <h1>欢迎登录GT1养车</h1>
      <div class="input">
        <input type="number" name="" value="" placeholder="请输入您的手机号"  pattern="[0-9]*">
      </div>
      <div class="btn">
        获取验证码
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'login'
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .login
    width: 100%
    height: 100vh
    background-color: #fff
    .title
      padding: 0 30px
      height: 88px
      display: flex
      justify-content: flex-end
      align-items: center
      .register
        width: 180px
        bg-image('../../common/imgs/login/goregister')
        background-repeat: no-repeat
        background-size: 16px 28px
        background-position: right center
        padding-right: 40px
        text-align: right
        font-size: 36px
        color: #ff7240
    .section
      flex: 1
      padding: 65px 70px 0px 70px
      bg-image('../../common/imgs/login/logo')
      background-size: 103px 103px
      background-repeat: no-repeat
      background-position: 48px 41px
      overflow: hidden
      & > h1
        height: 48px
        font-size: 46px
        color: #5b5b5b
        line-height: 48px
        transform: skewX(-10deg)
        margin-top: 80px
        font-weight: bolder
      .input
        position: relative
        margin-top: 120px
        height: 94px
        & > input
          width: 100%
          height: 94px
          padding-left: 82px
          bg-image('../../common/imgs/login/iphone')
          background-size: 24px 38px
          background-repeat: no-repeat
          background-position: 23px center
          outline: none
          border: none
          -webkit-appearance: none
          &::-webkit-input-placeholder
            font-size: 28px
            color: #9e9e9e
        &:after
          content: ""
          position: absolute
          bottom: -4px
          left: 0
          width: 100%
          height: 4px
          background-color: #5b5b5b
          border-radius: 4px
      .btn
        height: 90px
        margin-top: 176px
        bg-image('../../common/imgs/login/getyzm')
        background-size: 100% 90px
        background-repeat: no-repeat
        font-size: 36px
        color: #fff
        font-weight: 600
        line-height: 90px
        text-align: center
</style>
