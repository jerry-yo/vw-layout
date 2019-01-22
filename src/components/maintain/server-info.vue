<template>
  <div class="add-new-server" flexContainer>
    <headerBar contentTitle="服务详情" contentColor="#5b5b5b" @leftClick="_goBack"></headerBar>
    <Scroll class="container" ref="addservice" :data="seleServersInfo">
      <div class="wrapper">
        <serverModel
          v-for="item in seleServersInfo"
          :key="item.name"
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
import headerBar from '@/base/headerBar'
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
    Scroll,
    headerBar
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
    .container
      flex: 1
      overflow: hidden
      .wrapper
        position: relative
        padding: 20px 0px
</style>
