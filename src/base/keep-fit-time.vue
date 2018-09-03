<template>
  <transition name="fade">
    <div class="mask-time">
      <div class="hide">
        <div class="close" @click="closeMask"></div>
      </div>
      <div class="container">
        <div class="tabbar">
          <div class="today" :class="today ? '' : 'active'" @click="isToday">
            今天
          </div>
          <div class="tomorrow" :class="today ? 'active' : ''" @click="isToday">
            明天
          </div>
        </div>
        <div class="title">
          <span class="bor"></span><span class="txt">上午</span><span class="bor"></span>
        </div>
        <ul class="time-list">
          <li :class="'active-' + item.state" v-for="(item, index) in getAmList.am" :key="index" @click="seleTime(item, index, 'am')">{{item.date}}</li>
        </ul>
        <div class="title">
          <span class="bor"></span><span class="txt">下午</span><span class="bor"></span>
        </div>
        <ul class="time-list">
          <li :class="'active-' + item.state" v-for="(item, index) in getAmList.pm" :key="index" @click="seleTime(item, index, 'pm')">{{item.date}}</li>
        </ul>
      </div>
      <div class="btn" @click="seleSuccess">确认</div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'keepFitTime',
  data () {
    return {
      today: true,
      bespeakTime: {
        today: [
          {
            state: 1,
            date: '8:30'
          }, {
            state: 1,
            date: '9:00'
          }, {
            state: 1,
            date: '9:30'
          }, {
            state: 1,
            date: '10:00'
          }, {
            state: 1,
            date: '10:30'
          }, {
            state: 1,
            date: '11:00'
          }, {
            state: 1,
            date: '11:30'
          }, {
            state: 1,
            date: '13:30'
          }, {
            state: 1,
            date: '14:00'
          }, {
            state: 1,
            date: '14:30'
          }, {
            state: 1,
            date: '15:00'
          }, {
            state: 1,
            date: '15:30'
          }, {
            state: 1,
            date: '16:00'
          }, {
            state: 1,
            date: '16:30'
          }, {
            state: 1,
            date: '17:00'
          }
        ],
        tomorrow: [
          {
            state: 1,
            date: '8:30'
          }, {
            state: 1,
            date: '9:00'
          }, {
            state: 1,
            date: '9:30'
          }, {
            state: 1,
            date: '10:00'
          }, {
            state: 1,
            date: '10:30'
          }, {
            state: 1,
            date: '11:00'
          }, {
            state: 1,
            date: '11:30'
          }, {
            state: 1,
            date: '13:30'
          }, {
            state: 1,
            date: '14:00'
          }, {
            state: 1,
            date: '14:30'
          }, {
            state: 1,
            date: '15:00'
          }, {
            state: 1,
            date: '15:30'
          }, {
            state: 1,
            date: '16:00'
          }, {
            state: 1,
            date: '16:30'
          }, {
            state: 1,
            date: '17:00'
          }
        ]
      },
      nowHour: 0,
      nowMinute: 0,
      amIndex: 0,
      seleIndex: {
        today: -1,
        tomorrow: -1
      }
    }
  },
  computed: {
    getAmList () {
      let _self = this
      _self.amIndex = 0
      let am = []
      let pm = []
      if (this.today) {
        let active = []
        this.bespeakTime.today.forEach((item, index) => {
          let arr = item.date.split(':')
          let minute = parseInt(arr[1])
          let hour = parseInt(arr[0])
          if (this.nowHour > hour) {
            item.state = 2
          } else if (this.nowHour === hour) {
            if (this.nowMinute >= minute) {
              item.state = 2
            } else {
              item.state = 1
            }
          } else {
            item.state = 1
          }
          if (item.state === 1) {
            active.push(index)
          }
          if (hour < 13) {
            _self.amIndex++
            am.push(item)
          } else {
            pm.push(item)
          }
        })
        this.bespeakTime.today.forEach((item, index) => {
          if (_self.seleIndex.today < 0 && index === active[0]) {
            item.state = 3
          } else if (_self.seleIndex.today === index) {
            item.state = 3
          }
        })
      } else {
        let active = []
        this.bespeakTime.tomorrow.forEach((item, index) => {
          let arr = item.date.split(':')
          let hour = parseInt(arr[0])
          if (item.state !== 2) {
            item.state = 1
          }
          if (item.state === 1) {
            active.push(index)
          }
          if (hour < 13) {
            _self.amIndex++
            am.push(item)
          } else {
            pm.push(item)
          }
        })
        this.bespeakTime.tomorrow.forEach((item, index) => {
          if (_self.seleIndex.tomorrow < 0 && index === active[0]) {
            item.state = 3
          } else if (_self.seleIndex.tomorrow === index) {
            item.state = 3
          }
        })
      }
      return {
        am: am,
        pm: pm
      }
    }
  },
  methods: {
    isToday () {
      this.today = !this.today
    },
    closeMask () {
      this.$emit('close', {
        close: false,
        time: 0
      })
    },
    seleTime (res, index, type) {
      let _self = this
      if (this.today) {
        this.bespeakTime.today.forEach((item, id) => {
          if (item.state !== 2) {
            item.state = 1
          }
          if (type === 'am' && res.state !== 2) {
            _self.seleIndex.today = index
          } else if (type === 'pm' && res.state !== 2) {
            _self.seleIndex.today = index + _self.amIndex
          }
        })
      } else {
        this.bespeakTime.tomorrow.forEach((item, id) => {
          if (item.state !== 2) {
            item.state = 1
          }
          if (type === 'am' && res.state !== 2) {
            _self.seleIndex.tomorrow = index
          } else if (type === 'pm' && res.state !== 2) {
            _self.seleIndex.tomorrow = index + _self.amIndex
          }
        })
      }
    },
    seleSuccess () {
      let ret = {}
      let _self = this
      if (this.today) {
        this.bespeakTime.today.forEach((item, id) => {
          if (item.state === 3) {
            ret = item
          }
        })
      } else {
        this.bespeakTime.tomorrow.forEach((item, id) => {
          if (item.state === 3) {
            ret = item
          }
        })
      }
      this.$emit('close', {
        close: false,
        today: _self.today,
        time: ret.date
      })
    }
  },
  created () {
    let date = new Date()
    this.nowHour = date.getHours()
    this.nowMinute = date.getMinutes()
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
    opacity: 1
    &.fade-enter, &.fade-leave-to
      opacity: 0
    &.fade-enter-active, &.fade-leave-active
      transition: all .3s
    .hide
      width: 100%
      height: 87px
      line-height: 87px
      font-size: 36px
      color: #fff
      display: flex
      justify-content: flex-end
      .close
        width: 87px
        height: 87px
        bg-image('../common/imgs/mask/close')
        background-position: center center
        background-repeat: no-repeat
        background-size: 30px 30px
    .container
      width: 100%
      display: flex
      flex-direction: column
      align-items: center
      border-radius: 15px
      background-color: #fff
      padding: 60px 0px
      overflow: hidden
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
      margin-top: 35px
      width: 340px
      height: 130px
      text-align: center
      line-height: 120px
      font-size: 28px
      color: #fff
      bg-image('../common/imgs/mask/time_btn')
      background-position: center center
      background-repeat: no-repeat
      background-size: 340px 130px
</style>
