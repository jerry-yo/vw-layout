<template>
  <div class="text">
    <!-- <Badge count="9">
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
    </Badge> -->
    <div @click="open2()"  class="button" ref="button">adasdfas</div>
    <div @click="open()"  class="button" ref="button">adasdfas</div>
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
      this.$Modal.confirm({
        title: '你敢来打我吗?',
        content: 'Do you like mi? Are you OK?',
        onOk: () => {
          console.log('你敢来打我吗')
          this.$Modal.remove()
        },
        onCancel: () => {
          console.log('我是对的')
        }
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
