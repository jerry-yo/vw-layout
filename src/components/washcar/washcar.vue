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
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import AMap from 'AMap'
// import AMapUI from 'AMapUI'
export default {
  data () {
    return {
      map: null,
      geolocation: null,
      customMarker: null,
      toolBar: null,
      my_position: {},
      showMap: false,
      markers: [
        {
          lng: 119.988081,
          lat: 31.810535,
          new: true,
          state: 1,
          title: '兰陵瑾萱店'
        }, {
          lng: 119.99572,
          lat: 31.799994,
          new: false,
          state: 1,
          title: '景瑞店'
        }, {
          lng: 120.013787,
          lat: 31.81564,
          new: false,
          state: 0,
          title: '恐龙园店'
        }
      ]
    }
  },
  methods: {
    _goBack () {
      this.$router.go(-1)
    },
    _setMap () {
      this.map = new AMap.Map(this.$refs.container, {
        resizeEnable: true,
        layers: [
          new AMap.TileLayer()
        ],
        zoom: 13
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
            image: 'http://192.168.0.101/own_marker@2x.png',
            size: new AMap.Size(22, 34)
          })
        })
      }
    },
    _onError (data) {
      console.log(data)
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
      this.markers.forEach((item) => {
        new AMap.Marker({
          map: _self.map,
          position: [item.lng, item.lat],
          offset: new AMap.Pixel(-12, -36),
          content: `<span class="txt">${item.title}<div class="state bg${item.state}">${item.state === 1 ? '空闲' : '繁忙'}</div><div class="marker-com bg${item.state === 1 ? '1' : '2'}"><div class="new ${item.new ? '' : 'show'}" >NEW</div></div></span>`
        })
      })
    }
  },
  mounted () {
    this._setMap()
    this._getLocation()
    this._getMarker()
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .amap-markers
    .txt
      position: absolute
      left: 100px
      top: 200px
      padding: 14px 20px !important
      font-size:24px
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
      .marker-com
        position: absolute
        left: 50%
        transform: translateX(-50%)
        bottom: -72px
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
          transform: translate3d(50%, -20%, 0)
          &.show
            display: none

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
