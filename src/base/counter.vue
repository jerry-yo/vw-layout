<template>
  <div class="counter">
    <div class="cut" @click="cutNum"><span>－</span></div>
    <span>{{goodsinfo.number}}</span>
    <div class="add" @click="addNum"><span>＋</span></div>
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
      number: 0
    }
  },
  mounted () {
    this.number = this.goodsinfo.number
  },
  methods: {
    addNum () {
      if (this.number < 5) {
        this.number++
        this.$emit('change', {
          number: this.number
        })
      } else {
        this.$Toast({
          position: 'bottom',
          message: '每个服务最多选择五件材料'
        })
      }
    },
    cutNum () {
      if (this.number > 1) {
        this.number--
        this.$emit('change', {
          number: this.number
        })
      } else {
        this.$Toast({
          position: 'bottom',
          message: '每个服务最少选择一件材料'
        })
      }
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .counter
    width: 158px
    height: 52px
    display: flex
    border: 1px solid #b7b7b7
    & > span
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
      & > span
        font-size: 30px
        color: #a8a8a8
        outline: none
        line-height: normal
    .cut
      border-right: 1px solid #b7b7b7
</style>
