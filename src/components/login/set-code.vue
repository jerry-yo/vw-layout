<template>
  <div class="setcode" flexContainer>
    <div class="title">
      <div class="register">
        注册
      </div>
    </div>
    <div class="section">
      <h1>验证码已发送</h1>
      <div class="input">
        <input type="text" name="" maxlength="6" value="" autofocus v-model="number">
        <ul>
          <li>{{codeArr[0] ? codeArr[0] : ''}}</li>
          <li>{{codeArr[1] ? codeArr[1] : ''}}</li>
          <li>{{codeArr[2] ? codeArr[2] : ''}}</li>
          <li>{{codeArr[3] ? codeArr[3] : ''}}</li>
          <li>{{codeArr[4] ? codeArr[4] : ''}}</li>
          <li>{{codeArr[5] ? codeArr[5] : ''}}</li>
        </ul>
      </div>
      <h2>请输入验证短信中的验证码</h2>
      <div class="btn" @click="goBtn"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'setcode',
  data () {
    return {
      number: null,
      codeArr: []
    }
  },
  watch: {
    number: function (newQuestion, oldQuestion) {
      this.codeArr = newQuestion.split('')
    }
  },
  methods: {
    goBtn () {
      console.log(this.codeArr)
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .setcode
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
        & > ul
          flex: 1
          display: flex
          justify-content: space-between
          li
            position: relative
            width: 60px
            text-align: center
            line-height: 94px
            font-size: 60px
            color: #5b5b5b
            font-weight: bold
            &::after
              content: ''
              position: absolute
              bottom: -4px
              left: 0
              width: 60px
              height: 4px
              border-radius: 4px
              background-color: #5b5b5b
        & > input
          width: 0px
          height: 0px
          opacity: 0
      & > h2
        margin-top: 46px
        font-size: 26px
        color: #b6b6b6
      .btn
        height: 92px
        margin-top: 102px
        /* bg-image('../../common/imgs') */
        background-color: #ff5c3a
        background-size: 60px 60px
        background-repeat: no-repeat
        background-position: 70px 65px
</style>
