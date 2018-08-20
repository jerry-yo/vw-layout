<template>
  <div class="register">
    <div class="title">
      <div class="goback" @click="_goBack">
      </div>
      <span></span>
      <div class="login" @click="_goLogin">
        登录
      </div>
    </div>
    <div class="section">
      <h1>注册账号</h1>
      <div class="input">
        <input type="number" v-model="tel" placeholder="请输入您的手机号"  pattern="[0-9]*"  @input="_maxlength">
      </div>
      <div class="btn" @click="_getCode">
        获取验证码
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      tel: ''
    }
  },
  methods: {
    _goBack () {
      this.$router.go(-1)
    },
    _goLogin () {
      this.$router.replace('/login')
    },
    _getCode () {
      if (/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17([0-1,3]|[6-8]))|(18[0-9]))\d{8}$/.test(this.tel)) {
        this.$router.push('/setcode?phone=' + this.tel + '&type=2')
      } else {
        this.$Toast({
          position: 'bottom',
          message: '手机号格式错误！'
        })
      }
    },
    _maxlength (val) {
      if (this.tel.length > 11) {
        this.tel = this.tel.slice(0, 11)
      }
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .register
    height: 100vh
    width: 100%
    background-color: #fff
    .title
      height: 88px
      display: flex
      .goback
        width: 160px
        bg-image('../../common/imgs/repair/back')
        background-repeat: no-repeat
        background-size: 18px 30px
        background-position: 30px center
      span
        flex: 1
      .login
        width: 180px
        line-height: 88px
        padding-right: 30px
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
