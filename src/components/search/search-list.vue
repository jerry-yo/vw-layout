
<template>
  <div class="add-car-sharing" flexContainer>
    <headerBar rightTitle="搜索" @leftClick="_goBack" @rightClick="searchBtn">
      <div class="serach-input" slot="content">
        <input type="text" v-model="serachVal" :placeholder="selePlaceHolder">
        <div class="close-btn" v-show="serachVal.length > 0" @click="clearSearchVal"></div>
      </div>
    </headerBar>
    <Scroll class="list">
      <div class="his-list" v-if="serachVal.length < 1">
        <ul>
          <li v-for="(item, index) in history" :key="index">
            <div class="info" @click="searchHisVal(item)">{{item}}</div>
            <div class="btn" @click="delHis(index)"></div>
          </li>
        </ul>
      </div>
      <div class="list-con" v-else>
        <ul class="brand-list" v-if="format === 'brand'">
          <li  class="list-info" v-for="(item, index) in showList" :key="index" @click="seleItem(item)">
            <div class="img">
              <img :src="carLogoUrl + item.imageSrc" alt="">
            </div>
            <div class="list-title" v-html="item.spanname"></div>
          </li>
        </ul>
        <ul class="store-list" v-else-if="format === 'store'">
          <li  v-for="(item, index) in showList" :key="index" @click="seleItem(item)">
            <div class="left">
              <h2 v-html="item.spanname"></h2>
              <p v-html="item.spanaddress"></p>
            </div>
            <div class="right">
              {{(item.way / 1000).toFixed(2)}}km
            </div>
          </li>
        </ul>
        <ul class="city-list" v-for="(item, index) in showList" :key="index"  v-else-if="format === 'city'">
          <li class="list-info" v-html="item.spancityName" @click="seleItem(item)">
          </li>
        </ul>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import headerBar from '@/base/headerBar'
