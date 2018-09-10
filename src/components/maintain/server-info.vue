<template>
  <div class="add-new-server" flexContainer>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="font">
        服务详情
      </div>
    </div>
    <Scroll class="container" ref="addservice" :data="defaultServer">
      <div class="wrapper">
        <serverModel v-for="item in defaultServer" :key="item.pkId" :server="item" :has-check="false"></serverModel>
      </div>
    </Scroll>
  </div>
</template>

<script>
import serverModel from '@/base/server-model'
import Scroll from '@/base/scroll/scroll'
import {mapGetters} from 'vuex'
export default {
  name: 'maintain',
  data () {
    return {}
  },
  computed: {
    defaultServer () {
      let cg = []
      let tj = []
      let qt = []
      this.allServerList.forEach(item => {
        if (item.customerServer === 'old') {
          if (item.customerType === 'cg') {
            cg.push(Object.assign(item, {
              state: 0
            }))
          } else if (item.customerType === 'tj') {
            tj.push(Object.assign(item, {
              state: 0
            }))
          } else if (item.customerType === 'qt') {
            qt.push(Object.assign(item, {
              state: 0
            }))
          }
        }
      })
      return cg.concat(tj).concat(qt)
    },
    ...mapGetters([
      'allServerList',
      'addNewServerLoadNum'
    ])
  },
  methods: {
    _goBack () {
      this.$router.back()
    }
  },
  components: {
    serverModel,
    Scroll
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .add-new-server
    height: 100vh
    position: relative
    background-color: #f4f4f4
    flex-direction: column
    .action-bar
      display: flex
      height: 88px
      background-color: #fff
      .font
        flex: 1
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        margin-right: 120px
        font-size: 36px
        color: #5b5b5b
        font-weight: bolder
        transform: skewX(-10deg)
      .go-back
        width: 120px
        height: 88px
        bg-image('../../common/imgs/order/back')
        background-repeat: no-repeat
        background-position: 30px center
        background-size: 18px 30px
    .container
      flex: 1
      overflow: hidden
      .wrapper
        position: relative
        padding: 20px 0px
</style>
