<template>
  <transition name="slide" >
    <div class="check-info-mask">
      <div class="mask-con">
        <h2 class="title">
          <span :class="'err'">照明系统-近光灯</span>
        </h2>
        <div class="content">
          <p>车辆近光灯线路故障，切换近光灯时，线路接触问题导致近光灯忽明忽暗，为了您的行车安全建议您及时更换近光灯。</p>
        </div>
        <ul class="imgs">
          <li><img src="../../common/imgs/default.png" alt=""> </li>
          <li><img src="../../common/imgs/default.png" alt=""></li>
          <li><img src="../../common/imgs/default.png" alt=""></li>
        </ul>
        <div class="close-btn" @click="_closeMask">
          知道了
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'checkInfo',
  methods: {
    _closeMask () {
      this.$emit('closemask', false)
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .slide-enter-active, .slide-leave-active
    opacity: 1
  .slide-enter, .slide-leave-to
    opacity: 0
  .check-info-mask
    display: flex
    justify-content: center
    align-items: center
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    background-color: rgba(0,0,0,.5)
    z-index: 101
    transition: all .3s
    .mask-con
      padding: 45px 30px
      width: 630px
      overflow: hidden
      background-color: #fff
      border-radius: 10px
      .title
        display: flex
        align-items: center
        height: 110px
        span
          padding-right: 112px
          background-position: right center
          background-repeat: no-repeat
          background-size: 78px 56px
          font-size: 30px
          color: #585858
          font-weight: bold
          &.err
            bg-image('../../common/imgs/orderinfo/err')
          &.warn
            bg-image('../../common/imgs/orderinfo/warn')
      .content
        max-height: 138px
        overflow: hidden
        p
          font-size: 26px
          color: #585858
          line-height: 46px
      .imgs
        margin-top: 30px
        margin-bottom: 50px
        height: 160px
        overflow: hidden
        li
          box-sizing: border-box
          height: 160px
          width: 160px
          border: 1px solid #b6b6b6
          margin-right: 14px
          float: left
          img
            display: flex
            width: 100%
            height: 100%
      .close-btn
        height: 58px
        text-align: center
        font-size: 30px
        color: #ff9239
        line-height: 58px

</style>
