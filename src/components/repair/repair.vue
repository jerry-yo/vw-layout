<template>
  <div class="repair" flexContainer :style="{height: clientHeight + 'px'}">
    <div class="action-bar">
      <div class="go-back"></div>
      <div class="font">
        <h2>东风本田-思域</h2>
        <p><span>苏DB5A68</span><span>丨</span><span>2300km</span></p>
      </div>
    </div>
    <div class="service-flow">
      <span class="bg bg1">选择服务</span>
      <span>-</span>
      <span class="bg bg2">选择门店</span>
      <span>-</span>
      <span class="bg bg3">确认订单</span>
      <span>-</span>
      <span class="bg bg4">到店服务</span>
    </div>
    <div class="container" ref="repair">
      <div class="wrapper">
        <div class="textarea" flexContainer ref="chatpannel"  @touchmove.stop>
          <textarea name="name" rows="5" placeholder="简单概述您的车辆故障，提供图片能帮助维修中心为您 提前进货哦" @focus="focusText"></textarea>
        </div>
        <div class="box">
        </div>
      </div>

    </div>
    <div class="go-next" @click="gggg">

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
// import weui from 'weui.js'
const wx = require('weixin-js-sdk')
export default {
  name: 'repair',
  data () {
    return {
      repairBScroll: null,
      clientHeight: null,
      wxInfo: null
    }
  },
  methods: {
    focusText () {
      let _self = this
      setTimeout(function () {
        let pannel = _self.$refs.chatpannel
        pannel.scrollIntoView(true)
        pannel.scrollIntoViewIfNeeded(true)
      }, 200)
    },
    gggg () {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          console.log(res)
        }
      })
      // weui.picker(
      //   [{
      //     label: '飞机票',
      //     value: 0,
      //     disabled: true // 不可用
      //   },
      //   {
      //     label: '火车票',
      //     value: 1
      //   },
      //   {
      //     label: '汽车票',
      //     value: 3
      //   },
      //   {
      //     label: '公车票',
      //     value: 4
      //   }],
      //   {
      //     className: 'custom-classname',
      //     container: 'body',
      //     defaultValue: [3],
      //     onChange: function (result) {
      //       console.log(result)
      //     },
      //     onConfirm: function (result) {
      //       console.log(result)
      //     },
      //     id: 'singleLinePicker'
      //   }
      // )
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.repairBScroll = new BScroll(this.$refs.repair, {
        click: true
      })
      this.clientHeight = document.body.offsetHeight
      this.api_post('/api/wxPubilc/getJSSDK', (response) => {
        if (response.errorCode === 0) {
          this.wxInfo = response.data
          wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: response.data.appid, // 必填，企业号的唯一标识，此处填写企业号corpid
            timestamp: response.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: response.data.nonceStr, // 必填，生成签名的随机串
            signature: response.data.signature, // 必填，签名，见附录1
            jsApiList: ['chooseImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
        }
      }, {
        url: 'https://www.gt1.shop/gt1/'
      })
      console.log(encodeURIComponent(location.href.split('#')[0]))
    })
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.repair
  height: 100vh
  position: relative
  background-color: #f4f4f4
  flex-direction: column
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
      h2
        font-size: 30px
        line-height: 42px
        color: #5b5b5b
        font-weight: bolder
        transform: skewX(-10deg)
      p
        font-size: 22px
        color: #5b5b5b
        line-height: 34px
        span:nth-child(2)
          margin: 0 15px
    .go-back
      width: 120px
      height: 88px
      bg-image('../../common/imgs/order/back')
      background-repeat: no-repeat
      background-position: 30px center
      background-size: 18px 30px
  .service-flow
    height: 70px
    background-color: #fff1e4
    padding: 0 30px
    display: flex
    font-size: 22px
    color: #ff803f
    align-items: center
    justify-content: space-between
    .bg
      padding-left: 30px
      background-size: 40px 40px
      background-repeat: no-repeat
      background-position: -10px center
      &.bg1
        bg-image('../../common/imgs/repair/sele_server')
      &.bg2
        bg-image('../../common/imgs/repair/sele_store')
      &.bg3
        bg-image('../../common/imgs/repair/order')
      &.bg4
        bg-image('../../common/imgs/repair/car')
        background-position: -7px center
  .container
    flex: 1
    overflow: hidden
    .wrapper
      width: 100%
      position: relative
      .textarea
        background-color: #fff
        padding: 0 30px
        padding-top: 20px
        textarea
          width: 100%
          border-radius: 8px
          border: 1px solid #d7d7d7
          padding: 20px
          outline: none
          -webkit-appearance: none
          font-size: 26px
          color: #5b5b5b
          line-height: 46px
          &:-webkit-input-placeholder
            font-size: 26px
            color: #b2b2b2
      .box
        width: 100%
        background-color: blue
        height: 900px
  .go-next
    position: absolute
    left: 0
    bottom: 0
    width: 100%
    height: 100px
    bg-image('../../common/imgs/repair/ordered_btn')
    background-size: 750px 100px
    background-repeat: no-repeat
    background-position: center center

</style>
