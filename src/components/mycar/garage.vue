// 我的车库
<template>
  <div class="garage">
    <headerBar leftIcon="white" rightColor="white" contentTitle="我的车库" backgroundColor="none" :rightTitle="garageType === 'add' ? '管理' :''"  @leftClick="_goBack" @rightClick="_goManagement"></headerBar>
    <div class="container">
      <div class="swiper">
        <Slider :recommends="carList" @tapcard="tapCard" @carid="getCarId" :type="garageType" @setdefault="setDefault"></Slider>
      </div>
      <div class="car-menu">
        <div class="car-con">
          <div class="owner" @click="_goCarAuth">
            <h2>车主认证</h2>
          </div>
          <div class="record" @click="_goDetectionRecord">
            <h2>检测记录</h2>
          </div>
        </div>
      </div>
      <div class="car-idcard" v-if="carList.length > 0">
        <span>车牌号</span>
        <div class="area">
          {{carList[carId].carNumber.slice(0, 1)}}
        </div>
        <div class="number">
          {{carList[carId].carNumber.slice(1, 7)}}
        </div>
      </div>
      <div class="car-info" v-if="carList.length > 0">
        <div class="car-models">
          <span>具体车型</span>
          <span>{{`${carList[carId].year} - ${carList[carId].transmissionDesc}`}}</span>
        </div>
        <div class="car-others">
          <div class="car-displacement">
            <span>发动机排量</span>
            <span>{{carList[carId].exhaustVolume}}</span>
          </div>
          <div class="car-age">
            <span>生产年份</span>
            <span>{{carList[carId].year}}</span>
          </div>
        </div>
        <div class="car-far">
          <span>行驶里程</span>
          <div class="input">
            <input type="number" v-model="modifyWay" :placeholder="carList[carId].distance" @change="handleModifyWay" @blur="blurAdjust">
          </div>
          <span>km</span>
        </div>
        <div class="car-time">
          <span>注册时间</span>
          <span @click="showDate">{{tempToDate(carList[carId])}}</span>
        </div>
      </div>
    </div>
    <datePickerMask v-if="datePickerShow" @close="closePicker"></datePickerMask>
  </div>
</template>

