<template>
  <div class="search-store" flexContainer>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="serach-input">
        <input type="text" name="" value="" placeholder="搜索门店">
      </div>
      <div class="search">搜索</div>
    </div>
    <!-- <div class="container"> -->
      <Scroll class="container">
        <!-- <ul class="history">
          <li>
            <h2>快速保养</h2>
            <div class="close"></div>
          </li>
        </ul> -->
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
    <!-- </div> -->
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from '@/base/scroll/scroll'
export default {
  name: 'searchWashStore',
  methods: {
    _goBack () {
      this.$router.go(-1)
    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .search-store
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
    .container
      flex: 1
      overflow: hidden
      .history
        position: relative
        li
          display: flex
          height: 90px
          margin-top: 1px
          background-color: #fff
          h2
            margin-left: 30px
            flex: 1
            line-height: 90px
            font-size: 28px
            color: #3b3b3b
            padding-left: 57px
            bg-image('../../common/imgs/washcar/history')
            background-repeat: no-repeat
            background-position: left center
            background-size: 30px 30px
          .close
            width: 100px
            bg-image('../../common/imgs/washcar/close')
            background-repeat: no-repeat
            background-position: center
            background-size: 20px 20px
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
