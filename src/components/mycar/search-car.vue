<template>
  <div class="text">
    <!-- <Badge count="9">
      <a href="#" class="demo-badge"></a>
    </Badge>
    <Badge count="100">
      <a href="#" class="demo-badge"></a>
    </Badge>
    <Badge count="9">
      <a href="#" class="demo-badge"></a>
    </Badge>
    <Badge dot>
      <a href="#" class="demo-badge"></a>
    </Badge> -->
    <div @click="open()"  class="button">adasdfas</div>
  </div>
</template>

<script type="text/ecmascript-6">
import Badge from '@/base/badge'

export default {
  name: 'searchCar',
  data () {
    return {
      txt: false
    }
  },
  methods: {
    open () {
      this.$Toast({
        duration: 3,
        message: '有本事你过来啊',
        position: 'bottom'
      })
    }
  },
  components: {
    Badge
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .text
    position: relative
    // flex-direction: column
    // align-items: center
    // justify-content: center
    height: 100%
    width: 100%
    // background-color: rgba(0, 255, 0, 0.5)
    .button
      display: inline-block
      width: 200px
      height: 200px
      background-color: blue
</style>
