// 新增 车辆 -品牌

<template>
  <div class="addcar-brand" flexContainer>
    <div class="search-car">
      <div class="btn">
        <span>搜索</span>
      </div>
    </div>
    <div class="logo">
      <brandMask v-if="showMask"></brandMask>
      <div class="retrieval" @touchmove.prevent.stop>
        <ul>
          <li v-for="(item, index) in logo" :key="item.type" @click="selectMenu(index, $event)">{{item.type}}</li>
        </ul>
      </div>
      <Scroll class="wrapper" ref="logolist">
        <div class="list-con">
          <div class="hot-logo type-index">
            <h2>热门品牌</h2>
            <ul class="hot-list">
              <li class="car-logo" v-for="(item) in  logo[1].num" :key="item"  @click="showBrandMask">
                <img src="" alt="">
                <h3>奥迪奥斯</h3>
              </li>
            </ul>
          </div>
          <ul class="logo-class type-index" v-for="item in logo" :key="item.type">
            <li class="title">{{item.type}}</li>
            <li class="info" v-for="logoinfo in item.num" :key="logoinfo" @click="showBrandMask">
              <img src="" alt="">
              <h2>奥迪</h2>
            </li>
          </ul>
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from '@/base/scroll/scroll'
import brandMask from './addcar-brand-mask'
export default {
  name: 'addcarBrand',
  data () {
    return {
      logoList: null,
      showMask: false,
      logo: [{
        type: '热',
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }, {
        type: 'A',
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }, {
        type: 'B',
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }, {
        type: 'C',
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }, {
        type: 'D',
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }, {
        type: 'E',
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }, {
        type: 'F',
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }, {
        type: 'G',
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }, {
        type: 'H',
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }, {
        type: 'I',
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }, {
        type: 'J',
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }, {
        type: 'K',
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }, {
        type: 'L',
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }, {
        type: 'M',
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }, {
        type: 'N',
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }, {
        type: 'O',
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }, {
        type: 'P',
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }, {
        type: 'Q',
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }, {
        type: 'R',
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }, {
        type: 'S',
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }, {
        type: 'T',
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }, {
        type: 'U',
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }, {
        type: 'V',
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }, {
        type: 'W',
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }, {
        type: 'X',
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }, {
        type: 'Y',
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }, {
        type: 'Z',
        num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }]
    }
  },
  methods: {
    selectMenu (index, event) {
      let logos = this.$refs.logolist.getElementsByClassName('type-index')
      let el = logos[index]
      this.logoList.scrollToElement(el, 300)
    },
    showBrandMask () {
      this.showMask = true
      console.log('666')
    }
  },
  components: {
    brandMask,
    Scroll
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.addcar-brand
  flex: 1
  background-color: #f2f2f2
  flex-direction: column
  .search-car
    height: 80px
    padding: 0 30px
    display: flex
    padding-top: 9px
    background-color: #fff
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
      right: 10px
      top: 0px
      height: 100%
      width: 40px
      display: flex
      z-index: 99
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
      .hot-logo
        overflow: hidden
        padding: 0 30px
        padding-bottom: 25px
        margin-bottom: 10px
        background-color: #fff
        & > h2
          height: 50px
          line-height: 50px
          font-size: 24px
          color: #707070
        .hot-list
          display: flex
          flex-wrap: wrap
          overflow: hidden
          li
            width: 20%
            height: 122px
            padding-right: 30px
            img
              display: block
              background-color: rgba(255,255,0,0.5)
              width: 60px
              height: 60px
              margin: 0 auto
            & > h3
              font-size: 20px
              color: #707070
              text-align: center
              margin-top: 9px
              width: 100%
              word-break: break-all
              display: -webkit-box
              -webkit-line-clamp: 2
              -webkit-box-orient: vertical
              overflow: hidden
      .logo-class
        background-color: #fff
        padding: 0 50px 0 30px
        margin-bottom: 10px
        .title
          width: 100%
          height: 40px
          line-height: 40px
          font-size: 22px
          color: #707070
        .info
          height: 98px
          display: flex
          align-items: center
          border-bottom: 1px solid #d5d5d5
          &:last-child
            border: none
          & > img
            width: 60px
            height: 60px
            background-color: rgba(255, 0, 255, 0.5)
            margin-right: 30px
          & > h2
            font-size: 20px
            color: #707070

</style>
