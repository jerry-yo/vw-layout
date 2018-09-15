<template>
  <div class="add-new-server" flexContainer>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="font">
        服务详情
      </div>
    </div>
    <Scroll class="container" ref="addservice" :data="seleServersInfo">
      <div class="wrapper">
        <serverModel
          v-for="item in seleServersInfo"
          :key="item.pkId"
          :server="item"
          :has-check="false"
          @clickServer="_clickServerParent"
        ></serverModel>
      </div>
    </Scroll>
  </div>
</template>

<script>
import serverModel from '@/base/server-model'
import Scroll from '@/base/scroll/scroll'
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'maintain',
  data () {
    return {}
  },
  created () {
    if (this.seleServersInfo.length === 0) {
      this._goBack()
    }
  },
  computed: {
    ...mapGetters([
      'seleServersInfo'
    ])
  },
  methods: {
    _goBack () {
      this.$router.back()
    },
    _clickServerParent (server) {
      console.log(server)
      if (server.partInfo !== null) {
        this.modifySeleServersInfo(server)
      } else {
        this.$Toast({
          position: 'bottom',
          message: '暂无产品信息'
        })
      }
    },
    ...mapMutations({
      modifySeleServersInfo: 'MODIFY_SELE_SERVERS_INFO'
    })
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
