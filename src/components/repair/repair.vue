<template>
  <div class="repair" flexContainer :style="{height: clientHeight + 'px'}" @touch.prevent>
    <CheckMask v-if="showInfo" @closemask="_closeMask" :data="faultInfo"></CheckMask>
    <headerBar :contentInfo="nowCar" contentColor="#5b5b5b" @leftClick="_goBack" @contentClick="_goSelectCar"></headerBar>
    <div class="service-flow">
      <span class="bg bg2">选择门店</span>
      <span>-</span>
      <span class="bg bg1">选择服务</span>
      <span>-</span>
      <span class="bg bg3">确认订单</span>
      <span>-</span>
      <span class="bg bg4">到店服务</span>
    </div>
    <Scroll class="container" ref="repair" :preventDefault="false">
      <div class="wrapper">
        <storeInfo :route="'repair'"></storeInfo>
        <div class="textarea" flexContainer ref="chatpannel" @touch.stop>
          <textarea class="text" name="name" rows="5" v-model="faultText" maxlength="500" placeholder="简单概述您的车辆故障，提供图片能帮助维修中心为您 提前进货哦" @focus="focusText"></textarea>
        </div>
        <uploadPic ref="upImage"></uploadPic>
        <div class="detection-record" v-if="checkDetectionInfo.carCheckDetailVoList">
          <span>车辆检查故障</span>
          <div class="order" @click="_goDetectionMenu">
            <span>查看检测单</span>
          </div>
        </div>
        <seleDetectionMenu v-if="checkDetectionInfo.carCheckDetailVoList" :check="false" :type="2" :data="checkDetectionInfo.carCheckDetailVoList" @showinfo="checkDetection"></seleDetectionMenu>
      </div>

    </Scroll>
    <div class="go-next" @click="goNext">
      下一步
    </div>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import uploadPic from '@/base/upload-pic'
import storeInfo from '@/base/store-info'
import headerBar from '@/base/headerBar'
import seleDetectionMenu from '@/base/sele-detection-menu'
import CheckMask from '@/base/check-info'
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {getServerCar, defaultCarInfo} from '@/common/js/mixin'
import {checksObjMixin} from '@/common/js/checkmixin'
export default {
  name: 'repair',
  mixins: [defaultCarInfo, getServerCar, checksObjMixin],
  data () {
    return {
      clientHeight: null,
      wxInfo: null,
      faultText: '',
      faultInfo: {},
      showInfo: false,
      typeName: 'repair'
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'home' || from.name === null) {
      next(vm => {
        vm.faultText = vm.updateOrder.faultText
        vm._getCheckList()
      })
    } else {
      next(vm => {
        vm.faultText = vm.updateOrder.faultText
        vm.handleCheckInfo(vm.checksObj)
      })
    }
  },
  computed: {
    carNumber () {
      return this.nowCar.carNumber
    },
    ...mapGetters([
      'updateOrder'
    ])
  },
  methods: {
    _goBack () {
      this.$router.back()
      this.clearOrderAllInfo('wx')
    },
    _goSelectCar () {
      this.$router.push('/garage?type=select')
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
      if (this.updateOrder.imgArr && this.updateOrder.imgArr.length > 0) {
        this.setUpdateOrder({
          faultText: this.faultText || ''
        })
      } else {
        this.setUpdateOrder({
          faultText: this.faultText || '',
          imgArr: [],
          faultImgs: ''
        })
      }
      setTimeout(() => {
        this.$router.push('/repair-pre-order')
      }, 0)
    },
    _goDetectionMenu () {
      if (this.checkDetectionInfo.carCheckDetailVoList) {
        this.$router.push('/check-list?idownorg=' + this.checkDetectionInfo.idOwnOrg + '&ccd=' + this.checkDetectionInfo.pkId + '&carnumber=' + this.checkDetectionInfo.carNoWhole)
      }
    },
    _closeMask () {
      this.showInfo = false
    },
    checkDetection (res) {
      this.showInfo = true
      this.faultInfo = res
    },
    ...mapMutations({
      setUpdateOrder: 'SET_UPDATE_ORDER'
    }),
    ...mapActions([
      'clearOrderAllInfo'
    ])
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
    CheckMask,
    storeInfo,
    headerBar
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
