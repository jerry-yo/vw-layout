import Vue from 'vue'
export const resultState = ['处理成功', '新增', '遗留']
export const carInfo = '排量\uA856厂商\uA856年份\uA856注册时间\uA856车系\uA856变速器描述\uA856品牌名字\uA856品牌Logo'
export function handleMyCar (data) {
  let arr = []
  data.forEach(item => {
    let infos = item.carBrandLogo.split('\uA856')
    arr.push(Object.assign(item, {
      exhaustVolume: infos[0],
      manufacturerName: infos[1],
      year: infos[2],
      time: infos[3],
      evehicleSystem: infos[4],
      transmissionDesc: infos[5],
      brandName: infos[6],
      imageSrc: infos[7]
    }))
  })
  return arr
}

// `${getFormatDateNow()}\uA856${'APP预约维修服务'}\uA856${faultText}\uA856${imageSrc}\uA856${faultImgs}\uA856${expireTemp}\uA856${responserTel}\uA856${stationPositionX}\uA856${stationPositionY}`
export function handleWxOrder (data) {
  let arr = []
  if (/,/.test(data[4])) {
    data[4].split(',').forEach(item => {
      if (item !== '') {
        arr.push(Vue.prototype.gt1UpdateImgUrl + item)
      }
    })
  }
  let obj = {
    orderTime: data[0],
    serverType: data[1],
    serverState: 2,
    faultText: data[2],
    imageSrc: data[3],
    faultImgs: arr,
    expireTemp: data[5],
    responserTel: data[6],
    stationPositionX: parseFloat(data[7]),
    stationPositionY: parseFloat(data[8])
  }
  return obj
}
// ${getFormatDateNow()}\uA856${'APP预约保养服务'}\uA856${imageSrc}\uA856${servers}\uA856${serverMoney}\uA856${partInfos}\uA856${partMoney}\uA856${partListStr}\uA856${endTamp}\uA856${responserTel}\uA856${stationPositionX}\uA856${stationPositionY}

export function handleByOrder (data) {
  let arr = []
  if (/,/.test(data[7])) {
    arr = data[7].split(',')
    arr.pop()
  }
  let obj = {
    orderTime: data[0],
    serverType: data[1],
    serverState: 1,
    imageSrc: data[2],
    serversNum: parseInt(data[3]),
    serverMoney: parseFloat(data[4]),
    partInfos: parseInt(data[5]),
    partMoney: parseFloat(data[6]),
    partListStr: arr,
    expireTemp: data[8],
    responserTel: data[9],
    stationPositionX: parseFloat(data[10]),
    stationPositionY: parseFloat(data[11])
  }
  return obj
}
export function handleOrderRemark (remark) {
  let arr = remark.split('\uA856')
  return {
    pkId: arr[0],
    customCode: arr[1],
    brand: arr[2],
    supplierCode: arr[3],
    spec: arr[4]
  }
}
// `${item.pkId}\uA856${item.partInfo.customCode}\uA856${item.partInfo.brand}\uA856${item.partInfo.supplierCode}\uA856${item.partInfo.spec || ' '}`
export function handleOrderPartList (arr) {
  let serverArr = []
  let partArr = []
  let handleArr = []
  arr.forEach(item => {
    if (item.type === 0) {
      serverArr.push(item)
    } else if (item.type === 2) {
      partArr.push(Object.assign(item, {
        handleRemark: handleOrderRemark(item.remark)
      }))
    }
  })
  for (let i = 0; i < serverArr.length; i++) {
    let obj1 = null
    let obj2 = null
    for (let j = 0; j < partArr.length; j++) {
      if (serverArr[i].projectid === partArr[j].handleRemark.pkId) {
        obj2 = {
          brand: partArr[j].handleRemark.brand,
          customCode: partArr[j].handleRemark.customCode,
          number: partArr[j].number,
          sellPrice: partArr[j].genaraprice,
          spec: partArr[j].handleRemark.spec,
          supplierCode: partArr[j].handleRemark.supplierCode
        }
      }
    }
    obj1 = {
      amount: serverArr[i].genaraprice,
      name: serverArr[i].projectname,
      pkId: serverArr[i].remark,
      state: 0,
      partInfo: obj2
    }
    handleArr.push(obj1)
  }
  return handleArr
}

// 处理检测单列表
export function handleCheckList (arr, carlist) {
  let obj = {}
  carlist.forEach(item => {
    obj[item.carNumber] = {
      ccd: [],
      yjd: []
    }
    arr.forEach(check => {
      if (check.carNoWhole === item.carNumber) {
        if (check.maintainType === 'CCD') {
          obj[item.carNumber]['ccd'].push(check)
        } else if (check.maintainType === 'YJD') {
          obj[item.carNumber]['yjd'].push(check)
        }
      }
    })
  })
  return obj
}
