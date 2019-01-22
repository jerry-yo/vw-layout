<template>
  <div class="add-new-server" flexContainer>
    <headerBar contentTitle="添加新服务" contentColor="#5b5b5b" @leftClick="_goBack"></headerBar>
    <Scroll class="container" ref="addservice" :data="newServerlist">
      <div class="wrapper">
        <serverModel
          v-for="item in newServerlist"
          :key="item.pkId"
          :server="item"
          @changeNumber="_changeNumberParent"
          @clickServer="_clickServerParent"
          @checkGood="_checkGoodParent"
          @checkServer="_checkServerParent"
          @editServer="_editServerParent"
          @saveServer="_saveServerParent"
          @cancelServer="_cancelServerParent"
        ></serverModel>
      </div>
    </Scroll>
    <div class="place-order">
      <div class="server">客服</div>
      <div class="tips">
        <div class="nums">
          <span>共{{allServerMoney.partInfos}}件材料</span>
          <span>包含服务费</span>
        </div>
        <div class="money">
          <span>共{{allServerMoney.servers}}项服务</span>
          <span>{{'￥' + allServerMoney.money}}</span>
        </div>
      </div>
      <div class="btn" @click="_addServer">添加</div>
    </div>
  </div>
</template>

<script>
import serverModel from '@/base/server-model'
import Scroll from '@/base/scroll/scroll'
import headerBar from '@/base/headerBar'
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {expireToken, getServerCar} from '@/common/js/mixin'
import {handleServerModel} from '@/common/js/servermixin'
export default {
  name: 'maintain',
  mixins: [expireToken, getServerCar, handleServerModel],
  data () {
    return {}
  },
  created () {
    if (this.addNewServerLoadNum) {
      this._getAllServie()
    } else {
      this.initAddNewServer()
    }
  },
  computed: {
    newServerlist () {
      let tjArr = []
      let qtArr = []
      this.allServerList.forEach(item => {
        if (item.customerServer === 'new') {
          if (item.customerType === 'tj') {
            tjArr.push(item)
          } else if (item.customerType === 'qt') {
            qtArr.push(item)
          }
        }
      })
      return tjArr.concat(qtArr)
    },
    allServerMoney () {
      let money = 0
      let partInfos = 0
      let servers = 0
      this.allServerList.forEach(item => {
        if (item.isChecked && item.customerServer === 'new') {
          money += item.amount
          servers++
          if (item.partInfo !== null && item.partInfo.isChecked) {
            money += item.partInfo.sellPrice * item.partInfo.number
            partInfos++
          }
        }
      })
      return {
        money: money,
        partInfos: partInfos,
        servers: servers
      }
    },
    ...mapGetters([
      'addNewServerLoadNum'
    ])
  },
  methods: {
    _goBack () {
      this.$router.back()
    },
    _addServer () {
      if (this.allServerMoney.servers > 0) {
        this.newServerlist.forEach(item => {
          if (item.customerServer === 'new' && item.isChecked) {
            this.modifyAllServerList({
              pkId: item.pkId,
              customerServer: 'old'
            })
            this.modifyStaticServerList({
              pkId: item.pkId,
              customerServer: 'old'
            })
          }
        })
        this._goBack()
      } else {
        this.$Toast({
          position: 'bottom',
          message: '请选择至少一种服务'
        })
      }
    },
    _getAllServie () {
      let id = this.defaultStoreId
      let url = `${this.f6Url}/api/clientOrder/getRecommendList?userCarId=${this.nowCar.userCarId}&mileage=${this.nowCar.distance}&stationId=${this.storeList[id].stationId}&clientAppId=${this.userInfo.appId}&clientUserId=${this.userInfo.fUserId}`
      this.$get(url, {
        'Authorization': this.userInfo.token
      }, (res) => {
        if (res.code === 200) {
          this.handleServerlist(res.data)
          this.setAddNewServerLoadNum(false)
        } else if (res.code === 401) {
          this.refreshToken(this._getAllServie)
        }
      })
    },
    handleServerlist (data) {
      let reg = /TJ/
      let map = new Map()
      let list = []
      this.allServerList.forEach(item => {
        map.set(item.pkId, item)
      })
      data.forEach(item => {
        let obj = null
        if (item.partInfo !== null) {
          obj = Object.assign(item.partInfo, {
            isChecked: false,
            number: 1
          })
        }
        if (!reg.test(item.customCode)) {
          map.set(item.pkId, Object.assign(item, {
            customerType: 'tj', // cg 常规 tj 推荐 qt 其他
            customerServer: 'new',
            isChecked: false,
            state: -1,
            partInfo: obj
          }))
        }
      })
      for (let value of map.values()) {
        list.push(value)
      }
      this.setAllServerList(list)
      this.setStaticServerList(JSON.parse(JSON.stringify(list)))
    },
    ...mapMutations({
      setAllServerList: 'SET_ALL_SERVER_LIST',
      setStaticServerList: 'SET_STATIC_SERVER_LIST',
      modifyAllServerList: 'MODIFY_ALL_SERVER_LIST',
      modifyStaticServerList: 'MODIFY_STATIC_SERVER_LIST',
      setAddNewServerLoadNum: 'SET_ADD_NEW_SERVER_LOAD_NUM'
    }),
    ...mapActions([
      'initAddNewServer'
    ])
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
          display: flex
          height: 35px
          line-height: 35px
          span
            &:nth-child(1)
              padding-left: 30px
              font-size: 20px
              color: #626262
            &:nth-child(2)
              flex: 1
              font-size: 22px
              color: #afafaf
              font-weight: bold
              padding-right: 30px
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
