<template>
  <div class="counter">
    <div class="cut" @click="cutNum">-</div>
    <span>{{server.keepServiceSecondItemBean.minCommodityNumber}}</span>
    <div class="add" @click="addNum">+</div>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'counter',
  props: {
    server: {
      type: Object
    }
  },
  methods: {
    cutNum () {
      if (this.server.keepServiceSecondItemBean.minCommodityNumber <= 1) {
        this.server.keepServiceSecondItemBean.minCommodityNumber = 1
      } else {
        this.server.keepServiceSecondItemBean.minCommodityNumber--
      }
    },
    addNum () {
      this.server.keepServiceSecondItemBean.minCommodityNumber++
    }
  },
  mounted () {
    console.log(JSON.stringify(this.server.keepServiceSecondItemBean.minCommodityNumber))
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
