<template>
  <div class="setmeal-list" flexContainer >
    <headerBar :contentTitle="setmealInfo.title" contentColor="#5b5b5b" @leftClick="_goBack"></headerBar>
    <Scroll class="list" :data="setmealInfo" ref="scroll">
      <div class="con">
        <div class="cover-img">
          <SwiperSider v-if="recommends.length > 0" :recommends="recommends" :duration="'500'"></SwiperSider>
        </div>
        <div class="cover-info">
          <div class="price">
            <span class="new-money">￥</span>
            <span class="new">{{setmealInfo.preferentialPrice}}</span>
            <span class="old">{{setmealInfo.originalPrice}}</span>
          </div>
          <div class="setmeal-title">{{setmealInfo.introduce}}</div>
          <div class="setmeal-box"></div>
          <div class="setmeal-store">
            <div class="setmeal-select">
              <div class="setmeal-select-left">门店选择</div>
              <div class="setmeal-select-right" @click="selectMealStore">{{selectStoreName}}</div>
            </div>
          </div>
          <div class="setmeal-box"></div>
          <div class="setmeal-car">
            <div class="setmeal-select">
              <div class="setmeal-select-left">车辆选择</div>
              <div class="setmeal-select-right" @click="selectMealCar">{{selectCarInfo}}</div>
            </div>
          </div>
        </div>
        <Iframe v-if="setmealInfo.detailUrl" :url="setmealInfo.detailUrl" @setHeight="setHeight"></Iframe>
      </div>
    </Scroll>
    <div class="footer">
      <a class="footer-kf" href="tel: 0519-68191385">
        <span>客服</span>
      </a>
      <div class="footer-box"></div>
      <div class="footer-txt">
        <span>预约不需要任何费用</span>
        <span>如有疑问请拨打客服热线</span>
      </div>
      <div :class="userInfo ? 'footer-yuyue' : 'footer-yuyue gray'" @click="goYuyueServer">预约</div>
    </div>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import Iframe from '@/base/iframe'
