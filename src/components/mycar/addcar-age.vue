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
      <img src="" alt="">
      <h2>奥迪A6</h2>
    </div>
    <div class="sele-next">
      <span>2.5L</span><span class="between">-</span>选择年份
    </div>
    <div class="age" ref="ageCar">
      <div class="con">
        <div class="text" v-for="(item, index) in ages" :key="index" @click="goAge">
          {{item}}
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
  name: 'addcarAge',
  data () {
    return {
      ageBScorll: null,
      ages: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2015', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2015', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2015', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2015']
    }
  },
  methods: {
    goAge () {
      this.$router.push('/addcar-models')
    },
    _goBack () {
      this.$router.go(-1)
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.ageBScorll = new BScroll(this.$refs.ageCar, {
        click: true
      })
    })
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
