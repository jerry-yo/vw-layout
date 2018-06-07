<template>
  <div class="store-info">
    <div class="top">
      <div class="left">
        <img v-lazy="'https://www.gt1.shop/api/common/download?id=' + storeInfo.img" alt="">
      </div>
      <div class="center">
        <h2>{{storeInfo.name}}</h2>
        <p>{{storeInfo.address}}</p>
      </div>
      <div class="right" @click="goStoreList">
        <span>选择门店</span>
      </div>
    </div>
    <div class="bottom">
      <span>联系店长</span>
      <a :href="'tel:' + storeInfo.phone">{{storeInfo.phone}}</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
export default {
  name: 'store-info',
  data () {
    return {
    }
  },
  computed: {
    storeInfo () {
      let ret = {}
      this.storeList.forEach((item, index) => {
        if (index === this.defaultStoreId) {
          ret = item
        }
      })
      return JSON.stringify(ret) === '{}' ? {} : ret
    },
    ...mapGetters([
      'defaultStoreId',
      'cityInfo',
      'storeList'
    ])
  },
  methods: {
    goStoreList () {
      this.$router.push('/store-list')
    }
  },
  created () {
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../common/stylus/mixin.styl"
  .store-info
    height: 210px
    display: flex
    flex-direction: column
    padding: 0 30px
    margin-bottom: 10px
    background-color: #fff
    .top
      flex: 1
      display: flex
      border-bottom: 1px solid #f2f2f2
      .left
        width: 168px
        display: flex
        align-items: center
        img
          display: block
          width: 146px
          height: 100px
          background-color: rgba(255, 0, 255, 0.5)
      .center
        flex: 1
        display: flex
        flex-direction: column
        justify-content: center
        h2
          font-size: 24px
          color: #5b5b5b
          line-height: 46px
        p
          font-size: 22px
          color: #5b5b5b
          width: 350px
          line-height: 44px
          height: 44px
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
      .right
        width: 168px
        display: flex
        align-items: center
        padding-right: 50px
        font-size: 22px
        color: #ababab
        justify-content: flex-end
        bg-image('../common/imgs/mind/leftright')
        background-repeat: no-repeat
        background-size: 15px 24px
        background-position: right center
    .bottom
      height: 80px
      display: flex
      span
        flex: 1
        font-size: 24px
        color: #ababab
        line-height: 80px
      a
        font-size: 24px
        color: #ababab
        line-height: 80px
        text-align: right
        padding-right: 50px
        bg-image('../common/imgs/orderinfo/call-dz')
        background-repeat: no-repeat
        background-size: 29px 28px
        background-position: right center
</style>
