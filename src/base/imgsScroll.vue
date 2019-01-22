<template>
  <div class="scroll-imgs">
    <Scroll class="img-content-report" ref="faultImg" :data="imgs" :scrollX="true" :scrollY="false" :click="false">
      <ul class="imgs" :style="{width: allWidth}">
        <li v-for="(item, index) in imgs" :key="index" :ref="'repairImgs' + index" :class="{'noright': imgs.length === (index + 1)}" @click="showImgs(item)">
          <img :src="item" alt="">
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import Wx from 'Wx'
export default {
  props: {
    imgs: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Scroll
  },
  data () {
    return {
      allWidth: '500px'
    }
  },
  mounted () {
    this.$nextTick(() => {
      const width = this.$refs.repairImgs1[0].offsetWidth
      this.allWidth = width * this.imgs.length + 'px'
    })
  },
  methods: {
    showImgs (item) {
      let _self = this
      Wx.previewImage({
        current: item, // 当前显示图片的http链接
        urls: _self.imgs // 需要预览的图片http链接列表
      })
    }
  }
}
</script>

<style lang="stylus">
.scroll-imgs
  position: relative
  width: 100%
  padding: 20px 30px
  height: 200px
  overflow: hidden
  background-color: #fff
  .img-content-report
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    .imgs
      li
        box-sizing: border-box
        height: 160px
        width: 180px
        float: left
        padding-right: 20px
        &.noright
          margin-right: none
        img
          display: inline-block
          object-fit: cover
          border: 1px solid #f2f2f2
          width: 100%
          height: 100%
</style>
