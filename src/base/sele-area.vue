<template>
  <div class="sele-area" @click.prevent>
    <div class="container">
      <div class="area" :class="{'active': index === active}" v-for="(item, index) in area" :key="index" @click="seleAreaBtn(index)">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
export default {
  name: 'seleArea',
  props: {
    areaindex: {
      type: Number
    }
  },
  data () {
    return {
      active: this.areaindex
    }
  },
  methods: {
    seleAreaBtn (id) {
      this.active = id
      this.goBack()
    },
    goBack () {
      this.$emit('goback', this.active)
    }
  },
  computed: {
    ...mapGetters([
      'area'
    ])
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .sele-area
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    display: flex
    flex-direction: column-reverse
    background-color: rgba(0, 0, 0, 0.5)
    z-index: 10
    .container
      background-color: #fff
      display: flex
      flex-wrap: wrap
      overflow: hidden
      padding: 0 39px
      .area
        width: 96px
        height: 96px
        border: 2px solid #f2f2f2
        text-align: center
        line-height: 96px
        font-size: 32px
        color: #666666
        &.active
          border-color: #ff8040
          color: #ff8040

</style>
