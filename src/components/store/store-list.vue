<template>
  <div class="store" flexContainer>
    <div class="tabbar">
      <span class="goback" @click="_goBack"></span>
      <h2 class="title">选择门店</h2>
      <div class="address" @click="_seleCity">
        {{cityShow}}
      </div>
    </div>
    <Scroll class="store-list" ref="storelist">
      <ul>
        <li :class="{'active': defaultStoreId === index}" v-for="(item, index) in storeList" :key="index" >
          <div class="top">
            <img v-lazy="item.stationPic" alt="">
            <div class="top-right">
              <div class="store-name">
                <p :class="item.type === 2 ? 'by' : 'repair'">{{item.name}}</p>
                <h2>{{item.distance}}</h2>
              </div>
              <div class="store-address">
                <p>{{item.stationAddress}}</p>
                <div>
                  <h2 :class="{'active': defaultStoreId === index, 'nosele': defaultStoreId !== index}"  @click="seleStore(index)">{{defaultStoreId  === index ? '当前门店':'选择'}}</h2>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="get-loc" @click="_goLocaltion(item)"><span>查看定位</span>  </div>
            <div class="call-dz"><a :href="'tel:' + item.responserTel"></a>联系店长</div>
          </div>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'storeList',
  data () {
    return {
      route: ''
    }
  },
  created () {
    this.route = this.$route.query.route
  },
  methods: {
    _goBack () {
      this.$router.back()
    },
    seleStore (id) {
      if (id !== this.defaultStoreId) {
        this.setDefaultStoreId(id)
        this.setAllServerList([])
        this.setStaticServerList([])
        this.setAddNewServerLoadNum(true)
      }
      this.$router.back()
    },
    _goLocaltion (item) {
      this.Wx.openLocation({
        latitude: parseFloat(item.stationPositionY), // 纬度，浮点数，范围为90 ~ -90
        longitude: parseFloat(item.stationPositionX), // 经度，浮点数，范围为180 ~ -180。
        name: item.name, // 位置名
        address: item.stationAddress, // 地址详情说明
        scale: 18 // 地图缩放级别,整形值,范围从1~28。默认为最大
      })
    },
    _seleCity () {
      this.$router.push('sele-city')
    },
    ...mapMutations({
      setDefaultStoreId: 'SET_DEFAULTSTORE_ID',
      setAllServerList: 'SET_ALL_SERVER_LIST',
      setStaticServerList: 'SET_STATIC_SERVER_LIST',
      setAddNewServerLoadNum: 'SET_ADD_NEW_SERVER_LOAD_NUM'
    })
  },
  computed: {
    cityShow () {
      let city = ''
      if (this.cityInfo.selecity || this.cityInfo.city) {
        city = this.cityInfo.selecity ? this.cityInfo.selecity : this.cityInfo.city
      } else {
        return '定位中···'
      }
      return city.length >= 4 ? city.slice(0, 3) + '···' : city
    },
    ...mapGetters([
      'cityInfo',
      'storeList',
      'defaultStoreId'
    ])
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .store
    background-color: #f4f4f4
    flex-direction: column
    height: 100vh
    .tabbar
      height: 88px
      line-height: 88px
      display: flex
      background-color: #fff
      margin-bottom: 10px
      .goback
        width: 120px
        bg-image('../../common/imgs/order/back')
        background-repeat: no-repeat
        background-size: 18px 30px
        background-position: 30px center
      .title
        flex: 1
        text-align: center
        line-height: 88px
        font-weight: 600
        font-size: 36px
        color: #5b5b5b
        transform: skewX(-15deg)
      .address
        margin-right: 30px
        padding-right: 26px
        font-size: 22px
        color: #fd9068
        bg-image('../../common/imgs/home/sj-bottom')
        background-repeat: no-repeat
        background-size: 12px 6px
        background-position: right center
    .store-list
      flex: 1
      overflow: hidden
      & > ul
        position: relative
        li
          height: 206px
          display: flex
          flex-direction: column
          border-top: 4px solid #fff
          border-bottom: 4px solid #fff
          margin-bottom: 10px
          padding: 0 30px
          background-color: #fff
          &.active
            border-color: #ff9280
          .top
            height: 128px
            display: flex
            align-items: center
            border-bottom: 1px solid #f2f2f2
            & > img
              display: block
              width: 146px
              height: 100px
              margin-right: 20px
            .top-right
              flex: 1
              display: flex
              flex-direction: column
              justify-content: cneter
              .store-name
                height: 50px
                display: flex
                line-height: 50px
                & > p
                  padding-right: 76px
                  font-size: 24px
                  color: #5b5b5b
                  font-weight: bold
                  background-size: 76px 50px
                  background-repeat: no-repeat
                  background-position: right center
                  &.by
                    bg-image('../../common/imgs/order/by')
                  &.repair
                    bg-image('../../common/imgs/order/repair')
                & > h2
                  flex: 1
                  text-align: right
                  font-size: 20px
                  color: #b0b0b0
              .store-address
                height: 32px
                line-height: 32px
                display: flex
                align-items: center
                & > p
                  height: 32px
                  font-size: 22px
                  color: #ababab
                  width: 415px
                  overflow: hidden
                  white-space: nowrap
                  text-overflow: ellipsis
                div
                  flex: 1
                  display: flex
                  justify-content: flex-end
                h2
                  height: 30px
                  font-size: 18px
                  color: #fff
                  text-align: center
                  line-height: 30px
                  border-radius: 3px
                  &.active
                    width: 90px
                    background: -webkit-linear-gradient(left, #ff9f50, #ff6f48)
                  &.nosele
                    width: 70px
                    border: 2px solid #ff7850
                    color: #ff7850
          .bottom
            flex: 1
            display: flex
            .get-loc
              flex: 1
              display: flex
              justify-content: center
              align-items: center
              & > span
                padding-left: 30px
                font-size: 24px
                color: #ff914d
                bg-image('../../common/imgs/orderinfo/call-dz')
                background-size: 24px 24px
                background-repeat: no-repeat
                background-position: left center
            .call-dz
              flex: 1
              display: flex
              align-items: center
              justify-content: flex-end
              bg-image('../../common/imgs/orderinfo/call-dz')
              background-size: 29px 28px
              background-repeat: no-repeat
              background-position: right center
              padding-right: 55px
              font-size: 24px
              color: #ababab
              line-height: 100%
</style>
