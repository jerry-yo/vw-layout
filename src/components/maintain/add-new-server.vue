<template>
  <div class="add-new-server" flexContainer>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="font">
        添加新服务
      </div>
    </div>
    <Scroll class="container" ref="addservice">
      <div class="wrapper">
        <div class="service-catalog" v-for="(res, resid) in allServerList" :key="resid">
          <div class="service-title">{{res.serviceCatalog}}</div>
          <serverModel v-for="(item, index) in res.serviceCon" :key="index" :server="item" :serverid="index" :addServer="true"></serverModel>
        </div>
      </div>
    </Scroll>
    <div class="place-order">
      <div class="server">客服</div>
      <div class="tips">
        <div class="nums">
          不包含服务费
        </div>
        <div class="money">
          <span>共{{allServerNum}}项服务</span>
          <span>{{'￥' + allPrice}}</span>
        </div>
      </div>
      <div class="btn" @click="_addServer">添加</div>
    </div>
  </div>
</template>

<script>
import serverModel from '@/base/server-model'
import Scroll from '@/base/scroll/scroll'
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'maintain',
  data () {
    return {
      checkServer: []
    }
  },
  computed: {
    allPrice () {
      let price = 0
      this.allServerList.forEach((ree) => {
        ree.serviceCon.forEach((item, index) => {
          if (item.groupItem.isChecked) {
            if (item.subItems.length > 0) {
              item.subItems.forEach((res, id) => {
                if (res.isChecked) {
                  price += res.keepServiceSecondItemBean.minCommodityNumber * res.keepServiceSecondItemBean.commodityPrice
                }
              })
            } else {
              price += item.groupItem.keepServiceFirstItemBean.serverPrice
            }
          }
        })
      })
      return price
    },
    allServerNum () {
      let nums = 0
      this.allServerList.forEach((ree) => {
        ree.serviceCon.forEach((item, index) => {
          if (item.groupItem.isChecked) {
            nums++
          }
        })
      })
      return nums
    },
    checkedServer () {
      let servers = []
      let arr = []
      this.allServerList.forEach((ree, id) => {
        let num = []
        ree.serviceCon.forEach((item, index) => {
          if (item.groupItem.isChecked) {
            servers.push(item)
            num.push(index)
          }
        })
        arr.push({
          nav: id,
          subnav: num
        })
      })
      return {
        servers: servers,
        arr: arr
      }
    },
    ...mapGetters([
      'allServerList'
    ])
  },
  methods: {
    _goBack () {
      this.$router.go(-1)
    },
    _addServer () {
      if (this.allServerNum > 0) {
        this.modifyMyServer(this.checkedServer.servers)
        this.deleteAllServer(this.checkedServer.arr)
        this.$router.back()
      } else {
        this.$Toast({
          message: '请选择新增服务',
          position: 'bottom'
        })
      }
    },
    ...mapMutations({
      modifyMyServer: 'MODIFY_MY_SERVER',
      deleteAllServer: 'DELETE_ALL_SERVER'
    })
  },
  mounted () {
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
        padding-top: 20px
        .service-catalog
          overflow: hidden
          .service-title
            height: 54px
            line-height: 54px
            font-size: 20px
            color: #9e9e9e
            text-align: center
        .add-server
          margin-top: 30px
          height: 80px
          line-height: 80px
          background-color: #fff
          padding: 0 30px
          padding-left: 85px
          font-size: 26px
          color: #5b5b5b
          bg-image('../../common/imgs/repair/add_server')
          background-size: 20px 20px
          background-repeat: no-repeat
          background-position: 30px center
        .server-tips
          height: 90px
          line-height: 90px
          text-align: center
          font-size: 22px
          color: #969696
    .place-order
      height: 98px
      display: flex
      background-color: #fff
      .server
        width: 133px
        text-align: center
        padding-top: 58px
        font-size: 20px
        color: #626262
        border-right: 1px solid #f2f2f2
        bg-image('../../common/imgs/repair/customer_service')
        background-size: 24px 21px
        background-repeat: no-repeat
        background-position: center 25px
      .tips
        flex: 1
        display: flex
        flex-direction: column
        justify-content: center
        .nums
          height: 35px
          line-height: 35px
          padding-right: 30px
          font-size: 22px
          color: #afafaf
          text-align: right
        .money
          height: 40px
          line-height: 40px
          display: flex
          span
            &:nth-child(1)
              padding-left: 30px
              font-size: 20px
              color: #626262
            &:nth-child(2)
              flex: 1
              font-size: 34px
              color: #ff5050
              font-weight: bold
              padding-right: 30px
              text-align: right
      .btn
        width: 286px
        text-align: center
        line-height: 98px
        font-size: 36px
        color: #fff
        font-weight: bold
        bg-image('../../common/imgs/repair/ordered_btn')
        background-size: 286px 98px
        background-repeat: no-repeat
        background-position: center center
</style>
