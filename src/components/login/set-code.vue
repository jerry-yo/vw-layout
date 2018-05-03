<template>
  <div class="setcode">
    <div class="title">
      <div class="register">
        注册
      </div>
    </div>
    <div class="section">
      <h1>验证码已发送</h1>
      <div class="input" @click="foucsInput">
        <input type="number" name="" maxlength="6" value="" v-model="number" ref="number" pattern="[0-9]*">
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
      <div @click="goBtn" class="btn" :class="flag ? 'active' : 'unactive'">
        {{flag ? seconds + 's后重新获取' : '重新获取'}}
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'setcode',
  data () {
    return {
      number: null,
      codeArr: [],
      flag: true,
      timer: null,
      seconds: 60
    }
  },
  watch: {
    number: function (newQuestion, oldQuestion) {
      this.codeArr = newQuestion.split('')
    }
  },
  methods: {
    goBtn () {
      if (!this.flag) {
        this.seconds = 60
        this.flag = true
        this._setTimeout()
      }
    },
    foucsInput () {
      this.$refs.number.focus()
    },
    _setTimeout () {
      this.timer = setTimeout(() => {
        if (this.seconds < 2) {
          clearTimeout(this.timer)
          this.flag = false
        } else {
          this.seconds--
          this._setTimeout()
        }
      }, 1000)
    }
  },
  mounted () {
    this._setTimeout()
  },
  destroy () {
    clearTimeout(this.timer)
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .setcode
    height: 100vh
    width: 100%
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
          position: absolute
          z-index: -1
          width: 1px
          height: 1px
          opacity: 1
      & > h2
        margin-top: 46px
        font-size: 26px
        color: #b6b6b6
      .btn
        width: 230px
        height: 60px
        margin-top: 102px
        display: flex
        justify-content: center
        align-items: center
        border-radius: 60px
        overflow: hidden
        &.unactive
          font-size: 26px
          color: #fff
          background: -webkit-linear-gradient(left, #ff974a, #ff5c3a)
        &.active
          font-size: 26px
          color: #ff8445
          bg-image('../../common/imgs/login/getpwd')
          background-size: 230px 60px
          background-repeat: no-repeat
          background-position: center center
</style>
