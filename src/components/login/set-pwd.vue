<template>
  <div class="setpwd" flexContainer>
    <div class="title">
      <div class="register">
        注册
      </div>
    </div>
    <div class="section">
      <h1>编辑密码</h1>
      <div class="input">
        <input type="number" name="" value="" placeholder="编辑密码">
        <div class="seen-btn">

        </div>
      </div>
      <div class="input">
        <input type="number" name="" value="" placeholder="确认密码">
        <div class="seen-btn">

        </div>
      </div>
      <div class="btn">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'setpwd'
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .setpwd
    min-height: 100vh
    display: flex
    flex-direction: column
    background-color: #fff
    .title
      padding: 0 30px
      height: 88px
      display: flex
      justify-content: flex-end
      .register
        width: 180px
        /* bg-image('../../common/') */
        background-repeat: no-repeat
        background-size: 16px 28px
        background-position: right center
        padding-right: 40px
        text-align: right
        line-height: 88px
        font-size: 36px
        color: #ff7240
    .section
      flex: 1
      padding: 65px 70px 0px 70px
      bg-image('../../common/imgs/logo60')
      background-size: 60px 60px
      background-repeat: no-repeat
      background-position: 70px 65px
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
        display: flex
        background-color: blue
        &:nth-child(1)
          margin-bottom: 34px
        & > input
          flex: 1
          height: 94px
          padding-left: 82px
          bg-image('../../common/imgs/logo60')
          background-size: 24px 38px
          background-repeat: no-repeat
          background-position: 23px center
          &::-webkit-input-placeholder
            font-size: 28px
            color: #9e9e9e
        .seen-btn
          width: 60px
          bg-image('../../common/imgs/logo60')
          background-size: 24px 38px
          background-repeat: no-repeat
          background-position: right center
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
        height: 92px
        margin-top: 147px
        /* bg-image('../../common/imgs') */
        background-color: #ff5c3a
        background-size: 60px 60px
        background-repeat: no-repeat
        background-position: 70px 65px
</style>
