<template>
  <div class="counter">
    <div class="cut" @click="cutNum">-</div>
    <span>{{goodsinfo.keepServiceSecondItemBean.minCommodityNumber}}</span>
    <div class="add" @click="addNum">+</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'counter',
  props: {
    goodsinfo: {
      type: Object
    }
  },
  data () {
    return {
      sssss: null
    }
  },
  methods: {
    cutNum () {
      if (this.goodsinfo.keepServiceSecondItemBean.minCommodityNumber <= 1) {
        this.goodsinfo.keepServiceSecondItemBean.minCommodityNumber = 1
      } else {
        this.goodsinfo.keepServiceSecondItemBean.minCommodityNumber--
      }
    },
    addNum () {
      this.goodsinfo.keepServiceSecondItemBean.minCommodityNumber++
    }
  },
  mounted () {
    this.sssss = JSON.parse(sessionStorage.getItem('serverList'))
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .counter
    width: 158px
    height: 52px
    display: flex
    border: 1px solid #b7b7b7
    span
      flex: 1
      display: flex
      justify-content: center
      align-items: center
      border-right: 1px solid #b7b7b7
      font-size: 30px
      color: #a8a8a8
    .add, .cut
      flex: 1
      border: none
      background-color: #fff
      display: flex
      justify-content: center
      align-items: center
      font-size: 30px
      color: #a8a8a8
      outline: none
    .cut
      border-right: 1px solid #b7b7b7
</style>
