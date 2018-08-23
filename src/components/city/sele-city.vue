<template>
    <div class="order" flexContainer>
      <div class="action-bar">
        <div class="back" @click="_goBack" ></div>
        <span>选择城市</span>
      </div>
      <div class="search-bar" @click="goSearchCity">
        <div class="btn">
          <span>搜索</span>
        </div>
      </div>
      <div class="location-bar">
        <span>当前定位：</span>
        <span>{{cityInfo.city}}</span>
      </div>
      <div class="container">
        <div class="letterbox"></div>
        <div class="retrieval">
          <ul @touchstart="touchStart" @touchmove="touchMove" ref="letterList">
            <li ref="letter" class="letter" v-for="(item, index) in getFirstLetter" :key="item.type" :data-index="index" @click="selectMenu(index, $event)">{{item}}</li>
          </ul>
        </div>
        <Scroll class="wrapper" ref="cityDom">
          <div class="con">
            <ul class="logo-class type-index" v-for="item in getLogo" :key="item.id" ref="city">
              <li class="title">{{item.nameInitial}}</li>
              <li class="info" v-for="logo in item.logos" :key="logo.id" @click="showBrandMask(logo)">
                <h2>{{logo.cityName}}</h2>
              </li>
            </ul>
          </div>
        </Scroll>
      </div>
    </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import {mapGetters, mapMutations} from 'vuex'
import {getData} from '@/common/js/arr'
export default {
  name: 'seleCity',
  data () {
    return {
      letterHeight: 0,
      touch: {}
    }
  },
  computed: {
    getFirstLetter () {
      let arr = []
      this.cityList.forEach((item, index) => {
        arr.push(item.nameInitial)
      })
      arr = new Set(arr)
      return Array.from(arr)
    },
    getLogo () {
      let arr = []
      this.getFirstLetter.forEach((letter) => {
        let logoType = []
        this.cityList.forEach((item, index) => {
          if (letter === item.nameInitial) {
            logoType.push(item)
          }
        })
        arr.push({
          nameInitial: letter,
          logos: logoType
        })
      })
      return arr
    },
    ...mapGetters([
      'cityInfo',
      'cityList'
    ])
  },
  methods: {
    touchStart (e) {
      this.letterHeight = parseFloat(window.getComputedStyle(this.$refs.letter[0]).height)
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    touchMove (e) {
      this.touch.pageY = e.changedTouches[0].pageY
    },
    _scrollTo (index) {
      // if (!index && index !== 0) {
      //   return
      // }
      // if (index < 0) {
      //   index = 0
      // } else if (index > this.listHeight.length - 2) {
      //   index = this.listHeight.length - 2
      // }
      this.$refs.cityDom.scrollToElement(this.$refs.city[index - 1], 0)
    },
    _goBack () {
      this.$router.back()
    },
    goSearchCity () {
      this.$router.push('/search-list?format=' + 'city')
    },
    selectMenu (index, event) {
      this.$refs.cityDom.scrollToElement(this.$refs.city[index], 300)
    },
    showBrandMask (city) {
      this.setCityInfo({
        selecity: city.cityName
      })
      this._goBack()
    },
    getCityList () {
      this.$post(`${this.gt1Url}/api/carzone/getCity`, 1, (res) => {
        if (res.errorCode === 0) {
          let list = res.data.data.replace(new RegExp(/'/g), '"')
          list = JSON.parse(list).data
          this.setCityList(list)
        }
      })
    },
    ...mapMutations({
      setCityInfo: 'SET_CITYINFO',
      setCityList: 'SET_CITYLIST'
    })
  },
  created () {
    console.log(this.cityList)
    if (this.cityList.length < 1) {
      this.getCityList()
    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .order
    flex-direction: column
    height: 100vh
    background-color: #f4f4f4
    overflow: hidden
    .action-bar
      position: relative
      height: 88px
      background-color: #fff
      & > span
        position: absolute
        left: 0
        top: 0
        right: 0
        bottom: 0
        margin: auto
        display: inline-block
        width: 160px
        height: 86px
        text-align: center
        line-height: 86px
        font-weight: 600
        font-size: 36px
        color: #5b5b5b
        transform: skewX(-15deg)
      .back
        width: 120px
        height: 100%
        bg-image('../../common/imgs/order/back')
        background-size: 18px 30px
        background-repeat: no-repeat
        background-position: 30px center
        color: #5b5b5b
    .search-bar
      height: 84px
      margin-bottom: 10px
      background-color: #fff
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
          bg-image('../../common/imgs/car/search')
          background-size: 27px 27px
          background-repeat: no-repeat
          background-position: left center
    .location-bar
      height: 90px
      display: flex
      margin-bottom: 10px
      background-color: #fff
      line-height: 90px
      padding: 0 30px
      span:nth-child(1)
        font-size: 26px
        color: #9e9e9e
      span:nth-child(2)
        flex: 1
        display: flex
        justify-content: flex-end
        font-size: 26px
        color: #5b5b5b
    .container
      position: relative
      flex: 1
      display: flex
      overflow: hidden
      .retrieval
        position: absolute
        right: 10px
        top: 0px
        height: 100%
        width: 40px
        z-index: 99
        display: flex
        flex-direction: column
        justify-content: center
        & > ul
          overflow: hidden
          & > li
            width: 100%
            height: 36px
            display: flex
            justify-content: center
            align-items: center
            font-size: 20px
            color: #707070
      .wrapper
        flex: 1
        overflow: hidden
      .con
        position: relative
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
            height: 75px
            display: flex
            align-items: center
            border-bottom: 1px solid #d5d5d5
            &:last-child
              border: none
            & > h2
              font-size: 20px
              color: #707070
</style>
