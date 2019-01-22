<template>
  <div class="addcar-tabbar" flexContainer>
    <headerBar @leftClick="_goBack">
      <div class="tabbar" slot="content">
        <div class="con">
          <div class="left" :class="{active: tabActive}" @click="_goTab(1)">项目</div>
          <div class="right" :class="{active: !tabActive}"  @click="_goTab(2)">材料</div>
        </div>
      </div>
    </headerBar>
    <Scroll ref="infoList" :data="tabActive ? handleServerInfo : handlePartInfo" class="container" flexContainer>
      <ul class="" v-if="tabActive" :class="handleServerInfo.length === 0 ? 'menu-list nofuwu' : 'menu-list'">
        <li class="menu" v-for="(item, index) in handleServerInfo" :key="index">
          <div class="server-info">
            <div class="title">{{item.serviceName}}</div>
            <div class="tips">技师： {{item.empNameStr}}</div>
          </div>
          <div class="operation">
            <div class="state1">
              <span>{{'￥' + item.workHourPrice}}</span>
              <span class="green" v-if="balanceStatus === '7100' || balanceStatus === '7200'">{{'- ￥' + (item.workHourPrice - item.discountedSubtotal)}}</span>
            </div>
          </div>
        </li>
      </ul>
      <ul v-if="!tabActive" :class="handlePartInfo.length === 0 ? 'part-list nocailiao' : 'part-list'">
        <li v-for="(item, index) in handlePartInfo" :key="index">
          <div class="img">
            <img :src="imgpartUrl + handleArr(item.partShowName).customCode" alt="">
          </div>
          <div class="good-info">
            <div class="change">
              <div class="spec">品牌：<span>{{handleArr(item.partShowName).brand}} {{handleArr(item.partShowName).gt1Code}}</span></div>
              <div class="spec">规格：<span>{{item.spec}}</span></div>
              <div class="other"><span>数量：{{item.number}}</span><span>￥ {{item.amount}} <span class="green" v-if="balanceStatus === '7100' || balanceStatus === '7200'"> -￥ {{item.amount - (item.discountedSubtotal || item.amount)}}</span></span></div>
            </div>
          </div>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import {mapGetters} from 'vuex'
import headerBar from '@/base/headerBar'
export default {
  name: 'payServerInfo',
  components: {
    Scroll,
    headerBar
  },
  data () {
    return {
      tabActive: true
    }
  },
  computed: {
    balanceStatus () {
      return this.seleServersInfo.balanceStatus
    },
    handleServerInfo () {
      return this.seleServersInfo.serviceDetailVOList
    },
    handlePartInfo () {
      return this.seleServersInfo.stuffDetailVOList
    },
    ...mapGetters([
      'seleServersInfo'
    ])
  },
  created () {
    if (!this.seleServersInfo.serviceDetailVOList && !this.seleServersInfo.stuffDetailVOList) {
      this._goBack()
    }
  },
  methods: {
    _goBack () {
      this.$router.back()
    },
    handleArr (str) {
      let arr = str.split(' ')
      return {
        customCode: arr[0],
        brand: arr[2],
        gt1Code: arr[arr.length - 1].replace(/\(/, '').replace(/\)/, '')
      }
    },
    _goTab (id) {
      if (id === 1 && !this.tabActive) {
        this.tabActive = true
      } else if (id === 2 && this.tabActive) {
        this.tabActive = false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixin.styl"
.addcar-tabbar
  background-color: #f2f2f2
  flex-direction: column
  height: 100vh
  .tabbar
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    margin: auto
    width: 400px
    display: flex
    justify-content: center
    align-items: center
    .con
      width: 300px
      display: flex
      height: 60px
      border: 1px solid #ff8040
      border-radius: 5px
      .left
        flex: 1
        text-align: center
        line-height: 60px
        font-size: 26px
        color: #ff7e37
        &.active
          color: #ffffff
          background: -webkit-linear-gradient(left, #ff944a, #ff5c3a)
      .right
        flex: 1
        text-align: center
        line-height: 60px
        font-size: 26px
        color: #ff7e37
        &.active
          color: #ffffff
          background: -webkit-linear-gradient(left, #ff5c3a, #ff944a)
  .container
    flex: 1
    margin-top: 10px
    display: flex
    .menu-list
      width: 100%
      &.nofuwu
        bg-image('../../common/imgs/nofuwu')
        background-repeat: no-repeat
        background-position: center center
        background-size: 750px 381px
      .menu
        height: 90px
        display: flex
        background-color: #fff
        padding: 0 30px
        margin-bottom: 10px
        .server-info
          display: flex
          flex-direction: column
          justify-content: center
          .title
            height: 34px
            line-height: 34px
            font-size: 26px
            color: #5b5b5b
            span
              display: inline-block
              width: 65px
              height: 30px
              text-align: center
              line-height: 30px
              font-size: 18px
              color: #ffffff
              background-color: #ff6252
              margin-left: 18px
          .tips
            height: 32px
            line-height: 32px
            font-size: 22px
            color: #c4c4c4
      .operation
        flex: 1
        display: flex
        .state1
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          align-items: flex-end
          font-size: 24px
          color: #c7c7c7
          span
            line-height: 30px
          .green
            color: #65d976
    .part-list
      width: 100%
      &.nocailiao
        bg-image('../../common/imgs/nocailiao')
        background-repeat: no-repeat
        background-position: center center
        background-size: 750px 381px
      li
        height: 192px
        display: flex
        padding: 15px 30px
        margin-bottom: 10px
        background-color: #fff
        .img
          width: 177px
          img
            display: block
            width: 160px
            height: 160px
            border: 1px solid #d2d2d2
        .good-info
          flex: 1
          display: flex
          .change
            flex: 1
            display: flex
            flex-direction: column
            justify-content: center
            .spec
              height: 45px
              line-height: 45px
              display: flex
              align-items: center
              font-size: 26px
              color: #a8a8a8
              span
                flex: 1
                font-size: 24px
                color: #5b5b5b
                text-align: right
                .green
                  color: #65d976
            .other
              height: 45px
              line-height: 45px
              display: flex
              align-items: center
              font-size: 26px
              color: #a8a8a8
              span:nth-child(2)
                flex: 1
                font-size: 24px
                color: #5b5b5b
                text-align: right
                .green
                  color: #65d976
</style>
