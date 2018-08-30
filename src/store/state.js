import {loadUserInfo, loadCityList, loadCityInfo, loadStoreList, loadMyCar, loadDefaultCar, loadSelectCar, loadCarBrand, loadAddCar,
  loadDefaultStoreId, loadMaintainOrder, loadAllServerList} from '../common/js/cache'

const state = {
  routerAnimate: 'none',
  userInfo: loadUserInfo(),
  cityList: loadCityList(),
  cityInfo: loadCityInfo(),
  storeList: loadStoreList(),
  myCar: loadMyCar(),
  defaultCar: loadDefaultCar(),
  selectCar: loadSelectCar(),
  carBrand: loadCarBrand(),
  addCar: loadAddCar(),
  defaultStoreId: loadDefaultStoreId(),
  maintainOrder: loadMaintainOrder(),
  allServerList: loadAllServerList(),
  loadingState: false,
  serachHis: {
    'store': [],
    'city': [],
    'brand': []
  },
  serachInfo: {},
  area: ['京', '沪', '浙', '苏', '粤', '鲁', '晋', '冀', '渝', '川', '豫', '辽', '吉', '黑', '皖', '鄂', '湘', '赣', '闽', '陕', '甘', '宁', '蒙', '津', '桂', '云', '贵', '琼', '青', '新', '藏', '港', '澳'],
  detectionMenus: [],
  orderList: [],
  orderInfo: {},
  repairOrder: {}
}
export default state
/* 故障单
  falutType : 1 漆面 0 其他
  state: 0 安全 1 预警 2 紧急
  carPaintPlace: 车漆耗损部位： left  right before after up-before up-after
  repairResults:  0 处理成功  1 新增  2 遗留
*/
