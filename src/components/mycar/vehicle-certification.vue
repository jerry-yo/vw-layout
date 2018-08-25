<template>
  <div class="vehicle-certification" flexContainer>
    <div class="example">
      <div class="img">
      </div>
      <p>行驶证信息仅用于认证，我们将为您严格保密</p>
    </div>
    <div class="car-info">
      <div class="info-2">
        <span>VIN号</span>
        <div class="input">
          <input type="text" v-model="vin" placeholder="请输入VIN码" maxlength="17">
        </div>
      </div>
    </div>
    <div class="submit-btn">
      <div class="btn" @click="this.getCarInfoByVin">
        <span>开始认证</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
export default {
  name: 'vehicleCertification',
  props: {
    vinType: {
      type: Number
    }
  },
  data () {
    return {
      vin: '',
      carinfo: {},
      promise: null
    }
  },
  methods: {
    getCarInfoByVin () {
      let _self = this
      this.promise = new Promise((resolve, reject) => {
        this.api_post('/api/carzone/vincode', (res) => {
          if (res.errorCode === 0) {
            if (res.data.data.result === '0000') {
              _self.carinfo = res.data.data.detail
              resolve()
            } else {
              return reject
            }
          }
        }, {
          vinCode: this.vin
        })
      })
      if (this.vinType === -1) {
        this.addMyCar()
      } else {
        this.modifyCarInfo()
      }
    },
    addMyCar () {
      let _self = this
      this.promise.then(() => {
        let img = ''
        _self.carBrand.forEach((item) => {
          if (item.pbid === _self.carinfo.pbid) {
            img = item.imageSrc
          }
        })
        this.setAddCar({
          exhaustVolume: _self.carinfo.exhaustVolume,
          imageSrc: img,
          month: _self.carinfo.onMarketMonth,
          name: _self.carinfo.brandName,
          pbid: _self.carinfo.pbid,
          salesVersion: _self.carinfo.salesVersion,
          series: {
            sbName: _self.carinfo.manufacturerName,
            vehicleSystem: [_self.carinfo.sid, _self.carinfo.vehicleSystem, _self.carinfo.status]
          },
          year: _self.carinfo.onMarketYear
        })
        this.$router.push('/addcar-idcard')
      })
    },
    modifyCarInfo () {
      let _self = this
      this.promise.then(() => {
        let img = ''
        _self.carBrand.forEach((item) => {
          if (item.pbid === _self.carinfo.pbid) {
            img = item.imageSrc
          }
        })
        this.modifyMyCar({
          id: this.vinType,
          carinfo: {
            exhaustVolume: _self.carinfo.exhaustVolume,
            imageSrc: img,
            month: _self.carinfo.onMarketMonth,
            name: _self.carinfo.brandName,
            pbid: _self.carinfo.pbid,
            salesVersion: _self.carinfo.salesVersion,
            series: {
              sbName: _self.carinfo.manufacturerName,
              vehicleSystem: [_self.carinfo.sid, _self.carinfo.vehicleSystem, _self.carinfo.status]
            },
            year: _self.carinfo.onMarketYear
          }
        })
        this.$router.back()
      })
    },
    ...mapMutations({
      setAddCar: 'SET_ADDCAR'
    })
  },
  computed: {
    ...mapGetters([
      'carBrand'
    ])
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .vehicle-certification
    margin-top: 10px
    flex: 1
    flex-direction: column
    .example
      padding-top: 16px
      background-color: #fff
      height: 485px
      margin-bottom: 20px
      .img
        width: 556px
        height: 384px
        border: 1px solid #ff673b
        margin: 0 auto
        padding: 7px
        margin-bottom: 32px
        bg-image('../../common/imgs/car/vim_bg')
        background-position: center center
        background-repeat: no-repeat
        background-size: 543px 372px
        img
          display: block
          width: 100%
          height: 100%
      p
        text-align: center
        font-size: 20px
        color: #9c9c9c
        line-height: 20px
    .car-info
      height: 80px
      background-color: #fff
      margin-bottom: 43px
      .info-2
        height: 80px
        line-height: 80px
        display: flex
        padding: 0 30px
        font-size: 26px
        color: #5b5b5b
        .input
          flex: 1
          input
            height: 80px
            float: right
            text-align: right
            font-size: 26px
            color: #5b5b5b
            border: none
            background: none
            outline: none
            &::-webkit-input-placeholder
              color: #bebebe
              text-align: right
    .submit-btn
      height: 88px
      display: flex
      padding: 0 30px
      .btn
        flex: 1
        bg-image('../../common/imgs/washcar/btn_bg')
        background-position: center center
        background-repeat: no-repeat
        background-size: 690px 88px
        text-align: center
        line-height: 88px
        span
          display: inline-block
          font-size: 26px
          color: #ffffff
          font-weight: bold
          transform: skewX(-10deg)
</style>
