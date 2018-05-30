// 车辆管理

<template>
  <div class="vehicle-management" flexContainer>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="font">我的车库</div>
      <div class="management" @click="_editCar" v-if="myCar.length > 0">{{editState ?'取消' : '编辑'}}</div>
    </div>
    <Scroll class="car-content">
      <ul class="con">
        <li v-for="(item, index) in myCar" :key="index" v-if="check.length > 0">
          <div class="li-con" :style="{transform: editState ? 'translateX(28px)' : 'translateX(0px)', transition: 'all .3s'}">
            <div class="check-btn" v-show="editState">
              <div class="check-img" :class="check[index].check ? 'check': 'nocheck'"  @click="_checkCar(index)">
              </div>
            </div>
            <div class="img">
              <img :src="carLogoUrl + item.imageSrc" alt="">
            </div>
            <div class="con">
              <h2>{{item.series.sbName + ' - ' + item.series.vehicleSystem[1]}}</h2>
              <p class="p1"><span>{{item.year}}</span>&nbsp;&nbsp;<span>{{item.salesVersion}}</span></p>
              <p class="p2"><span>{{item.idCard}}</span><span v-if="item.way !== 0">丨</span> <span v-if="item.way !== 0">{{item.way}}km</span></p>
            </div>
            <div class="right"  v-if="!editState">
              <div class="btn" :class="item.default ? 'active' : 'common'" @click="_setCarDefault(item, index)">
              {{item.default ? '已设为默认' : '设为默认'}}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </Scroll>
    <div class="submit-btn" @click="_goAddcarTabbar">
      <span>{{editState ?'删除车辆' : '新增车辆'}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from '@/base/scroll/scroll'
import {mapMutations, mapGetters} from 'vuex'
export default {
  name: 'vehicleManagement',
  data () {
    return {
      editState: false,
      check: []
    }
  },
  methods: {
    _goBack () {
      this.$router.go(-1)
    },
    _goAddcarTabbar () {
      if (this.editState) {
        this.editState = false
        this.deleteMyCar(this.check)
      } else {
        this.$router.push('/addcar-tabbar?type=add')
      }
    },
    _editCar () {
      this.editState = !this.editState
      if (this.editState) {
        this.checkArr()
      }
    },
    _setCarDefault (item, id) {
      this.setDefaultCar({
        id: id,
        item: item
      })
    },
    _checkCar (id) {
      if (this.check[id].check) {
        this.$set(this.check[id], 'check', false)
      } else {
        this.$set(this.check[id], 'check', true)
      }
    },
    ...mapMutations({
      setMyCar: 'SET_MYCAR',
      setDefaultCar: 'SET_DEFAULTCAR',
      deleteMyCar: 'DELETE_MYCAR'
    }),
    checkArr () {
      let arr = []
      for (let i = 0; i < this.myCar.length; i++) {
        arr[i] = {
          check: false
        }
      }
      this.check = arr
    }
  },
  computed: {
    ...mapGetters([
      'myCar'
    ])
  },
  mounted () {
    this.checkArr()
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .vehicle-management
    background-color: #f4f4f4
    flex-direction: column
    height: 100vh
    .action-bar
      position: relative
      height: 88px
      background-color: #fff
      margin-bottom: 10px
      .font
        position: absolute
        left: 0
        top: 0
        right: 0
        bottom: 0
        margin: auto
        width: 180px
        height: 88px
        line-height: 88px
        text-align: center
        font-size: 36px
        color: #5b5b5b
        font-weight: bold
        transform: skewX(-10deg)
      .go-back
        display: inline-block
        float: left
        width: 120px
        height: 88px
        bg-image('../../common/imgs/order/back')
        background-repeat: no-repeat
        background-position: 30px center
        background-size: 18px 30px
      .management
        display: inline-block
        float: right
        width: 120px
        height: 88px
        padding-right: 30px
        font-size: 26px
        color: #5b5b5b
        line-height: 88px
        text-align: right
        background-color: #fff
    .submit-btn
      bg-image('../../common/imgs/washcar/btn_bg')
      background-repeat: no-repeat
      background-position: center center
      background-size: 750px 100px
      height: 100px
      line-height: 100px
      text-align: center
      span
        display: inline-block
        font-size: 36px
        font-weight: bold
        color: #ffffff
        transform: skewX(-10deg)
    .car-content
      flex: 1
      overflow: hidden
      ul
        position: relative
        li
          display: flex
          height: 208px
          background-color: #fff
          margin-bottom: 10px
          padding: 0 30px
          .li-con
            flex: 1
            display: flex
          .check-btn
            width: 57px
            display: flex
            justify-content: center
            align-items: center
            .check-img
              width: 57px
              height: 57px
              &.check
                bg-image('../../common/imgs/repair/sele')
                background-repeat: no-repeat
                background-size: 30px 30px
                background-position: center center
              &.nocheck
                bg-image('../../common/imgs/repair/unsele')
                background-repeat: no-repeat
                background-size: 30px 30px
                background-position: center center
          .img
            display: flex
            justify-content: center
            align-items: center
            width: 172px
            img
              width: 50px
              height: 50px
              background-color: blue
          .con
            flex: 1
            display: flex
            flex-direction: column
            justify-content: center
            h2
              font-size: 30px
              color: #5b5b5b
              font-weight: bold
              line-height: 44px
            p.p1
              width: 350px
              height: 36px
              overflow: hidden
              font-size: 22px
              color: #5b5b5b
              line-height: 36px
              text-overflow:ellipsis
              white-space: nowrap
            p.p2
              font-size: 22px
              color: #9d9d9d
              line-height: 36px
              span:nth-child(2)
                font-size: 22px
                color: #9d9d9d
                margin: 0 15px
          .right
            width: 147px
            display: flex
            align-items: center
            justify-content: flex-end
            .btn
              box-sizing: border-box
              width: 147px
              height: 42px
              font-size: 24px
              text-align: center
              line-height: 42px
              border-radius: 2px
              &.active
                color: #fff
                background: -webkit-linear-gradient(left, #ff964a, #ff673d)
              &.common
                color: #ff7d43
                border: 1px solid #ff673b

</style>
