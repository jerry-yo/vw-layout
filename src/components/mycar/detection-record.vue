// 车辆检测单

<template>
  <div class="detection-record" flexContainer>
    <headerBar :contentInfo="getDefaultCarInfo" @leftClick="_goBack"></headerBar>
    <div class="nav-bar">
      <div class="yjd-bar" :class="isflag ? 'active' : 'usual'" @click="isflag = true">预检单</div>
      <div class="ccd-bar" :class="!isflag ? 'active' : 'usual'" @click="isflag = false">查车单</div>
    </div>
    <Scroll class="list" :data="nowCarCheck">
      <ul class="con" v-if="isflag">
        <li  class="list-info" v-for="(item, index) in nowCarCheck.yjd" :key="index" @click="_goLookInfo(item, 'yjd')" >
          <div class="left">{{`${item.abbreviation}-${item.naEmployee}`}}</div>
          <div class="right">{{item.billDate}}</div>
        </li>
      </ul>
      <ul class="con" v-else>
        <li  class="list-info" v-for="(item, index) in nowCarCheck.ccd" :key="index" @click="_goLookInfo(item, 'ccd')" >
          <div class="left">{{`${item.abbreviation}-${item.naEmployee}`}}</div>
          <div class="right">{{item.billDate}}</div>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import headerBar from '@/base/headerBar'
import {checksObjMixin} from '@/common/js/checkmixin'
import {mapGetters} from 'vuex'
export default {
  name: 'detectionRecord',
  mixins: [checksObjMixin],
  data () {
    return {
      isflag: true,
      carNumber: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name !== 'checkList') {
      next(vm => {
        vm.carNumber = to.query.carid
        vm._getCheckList()
      })
    } else {
      next(vm => {
        vm.carNumber = to.query.carid
      })
    }
  },
  computed: {
    getDefaultCarInfo () {
      let obj = {}
      this.myCar.forEach(item => {
        if (item.carNumber === this.carNumber) {
          obj = item
        }
      })
      return obj
    },
    ...mapGetters([
      'myCar'
    ])
  },
  methods: {
    _goBack () {
      this.$router.back()
    },
    _goLookInfo (item, type) {
      if (type === 'yjd') {
        this.$router.push('/check-list?idownorg=' + item.idOwnOrg + '&yjd=' + item.pkId + '&carnumber=' + this.carNumber)
      } else if (type === 'ccd') {
        this.$router.push('/check-list?idownorg=' + item.idOwnOrg + '&ccd=' + item.pkId + '&carnumber=' + this.carNumber)
      }
    }
  },
  components: {
    Scroll,
    headerBar
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.detection-record
  background-color: #f4f4f4
  flex-direction: column
  height: 100vh
  .nav-bar
    display: flex
    padding: 0 30px
    height: 80px
    background: #fafafa
    margin-bottom: 10px
    .yjd-bar, .ccd-bar
      flex: 1
      text-align: center
      line-height: 80px
      font-size: 24px
      &.usual
        color: #626262
      &.active
        color: #ff8040
  .list
    flex: 1
    overflow: hidden
    .con
      position: relative
    .list-info
      padding: 0 30px
      display: flex
      height: 90px
      background-color: #fff
      overflow: hidden
      margin-bottom: 10px
      .left
        flex: 1
        color: #a6a5a5
        font-size: 24px
        line-height: 90px
      .right
        flex: 1
        text-align: right
        color: #a6a5a5
        font-size: 24px
        line-height: 90px
</style>