import headerBar from '@/base/headerBar'
import SwiperSider from '@/base/slider/slider-common'
import {mapGetters, mapMutations, mapActions} from 'vuex'
export default {
  name: 'setmealList',
  data () {
    return {
      setmealInfo: {},
      recommends: [],
      id: null
    }
  },
  mounted () {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.getSetmealInfo()
    }
  },
  computed: {
    selectCarInfo () {
      if (this.userInfo) {
        if (this.myCar.length > 0) {
          let carinfo
          let id = this.selectCar > 0 ? this.selectCar : this.defaultCar
          for (let item of this.myCar) {
            if (item.userCarId === id) {
              carinfo = item
              break
            }
          }
          return `${carinfo.brandName}${carinfo.evehicleSystem} ${carinfo.exhaustVolume} ${carinfo.carNumber}`
        }
        return '请选择车辆'
      }
      return '请选择车辆'
    },
    selectStoreName () {
      if (this.userInfo) {
        if (this.mealStoreList.length > 0) {
          let id = this.defaultStoreId
          return this.mealStoreList[id].name
        }
        return '请选择门店'
      }
      return '请选择门店'
    },
    ...mapGetters([
      'storeList',
      'userInfo',
      'selectCar',
      'defaultCar',
      'myCar',
      'defaultStoreId',
      'mealStoreList'
    ])
  },
  methods: {
    _goBack () {
      this.$router.back()
      this.clearMealInfo()
    },
    getSetmealInfo () {
      this.$post(`${this.gt1Url}/api/f6-app/getSetmealInfo`, this.gt1Header, (res) => {
        if (res.errorCode === 0 && res.data.code === 0) {
          this.setmealInfo = res.data.data
          this.recommends = res.data.data.imgs.split(',')
        }
      }, {
        id: this.id
      })
    },
    setHeight (height) {
      this.$refs.scroll.refresh()
    },
    selectMealStore () {
      if (!this.userInfo) {
        this.showToast('请先登录')
        return
      }
      if (this.setmealInfo.storeIds === '0') {
        this.setMealStoreList(this.storeList)
      } else {
        let storeArr = this.setmealInfo.storeIds.split(',')
        let map = new Map()
        let mealList = []
        this.storeList.forEach(item => {
          map.set(item.stationId, item)
        })
        for (let i of storeArr) {
          if (map.get(parseInt(i))) {
            mealList.push(map.get(parseInt(i)))
          }
        }
        this.setMealStoreList(mealList)
      }
      this.$router.push('/store-list?route=meal')
    },
    selectMealCar () {
      if (!this.userInfo) {
        this.showToast('请先登录')
        return
      }
      this.$router.push('/garage?type=select')
    },
    showMadal (message, fn) {
      this.$Modal.confirm({
        title: '提示信息',
        content: message,
        onCancel: () => {
          this.$Modal.remove()
        },
        onOk: () => {
          fn()
          this.$Modal.remove()
        }
      })
    },
    showToast (message) {
      this.$Toast({
        message: message,
        position: 'bottom'
      })
    },
    goYuyueServer () {
      if (!this.userInfo) {
        this.showMadal('此服务需登录，是否登录？', () => {
          this.$router.push('/login')
        })
        return
      }
      if (this.mealStoreList.length === 0) {
        this.showToast('请选择门店')
        return
      }
      if (this.myCar.length === 0) {
        this.showToast('请先添加车辆')
        return
      }
      let imgs = this.setmealInfo.imgs.length > 0 ? this.setmealInfo.imgs + ',' : ''
      let imgArr = imgs.split(',')
      if (imgs.length > 0) {
        imgArr.pop()
      }
      this.setUpdateOrder({
        updateTitle: this.setmealInfo.title.replace('-', '-----') + '-----',
        updateDesc: this.setmealInfo.introduce,
        updateImgs: imgs,
        updateImgArr: imgArr,
        updateMealPrice: this.setmealInfo.preferentialPrice,
        mealStoreIds: this.setmealInfo.storeIds
      })
      this.$router.push('/confirm-order')
    },
    ...mapMutations({
      setMealStoreList: 'SET_MEALSTORELIST',
      setUpdateOrder: 'SET_UPDATE_ORDER'
    }),
    ...mapActions([
      'clearMealInfo'
    ])
  },
  components: {
    Scroll,
    SwiperSider,
    Iframe,
    headerBar
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.setmeal-list
  background-color: #f4f4f4
  flex-direction: column
  height: 100vh
  .list
    flex: 1
    overflow: hidden
    .con
      position: relative
      .cover-img
        height: 380px
        img
          display: inline-block
          width: 100%
          height: 100%
      .cover-info
        height: auto
        padding: 0 30px
        display: flex
        align-items: center
        flex-direction: column
        background-color: #fff
        .price
          height: 68px
          width: 100%
          padding-top: 20px
          display: flex
          align-items: flex-end
          justify-content: flex-start
          padding: 0 35px
          .old
            height: 38px
            width: auto
            line-height: 38px
            font-size: 16px
            color: #616161
            font-weight: bold
            text-decoration: line-through
            margin-left: 30px
          .new-money
            height: 38px
            width: auto
            line-height: 38px
            font-size: 16px
            color: #ff6868
            font-weight: bold
            text-align: right
          .new
            height: 48px
            width: auto
            line-height: 48px
            font-size: 28px
            color: #ff6868
            font-weight: bold
        .setmeal-title
          width: 100%
          padding: 0 35px
          font-size: 26px
          color: #626262
          font-weight: bold
          max-height: 64px
          line-height: 32px
          no-wrap-many(2)
          margin-bottom: 20px
        .setmeal-box
          width: 610px
          height: 1px
          background-color: #f6f6f6
          transform: scale(1, 0.5)
        .setmeal-store, .setmeal-car
          width: 100%
          height: 65px
          bg-image('../../common/imgs/mind/leftright')
          background-repeat: no-repeat
          background-position: right center
          background-size: 15px 24px
          .setmeal-select
            width: 610px
            height: 100%
            display: flex
            margin: 0 auto
            .setmeal-select-left
              width: 100px
              font-size: 20px
              color: #aeaeae
              line-height: 65px
            .setmeal-select-right
              flex: 1
              font-size: 24px
              color: #626262
              text-align: right
              line-height: 65px
        .setmeal-car
          margin-bottom: 20px
  .footer
    height: 100px
    display: flex
    justify-content: center
    align-items: center
    background-color: #fff
    -webkit-box-shadow:0 0 10px rgba(0, 0, 0, .1)
    -moz-box-shadow:0 0 10px rgba(0, 0, 0, .1)
    box-shadow:0 0 10px rgba(0, 0, 0, .1)
    .footer-kf
      width: 130px
      height: 100%
      bg-image('../../common/imgs/mind/kf')
      background-repeat: no-repeat
      background-position: center 26px
      background-size: 25px 25px
      padding-top: 60px
      font-size: 20px
      color: #626262
      text-align: center
    .footer-box
      width: 1px
      height: 60px
      transform: scale(0.5, 1)
      background-color: #e3e3e3
    .footer-txt
      flex: 1
      display: flex
      flex-direction: column
      justify-content: center
      align-items: flex-start
      font-size: 20px
      color: #d1d1d1
      padding-left: 30px
    .footer-yuyue
      width: 290px
      display: flex
      justify-content: center
      align-items: center
      height: 100%
      background-image: -webkit-linear-gradient(left, #ff7653, #ff5752)
      font-size: 36px
      color: #ffffff
      touch-action: none
      &.gray
        -webkit-filter:grayscale(1)
</style>
