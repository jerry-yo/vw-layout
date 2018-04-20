// 新增 车辆 -品牌

<template>
  <div class="addcar-tabbar" flexContainer>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="tabbar">
        <div class="con">
          <div class="left" :class="{active: tabActive}" @click="_goTab(1)">
            自助加车
          </div>
          <div class="right" :class="{active: !tabActive}"  @click="_goTab(2)">
            发动机号绑车
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <addCarBrand v-if="tabActive"></addCarBrand>
      <vehicleCertification v-else></vehicleCertification>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import addCarBrand from './addcar-brand'
import vehicleCertification from './vehicle-certification'
export default {
  name: 'addcarTabbar',
  data () {
    return {
      tabActive: true
    }
  },
  methods: {
    _goTab (index) {
      if ((index !== 1 && this.tabActive === true) || (index !== 2 && this.tabActive === false)) {
        this.tabActive = !this.tabActive
      }
    },
    _goBack () {
      this.$router.go(-1)
    }
  },
  mounted: function () {
  },
  components: {
    addCarBrand,
    vehicleCertification
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.addcar-tabbar
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
      .con
        width: 425px
        display: flex
        height: 60px
        border: 1px solid #ff8040
        border-radius: 5px
        .left
          flex: 1
          border-right: 1px solid #ff8040
          text-align: center
          line-height: 60px
          font-size: 26px
          color: #ff7e37
          &.active
            color: #ffffff
            background: -webkit-linear-gradient(left, #ff944a, #ff5c3a)
        .right
          flex: 1
          text-align: center
          line-height: 60px
          font-size: 26px
          color: #ff7e37
          &.active
            color: #ffffff
            background: -webkit-linear-gradient(left, #ff5c3a, #ff944a)
  .container
    flex: 1
    display: flex
</style>
