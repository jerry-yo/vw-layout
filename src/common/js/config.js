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
