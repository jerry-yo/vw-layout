<template>
  <div class="addcar-brand-mask">
    <Scroll class="con" ref="addcarBrandMask">
      <div class="wrapper">
        <div class="title">
          <img src="" alt="">
          <h2>{{logosName.name}}</h2>
        </div>
        <ul class="logo-type" v-for="(item, index) in logosName.logoType" :key="index">
          <li class="logo-title">{{item.title}}</li>
          <li class="logo-text" v-for="(res, id) in item.text" :key="id" @click="goDisplacement">
            {{res}}
          </li>
        </ul>
      </div>
    </Scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from '@/base/scroll/scroll'
export default {
  name: 'addcarBrandMask',
  data () {
    return {
      addcarBrand_1: null,
      logosName: {
        name: '奥迪',
        logo: '',
        logoType: [{
          title: 'Audi Sport',
          text: ['奥迪RS 3', '奥迪RS 4', '奥迪RS 5', '奥迪RS 6', '奥迪RS 7', '奥迪RS 8', '奥迪RS 9', '奥迪RS TT']
        }, {
          title: '一汽-大众奥迪',
          text: ['奥迪A6L', '奥迪A4', '奥迪Q5', '奥迪A3', '奥迪Q3', '奥迪A4L', '奥迪A6', '奥迪A6新能源']
        }, {
          title: '奥迪（进口）',
          text: ['奥迪SQ5', '奥迪A5', '奥迪Q5（进口）', '奥迪A1', '奥迪A8', '奥迪TT', '奥迪Q7', '奥迪TTS']
        }]
      }
    }
  },
  methods: {
    goDisplacement () {
      this.$router.push('/addcar-displacement')
    }
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
      background-color: #fff
      -webkit-box-shadow:-10px 0 10px rgba(0,0,0,0.05), /*左边阴影*/
           0px 0 0px #fff, /*右边阴影*/
           0 0px 0px #fff, /*顶部阴影*/
           0 0px 0px #fff; /*底边阴影*/
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
