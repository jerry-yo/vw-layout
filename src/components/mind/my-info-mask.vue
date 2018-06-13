<template>
  <transition name="showinfo">
    <div class="my-info-mask" @click="_goBack">
      <div class="mask-con" @click.prevent.stop>
        <div class="text">
          <input type="text" name="" v-model="modifyinfo" placeholder="请输入信息" @input="_inputValue">
          <div class="clear" v-show="showClear" @click="_clearInput"></div>
        </div>
        <p class="tips">
          {{showTips}}
        </p>
      </div>
      <div class="submit-btn" @click.prevent.stop="_modifySuccess" >确认</div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'my-info-mask',
  props: {
    id: {
      type: Number,
      default: 0
    },
    info: {
      type: String
    }
  },
  data () {
    return {
      modifyinfo: ''
    }
  },
  computed: {
    showClear () {
      return this.modifyinfo === 0 ? 0 : 1
    },
    showTips () {
      let tips = ''
      switch (this.id) {
        case 1:
          tips = '请输入昵称  不得含有特殊符号'
          break
        case 2:
          tips = '请输入手机号'
          break
      }
      return tips
    }
  },
  mounted () {
    this.modifyinfo = this.info
  },
  methods: {
    _goBack () {
      this.$emit('closemask', {modify: false})
    },
    _clearInput () {
      this.modifyinfo = ''
    },
    _inputValue (e) {
      if (e.data === null && this.modifyinfo.length > 0) {
        return this.modifyinfo.length - 1
      }
    },
    _modifySuccess () {
      if (this.modifyinfo === '' && (this.id === 1 || this.id === 3)) {
        this.$Toast({
          message: '信息不能为空！',
          position: 'top'
        })
        return
      }
      if (this.id === 2 && (!/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17([0-1,3]|[6-8]))|(18[0-9]))\d{8}$/.test(this.modifyinfo))) {
        this.$Toast({
          message: '手机号码格式错误！',
          position: 'top'
        })
        return
      }
      this.$emit('closemask', {modify: true, info: this.modifyinfo})
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .showinfo-enter-active, .showinfo-leave-active
    opacity: 1
  .showinfo-enter, .showinfo-leave-to
    opacity: 0
  .my-info-mask
    position: fixed
    left: 0
    top: 0
    bottom: 0
    right: 0
    background-color: rgba(0, 0, 0, 0.5)
    transition: opacity .3s
    overflow: hidden
    z-index: 10
    .mask-con
      display: flex
      flex-direction: column
      width: 690px
      height: 235px
      background-color: #fff
      margin: 0 auto
      margin-top: 108px
      margin-bottom: 65px
      padding: 0 60px
      .text
        position: relative
        display: flex
        padding-top: 60px
        height: 124px
        &:after
          display: block
          position: absolute
          left: 0px
          bottom: 0px
          content: ''
          width: 100%
          height: 4px
          background: -webkit-linear-gradient(left, #ff5f25, #ff4d4d)
          border-radius: 4px
        .clear
          position: absolute
          right: 0
          bottom: 0
          width: 100px
          height: 64px
          bg-image('../../common/imgs/mind/search_close')
          background-position: center center
          background-repeat: no-repeat
          background-size: 30px 30px
        input
          width: 100%
          height: 100%
          outline: none
          background: none
          border: none
          padding: 0 45px
      .tips
        margin-top: 38px
        font-size: 26px
        text-align: center
        color: #bcbcbc
    .submit-btn
      width: 285px
      height: 90px
      text-align: center
      line-height: 90px
      font-size: 30px
      color: #fefefe
      background: -webkit-linear-gradient(left, #ff5f25, #ff4d4d)
      border-radius: 90px
      overflow: hidden
      margin: 0 auto
</style>
