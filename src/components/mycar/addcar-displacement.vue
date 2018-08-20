// 增加车辆 -- 排量

<template>
  <div class="addcar-displacement" flexContainer>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="tabbar">
        选择发动机排量
      </div>
    </div>
    <div class="car-name">
      <img :src="carLogoUrl + addCar.imageSrc" alt="">
      <h2>{{addCar.series.sbName + ' - ' + addCar.series.vehicleSystem[1]}}</h2>
    </div>
    <div class="sele-next">
      选择发动机排量
    </div>
    <Scroll class="displacement" ref="displacementCar" :data="displacement">
      <div class="con">
        <div class="text" v-for="(item, index) in displacement" :key="index" @click="goAge(item)">
          {{item.exhaustVolume}}
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'addcarDisplacement',
  data () {
    return {
      displacementId: 0,
      displacement: []
    }
  },
  methods: {
    goAge (item) {
      this.$router.push('/addcar-age?sid=' + item.sid + '&ev=' + item.exhaustVolume)
      this.setAddCar({
        exhaustVolume: item.exhaustVolume
      })
    },
    _goBack () {
      this.$router.go(-1)
    },
    getExhaustVolume () {
      this.api_post('/api/carzone/findExhaustVolume', (res) => {
        if (res.errorCode === 0) {
          this.displacement = res.data.data.detail
        }
      }, {
        sid: this.displacementId
      })
    },
    ...mapMutations({
      setAddCar: 'SET_ADDCAR'
    })
  },
  created () {
    this.displacementId = this.$route.query.sid
    this.getExhaustVolume()
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
.addcar-displacement
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
  .displacement
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
