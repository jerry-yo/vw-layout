// 检测单
<template>
  <div class="check-list" flexContainer>
    <CheckMask v-if="showInfo" @closemask="_closeMask" :data="faultInfo"></CheckMask>
    <headerBar :contentInfo="getDefaultCarInfo" @leftClick="_goBack"></headerBar>
    <Scroll class="container" :data="maintainPhotoVoList" v-if="maintainPhotoVoList">
      <div  class="con">
        <div class="prev-detection" v-if="yjdId !== ''">
          <span>预检时间</span>
          <div class="info">
            {{maintainPhotoVoList.billDate}}
          </div>
        </div>
        <div class="testing-img" v-if="yjdId !== ''">
          <h2>漆面耗损</h2>
          <div class="image-block" v-if="maintainPhotoVoList.photoUrl !== ''">
            <img :src="maintainPhotoVoList.photoUrl.replace('http://', 'https://')" alt="">
          </div>
        </div>
        <div class="prev-detection" v-if="ccdId !== ''">
          <span>查车时间</span>
          <div class="info">
            {{carCheckDetailVoList.billDate}}
          </div>
        </div>
        <div class="check-detection" v-if="ccdId !== ''">
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
import headerBar from '@/base/headerBar'
import CheckMask from '@/base/check-info'
import {mapGetters} from 'vuex'
import {expireToken} from '@/common/js/mixin'
export default {
  name: 'checklist',
  mixins: [expireToken],
  data () {
    return {
      showInfo: false,
      ccdId: '',
      yjdId: '',
      stoteId: '',
      carNumber: '',
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
    this.carNumber = this.$route.query.carnumber
    if (this.ccdId !== '') {
      this.getCCDCheckInfo(this.ccdId, this.stoteId)
    }
    if (this.yjdId !== '') {
      this.getCCDCheckInfo(this.yjdId, this.stoteId)
    }
  },
  computed: {
    getDefaultCarInfo () {
      let obj = {}
      this.myCar.forEach(item => {
        if (item.carNumber === this.carNumber) {
          obj = item
        }
      })
      return obj
    },
    ...mapGetters([
      'myCar'
    ])
  },
  methods: {
    _goBack () {
      this.$router.go(-1)
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
    CheckMask,
    headerBar
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
