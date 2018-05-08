<template>
  <div class="detection-record" flexContainer>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="font">
        <h2>东风本田-思域</h2>
        <p><span>苏DB5A68</span><span>丨</span><span>2300km</span></p>
      </div>
      <div class="search"></div>
    </div>
    <div class="container" ref="container" :class="showMap ? 'show' : ''">
      <div class="map-btn">
        <div class="map-location" @click="_getLocation"></div>
        <div class="bor"></div>
        <div class="map-kf"></div>
      </div>
      <!-- marker 样式 -->
      <!-- <div class="marker-com bg1">
        <span class="marker-txt">中华恐龙园
          <div class="state bg1"></div>
        </span>
        <div class="new">NEW</div>
      </div> -->
      <!-- 信息窗体 样式 -->
      <!-- <div class="window-info">
        <div class="left">
          <h2>奇特异快速保养-丽华店addads</h2>
          <p>常州市丽华南村XX街XX路X号奇特异快速保养-丽华店</p>
        </div>
        <div class="right">
          <h2>4.2km</h2>
          <span>距您最近</span>
        </div>
        <div class="state bg1">
          空闲
        </div>
      </div> -->
    </div>
    <washInfo v-if="washinfoShow" @closewindow="_closeAll" :washinfo="washForShow"></washInfo>
  </div>
</template>

