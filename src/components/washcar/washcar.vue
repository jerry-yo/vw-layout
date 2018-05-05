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
    <div class="container" ref="container">
      <div class="map-btn">
        <div class="map-location"></div>
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
      toolBar: null
    }
  },
  methods: {
    _goBack () {
      this.$router.go(-1)
    },
    _setMap () {
      this.map = new AMap.Map(this.$refs.container, {
        resizeEnable: true,
        zoom: 10
      })
    },
    _onComplete (data) {
      console.log(data)
    },
    _onError (data) {
      console.log(data)
    },
    _getLocation () {
      let _self = this
      this.customMarker = new AMap.Marker({
        map: _self.map,
        offset: new AMap.Pixel(-10, -34),
        icon: 'http://192.168.0.101/own_marker@2x.png'
      })
      console.log(_self.customMarker)
      this.map.plugin('AMap.Geolocation', function () {
        _self.geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 1000,
          maximumAge: 0,
          convert: true,
          markerOptions: _self.customMarker,
          showButton: false,
          showMarker: true,
          panToLocation: true,
          zoomToAccuracy: true
        })
        _self.map.addControl(_self.geolocation)
        _self.geolocation.getCurrentPosition()
        AMap.event.addListener(_self.geolocation, 'complete', _self._onComplete)
        AMap.event.addListener(_self.geolocation, 'error', _self._onError)
      })
    }
  },
  mounted () {
    this._setMap()
    this._getLocation()
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .detection-record
    background-color: #f4f4f4
    flex-direction: column
    height: 100vh
    .action-bar
      display: flex
      height: 88px
      background-color: #fff
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
