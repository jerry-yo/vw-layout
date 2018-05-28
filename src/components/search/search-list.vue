// 车辆共有人

<template>
  <div class="add-car-sharing" flexContainer>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="serach-input">
        <input type="text" name="" value="" placeholder="搜索门店">
      </div>
      <div class="search">搜索</div>
    </div>
    <Scroll class="list">
      <ul class="list-con">
        <li  class="list-info">
          <div class="img">
            <img src="" alt="">
          </div>
          <div class="list-title">
            <h2>绿驴驴驴驴驴</h2>
            <p>1386565683</p>
          </div>
          <div class="btn">
            <div class="add">
              添加
            </div>
          </div>
        </li>
      </ul>
      <ul class="search-list">
        <li>
          <div class="left">
            <h2>邹区<span>朝城</span>店</h2>
            <p>常州市<span>新北区</span> 汉江路299号  4.6km</p>
          </div>
          <div class="right">
            4.6km
          </div>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from '@/base/scroll/scroll'
import {mapGetters} from 'vuex'
export default {
  name: 'searchCity',
  data () {
    return {
      format: ''
    }
  },
  created () {
    this.format = this.$route.query.format
  },
  computed: {

    ...mapGetters([
      'cityList',
      'carBrand'
    ])
  },
  methods: {
    _goBack () {
      this.$router.back()
    }
  },
  mounted () {
    console.log(this.format)
    console.log(this.cityList)
    console.log(this.carBrand)
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.add-car-sharing
  background-color: #f4f4f4
  flex-direction: column
  height: 100vh
  .action-bar
    position: relative
    display: flex
    height: 88px
    background-color: #fff
    z-index: 100
    .serach-input
      flex: 1
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      input
        width: 100%
        height: 60px
        padding: 0 20px
        border: 1px solid #cfcfcf
        background-color: #f2f2f2
        border-radius: 8px
        overflow: hidden
        outline: none
        &::-webkit-input-placeholder
          font-size: 26px
          color: #bbbbbb
    .go-back
      width: 100px
      height: 88px
      bg-image('../../common/imgs/order/back')
      background-repeat: no-repeat
      background-position: 30px center
      background-size: 18px 30px
    .search
      width: 100px
      padding-right: 30px
      display: flex
      justify-content: flex-end
      align-items: center
      font-size: 24px
      color: #ff7937
  .list
    flex: 1
    overflow: hidden
    .list-con
      position: relative
    .list-info
      height:172px
      display: flex
      background-color: #fff
      padding: 0 30px
      .img
        width: 126px
        display: flex
        align-items: center
        img
          display: inline-block
          width: 90px
          height: 90px
          background-color: #ccc
      .list-title
        flex: 1
        display: flex
        flex-direction: column
        justify-content: center
        h2
          font-size: 26px
          color: #5b5b5b
          line-height: 40px
        p
          font-size: 24px
          color: #b2b2b2
          line-height: 38px
      .btn
        width: 80px
        display: flex
        align-items: center
        .add
          flex: 1
          height: 44px
          border: 1px solid #ff7646
          font-size: 24px
          color: #ff7646
          text-align: center
          line-height: 44px
          border-radius: 3px
    .search-list
      position: relative
      li
        display: flex
        margin-top: 8px
        background-color: #fff
        padding: 0 30px
        height: 136px
        .left
          flex: 1
          display: flex
          flex-direction: column
          // align-items: center
          justify-content: center
          h2
            line-height: 50px
            font-weight: bold
            font-size: 26px
            color: #666666
          p
            line-height: 30px
            font-size: 24px
            color: #999
          span
            color: #ff7373
        .right
          line-height: 136px
          font-size: 24px
          color: #bbbbbb
</style>
