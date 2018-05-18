// 检测单
<template>
  <div class="check-list" flexContainer>
    <CheckMask v-if="showInfo" @closemask="_closeMask"></CheckMask>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="font">
        <h2>东风本田-思域</h2>
        <p><span>苏DB5A68</span><span>丨</span><span>2300km</span></p>
      </div>
    </div>
    <Scroll class="container">
      <div  class="con">
        <div class="prev-detection">
          <span>上次检查</span>
          <div class="info">
            2018年6月19日
          </div>
        </div>
        <div class="testing-img">
          <h2>漆面耗损</h2>
          <div class="image-block">
            <div class="block_1">
              <div class="left">
                <div class="state_1 error"></div>
                左侧
              </div>
              <div class="right">
                <div class="state_1 error"></div>
                右侧
              </div>
            </div>
            <div class="block_2">
              <div class="up">
                <div class="up-1">
                  <div class="state_2 error"></div>
                  <span>引擎盖面</span>
                </div>
                <div class="up-2">
                  <div class="state_2 error"></div>
                  <span>后备箱面</span>
                </div>
              </div>
              <div class="before">
                <div class="state_2 error"></div>
                <span>车头</span>
              </div>
              <div class="after">
                <div class="state_2 error"></div>
                <span>车尾</span>
              </div>
            </div>
          </div>
        </div>
        <div class="check-detection">
          <h2>车辆异常</h2>
          <SeleDetection :check="true" @showinfo="_showInfo"></SeleDetection>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from '@/base/scroll/scroll'
import SeleDetection from '@/base/sele-detection-menu'
import CheckMask from './check-info'
export default {
  name: 'checklist',
  data () {
    return {
      showInfo: false
    }
  },
  methods: {
    _goBack () {
      this.$router.go(-1)
    },
    _showInfo (val) {
      this.showInfo = true
    },
    _closeMask () {
      this.showInfo = false
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
              &.error
                bg-image('../../common/imgs/orderinfo/err')
              &.warn
                bg-image('../../common/imgs/orderinfo/warn')
            .state_2
              position: absolute
              left: 0
              right: 0
              top: 20px
              height: 117px
              background-position: center center
              background-repeat: no-repeat
              background-size: 78px 56px
              &.error
                bg-image('../../common/imgs/orderinfo/err')
              &.warn
                bg-image('../../common/imgs/orderinfo/warn')
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
