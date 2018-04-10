<template>
  <div class="store" flexContainer>
    <div class="tabbar">
      <span class="goback"></span>
      <h2 class="title">选择门店</h2>
      <div class="address">
        常州
      </div>
    </div>
    <div class="store-list" ref="storelist">
      <ul>
        <li :class="{'active': seleIndex === index}" v-for="(item, index) in storeArray" :key="index" @click="seleStore(index)">
          <div class="top">
            <img src="" alt="">
            <div class="top-right">
              <div class="store-name">
                <p>奇特异快速保养-华润店</p>
                <h2>4.6km</h2>
              </div>
              <div class="store-address">
                <p>常州市天宁区XXX路202-2号</p>
                <h2 :class="{'active': seleIndex === index, 'nosele': seleIndex !== index}">{{seleIndex  === index ? '当前门店':'选择'}}</h2>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="get-loc"><span>查看定位</span>  </div>
            <div class="call-dz">联系店长</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
  name: 'storeList',
  data () {
    return {
      storeListBScroll: null,
      seleIndex: 0,
      storeArray: [0, 1, 2, 3, 4, 5, 6, 7, 8]
    }
  },
  methods: {
    seleStore (id) {
      this.seleIndex = id
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.storeListBScroll = new BScroll(this.$refs.storelist, {
        click: true
      })
    })
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .store
    background-color: #f4f4f4
    flex-direction: column
    height: 100vh
    .tabbar
      height: 88px
      line-height: 88px
      display: flex
      background-color: #fff
      margin-bottom: 10px
      .goback
        width: 120px
        bg-image('../../common/imgs/order/back')
        background-repeat: no-repeat
        background-size: 18px 30px
        background-position: 30px center
      .title
        flex: 1
        text-align: center
        line-height: 88px
        font-weight: 600
        font-size: 36px
        color: #5b5b5b
        transform: skewX(-15deg)
      .address
        margin-right: 30px
        padding-right: 26px
        font-size: 22px
        color: #fd9068
        bg-image('../../common/imgs/home/sj-bottom')
        background-repeat: no-repeat
        background-size: 12px 6px
        background-position: right center
    .store-list
      flex: 1
      overflow: hidden
      & > ul
        position: relative
        li
          height: 206px
          display: flex
          flex-direction: column
          border-top: 4px solid #fff
          border-bottom: 4px solid #fff
          margin-bottom: 10px
          padding: 0 30px
          background-color: #fff
          &.active
            border-color: #ff9280
          .top
            height: 128px
            display: flex
            align-items: center
            border-bottom: 1px solid #f2f2f2
            & > img
              display: block
              width: 146px
              height: 100px
              background-color: rgba(255, 0, 255, 0.5)
              margin-right: 20px
            .top-right
              flex: 1
              display: flex
              flex-direction: column
              justify-content: cneter
              .store-name
                height: 34px
                display: flex
                line-height: 34px
                & > p
                  padding-right: 57px
                  font-size: 24px
                  color: #5b5b5b
                  font-weight: bold
                  bg-image('../../common/imgs/order/by')
                  background-size: 44px 22px
                  background-repeat: no-repeat
                  background-position: right center
                & > h2
                  flex: 1
                  text-align: right
                  font-size: 20px
                  color: #b0b0b0
              .store-address
                height: 32px
                line-height: 32px
                display: flex
                align-items: center
                & > p
                  flex: 1
                  font-size: 22px
                  color: #ababab
                & > h2
                  height: 30px
                  font-size: 18px
                  color: #fff
                  text-align: center
                  line-height: 30px
                  border-radius: 3px
                  &.active
                    width: 90px
                    background: -webkit-linear-gradient(left, #ff9f50, #ff6f48)
                  &.nosele
                    width: 70px
                    border: 2px solid #ff7850
                    color: #ff7850
          .bottom
            flex: 1
            display: flex
            .get-loc
              flex: 1
              display: flex
              justify-content: center
              align-items: center
              & > span
                padding-left: 30px
                font-size: 24px
                color: #ff914d
                bg-image('../../common/imgs/orderinfo/call-dz')
                background-size: 24px 24px
                background-repeat: no-repeat
                background-position: left center
            .call-dz
              flex: 1
              display: flex
              align-items: center
              justify-content: flex-end
              bg-image('../../common/imgs/orderinfo/call-dz')
              background-size: 29px 28px
              background-repeat: no-repeat
              background-position: right center
              padding-right: 55px
              font-size: 24px
              color: #ababab
              line-height: 100%
</style>
