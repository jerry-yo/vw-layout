<template>
  <div class="star">
    <ul>
      <li v-for="(item, index) in check" :key="index" :class="'check_' + item" @click="_checkOut(index)"></li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'serverStar',
  data () {
    return {
      starNum: -1
    }
  },
  computed: {
    check () {
      let arr = []
      for (let i = 0; i < 5; i++) {
        if (i <= this.starNum) {
          arr.push(1)
        } else {
          arr.push(0)
        }
      }
      return arr
    }
  },
  methods: {
    _checkOut (id) {
      this.starNum = id
      this.$emit('starnum', id + 1)
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import '../common/stylus/mixin.styl'
  .star
    flex: 1
    display: flex
    height: 40px
    ul
      flex: 1
      display: flex
      justify-content: flex-end
      li
        margin-left: 20px
        width: 42px
        height: 40px
        background-size: 42px 40px
        background-repeat: no-repeat
        background-position: center center
        &.check_0
          bg-image('../common/imgs/mask/star')
        &.check_1
          bg-image('../common/imgs/mask/star_active')
</style>
