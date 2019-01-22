// 新增 车辆 -品牌

<template>
  <div class="addcar-tabbar" flexContainer>
    <headerBar @leftClick="_goBack">
      <div class="tabbar" slot="content">
        <div class="con">
          <div class="left" :class="{active: tabActive}" @click="_goTab(1)">
            自助加车
          </div>
          <div class="right" :class="{active: !tabActive}"  @click="_goTab(2)">
            VIN码绑车
          </div>
        </div>
      </div>
    </headerBar>
    <div class="container">
      <addCarBrand v-if="tabActive" :add-type="addType"></addCarBrand>
      <vehicleCertification v-else :vin-type="vinType"></vehicleCertification>
    </div>
  </div>
</template>

<script>
import addCarBrand from './addcar-brand'
import headerBar from '@/base/headerBar'
import vehicleCertification from './vehicle-certification'
export default {
  name: 'addcarTabbar',
  data () {
    return {
      tabActive: true,
      vinType: -1,
      addType: ''
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
    this.addType = this.$route.query.type
  },
  components: {
    addCarBrand,
    vehicleCertification,
    headerBar
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.addcar-tabbar
  background-color: #f2f2f2
  flex-direction: column
  height: 100vh
  .tabbar
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    margin: auto
    width: 425px
    display: flex
    justify-content: center
    align-items: center
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
