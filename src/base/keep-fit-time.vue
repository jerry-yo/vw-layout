<template>
  <div class="mask-time">
    <div class="hide">
      <span>取消</span>
    </div>
    <div class="container">
      <div class="tabbar">
        <div class="today" :class="today ? 'active' : ''" @click="isToday">
          今天
        </div>
        <div class="tomorrow" :class="today ? '' : 'active'" @click="isToday">
          明天
        </div>
      </div>
      <div class="title">
        <span class="bor"></span><span class="txt">上午</span><span class="bor"></span>
      </div>
      <ul class="time-list">
        <li :class="'active-' + 1">8:30</li>
        <li :class="'active-' + 2">9:30</li>
        <li :class="'active-' + 3">10:30</li>
        <li :class="'active-' + 1">11:30</li>
        <li :class="'active-' + 1">12:30</li>
      </ul>
      <div class="title">
        <span class="bor"></span><span class="txt">下午</span><span class="bor"></span>
      </div>
      <ul class="time-list">
        <li :class="'active-' + 1">13:30</li>
        <li :class="'active-' + 1">14:00</li>
        <li :class="'active-' + 1">14:30</li>
        <li :class="'active-' + 1">15:00</li>
        <li :class="'active-' + 1">15:30</li>
        <li :class="'active-' + 1">16:30</li>
        <li :class="'active-' + 1">17:30</li>
        <li :class="'active-' + 1">18:30</li>
      </ul>
    </div>
    <div class="btn">

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'keepFitTime',
  data () {
    return {
      today: true
    }
  },
  methods: {
    isToday () {
      this.today = !this.today
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../common/stylus/mixin.styl"
  .mask-time
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    display: flex
    flex-direction: column
    align-items: center
    padding: 0 30px
    padding-top: 110px
    background-color: rgba(0, 0, 0, 0.5)
    z-index: 100
    .hide
      width: 100%
      height: 87px
      line-height: 87px
      font-size: 36px
      color: #fff
      display: flex
      justify-content: flex-end
    .container
      width: 100%
      height: 800px
      display: flex
      flex-direction: column
      align-items: center
      border-radius: 15px
      background-color: #fff
      padding-top: 80px
      .tabbar
        width: 396px
        display: flex
        border: 2px solid #ff7d4a
        background-color: #ff7d4a
        height: 70px
        border-radius: 10px
        overflow: hidden
        .today
          border-radius: 10px 0px 0px 10px
        .tomorrow
          border-radius: 0px 10px 10px 0px
        .today, .tomorrow
          flex: 1
          display: flex
          justify-content: center
          align-items: center
          font-size: 26px
          color: #fff
          &.active
            background-color: #fff
            color: #ff7d4a
      .title
        height: 80px
        margin-top: 20px
        width: 300px
        display: flex
        .bor
          width: 80px
          height: 39px
          border-bottom: 2px solid #f2f2f2
        .txt
          flex: 1
          line-height: 80px
          text-align: center
          font-size: 26px
          color: #b6b6b6
      .time-list
        width: 648px
        display: flex
        flex-wrap: wrap
        overflow: hidden
        li
          width: 126px
          box-sizing: border-box
          height: 60px
          border-radius: 5px
          text-align: center
          line-height: 60px
          margin: 0px 18px
          margin-bottom: 27px
          &.active-1
            border: 2px solid #999999
            background-color: #fff
            color: #555555
          &.active-2
            border: 2px solid #dedede
            background-color: #dedede
            color: #bbbbbb
          &.active-3
            background: -webkit-linear-gradient(left, #ff994f, #ff7348)
            color: #ffffff
    .btn
      margin-top: 75px
      width: 334px
      height: 115px
      background-color: rgba(0, 255, 0, 0.5)
</style>
