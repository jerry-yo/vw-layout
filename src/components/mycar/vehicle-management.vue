// 车辆管理

<template>
  <div class="vehicle-management" flexContainer>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="font">我的车库</div>
      <div class="management" @click="_editCar" v-if="myCar.length > 0">{{editState ?'取消' : '编辑'}}</div>
    </div>
    <Scroll class="car-content" v-show="myCar" :data="myCar" :class="myCar.length === 0 ? 'bg' : ''">
      <ul class="con">
        <li v-for="(item, index) in myCar" :key="index" v-if="check.length > 0">
          <div class="li-con" :style="{transform: editState ? 'translateX(28px)' : 'translateX(0px)', transition: 'all .3s'}">
            <div class="check-btn" v-show="editState">
              <div class="check-img" :class="check[index].check ? 'check': 'nocheck'"  @click="_checkCar(index)">
              </div>
            </div>
            <div class="img">
              <img :src="carLogoUrl + item.imageSrc" alt="">
            </div>
            <div class="con">
              <h2>{{item.manufacturerName + ' - ' + item.evehicleSystem}}</h2>
              <p class="p1"><span>{{item.year}}</span>&nbsp;&nbsp;<span>{{item.transmissionDesc}}</span></p>
              <p class="p2"><span>{{item.carNumber}}</span><span v-if="item.distance !== 0">丨</span> <span v-if="item.distance !== 0">{{item.distance}}km</span></p>
            </div>
            <div class="right"  v-if="!editState">
              <div class="btn" :class="item.defaultFlag ? 'active' : 'common'" @click="_setCarDefault(item, index)">
              {{item.defaultFlag ? '已设为默认' : '设为默认'}}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </Scroll>
    <div class="submit-btn" @click="_goAddcarTabbar">
      <span>{{editState ?'删除车辆' : '新增车辆'}}</span>
    </div>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import {mapActions, mapGetters} from 'vuex'
