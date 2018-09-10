<template>
  <transition name="fade">
    <div class="mask-time">
      <div class="hide">
        <div class="close" @click="closeMask"></div>
      </div>
      <div class="container">
        <div class="tabbar">
          <div class="today" :class="today ? '' : 'active'" @click="goToday">
            今天
          </div>
          <div class="tomorrow" :class="today ? 'active' : ''" @click="goTomorrow">
            明天
          </div>
        </div>
        <div class="title">
          <span class="bor"></span><span class="txt">上午</span><span class="bor"></span>
        </div>
        <ul class="time-list">
          <li :class="{'active-1': item.state === 1, 'active-2': item.state > 1, 'active-3': item.state === 0}" v-for="(item, index) in getAmList.am" :key="index" @click="seleTime(item, index, 'am')">{{item.startPoint2}}</li>
        </ul>
        <div class="title">
          <span class="bor"></span><span class="txt">下午</span><span class="bor"></span>
        </div>
        <ul class="time-list">
          <li :class="{'active-1': item.state === 1, 'active-2': item.state > 1, 'active-3': item.state === 0}" v-for="(item, index) in getAmList.pm" :key="index" @click="seleTime(item, index, 'pm')">{{item.startPoint2}}</li>
        </ul>
      </div>
      <div class="btn" @click="seleSuccess">确认</div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
const UNDERLINE_LONG = 18000000

export default {
  name: 'keepFitTime',
  props: {
    store: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      today: true,
      dateList: [],
      seleDate: {}
    }
  },
  computed: {
    getAmList () {
      let am = []
      let pm = []
      let date = new Date()
      let hours = this.today ? (date.getHours() - 8) * 60 * 60 * 1000 : -1

      this.dateList.forEach(item => {
        if (item.startPoint1 < UNDERLINE_LONG) {
          item = Object.assign(item, {
            state: item.startPoint1 <= hours ? 3 : item.state
          })
          am.push(item)
        } else {
          item = Object.assign(item, {
            state: item.startPoint1 <= hours ? 3 : item.state
          })
          pm.push(item)
        }
      })
      return {
        am: am,
        pm: pm
      }
    }
  },
  created () {
    this.getDateList()
  },
  methods: {
    getDateList () {
      let date = new Date()
      this.$post(`${this.tonyUrl}/api/f6-app/getStoreOrderTimeList`, this.gt1Header, (res) => {
        if (res.errorCode === 0 && res.data.code === 0) {
          this.dateList = res.data.data
        }
      }, {
        storeName: this.store.stationName,
        orderReserveDate: `${date.getFullYear()}-${date.getMonth() + 1}-${this.today ? date.getDate() : date.getDate() + 1}`
      })
    },
    goToday () {
      if (this.today) {
        return
      }
      this.today = !this.today
      this.getDateList()
    },
    goTomorrow () {
      if (!this.today) {
        return
      }
      this.today = !this.today
      this.getDateList()
    },
    closeMask () {
      this.$emit('close', {
        close: false
      })
    },
    seleTime (res, index, type) {
      if (res.state !== 1) {
        return
      }
      let id = index
      if (type === 'pm') {
        id += this.getAmList.am.length
      }
      this.seleDate = res
      this.dateList.forEach((item, i) => {
        if (item.state === 0) {
          item = Object.assign(item, {
            state: 1
          })
        }
        if (id === i) {
          item = Object.assign(item, {
            state: 0
          })
        }
      })
    },
    seleSuccess () {
      if (this.seleDate.startPoint2) {
        this.$emit('close', Object.assign(this.seleDate, {
          today: this.today,
          close: false
        }))
      } else {
        this.$Toast({
          position: 'bottom',
          message: '请选择预约时间'
        })
      }
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
