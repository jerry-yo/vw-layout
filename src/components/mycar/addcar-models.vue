// 新增车辆  车型

<template>
  <div class="addcar-models" flexContainer>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="tabbar">
        选择车型
      </div>
    </div>
    <div class="car-name">
      <img :src="carLogoUrl + addCar.imageSrc" alt="">
      <h2>{{addCar.series.sbName + ' - ' + addCar.series.vehicleSystem[1]}}</h2>
    </div>
    <div class="sele-next">
      <span>{{addCar.exhaustVolume}}</span><span class="between">-</span><span>{{addCar.year}}</span><span class="between">-</span>选择车型
    </div>
    <div class="models" ref="modelsCar" :data="models">
      <div class="con">
        <div class="text" v-for="(item, index) in models" :key="index" @click="goAge(item)">
          {{item.salesVersion}}
        </div>
        <div class="tips" v-if="flag">
          抱歉，没有查询到相关数据！！！
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'addcarModels',
  data () {
    return {
      sid: 0,
      ev: 0,
      year: 0,
      models: [],
      flag: false
    }
  },
  methods: {
    goAge (item) {
      this.$router.push('/addcar-idcard')
      this.setAddCar({
        salesVersion: item.salesVersion
      })
    },
    _goBack () {
      this.$router.go(-1)
    },
    getModelsDetail () {
      this.api_post('/api/carzone/findModelsDetailBySidAndVolumeAndYear', (res) => {
        if (res.errorCode === 0) {
          if (res.data.data.result === '0000') {
            this.models = res.data.data.detail
          } else {
            this.flag = true
          }
        }
      }, {
        sid: this.sid,
        exhaustVolume: this.ev,
        year: this.year
      })
    },
    ...mapMutations({
      setAddCar: 'SET_ADDCAR'
    })
  },
  created () {
    this.sid = this.$route.query.sid
    this.ev = this.$route.query.ev
    this.year = this.$route.query.year
    this.getModelsDetail()
  },
  computed: {
    ...mapGetters([
      'addCar'
    ])
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.addcar-models
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
  .models
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
    .tips
      line-height: 150px
      font-size: 24px
      color: #999
      text-align: center
</style>
