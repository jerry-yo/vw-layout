<template>
  <div class="slider" @touchmove.prevent ref="slider">
    <div class="slider-group" ref="sliderGroup" @transitionend="transitionEnd" :style="{transform: translate3d, transitionDuration: animateTime + 'ms'}"  @touchstart="touchS" @touchend="touchE" @touchmove="touchM">
      <div class="slider-dots" v-for="(item, index) in imgs" :key="index">
        <div class="dot-con" :class="imgs.length ? '' : 'nocar'">
          <div class="left">
            <img src="" alt="">
          </div>
          <div class="right">
            <h2>东风本田-思域</h2>
            <p>苏DB5A68<span>l</span>2300km</p>
            <div class="default-btn">
              设为当前车辆
            </div>
          </div>
        </div>
      </div>
      <div class="slider-dots" v-if="imgs.length ? false: true">
        <div class="dot-con" :class="imgs.length ? '' : 'nocar'">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'swiper',
  props: {
    /* 一次滑动的默认时间 */
    duration: {
      default: 500
    },
    slidetype: {
      default: 'right'
    },
    recommends: {
      required: true
    }
  },
  data () {
    return {
      touchInfo: {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        moveX: 0,
        moveY: 0,
        startTime: 0,
        endTime: 0
      },
      imgIndex: 0,
      domLeft: 0,
      bridge: 0,
      translate3d: '',
      sliderDom: 0,
      animateTime: 0,
      sliderGroupDom: 0,
      screenWidth: 0
    }
  },
  computed: {
    imgs () {
      let imgs = this.recommends
      return imgs
    }
  },
  methods: {
    /*       手指触屏触发        */
    touchS (event) {
      let _touchStart = event.touches[0]
      this.touchInfo.startX = _touchStart.pageX
      this.touchInfo.startY = _touchStart.pageY
      this.touchInfo.startTime = parseInt(event.timeStamp)
    },
    /*       手指移开触发        */
    touchE (event) {
      let _touchEnd = event.changedTouches[0]
      this.touchInfo.endX = _touchEnd.pageX
      this.touchInfo.endY = _touchEnd.pageY
      this.touchInfo.endTime = parseInt(event.timeStamp)
      let X = this.touchInfo.startX - this.touchInfo.endX
      let Y = this.touchInfo.startY - this.touchInfo.endY
      let moveTime = this.touchInfo.endTime - this.touchInfo.startTime
      if (Math.abs(X) > Math.abs(Y)) {
        if (X > 0) {
          if (moveTime > 20 && moveTime < 300) {
            this.nextImg()
          } else if (X >= this.sliderGroupDom / 2) {
            this.nextImg()
          } else {
            this.goBackImg(parseInt(Math.abs(this.bridge) / this.sliderGroupDom * this.duration))
          }
        } else {
          if (moveTime > 20 && moveTime < 300) {
            this.prevImg()
          } else if (Math.abs(X) >= this.sliderGroupDom / 2) {
            this.prevImg()
          } else {
            this.goBackImg(parseInt(Math.abs(this.bridge) / this.sliderGroupDom * this.duration))
          }
        }
      }
    },
    /*       手指触屏移动触发        */
    touchM (event) {
      let _touchMove = event.touches[0]
      this.touchInfo.moveX = _touchMove.pageX
      this.touchInfo.moveY = _touchMove.pageY
      this.bridge = this.touchInfo.startX - this.touchInfo.moveX
      if (this.touchInfo.startX > this.touchInfo.moveX) {
        this.animateImg(false, 0)
      } else {
        this.animateImg(false, 0)
      }
    },
    tapDom (index) {
      this.$emit('tapcard', index)
    },
    /*  动画结束监听   */
    transitionEnd () {
      this.bridge = 0
      this.goBackImg(0)
    },
    /*      右向左滑动， 下一页        */
    nextImg (text) {
      if ((this.imgIndex !== this.imgs.length - 1) && this.imgs.length) {
        this.imgIndex += 1
      }
      let time = 0
      if (text === 'init') {
        time = this.duration
      } else {
        time = parseInt((this.sliderGroupDom - Math.abs(this.bridge)) / this.sliderGroupDom * this.duration)
      }
      this.animateImg(true, time)
    },
    /*      左向右滑动， 下一页        */
    prevImg (text) {
      if (this.imgIndex !== 0) {
        this.imgIndex -= 1
      }
      let time = 0
      if (text === 'init') {
        time = this.duration
      } else {
        time = parseInt((this.sliderGroupDom - Math.abs(this.bridge)) / this.sliderGroupDom * this.duration)
      }
      this.animateImg(true, time)
    },
    goBackImg (time) {
      this.animateTime = time
      if (this.imgIndex === 0) {
        this.domLeft = (this.screenWidth - this.sliderGroupDom) / 2
      } else {
        this.domLeft = this.sliderDom - (this.imgIndex - 1) * this.sliderGroupDom
      }
      this.translate3d = 'translate3d(' + (this.domLeft) + 'px, 0px, 0px)'
    },
    /*      动画效果，设置移动后的坐标 和 动画时间        */
    animateImg (flag, time) {
      if (flag) {
        this.goBackImg(Math.abs(time))
      } else {
        this.animateTime = 0
        this.translate3d = 'translate3d(' + (this.domLeft - this.bridge / this.screenWidth * this.sliderGroupDom) + 'px, 0px, 0px)'
      }
    },
    /*      初始化设置        */
    init () {
      this.screenWidth = this.$refs.slider.offsetWidth
      this.sliderGroupDom = parseFloat((this.screenWidth * 0.768).toFixed(2))
      this.sliderDom = -(this.sliderGroupDom - (this.screenWidth - this.sliderGroupDom) / 2)
      this.goBackImg(0)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .slider
    position: relative
    width: 100%
    padding: 5px 0px
    // overflow: hidden
    .slider-group
      height: 100%
      width: 100%
      display: flex
      .slider-dots
        display: flex
        align-items:center
        justify-content: center
        padding: 0px 18px
        width: 76.8%
        height: 240px
        flex-shrink: 0
        z-index: 10
        /* 遇见过一次图片宽度很宽超过 slide 导致下一个 slide 也会有这个图片 */
        /* overflow: hidden; */
        .dot-con
          display: flex
          padding-top: 65px
          width: 100%
          height: 100%
          background-color: #fff
          border-radius: 10px
          box-shadow: 0 10px 10px rgba(255, 104, 59, 0.05)
          &.nocar
            bg-image('../../common/imgs/mask/addcar')
            background-position: center center
            background-repeat: no-repeat
            background-size: 374px 60px
          .left
            width: 188px
            padding-left: 78px
            img
              display: block
              width: 70px
              height: 70px
              background-color: blue
          .right
            flex: 1
            h2
              font-size: 28px
              color: #5b5b5b
              transform: skewX(-10deg)
              font-weight: bold
              margin-bottom: 13px
            p
              font-size: 22px
              color: #5b5b5b
              margin-bottom: 25px
              span
                margin: 0 15px
            .default-btn
              width: 160px
              height: 44px
              font-size: 22px
              color: #ffffff
              text-align: center
              line-height: 44px
              background: -webkit-linear-gradient(left, #ff834e, #ff5745)
</style>
