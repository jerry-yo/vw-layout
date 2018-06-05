<template>
  <div class="data-time">

  </div>
</template>

<script type="text/ecmascript-6">
import Picker from 'better-picker'
export default {
  name: '',
  data () {
    return {
      data1: [{
        text: '小美',
        value: 1
      }, {
        text: '猪猪',
        value: 2
      }],
      data2: [{
        text: '张三',
        value: 1
      }, {
        text: '李四',
        value: 2
      }],
      data3: [{
        text: '开心',
        value: 1
      }, {
        text: '生气',
        value: 2
      }, {
        text: '搞笑',
        value: 3
      }, {
        text: '难过',
        value: 4
      }]
    }
  },
  mounted () {
    var picker = new Picker({
      data: [this.data1, this.data2, this.data3],
      selectedIndex: [0, 1, 2],
      title: '我们都是小学生'
    })
    picker.show()
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .data-time
    position: fixed
    left: 0
    right: 0
    bottom: 0
    top: 0
</style>
