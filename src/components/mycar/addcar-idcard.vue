// 添加车辆

<template>
  <div class="addcar-idcard" flexContainer>
    <seleArea v-if="showAreaBtn" @goback="getBackInfo" :areaindex="areaIndex"></seleArea>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="tabbar">
        添加车辆
      </div>
    </div>
    <div class="container">
      <div class="car-name">
        <img :src="carLogoUrl + addCar.imageSrc" alt="">
        <h2><span>{{`${addCar.brandName} - ${addCar.evehicleSystem} - ${ addCar.exhaustVolume} - ${addCar.year} - ${addCar.transmissionDesc}`}}</span> </h2>
      </div>
      <div class="idcard">
        <span>车牌号</span>
        <div class="idcard-area" @click="goSeleArea">
          {{area[areaIndex]}}
        </div>
        <div class="idcard-num">
          <input type="text" v-model.trim="carid"  maxlength="6" :placeholder="'例：A88888'" @change="validateCarid">
        </div>
      </div>
      <p>请输入真实车牌 以便后续服务</p>
      <h2>其他信息（选填）</h2>
      <div class="car-way">
        <span>行驶里程</span>
        <div class="input">
          <input type="text" v-model="way" :placeholder="0" @change="validateWay">
        </div>
        <span>km</span>
      </div>
      <div class="car-date">
        <span>注册日期</span>
        <div class="btn">
          请填写行驶证上真实注册日期
          <!-- {{}} -->
        </div>
      </div>
    </div>
    <div class="addcar-btn" @click="_addCar">
      <span>确认添加</span>
    </div>
  </div>
</template>

<script>
import seleArea from '@/base/sele-area'
import {mapGetters, mapMutations} from 'vuex'
import {expireToken} from '@/common/js/mixin'
export default {
  name: 'addcarIdcard',
  mixins: [expireToken],
  data () {
    return {
      showAreaBtn: false,
      areaIndex: 0,
      carid: null,
      way: null,
      time: -1
    }
  },
  methods: {
    validateCarid () {
      this.carid = this.carid.toUpperCase()
      let reg = /^[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
      if (!reg.test(this.carid)) {
        this.$Toast({
          position: 'bottom',
          message: '车牌号码格式错误'
        })
        this.carid = ''
      }
    },
    validateWay () {
      if (!isNaN(parseFloat(this.way))) {
        this.way = parseFloat(this.way)
      } else {
        this.$Toast({
          position: 'bottom',
          message: '行驶里程格式错误'
        })
        this.way = null
      }
    },
    goSeleArea () {
      this.showAreaBtn = true
    },
    getBackInfo (res) {
      this.areaIndex = res
      this.showAreaBtn = false
    },
    _goBack () {
      this.$router.go(-1)
    },
    _addCar () {
      if (this.carid === null) {
        this.$Toast({
          message: '请输入车牌号码',
          position: 'bottom'
        })
      } else {
        this._lookMyCar()
        // this.setAddCar({
        //   idCard: this.area[this.areaIndex] + this.carid,
        //   way: this.way,
        //   time: this.year
        // })
        // this.$router.replace('/garage')
      }
    },
    _lookMyCar () {
      this.$get(`${this.f6Url}/api/clientUserCar?userId=${this.userInfo.fUserId}`, this.headers_2, (res) => {
        if (res.code === 401) {
          this.refreshToken(this._getMyCar)
        } else if (res.code === 200) {
          this._setMyCar(res.data.length > 0 ? 0 : 1)
        }
      })
    },
    _setMyCar (hasCar) {
      this.$f6post(`${this.f6Url}/api/clientUserCar`, this.headers_3, (res) => {
        if (res.code === 401) {
          this.refreshToken(this._setMyCar)
        } else if (res.code === 200) {
          this.$router.push('/garage')
        }
      }, {
        carBrandLogo: `${this.addCar.exhaustVolume}\uA856${this.addCar.manufacturerName}\uA856${this.addCar.year}\uA856${this.time}\uA856${this.addCar.evehicleSystem}\uA856${this.addCar.transmissionDesc}\uA856${this.addCar.brandName}\uA856${this.addCar.imageSrc}`,
        carId: this.addCar.mid,
        carNumber: `${this.area[this.areaIndex]}${this.carid}`,
        carVin: '',
        clientAppId: this.userInfo.appId,
        clientUserId: this.userInfo.fUserId,
        defaultFlag: hasCar,
        distance: this.way,
        externalUserId: this.userInfo.externalUserId,
        userId: this.userInfo.fUserId
      })
    },
    ...mapMutations({
      setAddCar: 'SET_ADDCAR'
    })
  },
  computed: {
    ...mapGetters([
      'addCar',
      'area',
      'myCar',
      'userInfo'
    ])
  },
  components: {
    seleArea
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.addcar-idcard
  background-color: #f2f2f2
  flex-direction: column
  height: 100vh
  .action-bar
    display: flex
    height: 88px
    background-color: #fff
    margin-bottom: 10px
    .go-back
      width: 120px
      bg-image('../../common/imgs/order/back')
      background-repeat: no-repeat
      background-position: 30px center
      background-size: 18px 30px
    .tabbar
      flex: 1
      display: flex
      justify-content: center
      align-items: center
      margin-right: 120px
      font-weight: 600
      font-size: 36px
      color: #5b5b5b
      transform: skewX(-15deg)
  .container
    position: relative
    flex: 1
    display: flex
    flex-direction: column
    & > p
      height: 57px
      line-height: 57px
      padding: 0 30px
      font-size: 24px
      color: #b6b6b6
      text-align: right
    & > h2
      height: 59px
      line-height: 59px
      padding: 0 30px
      margin-top: 23px
      font-size: 24px
      color: #3b3b3b
    .car-name
      height: 100px
      display: flex
      align-items: center
      padding-left: 30px
      background-color: #fff
      margin-bottom: 1px
      img
        width: 60px
        height: 60px
        margin-right: 25px
      & > h2
        font-size: 24px
        color: #707070
        span
          margin-right: 10px
    .idcard
      height: 90px
      display: flex
      line-height: 70px
      padding: 10px 30px
      background-color: #fff
      font-size: 24px
      color: #3b3b3b
      .idcard-area
        flex: 1
        padding-right: 47px
        text-align: right
        border-right: 1px solid #f2f2f2
      .idcard-num
        width: 147px
        text-align: right
        input
          width: 100%
          height: 100%
          background-color: none
          outline: none
          border: none
          text-align: right
          font-size: 24px
          color: #999
    .car-way
      height: 90px
      line-height: 90px
      padding: 0 30px
      display: flex
      margin-bottom: 1px
      background-color: #fff
      font-size: 24px
      color: #3b3b3b
      .input
        flex: 1
        input
          background: none
          float: right
          text-align: right
          border: none
          outline: none
          height: 100%
          font-size: 24px
          color: #3b3b3b
          padding-right: 3px
    .car-date
      height: 90px
      line-height: 90px
      padding: 0 30px
      display: flex
      background-color: #ffffff
      span
        font-size: 24px
        color: #3b3b3b
      .btn
        flex: 1
        font-size: 24px
        color: #b6b6b6
        text-align: right
  .addcar-btn
    height: 100px
    bg-image('../../common/imgs/washcar/btn_bg')
    background-repeat: no-repeat
    background-position: center center
    background-size: 750px 100px
    text-align: center
    line-height: 100px
    span
      display: inline-block
      font-size: 36px
      color: #ffffff
      font-weight: bold
      transform: skewX(-10deg)
</style>