import {mapGetters, mapMutations} from 'vuex'
import {debounce} from '@/common/js/arr'
export default {
  name: 'searchCity',
  data () {
    return {
      format: '',
      serachVal: '',
      lists: [],
      showList: []
    }
  },
  created () {
    this.format = this.$route.query.format
    this.init()
  },
  computed: {
    history () {
      if (this.format === 'store') {
        return this.serachHis.store
      } else if (this.format === 'city') {
        return this.serachHis.city
      } else if (this.format === 'brand') {
        return this.serachHis.brand
      }
    },
    selePlaceHolder () {
      let text = ''
      if (this.format === 'store') {
        text = '搜索门店'
      } else if (this.format === 'city') {
        text = '搜索城市'
      } else if (this.format === 'brand') {
        text = '搜索品牌'
      }
      return text
    },
    ...mapGetters([
      'cityList',
      'carBrand',
      'storeList',
      'serachHis'
    ])
  },
  watch: {
    serachVal: debounce(function (newVal) {
      this.serachModel(newVal)
    }, 200)
  },
  methods: {
    serachModel (str) {
      let reg = RegExp(str)
      if (!this.serachVal) {
        this.showList = []
        return
      }
      this.showList = []
      if (this.format === 'store') {
        this.lists.forEach((store) => {
          if (reg.test(store.name) || reg.test(store.address)) {
            this.showList.push(Object.assign(store, {
              spanname: store.name.replace(reg, `<span class="red">${str}</span>`),
              spanaddress: store.stationAddress.replace(reg, `<span class="red">${str}</span>`)
            }))
          }
        })
      } else if (this.format === 'city') {
        this.lists.forEach((city) => {
          if (reg.test(city.cityName)) {
            this.showList.push(Object.assign(city, {
              spancityName: city.cityName.replace(reg, `<span class="red">${str}</span>`)
            }))
          }
        })
      } else if (this.format === 'brand') {
        this.lists.forEach((brand) => {
          if (reg.test(brand.brandName)) {
            this.showList.push(Object.assign(brand, {
              spanname: brand.brandName.replace(reg, `<span class="red">${str}</span>`)
            }))
          }
        })
      }
    },
    searchBtn () {
      let flag = true
      this.serachHis[this.format].forEach((item) => {
        if (item === this.serachVal) {
          flag = false
        }
      })
      if (flag && this.serachVal.length > 0) {
        this.setSerachHis({
          type: this.format,
          search: this.serachVal
        })
      }
    },
    _goBack () {
      this.$router.back()
    },
    clearSearchVal () {
      this.serachVal = ''
      this.showList = []
    },
    init () {
      if (this.format === 'store') {
        this.lists = this.storeList
      } else if (this.format === 'city') {
        this.lists = this.cityList
      } else if (this.format === 'brand') {
        this.lists = this.carBrand
      }
    },
    seleItem (item) {
      this.setSerachInfo(item)
      if (this.format === 'store') {
        this.$router.push('/washcar?type=serach')
      } else if (this.format === 'city') {
        this.modifyCityInfo({
          selecity: item.cityName
        })
        this.$router.push('/home')
      } else if (this.format === 'brand') {
        this.setAddCar({
          brandName: item.brandName,
          firstLetter: item.firstLetter,
          imageSrc: item.imageSrc
        })
        this.$router.push('/addcar-tabbar?type=' + 'sele')
      }
      this.searchBtn()
    },
    delHis (index) {
      this.deleteSerachHis({
        type: this.format,
        index: index
      })
    },
    searchHisVal (item) {
      this.serachVal = item
      this.serachModel(item)
    },
    ...mapMutations({
      setAddCar: 'SET_ADDCAR',
      modifyCityInfo: 'MODIFY_CITYINFO',
      setSerachHis: 'SET_SERACHHIS',
      setSerachInfo: 'SET_SERACHINFO',
      deleteSerachHis: 'DELETE_SERACHHIS'
    })
  },
  components: {
    Scroll,
    headerBar
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
  .red
    color: #ff7373
</style>
<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.add-car-sharing
  background-color: #f4f4f4
  flex-direction: column
  height: 100vh
  .serach-input
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    margin: auto
    width: 450px
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    input
      width: 100%
      height: 60px
      padding: 0 20px
      border: 1px solid #cfcfcf
      background-color: #f2f2f2
      border-radius: 8px
      overflow: hidden
      outline: none
      &::-webkit-input-placeholder
        font-size: 26px
        color: #bbbbbb
    .close-btn
      position: absolute
      right: 0
      top: 14px
      width: 60px
      height: 60px
      bg-image('../../common/imgs/mind/search_close')
      background-repeat: no-repeat
      background-position: center center
      background-size: 30px 30px
  .list
    flex: 1
    overflow: hidden
    .his-list
      position: relative
      ul
        li
          display: flex
          height: 90px
          line-height: 90px
          margin-bottom: 1px
          background-color: #fff
          font-size: 26px
          color: #999
          bg-image('../../common/imgs/washcar/history')
          background-repeat: no-repeat
          background-position: 30px center
          background-size: 30px 30px
          padding-left: 80px
          .info
            flex: 1
          .btn
            width: 80px
            bg-image('../../common/imgs/washcar/close')
            background-repeat: no-repeat
            background-position: center center
            background-size: 20px 20px
    .list-con
      position: relative
      .brand-list
        overflow: hidden
        .list-info
          height: 90px
          display: flex
          background-color: #fff
          padding: 0 30px
          margin-bottom: 1px
        .img
          width: 60px
          display: flex
          align-items: center
          img
            display: inline-block
            width: 60px
            height: 60px
            background-color: #ccc
        .list-title
          flex: 1
          font-size: 24px
          color: #666666
          line-height: 90px
          padding-left: 20px
        .btn
          width: 80px
          display: flex
          align-items: center
          .add
            flex: 1
            height: 44px
            border: 1px solid #ff7646
            font-size: 24px
            color: #ff7646
            text-align: center
            line-height: 44px
            border-radius: 3px
      .store-list
        overflow: hidden
        li
          display: flex
          margin-top: 8px
          background-color: #fff
          padding: 0 30px
          height: 136px
          .left
            flex: 1
            display: flex
            flex-direction: column
            // align-items: center
            justify-content: center
            h2
              line-height: 50px
              font-weight: bold
              font-size: 26px
              color: #666666
            p
              line-height: 30px
              font-size: 24px
              color: #999
            span
              color: #ff7373
          .right
            line-height: 136px
            font-size: 24px
            color: #bbbbbb
      .city-list
        overflow: hidden
        .list-info
          height: 90px
          padding: 0 30px
          line-height: 90px
          margin-bottom: 1px
          background-color: #fff
          font-size: 26px
          color: #999
</style>
