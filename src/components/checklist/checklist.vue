// 检测单
<template>
  <div class="check-list" flexContainer>
    <CheckMask v-if="showInfo" @closemask="_closeMask" :data="faultInfo"></CheckMask>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="font">
        <h2>{{myCar[carId].series.sbName + ' - ' + myCar[carId].series.vehicleSystem[1]}}</h2>
        <p><span>{{myCar[carId].idCard}}</span><span>丨</span><span>{{myCar[carId].way}}km</span></p>
      </div>
    </div>
    <Scroll class="container">
      <div  class="con">
        <div class="prev-detection">
          <span>检查时间</span>
          <div class="info">
            {{detectionMenu.time}}
          </div>
        </div>
        <div class="testing-img">
          <h2>漆面耗损</h2>
          <div class="image-block">
            <div class="block_1">
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
            </div>
          </div>
        </div>
        <div class="check-detection" v-if="detectionMenu.faultGroupItem.length > 0">
          <h2>车辆异常</h2>
          <SeleDetection :check="false" :data="detectionMenu.faultGroupItem" @showinfo="checkDetectionInfo"></SeleDetection>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from '@/base/scroll/scroll'
import SeleDetection from '@/base/sele-detection-menu'
import CheckMask from '@/base/check-info'
import {mapGetters} from 'vuex'
export default {
  name: 'checklist',
  data () {
    return {
      showInfo: false,
      detectionMenuId: -1,
      carId: 0,
      faultInfo: {}
    }
  },
  created () {
    this.detectionMenuId = this.$route.query.id
    this.carId = this.$route.query.carid
  },
  computed: {
    detectionMenu () {
      return this.detectionMenus[this.detectionMenuId]
    },
    faultState () {
      let arr = this.detectionMenu.faultGroupItem
      let state = {
        left: 0,
        right: 0,
        upAfter: 0,
        upBefore: 0,
        after: 0,
        before: 0
      }
      arr.forEach((item) => {
        if (item.carPaintPlace) {
          if (item.carPaintPlace === 'left') {
            state.left = item.state
          } else if (item.carPaintPlace === 'right') {
            state.right = item.state
          } else if (item.carPaintPlace === 'after') {
            state.after = item.state
          } else if (item.carPaintPlace === 'before') {
            state.before = item.state
          } else if (item.carPaintPlace === 'up-before') {
            state.upBefore = item.state
          } else if (item.carPaintPlace === 'up-after') {
            state.upAfter = item.state
          }
        }
      })
      return {
        left: state.left === 0 ? 'safe' : state.left === 1 ? 'warn' : 'err',
        right: state.right === 0 ? 'safe' : state.right === 1 ? 'warn' : 'err',
        upAfter: state.upAfter === 0 ? 'safe' : state.upAfter === 1 ? 'warn' : 'err',
        upBefore: state.upBefore === 0 ? 'safe' : state.upBefore === 1 ? 'warn' : 'err',
        after: state.after === 0 ? 'safe' : state.after === 1 ? 'warn' : 'err',
        before: state.before === 0 ? 'safe' : state.before === 1 ? 'warn' : 'err'
      }
    },
    ...mapGetters([
      'myCar',
      'detectionMenus'
    ])
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
      console.log(res)
      this.showInfo = true
      this.faultInfo = res
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
          h2
            height: 63px
            font-size: 26px
            color: #5b5b5b
            font-weight: bold
            line-height: 63px
            padding: 0 30px
          .image-block
            overflow: hidden
            padding: 0 30px
            background-color: #fff
            .state_1
              position: absolute
              left: 0
              right: 0
              top: 0
              bottom: 0
              background-position: center center
              background-repeat: no-repeat
              background-size: 78px 56px
              &.err
                bg-image('../../common/imgs/orderinfo/err')
              &.warn
                bg-image('../../common/imgs/orderinfo/warn')
              &.safe
                bg-image('../../common/imgs/orderinfo/safe')
            .state_2
              position: absolute
              left: 0
              right: 0
              top: 20px
              height: 117px
              background-position: center center
              background-repeat: no-repeat
              background-size: 78px 56px
              &.err
                bg-image('../../common/imgs/orderinfo/err')
              &.warn
                bg-image('../../common/imgs/orderinfo/warn')
              &.safe
                bg-image('../../common/imgs/orderinfo/safe')
            .block_1
              display: flex
              height: 160px
              padding-top: 50px
              font-size: 24px
              color: #898989
              margin-bottom: 33px
              .left
                flex: 1
                position: relative
                margin-right: 10px
                bg-image('../../common/imgs/test_order/left')
                background-position: center center
                background-repeat: no-repeat
                background-size: 340px 99px
                padding-left: 30px
              .right
                flex: 1
                position: relative
                bg-image('../../common/imgs/test_order/right')
                background-position: center center
                background-repeat: no-repeat
                background-size: 340px 99px
                text-align: right
                padding-right: 30px
            .block_2
              display: flex
              height: 250px
              overflow: hidden
              font-size: 24px
              color: #898989
              .up
                display: flex
                width: 300px
                margin-right: 22px
                bg-image('../../common/imgs/test_order/up')
                background-position: top center
                background-repeat: no-repeat
                background-size: 300px 155px
                .up-1
                  flex: 1
                  padding-top: 180px
                  position: relative
                  padding-left: 30px
                .up-2
                  flex: 1
                  padding-top: 180px
                  position: relative
                  text-align: right
                  padding-right: 30px
              .before
                position: relative
                width: 175px
                margin-right: 22px
                padding-top: 180px
                bg-image('../../common/imgs/test_order/before')
                background-position: center 20px
                background-repeat: no-repeat
                background-size: 175px 117px
                text-align: center
              .after
                flex: 1
                position: relative
                padding-top: 180px
                bg-image('../../common/imgs/test_order/after')
                background-position: right 20px
                background-repeat: no-repeat
                background-size: 175px 117px
                text-align: center
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
