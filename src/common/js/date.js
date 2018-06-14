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

export function datePicker () {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let monthArr = []
  let yearArr = []
  let dayArr = []

  for (let i = 0; i < 50; i++) {
    yearArr.push({
      text: year + i,
      value: year + i
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
