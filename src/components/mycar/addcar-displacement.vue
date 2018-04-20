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
      <img src="" alt="">
      <h2>奥迪A6</h2>
    </div>
    <div class="sele-next">
      选择发动机排量
    </div>
    <div class="displacement" ref="displacementCar">
      <div class="con">
        <div class="text" v-for="(item, index) in displacement" :key="index" @click="goAge">
          {{item}}
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
  name: 'addcarDisplacement',
  data () {
    return {
      displacementBScorll: null,
      displacement: ['1.0L', '1.5L', '2.0L', '2.5L', '3.0L', '3.5L', '1.5L', '2.0L', '2.5L', '3.0L', '3.5L', '1.5L', '2.0L', '2.5L', '3.0L', '3.5L', '1.5L', '2.0L', '2.5L', '3.0L', '3.5L', '1.5L', '2.0L', '2.5L', '3.0L', '3.5L', '1.5L', '2.0L', '2.5L', '3.0L', '3.5L', '1.5L', '2.0L', '2.5L', '3.0L', '3.5L']
    }
  },
  methods: {
    goAge () {
      this.$router.push('/addcar-age')
    },
    _goBack () {
      this.$router.go(-1)
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.displacementBScorll = new BScroll(this.$refs.displacementCar, {
        click: true
      })
    })
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