import {expireToken, modifyCarInfo} from '@/common/js/mixin'
export default {
  name: 'vehicleManagement',
  components: {
    Scroll
  },
  mixins: [expireToken, modifyCarInfo],
  data () {
    return {
      editState: false,
      check: []
    }
  },
  mounted () {
    this._getMyCar()
  },
  computed: {
    checkInfos () {
      let obj = {
        length: 0,
        default: false
      }
      this.check.forEach((item, index) => {
        if (item.check) {
          if (index === 0) {
            obj.default = true
          }
          obj.length++
        }
      })
      return obj
    },
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
      'userInfo'
    ])
  },
  methods: {
    _goBack () {
      this.$router.go(-1)
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
          this.checkArr()
        }
      }, {
        clientAppId: this.userInfo.appId,
        clientUserId: this.userInfo.fUserId
      })
    },
    _deleteMyCar (id) {
      this.$delete(`${this.f6Url}/api/clientUserCar`, {
        'Authorization': this.userInfo.token,
        'Content-Type': 'application/json'
      }, (res) => {
        if (res.code === 401) {
          this.refreshToken(this._deleteMyCar)
        } else if (res.code === 200) {
          this.checkInfos.length--
          if (this.checkInfos.length === 0 && this.checkInfos.default === false) {
            this.editState = false
            this._getMyCar()
          }
        }
      }, {
        carBrandLogo: `${this.myCar[id].exhaustVolume}\uA856${this.myCar[id].manufacturerName}\uA856${this.myCar[id].year}\uA856${this.myCar[id].time}\uA856${this.myCar[id].evehicleSystem}\uA856${this.myCar[id].transmissionDesc}\uA856${this.myCar[id].brandName}\uA856${this.myCar[id].imageSrc}`,
        carId: this.myCar[id].carId,
        carNumber: this.myCar[id].carNumber,
        carVin: this.myCar[id].carVin,
        clientAppId: this.myCar[id].clientAppId,
        clientUserId: this.myCar[id].clientUserId,
        defaultFlag: this.myCar[id].defaultFlag,
        distance: this.myCar[id].distance,
        externalUserId: this.myCar[id].externalUserId,
        userCarId: this.myCar[id].userCarId,
        userId: this.myCar[id].userId
      })
    },
    _goAddcarTabbar () {
      if (this.editState) {
        this.check.forEach((item, index) => {
          if (item.check) {
            this._deleteMyCar(index)
          }
          if (this.checkInfos.length === this.check.length) {
            this.checkInfos.default = false
          }
          if (!item.check && this.checkInfos.default) {
            this.checkInfos.default = false
            this.modifyCar({
              carBrandLogo: `${this.myCar[index].exhaustVolume}\uA856${this.myCar[index].manufacturerName}\uA856${this.myCar[index].year}\uA856${this.myCar[index].time}\uA856${this.myCar[index].evehicleSystem}\uA856${this.myCar[index].transmissionDesc}\uA856${this.myCar[index].brandName}\uA856${this.myCar[index].imageSrc}`,
              carId: this.myCar[index].carId,
              carNumber: this.myCar[index].carNumber,
              carVin: this.myCar[index].carVin,
              clientAppId: this.myCar[index].clientAppId,
              clientUserId: this.myCar[index].clientUserId,
              defaultFlag: 1,
              distance: this.myCar[index].distance,
              externalUserId: this.myCar[index].externalUserId,
              userCarId: this.myCar[index].userCarId,
              userId: this.myCar[index].userId
            }, this._callbackModify)
          }
        })
      } else {
        this.$router.push('/addcar-tabbar?type=add')
      }
    },
    // 删除默认后，设置默认成功回调
    _callbackModify () {
      if (this.checkInfos.length === 0 && this.checkInfos.default === false) {
        this.editState = false
        this._getMyCar()
      }
    },
    _editCar () {
      this.editState = !this.editState
      if (this.editState) {
        this.checkArr()
      }
    },
    _setCarDefault (item, id) {
      if (item.defaultFlag !== 1) {
        let index = this.defaultCarId
        let itemObj = {
          carBrandLogo: `${item.exhaustVolume}\uA856${item.manufacturerName}\uA856${item.year}\uA856${item.time}\uA856${item.evehicleSystem}\uA856${item.transmissionDesc}\uA856${item.brandName}\uA856${item.imageSrc}`,
          carId: item.carId,
          carNumber: item.carNumber,
          carVin: item.carVin,
          clientAppId: item.clientAppId,
          clientUserId: item.clientUserId,
          defaultFlag: 1,
          distance: item.distance,
          externalUserId: item.externalUserId,
          userCarId: item.userCarId,
          userId: item.userId
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
        this.modifyCar(itemObj)
        this.modifyCar(defaultObj)
        this.updateCarDefault({
          defaultId: this.myCar[index].userCarId,
          modifyId: item.userCarId
        })
      }
    },
    _checkCar (id) {
      if (this.check[id].check) {
        this.$set(this.check[id], 'check', false)
      } else {
        this.$set(this.check[id], 'check', true)
      }
    },
    checkArr () {
      let arr = []
      for (let i = 0; i < this.myCar.length; i++) {
        arr[i] = {
          check: false
        }
      }
      this.check = arr
    },
    ...mapActions([
      'updateCarList',
      'updateCarDefault'
    ])
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .vehicle-management
    background-color: #f4f4f4
    flex-direction: column
    height: 100vh
    .action-bar
      position: relative
      height: 88px
      background-color: #fff
      margin-bottom: 10px
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
        color: #5b5b5b
        font-weight: bold
        transform: skewX(-10deg)
      .go-back
        display: inline-block
        float: left
        width: 120px
        height: 88px
        bg-image('../../common/imgs/order/back')
        background-repeat: no-repeat
        background-position: 30px center
        background-size: 18px 30px
      .management
        display: inline-block
        float: right
        width: 120px
        height: 88px
        padding-right: 30px
        font-size: 26px
        color: #5b5b5b
        line-height: 88px
        text-align: right
        background-color: #fff
    .submit-btn
      bg-image('../../common/imgs/washcar/btn_bg')
      background-repeat: no-repeat
      background-position: center center
      background-size: 750px 100px
      height: 100px
      line-height: 100px
      text-align: center
      span
        display: inline-block
        font-size: 36px
        font-weight: bold
        color: #ffffff
        transform: skewX(-10deg)
    .car-content
      flex: 1
      overflow: hidden
      &.bg
        bg-image('../../common/imgs/nocar')
        background-position: center center
        background-repeat: no-repeat
        background-size: 750px 381px
      ul
        position: relative
        li
          display: flex
          height: 208px
          background-color: #fff
          margin-bottom: 10px
          padding: 0 30px
          .li-con
            flex: 1
            display: flex
          .check-btn
            width: 57px
            display: flex
            justify-content: center
            align-items: center
            .check-img
              width: 57px
              height: 57px
              &.check
                bg-image('../../common/imgs/repair/sele')
                background-repeat: no-repeat
                background-size: 30px 30px
                background-position: center center
              &.nocheck
                bg-image('../../common/imgs/repair/unsele')
                background-repeat: no-repeat
                background-size: 30px 30px
                background-position: center center
          .img
            display: flex
            justify-content: center
            align-items: center
            width: 172px
            img
              display: block
              width: 50px
              height: 50px
          .con
            flex: 1
            display: flex
            flex-direction: column
            justify-content: center
            h2
              font-size: 30px
              color: #5b5b5b
              font-weight: bold
              line-height: 44px
            p.p1
              width: 350px
              height: 36px
              overflow: hidden
              font-size: 22px
              color: #5b5b5b
              line-height: 36px
              text-overflow:ellipsis
              white-space: nowrap
            p.p2
              font-size: 22px
              color: #9d9d9d
              line-height: 36px
              span:nth-child(2)
                font-size: 22px
                color: #9d9d9d
                margin: 0 15px
          .right
            width: 147px
            display: flex
            align-items: center
            justify-content: flex-end
            .btn
              box-sizing: border-box
              width: 147px
              height: 42px
              font-size: 24px
              text-align: center
              line-height: 42px
              border-radius: 2px
              &.active
                color: #fff
                background: -webkit-linear-gradient(left, #ff964a, #ff673d)
              &.common
                color: #ff7d43
                border: 1px solid #ff673b

</style>
