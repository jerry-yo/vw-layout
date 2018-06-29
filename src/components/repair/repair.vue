<template>
  <div class="repair" flexContainer :style="{height: clientHeight + 'px'}" @touch.prevent>
    <CheckMask v-if="showInfo" @closemask="_closeMask" :data="faultInfo"></CheckMask>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="font">
        <h2>{{myCar[0].series.sbName + ' - ' + myCar[0].series.vehicleSystem[1]}}</h2>
        <p><span>{{myCar[0].idCard}}</span><span>丨</span><span>{{myCar[0].way}}km</span></p>
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
    <Scroll class="container" ref="repair" :preventDefault="false">
      <div class="wrapper">
        <div class="textarea" flexContainer ref="chatpannel" @touch.stop>
          <textarea class="text" name="name" rows="5" v-model="faultText" placeholder="简单概述您的车辆故障，提供图片能帮助维修中心为您 提前进货哦" @focus="focusText"></textarea>
        </div>
        <uploadPic ref="upImage"></uploadPic>
        <div class="detection-record">
          <span>车辆检查故障</span>
          <div class="order" @click="_goDetectionMenu">
            <span>查看检测单</span>
          </div>
        </div>
        <seleDetectionMenu :check="false" :data="detectionMenus[0].faultGroupItem" @showinfo="checkDetectionInfo"></seleDetectionMenu>
      </div>

    </Scroll>
    <div class="go-next" @click="goNext">
      下一步
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from '@/base/scroll/scroll'
import uploadPic from '@/base/upload-pic'
import seleDetectionMenu from '@/base/sele-detection-menu'
import CheckMask from '@/base/check-info'
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'repair',
  data () {
    return {
      clientHeight: null,
      wxInfo: null,
      faultText: '',
      faultInfo: {},
      showInfo: false
    }
  },
  computed: {
    ...mapGetters([
      'detectionMenus',
      'myCar'
    ])
  },
  methods: {
    _goBack () {
      this.$router.go(-1)
    },
    focusText () {
      let _self = this
      setTimeout(function () {
        let pannel = _self.$refs.chatpannel
        pannel.scrollIntoView(true)
        pannel.scrollIntoViewIfNeeded(true)
      }, 200)
    },
    goNext () {
      this.$router.push('/repair-pre-order')
      this.setRepairOrder({
        faultText: this.faultText,
        faultImgs: this.$refs.upImage.imgArr
      })
    },
    _goDetectionMenu () {
      this.$router.push('/check-list?id=0&carid=0')
    },
    _closeMask () {
      this.showInfo = false
    },
    checkDetectionInfo (res) {
      this.showInfo = true
      this.faultInfo = res
    },
    ...mapMutations({
      setRepairOrder: 'SET_REPAIR_ORDER'
    })
  },
  mounted: function () {
    this.$nextTick(function () {
      this.clientHeight = document.body.offsetHeight
    })
  },
  components: {
    uploadPic,
    seleDetectionMenu,
    Scroll,
    CheckMask
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
  .text
    width: 200px
    height: 200px
    overflow: hidden
    overflow-y: scroll
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
          &::-webkit-input-placeholder
            font-size: 26px
            color: #b2b2b2
      .detection-record
        display: flex
        background-color: #f5f5f5
        height: 95px
        line-height: 95px
        padding: 0 30px
        & > span
          flex: 1
          font-size: 24px
          color: #9e9e9e
          font-weight: bold
        .order
          flex: 1
          text-align: right
          span
            padding-left: 35px
            font-size: 24px
            color: #9e9e9e
            bg-image('../../common/imgs/orderinfo/test-order')
            background-size: 22px 26px
            background-repeat: no-repeat
            background-position: left center
  .go-next
    height: 100px
    bg-image('../../common/imgs/repair/ordered_btn')
    background-size: 750px 100px
    background-repeat: no-repeat
    background-position: center center
    display: flex
    align-items: center
    justify-content: center
    font-size: 34px
    color: #fff

</style>
