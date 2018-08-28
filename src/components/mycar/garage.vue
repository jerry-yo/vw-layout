// 我的车库
<template>
  <div class="garage">
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="font">我的车库</div>
      <div class="vehicle-management" @click="_goManagement">管理</div>
    </div>
    <div class="container">
      <div class="swiper">
        <Slider :recommends="myCar" @tapcard="tapCard" @carid="getCarId" @setdefault="setDefault"></Slider>
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
      <div class="car-idcard" v-if="myCar.length > 0">
        <span>车牌号</span>
        <div class="area">
          {{myCar[carId].carNumber.slice(0, 1)}}
        </div>
        <div class="number">
          {{myCar[carId].carNumber.slice(1, 7)}}
        </div>
      </div>
      <div class="car-info" v-if="myCar.length > 0">
        <div class="car-models">
          <span>具体车型</span>
          <span>{{`${myCar[carId].year} - ${myCar[carId].transmissionDesc}`}}</span>
        </div>
        <div class="car-others">
          <div class="car-displacement">
            <span>发动机排量</span>
            <span>{{myCar[carId].exhaustVolume}}</span>
          </div>
          <div class="car-age">
            <span>生产年份</span>
            <span>{{myCar[carId].year}}</span>
          </div>
        </div>
        <div class="car-far">
          <span>行驶里程</span>
          <div class="input">
            <input type="number" v-model="modifyWay" :placeholder="myCar[carId].distance" @change="handleModifyWay">
          </div>
          <span>km</span>
        </div>
        <div class="car-time">
          <span>注册时间</span>
          <span @click="showDate">{{tempToDate(myCar[carId])}}</span>
        </div>
      </div>
    </div>
    <datePickerMask v-if="datePickerShow" @close="closePicker"></datePickerMask>
  </div>
</template>

