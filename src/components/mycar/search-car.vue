<template>
  <div class="text" flexContainer>
    <Badge count="9">
      <a href="#" class="button"></a>
    </Badge>
    <Badge count="100">
      <a href="#" class="button"></a>
    </Badge>
    <Badge count="9">
      <a href="#" class="button"></a>
    </Badge>
    <Badge dot>
      <a href="#" class="button"></a>
    </Badge>
    <!-- <keepFitTime></keepFitTime> -->
    <div @click="open2()"  class="button" ref="button">adasdfas</div>
    <div @click="open()"  class="button" ref="button">adasdfas</div>
  </div>
</template>

<script type="text/ecmascript-6">
import Badge from '@/base/badge'
import keepFitTime from '@/base/keep-fit-time'

export default {
  name: 'searchCar',
  data () {
    return {
      txt: false
    }
  },
  methods: {
    open () {
      this.$Modal.confirm({
        title: 'How are you?',
        content: 'Do you like mi? Are you OK?',
        onOk: () => {
          console.log('你敢来打我吗')
          this.$Modal.remove()
        },
        onCancel: () => {
          console.log('我是对的')
        }
      })
    },
    open2 () {
      this.$Toast({
        duration: 2,
        message: 'Do you  like me? Are you ok?',
        position: 'middle'
      })
    }
  },
  components: {
    Badge,
    keepFitTime
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .text
    position: relative
    flex-direction: column
    align-items: center
    justify-content: center
    height: 100%
    width: 100%
    // background-color: rgba(0, 255, 0, 0.5)
    .button
      display: inline-block
      width: 200px
      height: 200px
      background-color: blue
</style>
