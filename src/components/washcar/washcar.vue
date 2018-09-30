<template>
  <div class="detection-record" flexContainer>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="font"></div>
      <div class="search" @click="_goSearch"></div>
    </div>
    <div class="container" ref="container" :class="showMap ? 'show' : ''">
      <div class="map-btn">
        <div class="map-location" @click="_getLocation"></div>
        <div class="bor"></div>
        <div class="map-kf">
          <a href="tel: 0519-68191385"></a>
        </div>
      </div>
    </div>
    <washInfo v-if="washinfoShow" @closewindow="_closeAll" :storeinfo="storeList[preMarkerId]"></washInfo>
  </div>
</template>

<script>
import AMap from 'AMap'
import washInfo from './washinfo'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      map: null,
      geolocation: null,
      customMarker: null,
      showMap: false,
      markerDom: [],
      preMarkerId: -1,
      infoWindow: null,
      washinfoShow: false,
      washForShow: null,
      markers: [],
      washType: ''
    }
  },
  watch: {
    preMarkerId: function (newQuestion, oldQuestion) {
      this.washForShow = this.markers[newQuestion]
    }
  },
  methods: {
    _goSearch () {
      this.$router.push('/search-list?format=' + 'store')
    },
    _goBack () {
      this.$router.back()
    },
    _setMap () {
      let _self = this
      this.map = new AMap.Map(this.$refs.container, {
        resizeEnable: true,
        jogEnable: false,
        center: [this.cityInfo.lng, this.cityInfo.lat],
        zoom: 13,
        zooms: [12, 19]
      })
      AMap.event.addListener(_self.map, 'click', (e) => {
        _self._closeAll()
      })
      this._onComplete(this.cityInfo)
    },
    _onComplete (data) {
      let _self = this
      if (this.showMap) {
        this.map.panTo([data.lng, data.lat])
      } else {
        this.showMap = true
        this.customMarker = new AMap.Marker({
          map: _self.map,
          position: [data.lng, data.lat],
          offset: new AMap.Pixel(-11, -34),
          icon: new AMap.Icon({
            image: './static/own_marker@2x.png',
            size: new AMap.Size(22, 34)
          })
        })
      }
    },
    // 地图Marker点击响应事件
    _onClick (e) {
      this.washinfoShow = true
      this._reductionMarker()
      // 激活点击
      let id = e.target.getExtData()
      this.markerActive(id)
    },
    // 地图Marker点击后样式设置
    markerActive (id) {
      let _self = this
      this.markerDom[id].setMap(null)
      this.markerDom[id] = new AMap.Marker({
        map: _self.map,
        offset: new AMap.Pixel(-22, -22),
        position: [_self.markers[id].stationPositionX, _self.markers[id].stationPositionY],
        icon: new AMap.Icon({
          image: _self.markers[id].icon,
          size: new AMap.Size(44, 44)
        }),
        extData: id,
        clickable: true
      })
      this.preMarkerId = id
      // 显示信息窗体
      this._setInfoWindow(this.markers[id], id)
    },
    // 还原上一个地图被点击Marker点样式
    _reductionMarker () {
      let preId = this.preMarkerId
      if (preId !== -1) {
        this.markerDom[preId].setMap(null)
        this._setMarker(this.markers[preId], preId)
      }
    },
    // 获取当前定位
    _getLocation () {
      let _self = this
      this.map.plugin('AMap.Geolocation', function () {
        _self.geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 1000,
          maximumAge: 0,
          convert: true,
          showButton: false,
          showMarker: false,
          showCircle: false,
          panToLocation: true,
          zoomToAccuracy: false
        })
        _self.map.addControl(_self.geolocation)
        _self.geolocation.getCurrentPosition((status, result) => {
          if (result.type === 'complete' && result.info === 'SUCCESS') {
            _self._onComplete(result.position)
          }
        })
      })
    },
    _getMarker () {
      this.storeList.forEach((item, index) => {
        this._setMarker(item, index)
      })
      this.markers = this.storeList
      if (this.washType === 'serach' && this.serachInfo.stationId) {
        this.serachActive()
      }
    },
    // 在地图上设置Marker点样式
    _setMarker (item, index) {
      let _self = this
      _self.markerDom[index] = new AMap.Marker({
        map: _self.map,
        offset: new AMap.Pixel(-17, -17),
        position: [item.stationPositionX, item.stationPositionY],
        content: `<div class="marker-com ${item.type === 1 ? 'wx' : 'by'}">
                    <div class="new show" ></div>
                    <div class="marker-txt">
                      <span>${item.name}</span>
                    </div>
                  </div>`,
        extData: index,
        clickable: true
      })
      // 监听地图Marker点被点击事件
      _self.markerDom[index].on('click', this._onClick)
    },
    // 地图Marker被点击后显示的相应详细信息（信息窗体）
    _setInfoWindow (item, id) {
      let km = this.formatKm(item.way)
      this.infoWindow = new AMap.InfoWindow({
        isCustom: true,
        offset: new AMap.Pixel(0, -24),
        content: `<div class="window-info">
                    <div class="left">
                      <h2>${item.name}</h2>
                      <p>${item.stationAddress}</p>
                    </div>
                    <div class="right"><h2>${km ? km + 'km' : ''}</h2><span class="${id === 0 ? 'show' : ''}">距您最近</span></div>
                  </div>`
      })
      this.infoWindow.open(this.map, [item.stationPositionX, item.stationPositionY])
      // 地图中心点平移至指定点位置
      this.map.panTo([item.stationPositionX, item.stationPositionY])
      // 以像素为单位，沿x方向和y方向移动地图，x向右为正，y向下为正
      this.map.panBy(0, -80)
    },
    _closeInfoWindow () {
      // 关闭信息窗体
      this.infoWindow.close()
    },
    _closeAll () {
      // 关闭所有显示状态
      if (this.infoWindow) {
        this.washinfoShow = false
        this.infoWindow.close()
        this._reductionMarker()
      }
    },
    formatKm (way) {
      return (parseInt(way) / 1000).toFixed(2)
    },
    // 搜索完成后设置激活相应Marker 点状态
    serachActive () {
      let id = 0
      this.storeList.forEach((item, index) => {
        if (item.stationId === this.serachInfo.stationId) {
          id = index
        }
      })
      this.washinfoShow = true
      this.markerActive(id)
    }
  },
  computed: {
    ...mapGetters([
      'cityInfo',
      'serachInfo',
      'storeList'
    ])
  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next(vm => {
      if (vm.storeList.length === 0) {
        vm._goBack()
      }
    })
  },
  created () {
    this.washType = this.$route.query.type
  },
  mounted () {
    this._setMap()
    this._getMarker()
  },
  components: {
    washInfo
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .marker-com
    position: relative
    width: 68px
    height: 68px
    z-index: 100
    background-position: center center
    background-repeat: no-repeat
    background-size: 68px 68px
    &.by
      bg-image('../../common/imgs/washcar/by_store')
    &.wx
      bg-image('../../common/imgs/washcar/repair_store')
    .new
      position: absolute
      right: 0px
      top: 0px
      width: 43px
      height: 20px
      bg-image('../../common/imgs/washcar/new')
      background-position: center center
      background-repeat: no-repeat
      background-size: 43px 20px
      overflow: hidden
      transform: translate3d(50%, -10%, 0)
      &.show
        display: none
    .marker-txt
      display: block
      position: absolute
      left: -55px
      top: -68px
      width: 178px
      height: 60px
      font-size:24px
      line-height: 60px
      text-align: center
      color: #fff
      background-color: #616161
      z-index: 100
      &::after
        content: ''
        position: absolute
        left: 50%
        bottom: -15px
        transform: translateX(-50%)
        border: 10px solid
        width: 1px
        height: 1px
        border-top-color: #616161
        border-bottom-color: rgba(0, 0, 0, 0)
        border-left-color: rgba(0, 0, 0, 0)
        border-right-color: rgba(0, 0, 0, 0)
      .state
        position: absolute
        left: 50%
        top: -25px
        width: 70px
        height: 30px
        font-size: 20px
        color: #FFF
        line-height: 30px
        text-align: center
        transform: translateX(-50%)
        &.bg1
          background-color: #85e7ac
        &.bg2
          background-color: #ff8474
  .window-info
    position: relative
    display: flex
    width: 512px
    height: 165px
    bg-image('../../common/imgs/washcar/infowindow')
    background-repeat: no-repeat
    background-position: center center
    background-size: 512px 165px
    padding-bottom: 25px
    z-index: 101
    .left
      flex: 1
      display: flex
      padding-left: 25px
      flex-direction: column
      justify-content: center
      align-items: center
      border-bottom: 1px solid #f2f2f2
      h2
        width: 330px
        height: 34px
        font-size: 28px
        color: #6c6c6c
        line-height: 34px
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
      p
        font-size: 22px
        color: #bebebe
        line-height: 30px
    .right
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      width: 140px
      .h2
        font-size: 26px
        color: #bebebe
      span
        font-size: 22px
        color: #ff8d48
        margin-top: 10px
        display: none
        &.show
          display: block
    .state
      position: absolute
      right: 0px
      top: -18px
      width: 70px
      height: 30px
      font-size: 20px
      color: #FFF
      line-height: 30px
      text-align: center
      transform: translateX(-50%)
      &.bg1
        background-color: #85e7ac
      &.bg2
        background-color: #ff8474
</style>
<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .detection-record
    background-color: #f4f4f4
    flex-direction: column
    height: 100vh
    .action-bar
      position: relative
      display: flex
      height: 88px
      background-color: #fff
      z-index: 100
      .font
        flex: 1
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        h2
          font-size: 30px
          line-height: 42px
          color: #5b5b5b
          font-weight: bolder
          transform: skewX(-10deg)
        p
          font-size: 22px
          color: #5b5b5b
          line-height: 34px
          span:nth-child(2)
            margin: 0 15px
      .go-back
        width: 120px
        height: 88px
        bg-image('../../common/imgs/order/back')
        background-repeat: no-repeat
        background-position: 30px center
        background-size: 18px 30px
      .search
        width: 120px
        bg-image('../../common/imgs/washcar/search')
        background-repeat: no-repeat
        background-position: 54px center
        background-size: 36px 36px
    .container
      flex: 1
      transition: all .3s
      overflow: hidden
      &.show
        opacity: 1
      .map-btn
        display: flex
        flex-direction: column
        position: absolute
        right: 30px
        bottom: 245px
        width: 65px
        height: 175px
        background-color: #fff
        border-radius: 65px 65px 65px 65px
        z-index: 100
        .map-location
          flex: 1
          bg-image('../../common/imgs/washcar/location')
          background-repeat: no-repeat
          background-position: center center
          background-size: 30px 30px
        .bor
          height: 1px
          width: 48px
          margin: 0 auto
          background-color: #d7d7d7
        .map-kf
          flex: 1
          display: flex
          bg-image('../../common/imgs/washcar/kf_bg')
          background-repeat: no-repeat
          background-position: center center
          background-size: 30px 33px
          a
            flex: 1

</style>
