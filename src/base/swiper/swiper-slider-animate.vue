<template>
  <div class="slider-swiper" @touchmove.prevent ref="slider">
    <div class="slider-group" ref="sliderGroup" @transitionend="transitionEnd" :style="{transform: translate3d, transitionDuration: animateTime + 'ms'}"  @touchstart="touchS" @touchend="touchE" @touchmove="touchM">
      <div class="slider-dots" v-for="(item, index) in imgs" :key="index" :style="{width: groupWidth(index), transition: groupAnimateTime}">
        <a :href="item.linkUrl.length > 0 ? item.linkUrl : 'javascript:;'">
          <img :src="item.picUrl" alt="" >
        </a>
      </div>
    </div>
    <div class="pagination" v-if="pagination">
      <div class="dots" :class="{'dots-active': item === showNumber}" :style="{backgroundColor: color}" v-for="item in slidesNumber" :key="item">

      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'swiper',
  props: {
    // 一次滑动的默认时间
    duration: {
      default: 500
    },
    // 是否自动播放
    autoplay: {
      default: 500
    },
    slidetype: {
      default: 'right'
    },
    recommends: {
      required: true
    },
    color: {
      default: '#fff'
    },
    pagination: {
      default: true
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
      imgIndex: 2,
      showNumber: 0,
      domLeft: 0,
      bridge: 0,
      translate3d: '',
      sliderDom: 0,
      timer: null,
      animateTime: 0,
      sliderGroupDom: 0,
      sliderGroupNow: 0,
      screenWidth: 0,
      groupAnimateTime: 'all 500ms',
      miniWidth: 0.74,
      bigWidth: 0.88,
      cutwidth: 0,
      addwidth: 0,
      prevDom: null,
      nextDom: null,
      nowDom: null
    }
  },
  computed: {
    slidesNumber () {
      let number = []
      for (let i = 0; i < this.recommends.length - 4; i++) {
        number.push(i)
      }
      return number
    },
    imgs () {
      let imgs = this.recommends
      let start = this.recommends[0]
      let startNext = this.recommends[1]
      let endPrev = this.recommends[this.recommends.length - 2]
      let end = this.recommends[this.recommends.length - 1]
      imgs.push(start)
      imgs.push(startNext)
      imgs.unshift(end)
      imgs.unshift(endPrev)
      return imgs
    }
  },
  methods: {
    // 手指触屏触发
    touchS (event) {
      console.log('touchS')
      clearTimeout(this.timer)
      let _touchStart = event.touches[0]
      this.touchInfo.startX = _touchStart.pageX
      this.touchInfo.startY = _touchStart.pageY
      this.touchInfo.startTime = parseInt(event.timeStamp)
    },
    // 手指移开触发
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
            this.goBackImg(parseInt(Math.abs(this.bridge) / this.sliderGroupNow * this.duration))
            this.goBackGroup(parseInt(Math.abs(this.bridge) / this.sliderGroupNow * this.duration))
          }
        } else {
          if (moveTime > 20 && moveTime < 300) {
            this.prevImg()
          } else if (Math.abs(X) >= this.sliderGroupDom / 2) {
            this.prevImg()
          } else {
            this.goBackImg(parseInt(Math.abs(this.bridge) / this.sliderGroupNow * this.duration))
            this.goBackGroup(parseInt(Math.abs(this.bridge) / this.sliderGroupNow * this.duration))
          }
        }
      } else {
      }
    },
    // 手指触屏移动触发
    touchM (event) {
      let _touchMove = event.touches[0]
      this.touchInfo.moveX = _touchMove.pageX
      this.touchInfo.moveY = _touchMove.pageY
      let X = this.touchInfo.startX - this.touchInfo.moveX
      let Y = this.touchInfo.startY - this.touchInfo.moveY
      if (Math.abs(X) > Math.abs(Y)) {
        this.bridge = this.touchInfo.startX - this.touchInfo.moveX
        this.groupAnimate(0)
        if (this.touchInfo.startX > this.touchInfo.moveX) {
          this.animateImg(false, 0)
          this.setGroupWidth('next')
        } else {
          this.animateImg(false, 0)
          this.setGroupWidth('prev')
        }
      }
    },
    tapDom () {
      console.log('tapDom')
    },
    goBackGroup (time) {
      this.groupAnimate(time)
      this.prevDom.style.width = (this.miniWidth * 100) + '%'
      this.nextDom.style.width = (this.miniWidth * 100) + '%'
      this.nowDom.style.width = (this.bigWidth * 100) + '%'
    },
    getGroupDom () {
      this.prevDom = document.getElementsByClassName('slider-dots')[this.imgIndex]
      this.nowDom = document.getElementsByClassName('slider-dots')[this.imgIndex + 1]
      this.nextDom = document.getElementsByClassName('slider-dots')[this.imgIndex + 2]
    },
    setGroupWidth (txt) {
      this.getGroupDom()
      this.cutwidth = ((this.sliderGroupNow - (Math.abs(this.bridge) / this.sliderGroupDom) * (this.sliderGroupNow - this.sliderGroupDom)) / this.screenWidth).toFixed(10)
      this.addwidth = ((this.sliderGroupDom + (Math.abs(this.bridge) / this.sliderGroupDom) * (this.sliderGroupNow - this.sliderGroupDom)) / this.screenWidth).toFixed(10)
      if (this.cutwidth < this.miniWidth) {
        this.cutwidth = this.miniWidth
      } else if (this.cutwidth > this.bigWidth) {
        this.cutwidth = this.bigWidth
      }
      if (this.addwidth < this.miniWidth) {
        this.addwidth = this.miniWidth
      } else if (this.addwidth > this.bigWidth) {
        this.addwidth = this.bigWidth
      }
      if (txt === 'next') {
        this.nowDom.style.width = (this.cutwidth * 100) + '%'
        this.nextDom.style.width = (this.addwidth * 100) + '%'
      } else if (txt === 'prev') {
        this.nowDom.style.width = (this.cutwidth * 100) + '%'
        this.prevDom.style.width = (this.addwidth * 100) + '%'
      }
    },
    // 动画结束监听
    transitionEnd () {
      this.bridge = 0
      clearTimeout(this.timer)
      if (this.imgIndex >= this.imgs.length - 3) {
        this.imgIndex = 1
        this.goBackImg(0)
      } else if (this.imgIndex < 1) {
        this.imgIndex = this.slidesNumber.length
        this.goBackImg(0)
      }
      if (this.autoplay) {
        this.player()
      }
    },
    // 右向左滑动， 下一页
    nextImg (text) {
      if (this.pagination) {
        this.flipNumber('next')
      }
      this.imgIndex += 1
      let time = 0
      if (text === 'init') {
        time = this.duration
      } else {
        time = parseInt((this.sliderGroupNow - Math.abs(this.bridge)) / this.sliderGroupNow * this.duration)
      }
      this.animateImg(true, time)
    },
    // 左向右滑动， 下一页
    prevImg (text) {
      if (this.pagination) {
        this.flipNumber('prev')
      }
      this.imgIndex -= 1
      let time = 0
      if (text === 'init') {
        time = this.duration
      } else {
        time = parseInt((this.sliderGroupNow - Math.abs(this.bridge)) / this.sliderGroupNow * this.duration)
      }
      this.animateImg(true, time)
    },
    flipNumber (text) {
      if (text === 'next') {
        this.showNumber += 1
      } else if (text === 'prev') {
        this.showNumber -= 1
      }
      if (this.showNumber > this.slidesNumber.length - 1) {
        this.showNumber = 0
      } else if (this.showNumber < 0) {
        this.showNumber = this.slidesNumber.length - 1
      }
    },
    groupWidth (index) {
      if (index === this.imgIndex + 1) {
        return this.bigWidth * 100 + '%'
      } else {
        return this.miniWidth * 100 + '%'
      }
    },
    groupAnimate (time) {
      this.groupAnimateTime = 'all ' + time + 'ms'
    },
    goBackImg (time) {
      this.animateTime = time
      this.domLeft = this.sliderDom - this.imgIndex * this.sliderGroupDom
      this.groupAnimateTime = 'all ' + time + 'ms'
      this.translate3d = 'translate3d(' + (this.domLeft) + 'px, 0px, 0px)'
    },
    // 动画效果，设置移动后的坐标 和 动画时间
    animateImg (flag, time) {
      if (flag) {
        this.goBackImg(Math.abs(time))
        this.groupAnimate(time)
      } else {
        this.animateTime = 0
        this.translate3d = 'translate3d(' + (this.domLeft - this.bridge / this.screenWidth * this.sliderGroupNow) + 'px, 0px, 0px)'
      }
    },
    // 初始化设置
    init () {
      this.screenWidth = this.$refs.slider.offsetWidth
      this.sliderGroupDom = parseFloat((this.screenWidth * this.miniWidth).toFixed(2))
      this.sliderGroupNow = parseFloat((this.screenWidth * this.bigWidth).toFixed(2))
      this.sliderDom = -(this.sliderGroupDom - (this.screenWidth - this.sliderGroupNow) / 2)
      this.getGroupDom()
      this.goBackImg(0)
      this.player()
    },
    // 自动播放
    player () {
      this.timer = setTimeout(() => {
        if (this.slidetype === 'right') {
          this.prevImg('init')
        } else if (this.slidetype === 'left') {
          this.nextImg('init')
        }
      }, this.autoplay)
    }
  },
  mounted () {
    this.init()
  },
  destroy () {
    clearTimeout(this.timer)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="stylus" ref="stylesheet/stylus">
  .slider-swiper
    position: relative
    width: 100%
    height: 100%
    padding: 5px 0px
    overflow: hidden
    .pagination
      position: absolute
      bottom: 10px
      width: 100%
      height: 54px
      display: flex
      align-items: center
      justify-content: center
      .dots
        height: 12px
        width: 12px
        opacity: 0.5
        margin: 0 5px
        border-radius: 50%
      .dots-active
        opacity: 1
    .slider-group
      height: 100%
      width: 100%
      display: flex
      .slider-dots
        display: flex
        align-items:center
        justify-content: center
        flex-shrink: 0
        z-index: 10
        /* 遇见过一次图片宽度很宽超过 slide 导致下一个 slide 也会有这个图片 */
        overflow: hidden
        a
        display: block
        padding: 0px 7px
        width: 100%
        /* overflow: hidden; */
        text-decoration: none
        img
          display: inline-block
          width: 100%
          border-radius: 5px
          -webkit-box-shadow:0 0 10px rgba(0, 0, 0, .2)
          -moz-box-shadow:0 0 10px rgba(0, 0, 0, .2)
          box-shadow:0 0 10px rgba(0, 0, 0, .2)
</style>
