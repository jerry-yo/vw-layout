// 新增 车辆 -品牌

<template>
  <div class="addcar-brand" flexContainer>
    <div class="action-bar">
      <div class="go-back"></div>
      <div class="tabbar">
        <div class="con">
          <div class="left active">
            自助加车
          </div>
          <div class="right active">
            发动机号绑车
          </div>
        </div>
      </div>
    </div>
    <div class="search-car">
      <div class="btn">
        <span>搜索</span>
      </div>
    </div>
    <div class="logo">
      <div class="retrieval" @touchmove.prevent.stop  @click="getIndex(2)">
        <ul>
          <li>#</li>
          <li>A</li>
          <li>B</li>
          <li>C</li>
          <li>D</li>
          <li>E</li>
          <li>F</li>
          <li>G</li>
          <li>H</li>
          <li>I</li>
          <li>J</li>
          <li>K</li>
          <li>L</li>
          <li>M</li>
          <li>N</li>
          <li>O</li>
          <li>P</li>
          <li>Q</li>
          <li>R</li>
          <li>S</li>
          <li>T</li>
          <li>U</li>
          <li>V</li>
          <li>W</li>
          <li>X</li>
          <li>Y</li>
          <li>Z</li>
        </ul>
      </div>
      <div class="wrapper" ref="logolist">
        <div class="list-con" @click="getIndex(1)">
          <div class="hot-logo">
            <h2>热门品牌</h2>
            <div class="hot-list">

            </div>
          </div>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
  name: 'addcarBrand',
  data () {
    return {
      logoList: null
    }
  },
  methods: {
    getIndex (id) {
      console.log(id)
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.logoList = new BScroll(this.$refs.logolist, {
        click: true
      })
    })
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.addcar-brand
  background-color: #fff
  flex-direction: column
  height: 100vh
  .action-bar
    display: flex
    height: 88px
    background-color: #fff
    margin-bottom: 10px
    .go-back
      width: 120px
      bg-image('../../common/imgs/order/back')
      background-repeat: no-repeat
      background-position: 30px center
      background-size: 18px 30px
    .tabbar
      flex: 1
      display: flex
      justify-content: center
      align-items: center
      margin-right: 120px
      .con
        width: 425px
        display: flex
        height: 60px
        border: 1px solid #ff8040
        border-radius: 5px
        .left
          flex: 1
          border-right: 1px solid #ff8040
          text-align: center
          line-height: 60px
          font-size: 26px
          color: #ff7e37
          &.active
            color: #ffffff
            background: linear-gradient(left, #ff944a, #ff5c3a)
        .right
          flex: 1
          text-align: center
          line-height: 60px
          font-size: 26px
          color: #ff7e37
          &.active
            color: #ffffff
            background: linear-gradient(left, #ff5c3a, #ff944a)
  .search-car
    height: 80px
    padding: 0 30px
    display: flex
    padding-top: 9px
    .btn
      flex: 1
      height: 60px
      border-radius: 5px
      background-color: #f2f2f2
      border: 1px solid #dfdfdf
      display: flex
      justify-content: center
      align-items: center
      span
        padding-left: 40px
        font-size: 26px
        color: #bfbfbf
        bg-image('../../common/imgs/default')
        background-size: 27px 27px
        background-repeat: no-repeat
        background-position: left center
  .logo
    position: relative
    flex: 1
    display: flex
    overflow: hidden
    .wrapper
      flex: 1
      overflow: hidden
    .retrieval
      position: absolute
      right: 30px
      top: 0px
      height: 100%
      width: 40px
      display: flex
      z-index: 10000
      & > ul
        flex: 1
        display: flex
        flex-direction: column
        padding: 60px 0px
        & > li
          flex: 1
          display: flex
          justify-content: center
          align-items: center
          font-size: 20px
          color: #707070
    .list-con
      position: relative
      li
        height: 200px
        &:nth-child(2n)
          background-color: rgba(255, 0, 0, 0.5)
        &:nth-child(2n+1)
          background-color: rgba(0, 255, 0, 0.5)

</style>
