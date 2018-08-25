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
          <span>{{`${defaultCar.year} - ${defaultCar.transmissionDesc}`}}</span>
        </div>
        <div class="car-others">
          <div class="car-displacement">
            <span>发动机排量</span>
            <span>{{defaultCar.exhaustVolume}}</span>
          </div>
          <div class="car-age">
            <span>生产年份</span>
            <span>{{defaultCar.year}}</span>
          </div>
        </div>
        <div class="car-far">
          <span>行驶里程</span>
          <div class="input">
            <input type="number" name="" :placeholder="defaultCar.distance">
          </div>
          <span>km</span>
        </div>
        <div class="car-time">
          <span>注册时间</span>
          <span>未添加信息</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from '@/base/slider/slider-view'
import {mapActions, mapGetters} from 'vuex'
import {expireToken} from '@/common/js/mixin'
export default {
  name: 'garage',
  components: {
    Slider
  },
  mixins: [expireToken],
  data () {
    return {
      carId: 0
    }
  },
  created () {
    this._getMyCar()
  },
  computed: {
    ...mapGetters([
      'myCar',
      'defaultCar',
      'userInfo'
    ])
  },
  methods: {
    // 获取我的车库
    _getMyCar () {
      this.$get(`${this.f6Url}/api/clientUserCar?userId=${this.userInfo.fUserId}`, this.headers_2, (res) => {
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
    setDefault (car) {
      this.setDefaultCar({
        id: car.index,
        item: car.item
      })
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
      this.$router.push('/vehicle-management')
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
      'updateCarList'
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
