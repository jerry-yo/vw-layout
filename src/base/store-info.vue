<template>
  <div class="store-info">
    <div class="top">
      <div class="left">
        <img src="" alt="">
      </div>
      <div class="center">
        <h2>常州奇特异养车-华润店</h2>
        <p>常州市天宁区XXX路202-2号</p>
      </div>
      <div class="right" @click="goStoreList">
        <span>选择门店</span>
      </div>
    </div>
    <div class="bottom">
      <span>联系店长</span>
      <span>18772815385</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'store-info',
  methods: {
    goStoreList () {
      this.$router.push('/store-list')
    }
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
          line-height: 44px
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
        &:nth-child(2)
          text-align: right
          padding-right: 50px
          bg-image('../common/imgs/orderinfo/call-dz')
          background-repeat: no-repeat
          background-size: 29px 28px
          background-position: right center
</style>
