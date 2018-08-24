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
      <h2>{{`${addCar.brandName} - ${addCar.evehicleSystem} - ${ addCar.exhaustVolume}`}}</h2>
    </div>
    <div class="sele-next">
      <span>{{addCar.exhaustVolume}}</span><span class="between">-</span>选择年份
    </div>
    <Scroll class="age" ref="ageCar" :data="ages">
      <div class="con">
        <div class="text" v-for="(item, index) in ages" :key="index" @click="goModelsDetail(item)">
          {{item.year + ' - ' + item.transmissionDesc}}
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import {mapMutations, mapGetters} from 'vuex'
import {queryCarModal} from '@/common/js/mixin'
export default {
  name: 'addcarAge',
  mixins: [queryCarModal],
  data () {
    return {
      ages: [],
      content: 'year%2Cvehicle_system%2Ctransmission_desc',
      conditon: ''
    }
  },
  methods: {
    goModelsDetail (item) {
      this.$router.push('/addcar-idcard')
      this.setAddCar({
        year: item.year,
        transmissionDesc: item.transmissionDesc,
        pbid: item.pbid,
        sid: item.sid,
        sbid: item.sbid,
        mid: item.mid
      })
    },
    _goBack () {
      this.$router.go(-1)
    },
    loadCondition () {
      let params = `{"brand_name":"${this.addCar.brandName}","manufacturer_name":"${this.addCar.manufacturerName}","e_vehicle_system":"${this.addCar.evehicleSystem}","exhaust_volume":"${this.addCar.exhaustVolume}"}`
      return encodeURIComponent(params)
    },
    ...mapMutations({
      setAddCar: 'SET_ADDCAR'
    })
  },
  mounted () {
    this.conditon = this.loadCondition()
    this.queryModal()
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