<script>
import Slider from '@/base/slider/slider-view'
import {mapActions, mapGetters} from 'vuex'
import {expireToken, modifyCarInfo} from '@/common/js/mixin'
import datePickerMask from '@/base/date-picker'
import {datePicker, timeToStamp, getFormatDateToRepair} from '@/common/js/date'
export default {
  name: 'garage',
  components: {
    Slider,
    datePickerMask
  },
  mixins: [expireToken, modifyCarInfo],
  data () {
    return {
      carId: 0,
      datePickerShow: false,
      dateInfo: {},
      modifyWay: null
    }
  },
  created () {
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
    ...mapGetters([
      'myCar',
      'defaultCar',
      'userInfo'
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
        if (res.temp < nowTemp && res.temp !== this.myCar[index].time) {
          this.modifyCar({
            carBrandLogo: `${this.myCar[index].exhaustVolume}\uA856${this.myCar[index].manufacturerName}\uA856${this.myCar[index].year}\uA856${res.temp}\uA856${this.myCar[index].evehicleSystem}\uA856${this.myCar[index].transmissionDesc}\uA856${this.myCar[index].brandName}\uA856${this.myCar[index].imageSrc}`,
            carId: this.myCar[index].carId,
            carNumber: this.myCar[index].carNumber,
            carVin: this.myCar[index].carVin,
            clientAppId: this.myCar[index].clientAppId,
            clientUserId: this.myCar[index].clientUserId,
            defaultFlag: this.myCar[index].defaultFlag,
            distance: this.myCar[index].distance,
            externalUserId: this.myCar[index].externalUserId,
            userCarId: this.myCar[index].userCarId,
            userId: this.myCar[index].userId
          }, () => {
            this.updateCarWay({
              index: index,
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
      let index = this.carId
      if (this.modifyWay !== this.myCar[index].distance) {
        this.modifyCar({
          carBrandLogo: `${this.myCar[index].exhaustVolume}\uA856${this.myCar[index].manufacturerName}\uA856${this.myCar[index].year}\uA856${this.myCar[index].time}\uA856${this.myCar[index].evehicleSystem}\uA856${this.myCar[index].transmissionDesc}\uA856${this.myCar[index].brandName}\uA856${this.myCar[index].imageSrc}`,
          carId: this.myCar[index].carId,
          carNumber: this.myCar[index].carNumber,
          carVin: this.myCar[index].carVin,
          clientAppId: this.myCar[index].clientAppId,
          clientUserId: this.myCar[index].clientUserId,
          defaultFlag: this.myCar[index].defaultFlag,
          distance: this.modifyWay,
          externalUserId: this.myCar[index].externalUserId,
          userCarId: this.myCar[index].userCarId,
          userId: this.myCar[index].userId
        }, () => {
          this.updateCarWay({
            index: index,
            obj: {
              distance: this.modifyWay
            }
          })
          this.modifyWay = null
        }, this.userInfo.token)
      }
    },
    // 获取我的车库
    _getMyCar () {
      this.$get(`${this.f6Url}/api/clientUserCar?userId=${this.userInfo.fUserId}`, {
        'Authorization': this.userInfo.token,
        'Content-Type': 'application/json'
      }, (res) => {
        if (res.code === 401) {
          this.refreshToken(this._getMyCar)
        } else if (res.code === 200) {
          this.updateCarList(res.data)
        }
      })
    },
    // 车库没有车辆， 跳转到添加车辆
    tapCard (id) {
      if (this.myCar.length < 1) {
        this.$router.push('/addcar-tabbar?type=add')
      }
    },
    // 设置默认车辆
    setDefault (res) {
      if (res.item.defaultFlag !== 1) {
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
          carBrandLogo: `${this.myCar[index].exhaustVolume}\uA856${this.myCar[index].manufacturerName}\uA856${this.myCar[index].year}\uA856${this.myCar[index].time}\uA856${this.myCar[index].evehicleSystem}\uA856${this.myCar[index].transmissionDesc}\uA856${this.myCar[index].brandName}\uA856${this.myCar[index].imageSrc}`,
          carId: this.myCar[index].carId,
          carNumber: this.myCar[index].carNumber,
          carVin: this.myCar[index].carVin,
          clientAppId: this.myCar[index].clientAppId,
          clientUserId: this.myCar[index].clientUserId,
          defaultFlag: 0,
          distance: this.myCar[index].distance,
          externalUserId: this.myCar[index].externalUserId,
          userCarId: this.myCar[index].userCarId,
          userId: this.myCar[index].userId
        }
        this.modifyCar(itemObj, () => {}, this.userInfo.token)
        this.modifyCar(defaultObj, () => {}, this.userInfo.token)
        this.updateCarDefault({
          defaultId: index,
          modifyId: res.index
        })
      }
    },
    getCarId (id) {
      this.carId = id
    },
    // 返回个人中心
    _goBack () {
      this.$router.push('/mind')
    },
    // 车辆管理
    _goManagement () {
      if (this.myCar.length < 1) {
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
      if (this.myCar.length < 1) {
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
      if (this.myCar.length < 1) {
        this.$Toast({
          message: '请先添加车辆！',
          position: 'bottom'
        })
        return
      }
      this.$router.push('/detection-record?carid=' + this.carId)
    },
    ...mapActions([
      'updateCarList',
      'updateCarWay',
      'updateCarDefault'
    ])
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
    .action-bar
      position: relative
      height: 88px
      .font
        position: absolute
        left: 0
        top: 0
        right: 0
        bottom: 0
        margin: auto
        width: 180px
        height: 88px
        line-height: 88px
        text-align: center
        font-size: 36px
        color: #ffffff
        font-weight: bold
        transform: skewX(-10deg)
      .go-back
        display: inline-block
        float: left
        width: 120px
        height: 88px
        bg-image('../../common/imgs/car/back')
        background-repeat: no-repeat
        background-position: 30px center
        background-size: 18px 30px
      .vehicle-management
        display: inline-block
        float: right
        width: 120px
        height: 88px
        padding-right: 30px
        font-size: 26px
        color: #fff
        line-height: 88px
        text-align: right
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
