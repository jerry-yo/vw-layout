export function getFormatDate (stamp) {
  let date = new Date(stamp * 1000)
  let Y = date.getFullYear() + '年'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
  let D = date.getDate() + '日 '
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return Y + M + D + h + m + s
}

export function getFormatDateToRepair (stamp) {
  let date = new Date(stamp)
  let Y = date.getFullYear() + '年'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
  let D = date.getDate() + '日 '
  return Y + M + D
}

export function datePicker () {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let monthArr = []
  let yearArr = []
  let dayArr = []

  for (let i = 0; i <= 100; i++) {
    yearArr.push({
      text: 1970 + i,
      value: 1970 + i
    })
  }
  for (let i = 0; i < 12; i++) {
    monthArr.push({
      text: i + 1,
      value: i + 1
    })
  }
  for (let i = 0; i < 31; i++) {
    dayArr.push({
      text: i + 1,
      value: i + 1
    })
  }
  return {
    nowYear: year,
    nowMonth: month,
    nowDay: day,
    yearArr: yearArr,
    monthArr: monthArr,
    dayArr: dayArr
  }
}

export function getDaysInMonth (year, month) {
  let temp = new Date(year, month, 0)
  return temp.getDate()
}

export function timeToStamp (year, month, day, hours = 0, minutes = 0, seconds = 0, ms = 0) {
  let mth = month > 10 ? month : '0' + month
  let d = day > 10 ? day : '0' + day
  let h = hours > 10 ? hours : '0' + hours
  let m = minutes > 10 ? minutes : '0' + minutes
  let s = seconds > 10 ? seconds : '0' + seconds
  // let mss = ms < 10 ? '00' + ms : ms < 100 ? '0' + ms : ms
  let string = year + '-' + mth + '-' + d + ' ' + h + ':' + m + ':' + s
  return new Date(string).getTime()
}