<script>
import Slider from '@/base/slider/slider-view'
import headerBar from '@/base/headerBar'
import {mapActions, mapGetters, mapMutations} from 'vuex'
import {expireToken, modifyCarInfo, inputOnblur} from '@/common/js/mixin'
import datePickerMask from '@/base/date-picker'
import {datePicker, timeToStamp, getFormatDateToRepair} from '@/common/js/date'
export default {
  name: 'garage',
  components: {
    Slider,
    datePickerMask,
    headerBar
  },
  mixins: [expireToken, modifyCarInfo, inputOnblur],
  data () {
    return {
      carId: 0,
      datePickerShow: false,
      dateInfo: {},
      modifyWay: null,
      wayLoseBlur: true,
      garageType: 'add'
    }
  },
  created () {
    this.garageType = this.$route.query.type
    this._getMyCar(this.userInfo.token)
  },
  computed: {
    defaultCarId () {
      let id = 0
      this.myCar.forEach((item, index) => {
        if (item.defaultFlag) {
          id = index
        }
      })
      return id
    },
    carList () {
      let arr = []
      if (this.garageType === 'add') {
        arr = this.myCar
      } else if (this.garageType === 'select') {
        let id = this.selectCar ? this.selectCar : this.defaultCar
        this.myCar.forEach(item => {
          if (item.userCarId === id) {
            arr.unshift(Object.assign(item, {
              select: true
            }))
          } else {
            arr.push(Object.assign(item, {
              select: false
            }))
          }
        })
      }
      return arr
    },
    ...mapGetters([
      'myCar',
      'defaultCar',
      'userInfo',
      'selectCar'
    ])
  },
  methods: {
    tempToDate (info) {
      if (info.time && info.time !== '-1') {
        let date = getFormatDateToRepair(parseInt(info.time))
        return date
      } else {
        return '未添加信息'
      }
    },
    // 选择时间
    showDate () {
      this.datePickerShow = true
    },
    // 返回选择时间
    closePicker (res) {
      this.datePickerShow = false
      let index = this.carId
      let date = datePicker()
      let nowTemp = timeToStamp(date.nowYear, date.nowMonth, date.nowDay)
      if (res.temp) {
        if (res.temp < nowTemp && res.temp !== this.carList[index].time) {
          this.modifyCar({
            carBrandLogo: `${this.carList[index].exhaustVolume}\uA856${this.carList[index].manufacturerName}\uA856${this.carList[index].year}\uA856${res.temp}\uA856${this.carList[index].evehicleSystem}\uA856${this.carList[index].transmissionDesc}\uA856${this.carList[index].brandName}\uA856${this.carList[index].imageSrc}`,
            carId: this.carList[index].carId,
            carNumber: this.carList[index].carNumber,
            carVin: this.carList[index].carVin,
            clientAppId: this.carList[index].clientAppId,
            clientUserId: this.carList[index].clientUserId,
            defaultFlag: this.carList[index].defaultFlag,
            distance: this.carList[index].distance,
            externalUserId: this.carList[index].externalUserId,
            userCarId: this.carList[index].userCarId,
            userId: this.carList[index].userId
          }, () => {
            this.updateCarWay({
              index: this.carList[index].userCarId,
              obj: {
                time: res.temp
              }
            })
          }, this.userInfo.token)
        } else {
          this.$Toast({
            position: 'bottom',
            message: '您选择的日期错误，请重新选择'
          })
        }
      }
    },
    // 修改车辆行驶路程
    handleModifyWay () {
      this.wayLoseBlur = false
      let index = this.carId
      if (this.modifyWay !== this.carList[index].distance) {
        this.modifyCar({
          carBrandLogo: `${this.carList[index].exhaustVolume}\uA856${this.carList[index].manufacturerName}\uA856${this.carList[index].year}\uA856${this.carList[index].time}\uA856${this.carList[index].evehicleSystem}\uA856${this.carList[index].transmissionDesc}\uA856${this.carList[index].brandName}\uA856${this.carList[index].imageSrc}`,
          carId: this.carList[index].carId,
          carNumber: this.carList[index].carNumber,
          carVin: this.carList[index].carVin,
          clientAppId: this.carList[index].clientAppId,
          clientUserId: this.carList[index].clientUserId,
          defaultFlag: this.carList[index].defaultFlag,
          distance: this.modifyWay,
          externalUserId: this.carList[index].externalUserId,
          userCarId: this.carList[index].userCarId,
          userId: this.carList[index].userId
        }, () => {
          this.updateCarWay({
            index: this.carList[index].userCarId,
            obj: {
              distance: this.modifyWay
            }
          })
          this.wayLoseBlur = true
          this.modifyWay = null
        }, this.userInfo.token)
      }
    },
    // 获取我的车库
    _getMyCar () {
      this.$get(`${this.f6Url}/api/clientUserCar`, {
        'Authorization': this.userInfo.token,
        'Content-Type': 'application/json'
      }, (res) => {
        if (res.code === 401) {
          this.refreshToken(this._getMyCar)
        } else if (res.code === 200) {
          this.updateCarList(res.data)
        }
      }, {
        clientAppId: this.userInfo.appId,
        clientUserId: this.userInfo.fUserId
      })
    },
    // 车库没有车辆， 跳转到添加车辆
    tapCard (id) {
      if (this.carList.length < 1) {
        this.$router.push('/addcar-tabbar?type=add')
      }
    },
    // 设置默认车辆
    setDefaultCar (res) {
      let index = this.defaultCarId
      let itemObj = {
        carBrandLogo: `${res.item.exhaustVolume}\uA856${res.item.manufacturerName}\uA856${res.item.year}\uA856${res.item.time}\uA856${res.item.evehicleSystem}\uA856${res.item.transmissionDesc}\uA856${res.item.brandName}\uA856${res.item.imageSrc}`,
        carId: res.item.carId,
        carNumber: res.item.carNumber,
        carVin: res.item.carVin,
        clientAppId: res.item.clientAppId,
        clientUserId: res.item.clientUserId,
        defaultFlag: 1,
        distance: res.item.distance,
        externalUserId: res.item.externalUserId,
        userCarId: res.item.userCarId,
        userId: res.item.userId
      }
      let defaultObj = {
        carBrandLogo: `${this.carList[index].exhaustVolume}\uA856${this.carList[index].manufacturerName}\uA856${this.carList[index].year}\uA856${this.carList[index].time}\uA856${this.carList[index].evehicleSystem}\uA856${this.carList[index].transmissionDesc}\uA856${this.carList[index].brandName}\uA856${this.carList[index].imageSrc}`,
        carId: this.carList[index].carId,
        carNumber: this.carList[index].carNumber,
        carVin: this.carList[index].carVin,
        clientAppId: this.carList[index].clientAppId,
        clientUserId: this.carList[index].clientUserId,
        defaultFlag: 0,
        distance: this.carList[index].distance,
        externalUserId: this.carList[index].externalUserId,
        userCarId: this.carList[index].userCarId,
        userId: this.carList[index].userId
      }
      this.modifyCar(itemObj, () => {}, this.userInfo.token)
      this.modifyCar(defaultObj, () => {}, this.userInfo.token)
      this.updateCarDefault({
        defaultId: this.carList[index].userCarId,
        modifyId: res.item.userCarId
      })
    },
    // 设置默认
    setDefault (res) {
      if (!this.wayLoseBlur) {
        this.$Toast({
          position: 'bottom',
          message: '接口请求中'
        })
        return
      }
      if (this.garageType === 'add') {
        this.setDefaultCar(res)
      } else if (this.garageType === 'select') {
        if (res.item.userCarId !== this.selectCar) {
          this.setSelectCar(res.item.userCarId)
          this.setAllServerList([])
          this.setStaticServerList([])
          this.setAddNewServerLoadNum(true)
        }
        this._goBack()
      }
    },
    getCarId (id) {
      this.carId = id
    },
    // 返回个人中心
    _goBack () {
      if (this.garageType === 'select') {
        this.$router.go(-1)
      } else {
        this.$router.replace('/mind')
      }
    },
    // 车辆管理
    _goManagement () {
      if (this.carList.length < 1) {
        this.$Toast({
          message: '请先添加车辆！',
          position: 'bottom'
        })
      } else {
        this.$router.push('/vehicle-management')
      }
    },
    // 车主认证
    _goCarAuth () {
      if (this.carList.length < 1) {
        this.$Toast({
          message: '请先添加车辆！',
          position: 'bottom'
        })
        return
      }
      this.$router.push('/car-owner?carid=' + this.carId)
    },
    // 查看检测单
    _goDetectionRecord () {
      if (this.carList.length < 1) {
        this.$Toast({
          message: '请先添加车辆！',
          position: 'bottom'
        })
        return
      }
      this.$router.push('/detection-record?carid=' + this.myCar[this.carId].carNumber)
    },
    ...mapActions([
      'updateCarList',
      'updateCarWay',
      'updateCarDefault'
    ]),
    ...mapMutations({
      setLoadingState: 'SET_LOADING_STATE',
      setSelectCar: 'SET_SELECTCAR',
      setAllServerList: 'SET_ALL_SERVER_LIST',
      setStaticServerList: 'SET_STATIC_SERVER_LIST',
      setAddNewServerLoadNum: 'SET_ADD_NEW_SERVER_LOAD_NUM'
    })
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .garage
    width: 100%
    background-color: #f2f2f2
    height: 100vh
    // flex-direction: column
    bg-image('../../common/imgs/mindbg')
    background-repeat: no-repeat
    background-position: center top
    background-size: 750px 281px
    .container
      flex: 1
      display: flex
      flex-direction: column
      position: relative
    .swiper
      height: 275px
    .car-menu
      height: 154px
      padding: 0 30px
      background-color: #fff
      .car-con
        height: 154px
        display: flex
        & > div
          flex: 1
          & > h2
            margin-top: 105px
            line-height: 22px
            text-align: center
            font-size: 22px
            color: #5b5b5b
        .record
          bg-image('../../common/imgs/car/record')
          background-size: 56px 55px
          background-repeat: no-repeat
          background-position: center 30px
        .sharing
          bg-image('../../common/imgs/car/sharing')
          background-size: 58px 55px
          background-repeat: no-repeat
          background-position: center 30px
        .owner
          bg-image('../../common/imgs/car/owner')
          background-size: 72px 54px
          background-repeat: no-repeat
          background-position: center 30px
    .car-idcard
      display: flex
      height: 90px
      line-height: 90px
      margin: 10px 0px
      padding: 0 30px
      background-color: #fff
      span
        color: #bcbcbc
        font-size: 22px
      .area
        flex: 1
        text-align: right
        padding-right: 40px
        font-size: 24px
        color: #5b5b5b
        border-right: 1px solid #f2f2f2
      .number
        width: 114px
        font-size: 24px
        color: #5b5b5b
        text-align: right
    .car-info
      height: 360px
      // display: flex
      // flex-direction: column
      background-color: #fff
      overflow: hidden
      .car-models
        height: 90px
        display: flex
        padding: 0 30px
        border-bottom: 1px solid #f2f2f2
        overflow: hidden
        span:nth-child(1)
          width: 120px
          height: 90px
          line-height: 90px
          color: #bcbcbc
          font-size: 22px
        span:nth-child(2)
          flex: 1
          height: 90px
          line-height: 90px
          color: #5b5b5b
          font-size: 26px
          text-align: right
      .car-others
        height: 90px
        display: flex
        border-bottom: 1px solid #f2f2f2
        overflow: hidden
        .car-displacement
          flex: 1
          padding: 0 30px
          display: flex
          border-right: 1px solid #f2f2f2
          span:nth-child(1)
            width: 120px
            height: 90px
            line-height: 90px
            color: #bcbcbc
            font-size: 22px
          span:nth-child(2)
            flex: 1
            height: 90px
            line-height: 90px
            color: #5b5b5b
            font-size: 26px
            text-align: right
        .car-age
          flex: 1
          padding: 0 30px
          display: flex
          overflow: hidden
          span:nth-child(1)
            width: 120px
            height: 90px
            line-height: 90px
            color: #bcbcbc
            font-size: 22px
          span:nth-child(2)
            flex: 1
            height: 90px
            line-height: 90px
            color: #5b5b5b
            font-size: 26px
            text-align: right
      .car-far
        height: 90px
        line-height: 90px
        padding: 0 30px
        display: flex
        border-bottom: 1px solid #f2f2f2
        overflow: hidden
        .input
          flex: 1
          input
            height: 100%
            float: right
            background: none
            border: none
            outline: none
            color: #5b5b5b
            font-size: 26px
            text-align: right
        span:nth-child(1)
          color: #bcbcbc
          font-size: 22px
        span:nth-child(3)
          color: #5b5b5b
          font-size: 26px
      .car-time
        height: 90px
        padding: 0 30px
        display: flex
        overflow: hidden
        span:nth-child(1)
          width: 120px
          height: 90px
          line-height: 90px
          color: #bcbcbc
          font-size: 22px
        span:nth-child(2)
          flex: 1
          height: 90px
          line-height: 90px
          color: #5b5b5b
          font-size: 26px
          text-align: right
</style>
