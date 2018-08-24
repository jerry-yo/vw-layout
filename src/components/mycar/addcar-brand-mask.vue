<template>
  <div class="addcar-brand-mask" @click="closeMask">
    <div class="con" @click.prevent.stop>
      <Scroll ref="addcarBrandMask" class="scroll" :data="getSeriesType">
        <div class="wrapper">
          <div class="title">
            <img :src="carLogoUrl + addCar.imageSrc" alt="">
            <h2>{{addCar.brandName}}</h2>
          </div>
          <ul class="logo-type" v-for="(item, index) in getSeriesType" :key="index">
            <li class="logo-title">{{item.manufacturerName}}</li>
            <li class="logo-text" v-for="(res, id) in item.evehicleSystems" :key="id" @click="goDisplacement(item, id)">
              {{res}}
            </li>
          </ul>
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import {mapMutations, mapGetters} from 'vuex'
import {queryCarModal} from '@/common/js/mixin'
export default {
  name: 'addcarBrandMask',
  mixins: [queryCarModal],
  data () {
    return {
      carSeries: [],
      content: 'manufacturer_name%2Ce_vehicle_system',
      conditon: ''
    }
  },
  methods: {
    goDisplacement (res, id) {
      this.$router.push('/addcar-displacement')
      this.setAddCar({
        manufacturerName: res.manufacturerName,
        evehicleSystem: res.evehicleSystems[id]
      })
    },
    closeMask () {
      this.$emit('closemask', false)
    },
    loadCondition () {
      let params = `{"brand_name":"${this.addCar.brandName}"}`
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
    getSeriesType () {
      let arr = []
      this.carSeries.forEach((item) => {
        arr.push({
          manufacturerName: item.manufacturerName,
          evehicleSystems: item.evehicleSystems.split(',')
        })
      })
      return arr
    },
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
  .addcar-brand-mask
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    display: flex
    background-color: rgba(0,0,0,0)
    padding-left: 114px
    z-index: 100
    .con
      flex: 1
      display: flex
      background-color: #fff
      -webkit-box-shadow:-10px 0 10px rgba(0,0,0,0.05), /*左边阴影*/
           0px 0 0px #fff, /*右边阴影*/
           0 0px 0px #fff, /*顶部阴影*/
           0 0px 0px #fff; /*底边阴影*/
      overflow: hidden
      .scroll
        flex: 1
        overflow: hidden
      .wrapper
        position: relative
        .title
          height: 200px
          display: flex
          align-items: center
          padding-left: 30px
          img
            width: 120px
            height: 120px
            margin-right: 60px
            background-color: rgba(255, 0, 255, 0.5)
          & > h2
            font-size: 34px
            color: #333
        .logo-type
          overflow: hidden
          .logo-title
            height: 100px
            padding-left: 30px
            line-height: 100px
            font-size: 24px
            color: #333
            background-color: #f2f2f2
          .logo-text
            height: 80px
            line-height: 80px
            margin-left: 30px
            font-size: 22px
            color: #333
            border-bottom: 1px solid #f2f2f2
            &:last-child
              border: none
</style>
