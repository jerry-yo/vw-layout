<template>
  <div class="picker">

  </div>
</template>

<script type="text/ecmascript-6">
import {datePicker, getDaysInMonth} from '@/common/js/date'
import Picker from 'better-picker'
export default {
  name: 'datePicker',
  data () {
    return {
      date: datePicker(),
      picker: null,
      showindex: [0, 0, 0],
      showTime: [0, 0, 0]
    }
  },
  mounted () {
    this.showTime = [this.date.nowYear, this.date.nowMonth, this.date.nowDay]
    this.init()
  },
  computed: {
    initMonthArr () {
      let arr = []
      this.date.monthArr.forEach((item) => {
        if (item.value >= this.date.nowMonth) {
          arr.push(item)
        }
      })
      return arr
    },
    initDayArr () {
      let arr = []
      this.date.dayArr.forEach((item) => {
        if (item.value >= this.date.nowDay) {
          arr.push(item)
        }
      })

      return arr
    }
  },
  methods: {
    init () {
      let _self = this
      this.picker = new Picker({
        data: [this.date.yearArr, this.initMonthArr, this.initDayArr],
        selectedIndex: this.showindex,
        title: ''
      })
      this.picker.show()
      this.picker.on('picker.select', function (selectedVal, selectedIndex) {
        console.log(_self.date.yearArr[selectedIndex[0]].text + '年' + _self.date.monthArr[selectedIndex[1]].text + '月' + _self.date.dayArr[selectedIndex[2]].text + '日')
      })

      this.picker.on('picker.change', function (index, selectedIndex) {
        let years = _self.date.yearArr
        let months = _self.initMonthArr
        let days = _self.initDayArr
        _self.showindex[index] = selectedIndex
        // if (_self.showindex[0] === 0) {
        //   // _self.showTime = [_self.date.yearArr[_self.showindex[0]].value, _self.initMonthArr[_self.showindex[1]].value, _self.initDayArr[_self.showindex[2]].value]
        // } else {
        //   _self.showTime = [_self.date.yearArr[_self.showindex[0]].value, _self.date.monthArr[_self.showindex[1]].value, _self.date.dayArr[_self.showindex[2]].value]
        // }
        if (index === 0 && selectedIndex !== 0) {
          months = _self.date.monthArr
          _self.picker.refillColumn(1, months)
        } else if (index === 0 && selectedIndex === 0) {
          _self.picker.refillColumn(1, months)
        }
        if (_self.showindex[0] !== 0) {
          days = _self.date.dayArr
        }
        _self.picker.refillColumn(2, _self.getDays(days, years[_self.showindex[0]], months[_self.showindex[1]]))
        console.log(_self.showindex)

      })

      this.picker.on('picker.cancel', function () {
        _self.$emit('close', {
          type: false
        })
      })

      this.picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
        console.log(selectedVal)
      })
    },
    getDays (arr, year, month) {
      let days = getDaysInMonth(year, month)
      let ret = []
      arr.forEach(item => {
        if (item.value <= days) {
          ret.push(item)
        }
      })
      return ret
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .picker
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 102
</style>
