<template>
  <transition name="slide">
    <div class="check-info-mask">
      <div class="mask-con">
        <h2 class="title">
          <span>{{title}}</span>
        </h2>
        <Scroll class="content" ref="faultText" :data="data" v-if="data.updateDesc.length > 0">
          <div class="wrapper">
            <p>{{data.updateDesc}}</p>
          </div>
        </Scroll>
        <Scroll class="img-content" ref="faultImg" :data="data" :scrollX="true" :scrollY="false" v-if="showImgArr.length > 0">
          <ul class="imgs" :style="{width: showImgArr.length * 31 + '%'}">
            <li v-for="(item, index) in showImgArr" :key="index">
              <img :src="item" alt="" @click="showImgs(item)">
            </li>
          </ul>
        </Scroll>
        <div class="close-btn" @click="_closeMask">
          知道了
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import Wx from 'Wx'
import Scroll from '@/base/scroll/scroll'
export default {
  name: 'checkInfo',
  components: {
    Scroll
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    from: {
      type: String,
      default: 'repair'
    },
    title: {
      type: String,
      default: '故障概要'
    }
  },
  computed: {
    showImgArr () {
      if (this.from === 'order') {
        let arr = []
        let imgs = this.data.updateImgs
        if (imgs.length > 0) {
          imgs.forEach(item => {
            arr.push(this.gt1UpdateImgUrl + item)
          })
          return arr
        } else {
          return []
        }
      } else {
        return this.data.imgArr
      }
    }
  },
  methods: {
    _closeMask () {
      this.$emit('closemask', false)
    },
    showImgs (item) {
      let _self = this
      Wx.previewImage({
        current: item, // 当前显示图片的http链接
        urls: _self.showImgArr // 需要预览的图片http链接列表
      })
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import '../common/stylus/mixin.styl'
  .slide-enter-active, .slide-leave-active
    opacity: 1
  .slide-enter, .slide-leave-to
    opacity: 0
  .check-info-mask
    display: flex
    justify-content: center
    align-items: center
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    background-color: rgba(0,0,0,.5)
    z-index: 999999
    transition: all .3s
    .mask-con
      padding: 10px 30px 10px 30px
      width: 630px
      overflow: hidden
      background-color: #fff
      border-radius: 10px
      .title
        display: flex
        align-items: center
        height: 110px
        span
          font-size: 30px
          color: #585858
          font-weight: bold
      .content
        max-height: 138px
        overflow: hidden
        p
          font-size: 26px
          color: #585858
          line-height: 46px
      .img-content
        margin-top: 30px
        margin-bottom: 20px
        height: 160px
        overflow: hidden
        .imgs
          li
            box-sizing: border-box
            height: 160px
            width: 160px
            border: 1px solid #b6b6b6
            margin-right: 14px
            float: left
            img
              display: flex
              width: 100%
              height: 100%
      .close-btn
        height: 110px
        text-align: center
        font-size: 30px
        color: #ff9239
        line-height: 110px

</style>