<script type="text/ecmascript-6">
import AMap from 'AMap'
import washInfo from './washinfo'
export default {
  data () {
    return {
      map: null,
      geolocation: null,
      customMarker: null,
      my_position: {},
      showMap: false,
      markerDom: [],
      preMarkerId: -1,
      infoWindow: null,
      washinfoShow: false,
      washForShow: null,
      markers: [
        {
          lng: 119.981649,
          lat: 31.826587,
          new: true,
          state: 1,
          title: '新北中心公园',
          icon: './static/active_by_store@2x.png',
          way: 3.6,
          mostfar: true,
          address: '常州市新北区汉江路299号',
          washinfo: [{
            type: 1,
            name: '普洗',
            info: '整车泡沫冲洗擦干、轮胎、轮毂冲洗清洁、车内吸尘、内饰脚垫等简单除尘',
            price: 30.00
          }, {
            type: 2,
            name: '精洗',
            info: '整车泡沫冲洗擦干、轮胎轮毂冲洗清洁、边缝清洗、发动机舱清洁、车内精致清洁',
            price: 60.00
          }]
        }, {
          lng: 120.004995,
          lat: 31.791868,
          new: false,
          state: 1,
          title: '紫荆公园',
          icon: './static/active_by_store@2x.png',
          way: 4.2,
          mostfar: false,
          address: '常州市天宁区竹林北路紫荆公园',
          washinfo: [{
            type: 1,
            name: '普洗',
            info: '整车泡沫冲洗擦干、轮胎、轮毂冲洗清洁、车内吸尘、内饰脚垫等简单除尘',
            price: 30.00
          }, {
            type: 2,
            name: '精洗',
            info: '整车泡沫冲洗擦干、轮胎轮毂冲洗清洁、边缝清洗、发动机舱清洁、车内精致清洁',
            price: 60.00
          }, {
            type: 3,
            name: '超精洗',
            info: '边缝清洗、发动机舱清洁、车内精致清洁，整车泡沫冲洗擦干、轮胎轮毂冲洗清洁',
            price: 90.00
          }]
        }, {
          lng: 120.000531,
          lat: 31.823816,
          new: false,
          state: 2,
          title: '中华恐龙园',
          icon: './static/active_by_store@2x.png',
          way: 8.3,
          mostfar: false,
          address: '常州市新北区河海东路60号',
          washinfo: [{
            type: 1,
            name: '普洗',
            info: '整车泡沫冲洗擦干、轮胎、轮毂冲洗清洁、车内吸尘、内饰脚垫等简单除尘',
            price: 30.00
          }]
        }
      ]
    }
  },
  watch: {
    preMarkerId: function (newQuestion, oldQuestion) {
      this.washForShow = this.markers[newQuestion].washinfo
    }
  },
  methods: {
    _goBack () {
      this.$router.go(-1)
    },
    _setMap () {
      let _self = this
      this.map = new AMap.Map(this.$refs.container, {
        resizeEnable: true,
        jogEnable: false,
        zoom: 13,
        zooms: [12, 19]
      })
      AMap.event.addListener(_self.map, 'click', (e) => {
        _self._closeAll()
      })
    },
    _onComplete (data) {
      let _self = this
      this.my_position = data.position
      if (this.showMap) {
        // this.map.panTo([_self.my_position.lng, _self.my_position.lat])
      } else {
        this.showMap = true
        this.customMarker = new AMap.Marker({
          map: _self.map,
          position: [_self.my_position.lng, _self.my_position.lat],
          offset: new AMap.Pixel(-11, -34),
          icon: new AMap.Icon({
            image: './static/own_marker@2x.png',
            size: new AMap.Size(22, 34)
          })
        })
      }
    },
    _onError (data) {
      console.log(data)
    },
    _onClick (e) {
      this.washinfoShow = true
      let _self = this
      this._reductionMarker()
      // 激活点击
      let id = e.target.getExtData()
      this.markerDom[id].setMap(null)
      this.markerDom[id] = new AMap.Marker({
        map: _self.map,
        offset: new AMap.Pixel(-22, -22),
        position: [_self.markers[id].lng, _self.markers[id].lat],
        icon: new AMap.Icon({
          image: _self.markers[id].icon,
          size: new AMap.Size(44, 44)
        }),
        extData: id,
        clickable: true
      })
      this.preMarkerId = id

      // 显示信息窗体
      this._setInfoWindow(this.markers[id])
    },
    _reductionMarker () {
      // 还原上一个
      let preId = this.preMarkerId
      if (preId !== -1) {
        this.markerDom[preId].setMap(null)
        this._setMarker(this.markers[preId], preId)
      }
    },
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
        _self.geolocation.getCurrentPosition()
        AMap.event.addListener(_self.geolocation, 'complete', _self._onComplete)
        AMap.event.addListener(_self.geolocation, 'error', _self._onError)
      })
    },
    _getMarker () {
      let _self = this
      this.markers.forEach((item, index) => {
        _self._setMarker(item, index)
      })
    },
    _setMarker (item, index) {
      let _self = this
      _self.markerDom[index] = new AMap.Marker({
        map: _self.map,
        offset: new AMap.Pixel(-17, -17),
        position: [item.lng, item.lat],
        content: `<div class="marker-com bg1">
                    <div class="new ${item.new ? '' : 'show'}" >NEW</div>
                    <div class="marker-txt">
                      <span>${item.title}</span>
                      <div class="state bg${item.state}">${item.state === 1 ? '空闲' : '繁忙'}</div>
                    </div>
                  </div>`,
        extData: index,
        clickable: true
      })
      _self.markerDom[index].on('click', this._onClick)
    },
    _setInfoWindow (item) {
      this.infoWindow = new AMap.InfoWindow({
        isCustom: true,
        offset: new AMap.Pixel(0, -34),
        content: `<div class="window-info">
                    <div class="left">
                      <h2>奇特异保养店${item.title}</h2>
                      <p>${item.address}</p>
                    </div>
                    <div class="right"><h2>${item.way}km</h2><span class="${item.mostfar ? 'show' : ''}">距您最近</span></div>
                    <div class="state bg${item.state}">${item.state === 1 ? '空闲' : '繁忙'}</div>
                  </div>`
      })
      this.infoWindow.open(this.map, [item.lng, item.lat])
      this.map.panTo([item.lng, item.lat])
      this.map.panBy(0, -150)
    },
    _closeInfoWindow () {
      this.infoWindow.close()
    },
    _closeAll () {
      this.washinfoShow = false
      this.infoWindow.close()
      this._reductionMarker()
    }
  },
  mounted () {
    this._setMap()
    this._getLocation()
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
    &.bg1
      bg-image('../../common/imgs/washcar/by_store')
    &.bg2
      bg-image('../../common/imgs/washcar/repair_store')
    .new
      position: absolute
      right: 0px
      top: 0px
      width: 44px
      height: 20px
      text-align: center
      line-height: 20px
      font-size: 14px
      color: #ffffff
      background-color: #ff4141
      border-radius: 20px
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
    width: 500px
    height: 140px
    background-color: #fff
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2)
    z-index: 101
    &::after
      content: ''
      position: absolute
      left: 50%
      bottom: -35px
      transform: translateX(-50%)
      border: 20px solid
      width: 1px
      height: 1px
      border-top-color: #fff
      border-bottom-color: rgba(0, 0, 0, 0)
      border-left-color: rgba(0, 0, 0, 0)
      border-right-color: rgba(0, 0, 0, 0)
    .left
      flex: 1
      display: flex
      padding-left: 25px
      flex-direction: column
      justify-content: center
      align-items: center
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
          bg-image('../../common/imgs/washcar/kf_bg')
          background-repeat: no-repeat
          background-position: center center
          background-size: 30px 33px

</style>
