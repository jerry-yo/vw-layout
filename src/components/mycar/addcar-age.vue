// 新增车辆 -- 年份

<template>
  <div class="addcar-age" flexContainer>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="tabbar">
        选择年份
      </div>
    </div>
    <div class="car-name">
      <img :src="carLogoUrl + addCar.imageSrc" alt="">
      <h2>{{addCar.series.sbName + ' - ' + addCar.series.vehicleSystem[1]}}</h2>
    </div>
    <div class="sele-next">
      <span>{{addCar.exhaustVolume}}</span><span class="between">-</span>选择年份
    </div>
    <Scroll class="age" ref="ageCar" :data="ages">
      <div class="con">
        <div class="text" v-for="(item, index) in ages" :key="index" @click="goModelsDetail(item)">
          {{item.onMarketYear + ' - ' + item.onMarketMonth}}
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from '@/base/scroll/scroll'
import {mapMutations, mapGetters} from 'vuex'
export default {
  name: 'addcarAge',
  data () {
    return {
      sid: 0,
      ev: 0,
      ages: []
    }
  },
  methods: {
    goModelsDetail (item) {
      this.$router.push('/addcar-models?sid=' + this.sid + '&ev=' + this.ev + '&year=' + item.onMarketYear)
      this.setAddCar({
        year: item.onMarketYear,
        month: item.onMarketMonth
      })
    },
    _goBack () {
      this.$router.go(-1)
    },
    getRelateYear () {
      this.api_post('/api/carzone/getRelateYearBySid', (res) => {
        if (res.errorCode === 0) {
          this.ages = res.data.data.detail
        }
      }, {
        sid: this.sid
      })
    },
    ...mapMutations({
      setAddCar: 'SET_ADDCAR'
    })
  },
  created () {
    this.sid = this.$route.query.sid
    this.ev = this.$route.query.ev
    this.getRelateYear()
  },
  computed: {
    ...mapGetters([
      'addCar'
    ])
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.addcar-age
  background-color: #f2f2f2
  flex-direction: column
  height: 100vh
  .action-bar
    display: flex
    height: 88px
    background-color: #fff
    .go-back
      width: 120px
      bg-image('../../common/imgs/order/back')
      background-repeat: no-repeat
      background-position: 30px center
      background-size: 18px 30px
    .tabbar
      flex: 1
      display: flex
      justify-content: center
      align-items: center
      margin-right: 120px
      font-weight: 600
      font-size: 36px
      color: #5b5b5b
      transform: skewX(-15deg)
  .car-name
    height: 100px
    display: flex
    align-items: center
    padding-left: 30px
    background-color: #fff
    img
      width: 60px
      height: 60px
      background-color: rgba(255, 0, 255, 0.5)
      margin-right: 25px
    & > h2
      font-size: 24px
      color: #707070
  .sele-next
    height: 53px
    line-height: 53px
    padding-left: 30px
    font-size: 20px
    color: #ff6e3f
    background-color: #ffdfcc
    .between
      margin: 0 25px
  .age
    flex: 1
    overflow: hidden
    .con
      position: relative
    .text
      padding: 0 30px
      height: 70px
      line-height: 70px
      font-size: 26px
      color: #5a5a5a
      margin-bottom: 1px
      background-color: #fff
</style>
