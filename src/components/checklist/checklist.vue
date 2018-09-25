// 检测单
<template>
  <div class="check-list" flexContainer>
    <CheckMask v-if="showInfo" @closemask="_closeMask" :data="faultInfo"></CheckMask>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="font">
        <h2>{{`${getDefaultCarInfo.manufacturerName} - ${getDefaultCarInfo.evehicleSystem}`}}</h2>
        <p><span>{{getDefaultCarInfo.carNumber}}</span><span>丨</span><span>{{getDefaultCarInfo.distance}}km</span></p>
      </div>
    </div>
    <Scroll class="container" :data="maintainPhotoVoList" v-if="maintainPhotoVoList">
      <div  class="con">
        <div class="prev-detection">
          <span>预检时间</span>
          <div class="info">
            {{maintainPhotoVoList.billDate}}
          </div>
        </div>
        <div class="testing-img">
          <h2>漆面耗损</h2>
          <div class="image-block" v-if="maintainPhotoVoList.photoUrl !== ''">
            <img :src="maintainPhotoVoList.photoUrl" alt="">
            <!-- <div class="block_1">
              <div class="left" @click="_showInfo(faultState.left, 'left')">
                <div class="state_1" :class="faultState.left"></div>
                左侧
              </div>
              <div class="right" @click="_showInfo(faultState.right, 'right')">
                <div class="state_1" :class="faultState.right"></div>
                右侧
              </div>
            </div>
            <div class="block_2">
              <div class="up">
                <div class="up-1" @click="_showInfo(faultState.upBefore, 'up-before')">
                  <div class="state_2" :class="faultState.upBefore"></div>
                  <span>引擎盖面</span>
                </div>
                <div class="up-2" @click="_showInfo(faultState.upAfter, 'up-after')">
                  <div class="state_2" :class="faultState.upAfter"></div>
                  <span>后备箱面</span>
                </div>
              </div>
              <div class="before" @click="_showInfo(faultState.before, 'before')">
                <div class="state_2" :class="faultState.before"></div>
                <span>车头</span>
              </div>
              <div class="after" @click="_showInfo(faultState.after), 'up-after'">
                <div class="state_2" :class="faultState.after"></div>
                <span>车尾</span>
              </div>
            </div> -->
          </div>
        </div>
        <div class="prev-detection">
          <span>查车时间</span>
          <div class="info">
            {{carCheckDetailVoList.billDate}}
          </div>
        </div>
        <div class="check-detection" >
          <h2>车辆异常</h2>
          <SeleDetection v-if="carCheckDetailVoList.list" :check="false" :data="carCheckDetailVoList.list" @showinfo="checkDetectionInfo"></SeleDetection>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import SeleDetection from '@/base/sele-detection-menu'
import CheckMask from '@/base/check-info'
// import {mapGetters} from 'vuex'
import {defaultCarInfo, expireToken} from '@/common/js/mixin'
export default {
  name: 'checklist',
  mixins: [expireToken, defaultCarInfo],
  data () {
    return {
      showInfo: false,
      ccdId: '',
      yjdId: '',
      stoteId: '',
      faultInfo: {
        faultText: '',
        faultImgs: []
      },
      maintainPhotoVoList: {},
      carCheckDetailVoList: {}
    }
  },
  created () {
    this.ccdId = this.$route.query.ccd || ''
    this.yjdId = this.$route.query.yjd || ''
    this.stoteId = this.$route.query.idownorg || ''
    if (this.ccdId !== '') {
      this.getCCDCheckInfo(this.ccdId)
    }
    if (this.ccdId !== '') {
      this.getCCDCheckInfo(this.yjdId)
    }
  },
  methods: {
    _goBack () {
      this.$router.back()
    },
    _showInfo (val, type) {
      if (val === 'err' || val === 'warn') {
        this.showInfo = true
        this.detectionMenu.faultGroupItem.forEach((item) => {
          if (item.carPaintPlace && type === item.carPaintPlace) {
            this.faultInfo = item
          }
        })
      }
    },
    _closeMask () {
      this.showInfo = false
    },
    checkDetectionInfo (res) {
      if (res.optionValue >= 2 && res.memo !== '') {
        this.showInfo = true
        this.faultInfo.faultText = res.memo
      } else {
        this.$Toast({
          position: 'bottom',
          message: '暂无故障详细描述'
        })
      }
    },
    getCCDCheckInfo (id) {
      this.$get(`${this.f6Url}/api/check/info`, {
        'Authorization': this.userInfo.token
      }, (res) => {
        if (res.code === 200) {
          if (res.data.maintainType === 'CCD') {
            this.carCheckDetailVoList = {
              list: res.data.carCheckDetailVoList,
              billDate: res.data.billDate.replace(/-/, '年').replace(/-/, '月').replace(/ /, '日 ') + ':00'
            }
          } else if (res.data.maintainType === 'YJD') {
            this.maintainPhotoVoList = {
              photoUrl: res.data.maintainPhotoVoList[0].photoUrl,
              billDate: res.data.billDate.replace(/-/, '年').replace(/-/, '月').replace(/ /, '日 ') + ':00'
            }
          }
        } else if (res.code === 401) {
          this.refreshToken(this.getCCDCheckInfo)
        }
      }, {
        pkId: id,
        idOwnOrg: this.stoteId,
        clientAppId: this.userInfo.appId,
        clientUserId: this.userInfo.fUserId
      })
    }
  },
  components: {
    Scroll,
    SeleDetection,
    CheckMask
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .check-list
    flex-direction: column
    height: 100vh
    background-color: #f4f4f4
    overflow: hidden
    .action-bar
      position: relative
      display: flex
      height: 88px
      background-color: #fff
      z-index: 100
      margin-bottom: 10px
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
    .container
      flex: 1
      overflow: hidden
      .con
        position: relative
        .prev-detection
          height: 80px
          background-color: #fff
          display: flex
          line-height: 80px
          padding: 0 30px
          margin-bottom: 20px
          span
            font-size: 26px
            color: #5b5b5b
          .info
            flex: 1
            text-align: right
            font-size: 26px
            color: #5b5b5b
        .testing-img
          overflow: hidden
          margin-bottom: 10px
          h2
            height: 63px
            font-size: 26px
            color: #5b5b5b
            font-weight: bold
            line-height: 63px
            padding: 0 30px
          .image-block
            display: flex
            align-items: center
            justify-content: center
            overflow: hidden
            padding: 0 30px
            background-color: #fff
            & > img
              width: 600px
              height: 880px
        .check-detection
          overflow: hidden
          & > h2
            height: 63px
            margin-top: 20px
            font-size: 26px
            color: #5b5b5b
            font-weight: bold
            line-height: 63px
            padding: 0 30px

</style>
