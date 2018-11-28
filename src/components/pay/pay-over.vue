<template>
  <div class="pay-over" flexContainer>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="font">支付完成</div>
    </div>
    <div class="container">
      <div class="bg"></div>
      <div class="info">
        <div class="title">服务完成</div>
        <div class="store">奇特异{{/维修/.test(station) ? '维修' : '保养'}}门店-{{station}}</div>
      </div>
    </div>
    <!-- <div class="evaluate">
      <div class="star-con">
        <span>给本次服务评个星吧</span>
        <Star @starnum="getStarNum"></Star>
      </div>
      <div class="text-con" ref="textcon">
        <textarea name="name" rows="5" v-model.lazy="textarea" maxlength="500" placeholder="有什么建议尽管提啦~" @focus="_focusText" @input="filterFont"></textarea>
      </div>
    </div> -->
    <div class="button" @click="_lookOrder">确认</div>
  </div>
</template>

<script>
// import Star from '@/base/star.vue'
export default {
  name: 'payOver',
  data () {
    return {
      station: null,
      type: null
    }
  },
  created () {
    this.station = this.$route.query.station
    this.type = this.$route.query.type
  },
  methods: {
    _goBack () {
      this.$router.go(-3)
    },
    // _goHome () {
    //   this.$router.push('/home')
    // },
    _lookOrder () {
      this.$router.push('/complete')
    }
    // getStarNum (id) {
    //   console.log(id)
    // },
    // _focusText () {
    //   let _self = this
    //   setTimeout(function () {
    //     let pannel = _self.$refs.textcon
    //     pannel.scrollIntoView(true)
    //     pannel.scrollIntoViewIfNeeded(true)
    //   }, 200)
    // },
    // filterFont () {
    //   console.log('666')
    // }
  }
  // components: {
  //   Star
  // }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .pay-over
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
      height: 200px
      display: flex
      bg-image('../../common/imgs/mindbg')
      background-size: 100% 200px
      background-repeat: no-repeat
      background-position: center center
      .bg
        width: 266px
        bg-image('../../common/imgs/orderinfo/order-bg-2')
        background-repeat: no-repeat
        background-size: 184px 103px
        background-position: right center
        margin-right: 84px
      .info
        flex: 1
        display: flex
        flex-direction: column
        justify-content: center
        .store
          height: 35px
          line-height: 35px
          font-size: 26px
          color: #fffefe
          font-weight: bold
        .title
          height: 42px
          line-height: 42px
          color: #fff
          font-size: 26px
    .evaluate
      overflow: hidden
      min-height: 280px
      padding: 0px 55px
      .star-con
        padding: 35px 0px 30px 0px
        height: 105px
        display: flex
        span
          flex: 1
          line-height: 40px
          font-size: 26px
          color: #999999
      .text-con
        textarea
          background-color: #f2f2f2
          width: 100%
          border-radius: 8px
          padding: 20px
          outline: none
          -webkit-appearance: none
          font-size: 26px
          color: #5b5b5b
          line-height: 46px
          &::-webkit-input-placeholder
            font-size: 26px
            color: #c6c5c5
    .button
      margin: 0px auto
      width: 434px
      height: 80px
      margin-top: 36px
      display: flex
      align-items: center
      justify-content: center
      background: -webkit-linear-gradient(left, #ff7f4d, #ff5344)
      font-size: 26px
      color: #ffffff
</style>
