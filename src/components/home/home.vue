<template>
  <div class="home" @touch.prevent>
    <div class="home-top">
      <div class="sele-city" @click="_goSeleCity">
        {{cityShow.length >= 4 ? cityShow.slice(0, 3) + '···' : cityShow}}
        <span></span>
      </div>
      <span>GT1养车</span>
    </div>
    <Scroll class="container_1" ref="home">
      <div class="con">
        <div class="slider" v-if="handleRecommends.length > 0">
          <Swiper :autoplay="5000" :duration="500" :slidetype="'left'" :recommends="handleRecommends" :color="'#fff'" :pagination="true">
          </Swiper>
        </div>
        <div class="car-info">
          <div class="car-con">
            <div class="info-tab" :class="getDefaultCarInfo.carId ? '' : 'nocar'" @click="_addCar">
              <div class="car-img" v-if="getDefaultCarInfo.carId ? true : false">
                <img v-lazy="carLogoUrl + getDefaultCarInfo.imageSrc" alt="">
              </div>
              <div class="car-name"  v-if="getDefaultCarInfo.carId ? true : false">
                <div class="name">{{`${getDefaultCarInfo.manufacturerName} - ${getDefaultCarInfo.evehicleSystem}`}}</div>
                <div class="card-info">
                  <div class="card">{{getDefaultCarInfo.carNumber}}</div>
                  <div class="way">{{getDefaultCarInfo.distance}}km</div>
                </div>
              </div>
            </div>
            <div class="car-check" @click="_goCheckInfo">
              <Badge :count="checkCount">
                <img src="../../common/imgs/home/jcd@2x.png" alt="" >
              </Badge>
              <p>查看检测单</p>
            </div>
          </div>
        </div>
        <div class="gt1-menu">
          <ul>
            <li @click="_goCarWash">
              <div class="img">
                <div class="action"></div>
              </div>
              <h2>洗车</h2>
              <h3>5元洗车活动</h3>
            </li>
            <li @click="_goMaintain">
              <div class="img">
                <!-- <div class="action"></div> -->
              </div>
              <h2>保养</h2>
              <h3>低价好配件</h3>
            </li>
            <li @click="_goRepair">
              <div class="img">
                <!-- <div class="action"></div> -->
              </div>
              <h2>维修</h2>
              <h3>一线专业技工</h3>
            </li>
            <li>
              <a :href="`tel:${storeList[0] ? storeList[0].responserTel : ''}`">
                <div class="img">
                  <!-- <div class="action"></div> -->
                </div>
                <h2>救援</h2>
                <h3>闪电速达</h3>
              </a>
            </li>
          </ul>
        </div>
        <div class="gt1-server">
          <ul>
            <li><h2>补胎换胎</h2></li>
            <li><h2>钣金喷漆</h2></li>
            <li><h2>违章查询</h2></li>
            <li><h2>年检代办</h2></li>
            <li><h2>买车险</h2></li>
          </ul>
          <div class="beizhu">灰色服务APP暂未开放，请到店服务</div>
        </div>
        <div class="gt1-taocan" v-if="setmeals.length > 0">
          <div class="taocan-header">
            <div class="taocan-header-h1">
              <span>精选套餐</span>
            </div>
            <div class="taocan-header-right" @click="goSetMealList">
              全部套餐
            </div>
          </div>
          <div class="taocan-img">
            <div class="img1" @click="goSetMealInfo(0)"><img :src="gt1UpdateImgUrl + setmeals[0].extendImg" alt=""> </div>
            <!-- <div class="img2" @click="goSetMealInfo(1)"><img :src="gt1UpdateImgUrl + setmeals[1].extendImg" alt=""> </div> -->
          </div>
          <div class="taocan-last" @click="goSetMealInfo(2)">
            <!-- <img :src="gt1UpdateImgUrl + setmeals[2].extendImg" alt=""> -->
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import Badge from '@/base/badge'
import Swiper from '@/base/swiper/swiper-slider-animate'
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {expireToken, defaultCarInfo} from '@/common/js/mixin'
import {checksObjMixin} from '@/common/js/checkmixin'
import {handleMyCar} from '@/common/js/config'
import AMap from 'AMap'
export default {
  name: 'home',
  mixins: [expireToken, defaultCarInfo, checksObjMixin],
  components: {
    Badge,
    Swiper,
    Scroll
  },
  data () {
    return {
      recommends: [],
      setmeals: [],
      typeName: 'home',
      cityShow: '定位中'
    }
  },
  mounted () {
    if (this.userInfo) {
      this._getMyCar()
    }
    if (!this.cityInfo.citycode) {
      this._setMap()
    } else {
      this.cityShow = this.cityInfo.selecity ? this.cityInfo.selecity : this.cityInfo.city
    }
    this._getStoreList()
    this._getBanner()
  },
  computed: {
    checkCount () {
      let id = 0
      if (this.checkDetectionInfo.carCheckDetailVoList) {
        this.checkDetectionInfo.carCheckDetailVoList.forEach(item => {
          if (item.optionValue === 3) {
            id++
          }
        })
      }
      return id
    },
    handleRecommends () {
      let arr = []
      this.recommends.forEach((item) => {
        arr.push({
          id: item.sortOrder,
          linkUrl: item.redirectContent,
          picUrl: this.gt1UpdateImgUrl + item.img
        })
      })
      return arr
    },
    carNumber () {
      return this.getDefaultCarInfo.carNumber
    },
    getPhone () {
      if (this.storeList.length > 1) {
        return this.storeList[this.defaultStoreId].phone
      }
    },
    ...mapGetters([
      'cityInfo',
      'defaultStoreId',
      'storeList',
      'userInfo',
      'checksObj'
    ])
  },
  methods: {
    _addCar () {
      if (this.carIndex !== -1) {
        this.$router.push('/garage?type=add')
      } else {
        this.$router.push('/addcar-tabbar?type=add')
      }
    },
    // 选择城市
    _goSeleCity () {
      this.$router.push('/sele-city')
    },
    // 洗车
    _goCarWash () {
      this.$router.push('/washcar?type=show')
    },
    // 维修
    _goRepair () {
      if (this.storeList.length > 0) {
        this.$router.push('/repair')
      } else {
        this._getStoreList()
      }
    },
    // 保养
    _goMaintain () {
      if (this.storeList.length > 0) {
        this.$router.push('/maintain')
      } else {
        this._getStoreList()
      }
    },
    // 检测单
    _goCheckInfo () {
      if (this.userInfo) {
        if (this.myCar.length > 0) {
          if (this.nowCarCheck.ccd.length > 0 || this.nowCarCheck.yjd.length > 0) {
            let idOwnOrg = this.nowCarCheck.ccd.length > 0 ? this.nowCarCheck.ccd[0].idOwnOrg : this.nowCarCheck.yjd[0].idOwnOrg
            let ccdPkid = this.nowCarCheck.ccd.length > 0 ? this.nowCarCheck.ccd[0].pkId : ''
            let yjdPkid = this.nowCarCheck.yjd.length > 0 ? this.nowCarCheck.yjd[0].pkId : ''
            this.$router.push('/check-list?idownorg=' + idOwnOrg + '&ccd=' + ccdPkid + '&yjd=' + yjdPkid + '&carnumber=' + this.getDefaultCarInfo.carNumber)
          } else {
            this.$Toast({
              message: '暂时没有车辆检测单',
              position: 'bottom'
            })
          }
        } else {
          this.$Modal.confirm({
            title: '提示信息',
            content: '该服务需要先添加车辆，是否立即添加车辆？',
            onCancel: () => {
              this.$Modal.remove()
            },
            onOk: () => {
              this.$router.push({path: '/addcar-tabbar?type=add'})
              this.$Modal.remove()
            }
          })
        }
      } else {
        this.$Modal.confirm({
          title: '提示信息',
          content: '此服务需登录，是否登录？',
          onCancel: () => {
            this.$Modal.remove()
          },
          onOk: () => {
            this.$router.push({path: '/login'})
            this.$Modal.remove()
          }
        })
      }
    },
    // 获取我的车库列表
    _getMyCar () {
      this.$get(`${this.f6Url}/api/clientUserCar`, {
        'Authorization': this.userInfo.token,
        'Content-Type': 'application/json'
      }, (res) => {
        if (res.code === 401) {
          this.refreshToken(this._getMyCar)
        } else if (res.code === 200) {
          this._setMyCar(res.data)
        }
      }, {
        clientAppId: this.userInfo.appId,
        clientUserId: this.userInfo.fUserId
      })
    },
    // 处理车库列表
    _setMyCar (data) {
      let list = handleMyCar(data)
      this.updateCarList(list)
    },
    _getStoreList () {
      this.$post(`${this.gt1Url}/api/f6-app/getStoreList`, this.gt1Header, (res) => {
        if (res.errorCode === 0 && res.data.code === 0) {
          this.setStoreList(this._setStoreList(res.data.data))
        }
      })
    },
    _getBanner () {
      this.$post(`${this.gt1Url}/api/f6-app/getFocusandSetmealList`, this.gt1Header, (res) => {
        if (res.errorCode === 0 && res.data.code === 0) {
          this.recommends = res.data.data.focus ? res.data.data.focus : []
          this.setmeals = res.data.data.setmeals ? res.data.data.setmeals : []
        }
      }, {
        location: 1,
        isLogon: 2
      })
    },
    // 处理门店信息
    _setStoreList (data) {
      let arr = []
      let reg = /维修/
      let lnglat1 = null
      if (this.cityInfo.lng) {
        lnglat1 = new AMap.LngLat(this.cityInfo.lng, this.cityInfo.lat)
      }
      data.forEach((item, index) => {
        let way = null
        if (this.cityInfo.lng) {
          way = lnglat1.distance([item.stationPositionX, item.stationPositionY])
        } else {
          way = 0
        }
        if (item.stationId !== 2692 && item.stationId !== 2777) {
          let flag = reg.test(item.stationName)
          item = Object.assign(item, {
            icon: `./static/active_${flag ? 'wx' : 'by'}_store@2x.png`,
            way: way,
            type: flag ? 1 : 2,
            name: item.stationName.split('奇特异车业科技（江苏）股份有限公司')[1]
          })
          arr.push(item)
        }
      })
      return arr
    },
    _setMap () {
      let geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0,
        convert: true,
        showButton: false,
        showMarker: false,
        showCircle: false,
        panToLocation: false,
        zoomToAccuracy: false
      })
      geolocation.getCurrentPosition((status, result) => {
        if (status === 'complete' && result.info === 'SUCCESS') {
          if (result.addressComponent && result.addressComponent.city) {
            let city = {
              city: result.addressComponent.city,
              address: result.formattedAddress,
              citycode: result.addressComponent.citycode,
              district: result.addressComponent.district,
              province: result.addressComponent.province,
              street: result.addressComponent.street,
              township: result.addressComponent.township,
              lng: result.position.lng,
              lat: result.position.lat
            }
            this.cityShow = city.city
            this.setCityInfo(city)
          }
        } else {
          this.$Toast({
            message: '定位失败，请手动选择城市',
            position: 'bottom'
          })
        }
      })
    },
    goSetMealList () {
      this.$router.push('/setmeal-list')
    },
    goSetMealInfo (id) {
      if (this.setmeals[id].id) {
        this.$router.push('/setmeal-info?id=' + this.setmeals[id].id)
      }
    },
    ...mapMutations({
      setCityInfo: 'SET_CITYINFO',
      setStoreList: 'SET_STORELIST'
    }),
    ...mapActions([
      'updateCarList'
    ])
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .home
    flex: 1
    display: flex
    flex-direction: column
    bg-image('../../common/imgs/home/homebg')
    background-size: 750px 600px
    background-repeat: no-repeat
    background-position:center top
    background-color: #f2f2f2
    overflow: hidden
    .home-top
      position: relative
      height: 88px
      .sele-city
        margin-top: 16px
        display: inline-block
        position: relative
        margin-left: 30px
        background-color: rgba(255, 255, 255, 0.85)
        border-radius: 5px
        font-size: 22px
        color: #fd9068
        padding: 16px 46px 16px 20px
        span
          position: absolute
          right: 0
          top: 0
          display: inline-block
          width: 32px
          height: 54px
          bg-image('../../common/imgs/home/sj-bottom')
          background-size: 12px 6px
          background-repeat: no-repeat
          background-position: left center
      & > span
        position: absolute
        left: 0
        right: 0
        top: 0
        bottom: 0
        margin: auto
        display: inline-block
        width: 180px
        line-height: 88px
        color: #fff
        font-size: 40px
        font-weight: 600
        transform: skewX(-15deg)
      .message
        float: right
        width: 80px
        height: 88px
        margin-right: 30px
        bg-image('../../common/imgs/mind/xx')
        background-size: 42px 42px
        background-repeat: no-repeat
        background-position: right center
    .container_1
      flex: 1
      overflow: hidden
      .con
        position: relative
        overflow: hidden
      .slider
        height: 300px
      .car-info
        height: 187px
        .car-con
          width: 706px
          height: 187px
          padding: 4px 14px 12px 7px
          margin: 0 auto
          display: flex
          bg-image('../../common/imgs/home/carbg')
          background-size: 706px 187px
          background-repeat: no-repeat
          background-position: center center
          overflow: hidden
          .info-tab
            flex: 1
            display: flex
            align-items: center
            &.nocar
              bg-image('../../common/imgs/home/nocar')
              background-size: 374px 60px
              background-repeat: no-repeat
              background-position: center center
            .car-img
              width: 127px
              height: 140px
              display: flex
              align-items: center
              justify-content: center
              img
                width: 50px
                height: 50px
            .car-name
              flex: 1
              height: 140px
              display: flex
              flex-direction: column
              align-items: flex-start
              justify-content: center
              border-right: 1px solid #e7e7e7
              .name
                height: 40px
                line-height: 40px
                font-size: 30px
                color: #5b5b5b
                font-weight: bolder
                transform: skewX(-10deg)
              .card-info
                padding-top: 7px
                height: 32px
                display: flex
                font-size: 24px
                color: #5b5b5b
                line-height: 34px
                .card
                  width: 140px
                  border-right: 1px solid #5b5b5b
                .way
                  flex: 1
                  padding-left: 28px
          .car-check
            display: flex
            flex-direction: column
            align-items: center
            justify-content: center
            background-color: #fff
            position: relative
            width: 160px
            padding-top: 28px
            img
              display: block
              width: 67px
              height: 65px
            p
              line-height: 56px
              color: #636363
              font-size: 24px
              text-align: center
      .gt1-menu
        min-height: 240px
        padding: 0px 30px
        background-color: #fff
        ul
          min-height: 240px
          border-bottom: 1px solid #f2f2f2
          overflow: hidden
          li
            height: 232px
            width: 25%
            float: left
            display: flex
            flex-direction: column
            justify-content: center
            align-items: center

            &:nth-child(1)
              .img
                bg-image('../../common/imgs/home/xc')
            &:nth-child(2)
              .img
                bg-image('../../common/imgs/home/by')
            &:nth-child(3)
              .img
                bg-image('../../common/imgs/home/wx')
            &:nth-child(4)
              .img
                bg-image('../../common/imgs/home/jykb')
            .img
              position: relative
              width: 90px
              height: 90px
              background-size: 90px 90px
              background-repeat: no-repeat
              background-position: center center
              .action
                position: absolute
                right: -30px
                top: -23px
                width: 63px
                height: 46px
                bg-image('../../common/imgs/home/action')
                background-size: 63px 46px
                background-repeat: no-repeat
                background-position: center center
            h2
              padding-top: 16px
              text-align: center
              font-size: 24px
              color: #636363
            h3
              padding-top: 11px
              text-align: center
              font-size: 20px
              color: #acacac
      .gt1-server
        overflow: hidden
        padding: 0 30px
        background-color: #fff
        margin-bottom: 10px
        & > ul
          min-height: 140px
          overflow: hidden
          li
            width: 20%
            height: 140px
            float: left
            background-size: 35px 38px
            background-repeat: no-repeat
            background-position: center 35px
            &:nth-child(1)
              bg-image('../../common/imgs/home/unlt')
            &:nth-child(2)
              bg-image('../../common/imgs/home/unfjpq')
            &:nth-child(3)
              bg-image('../../common/imgs/home/wz')
            &:nth-child(4)
              bg-image('../../common/imgs/home/nj')
            &:nth-child(5)
              bg-image('../../common/imgs/home/cx')
            &:nth-child(6)
              bg-image('../../common/imgs/home/cx')
            & > h2
              padding-top: 85px
              font-size: 20px
              color: #651212
              text-align: center
      .beizhu
        height: 40px
        font-size: 20px
        color: #b9b9b9
        text-align: center
        line-height: 20px
      .gt1-taocan
        overflow: hidden
        padding-bottom: 100px
        .taocan-header
          height: 90px
          display: flex
          padding: 0 30px
          background-color: #fff
          margin-bottom: 1px
          .taocan-header-h1
            flex: 1
            bg-image('../../common/imgs/home/setmeal')
            background-size: 24px 26px
            background-repeat: no-repeat
            background-position: left center
            font-size: 26px
            padding-left: 36px
            color: #767676
            line-height: 90px
            span
              display: inline-block
              transform: skewX(-15deg)
          .taocan-header-right
            width: 300px
            bg-image('../../common/imgs/repair/go')
            background-size: 18px 30px
            background-repeat: no-repeat
            background-position: right center
            padding-right: 30px
            text-align: right
            font-size: 24px
            color: #ff905f
            line-height: 90px
        .taocan-img
          display: flex
          height: 200px
          margin-bottom: 1px
          .img1
            flex: 1
            margin-right: 1px
            background-color: #fff
          .img2
            width: 300px
            background-color: #fff
          img
            display: inline-block
            width: 100%
            height: 100%
            object-fit: cover
        .taocan-last
          height: 200px
          background-color: #fff
          img
            display: inline-block
            width: 100%
            height: 100%
            object-fit: cover
</style>
