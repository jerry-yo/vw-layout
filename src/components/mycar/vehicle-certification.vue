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
          <input type="text" v-model="vin" placeholder="请输入VIN码" maxlength="17" @change="validateVin" @blur="blurAdjust">
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
import {modifyCarInfo, inputOnblur} from '@/common/js/mixin'
export default {
  name: 'vehicleCertification',
  mixins: [modifyCarInfo, inputOnblur],
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
    validateVin () {
      this.vin = this.vin.toUpperCase()
    },
    getCarInfoByVin () {
      if (this.vin.length === 17) {
        this.$get(`${this.f6Url}/api/clientUserCar/getModelByVin`, {
          'Authorization': this.userInfo.token,
          'Content-Type': 'application/json'
        }, (res) => {
          if (res.code === 200 && res.data.result === '0000') {
            let info = res.data.detail
            let imgURL = this.getCarLogo(info.brandName)
            if (this.vinType === -1) {
              this.addMyCar(info, imgURL)
            } else {
              let id = this.vinType
              let config = {
                carBrandLogo: `${info.exhaustVolume}\uA856${info.manufacturerName}\uA856${info.year}\uA856${this.myCar[id].time}\uA856${info.eVehicleSystem}\uA856${info.transmissionDesc}\uA856${info.brandName}\uA856${imgURL}`,
                carId: info.mid,
                carNumber: this.myCar[id].carNumber,
                carVin: this.vin,
                clientAppId: this.myCar[id].clientAppId,
                clientUserId: this.myCar[id].clientUserId,
                defaultFlag: this.myCar[id].defaultFlag,
                distance: this.myCar[id].distance,
                externalUserId: this.myCar[id].externalUserId,
                userCarId: this.myCar[id].userCarId,
                userId: this.myCar[id].userId
              }
              this.modifyCar(config, () => {
                this.$router.back()
              })
            }
          } else if (res.code === 200 && res.data.result === '1004') {
            this.$Toast({
              position: 'bottom',
              message: res.data.note
            })
          }
        }, {
          vin: this.vin,
          clientAppId: this.userInfo.appId,
          clientUserId: this.userInfo.fUserId
        })
      } else {
        this.$Toast({
          position: 'bottom',
          message: 'VIN码不是17位'
        })
      }
    },
    getCarLogo (name) {
      let img = ''
      this.carBrand.forEach(item => {
        if (item.brandName === name) {
          img = item.imageSrc
        }
      })
      return img
    },
    addMyCar (info, url) {
      this.setAddCar({
        brandName: info.brandName,
        evehicleSystem: info.eVehicleSystem,
        exhaustVolume: info.exhaustVolume,
        imageSrc: url,
        manufacturerName: info.manufacturerName,
        mid: info.mid,
        pbid: info.pbid,
        sbid: info.sbid,
        sid: info.sid,
        transmissionDesc: info.transmissionDesc,
        year: info.year
      })
      this.$router.push('/addcar-idcard?type=vin')
    },
    ...mapMutations({
      setAddCar: 'SET_ADDCAR'
    })
  },
  computed: {
    ...mapGetters([
      'carBrand',
      'userInfo'
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
