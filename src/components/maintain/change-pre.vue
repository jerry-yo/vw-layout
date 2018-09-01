<template>
  <div class="change-pre" flexContainer>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="font">
        添加新服务
      </div>
    </div>
    <Scroll class="container" ref="addservice" :data="changeProList">
      <ul class="wrapper">
        <li>
          <div class="img">
            <img src="" alt="">
          </div>
          <div class="good-info">
            <div class="change">
              <div class="parameter">
                <div class="top">
                  <div class="brand">品牌：<span>{{0 + ' ' + 0}}</span></div>
                </div>
                <div class="bottom">
                  <div class="spec">规格：<span>{{0}}</span></div>
                </div>
              </div>
              <!-- <div class="tips">{{'1'}}辆“思域”选择了此产品</div> -->
              <div class="buy-info">
                <span>￥{{0}}</span>
                <span>{{`X  ${0}`}}</span>
              </div>
            </div>
            <div class="change-btn">
              <div class="btn" @click="_changeGood">更换</div>
            </div>
          </div>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import {mapMutations} from 'vuex'
import {expireToken} from '@/common/js/mixin'
export default {
  name: 'changePre',
  mixins: [expireToken],
  components: {
    Scroll
  },
  data () {
    return {
      changeProList: []
    }
  },
  methods: {
    _goBack () {
      this.$router.back()
    },
    _changeGood () {

    },
    _getPartList () {
      let url = `${this.f6Url}/api/clientOrder/getRecommendList?userCarId=${this.carid}&mileage=${this.distance}&stationId=${this.storeList[id].stationId}&clientAppId=${this.userInfo.appId}&clientUserId=${this.userInfo.fUserId}`
      this.$get(`${this.f6Url}/api/clientOrder/getPartRecommendList?`)
    }
    ...mapMutations([])
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixin.styl"
.change-pre
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
    flex: 1
    overflow: hidden
    .wrapper
      position: relative
      padding: 20px 0px
      li
        height: 192px
        display: flex
        padding: 15px 30px
        background-color: #fff
        margin-bottom: 10px
        & > .img
          width: 177px
          img
            display: block
            width: 160px
            height: 160px
            border: 1px solid #d2d2d2
            background-color: rgba(255, 0, 0, 0.5)
        .good-info
          flex: 1
          display: flex
          .change
            flex: 1
            display: flex
            flex-direction: column
            justify-content: center
            .parameter
              height: 90px
              display: flex
              flex-direction: column
              .top, .bottom
                flex: 1
                margin-right: 20px
              .name, .brand, .viscosity, .spec
                height: 50%
                display: flex
                align-items: center
                font-size: 24px
                color: #a8a8a8
                span
                  flex: 1
                  font-size: 24px
                  color: #5b5b5b
                  text-align: right
            .tips
              height: 30px
              line-height: 30px
              text-align: center
              background-color: #b7b7b7
              font-size: 20px
              color: #ffffff
            .buy-info
              height: 40px
              display: flex
              span:nth-child(1)
                flex:1
                line-height: 40px
                font-size: 30px
                color: #ff6868
              span:nth-child(2)
                flex:1
                line-height: 40px
                font-size: 24px
                color: #a8a8a8
                text-align: right
                margin-right: 20px
        .change-btn
          display: flex
          justify-content: flex-end
          align-items: center
          width: 100px
          .btn
            width: 70px
            height: 38px
            background-image: linear-gradient(left, #ff8d48, #ff6e41)
            font-size: 20px
            color: #ffffff
            text-align: center
            line-height: 38px
            border-radius: 4px
</style>
