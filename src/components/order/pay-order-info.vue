<template>
  <div class="order-info" flexContainer>
    <div class="title">
      <div class="back" @click="goBack" ></div>
      <span>订单详情</span>
    </div>
    <Scroll class="order-content" ref="orderWarpper" :data="orderInfoShow">
      <div class="order-con">
        <div class="order-img" v-if="orderType === 'ywc'">
          <div class="order-bg-2 order-bg">
            <div class="bg-1">
            </div>
            <div class="bg-font">
              <span>服务完成</span>
              <h2>奇特异维修门店 - {{stationName}}</h2>
            </div>
          </div>
        </div>
        <div class="order-title" v-if="orderInfoShow.serverState">
          <div class="top">
            <div class="top-name">
              <span>奇特异维修门店 - {{stationName}}</span>
              <div class="order-states" :class="{'by': orderInfoShow.serverState === 1, 'wx': orderInfoShow.serverState === 2}"></div>
            </div>
          </div>
          <div class="bottom">
            <span>{{orderInfoShow.carNoWhole}}</span>
          </div>
        </div>
        <div class="order-con" @click="goPartAndServerInfo" v-if="orderInfoShow.memoInfos">
          <orderBy :data="orderInfoShow.memoInfos" :money="'other'"></orderBy>
        </div>
        <div class="order-other" v-if="orderInfoShow.serverState">
          <div class="other-info">
            <div class="other-fw">
              <span>项目服务费</span>
              <span>¥ {{orderInfoShow.serverMoney}}</span>
            </div>
          </div>
          <div class="other-info color" >
            <div class="other-fw">
              <span>附加费</span>
              <span>¥ {{orderInfoShow.amountAll - orderInfoShow.serverMoney - orderInfoShow.memoInfos.partMoney}}</span>
            </div>
            <div class="other-fw green" v-if="orderType === 'ywc'">
              <span>配件优惠</span>
              <span>- ¥ {{orderInfoShow.partDistanceMoney}}</span>
            </div>
            <div class="other-fw green" v-if="orderType === 'ywc'">
              <span>服务优惠</span>
              <span>- ¥ {{orderInfoShow.serverDistanceMoney}}</span>
            </div>
            <div class="other-fw" v-if="orderType === 'dfk'">
              <span>合计</span>
              <span>¥ {{orderInfoShow.amountAll}}</span>
            </div>
            <div class="other-fw" v-if="orderType === 'ywc'">
              <span>应收</span>
              <span>¥ {{orderInfoShow.amount}}</span>
            </div>
          </div>
          <div class="other">
            <p>工单号:  <span>{{orderInfoShow.billNo}}</span> </p>
            <p>到店时间:  <span>{{orderInfoShow.billDate}}</span> </p>
            <p v-if="orderType === 'ywc'">完工时间:  <span>{{orderInfoShow.complateDate}}</span> </p>
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import orderBy from '@/components/order/order-by'
import orderWx from '@/components/order/order-wx'
import {expireToken} from '@/common/js/mixin'
import {mapMutations} from 'vuex'
export default {
  name: 'order-info',
  mixins: [expireToken],
  data () {
    return {
      pkId: null,
      orderType: null,
      stationName: null,
      orderInfoShow: {}
    }
  },
  mounted () {
    this.pkId = this.$route.query.pkid
    this.orderType = this.$route.query.type
    this.stationName = this.$route.query.station
    if (!this.pkId) {
      this.$router.back()
    } else {
      this._getOrderInfo()
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    _getOrderInfo () {
      this.$get(`${this.f6Url}/api/clientMaintain/info`, {
        'Authorization': this.userInfo.token
      }, (res) => {
        if (res.code === 401) {
          this.refreshToken(this._getOrderInfo)
        } else if (res.code === 200) {
          console.log(res)
          this.orderInfoShow = this.handleOrderInfo(res.data)
          console.log(res)
        }
      }, {
        pkId: this.pkId,
        clientAppId: this.userInfo.appId,
        clientUserId: this.userInfo.fUserId
      })
    },
    handleOrderInfo (data) {
      let serverState = 0
      let partMoney = 0
      let partInfos = 0
      let serverMoney = 0
      let partDistanceMoney = 0
      let serverDistanceMoney = 0
      let partListStr = []
      if (data.businessTypeName === '保养') {
        serverState = 1
      } else if (data.businessTypeName === '维修') {
        serverState = 2
      }
      data.serviceDetailVOList.forEach(item => {
        serverMoney += item.workHourPrice
        serverDistanceMoney += (item.workHourPrice - item.discountedSubtotal)
      })
      data.stuffDetailVOList.forEach(item => {
        let arr = item.partShowName.split(' ')
        if (item.isBring === 0) {
          partMoney += item.amount
          partInfos += item.number
          partDistanceMoney += (item.amount - item.amount)
          partListStr.push(arr[0])
        }
      })
      return Object.assign(data, {
        serverState: serverState,
        billDate: data.billDate.replace(/-/, '年').replace(/-/, '月').replace(/ /, '日 ') + ':00',
        complateDate: data.complateDate.replace(/-/, '年').replace(/-/, '月').replace(/ /, '日 ') + ':00',
        serverMoney: serverMoney,
        partDistanceMoney: partDistanceMoney,
        serverDistanceMoney: serverDistanceMoney,
        memoInfos: {
          serversNum: data.serviceDetailVOList.length,
          partInfos: partInfos,
          partMoney: partMoney,
          partListStr: partListStr
        }
      })
    },
    goPartAndServerInfo () {
      this.setSeleServerInfo({
        stuffDetailVOList: this.orderInfoShow.stuffDetailVOList,
        serviceDetailVOList: this.orderInfoShow.serviceDetailVOList
      })
      this.$router.push('/pay-server-info')
    },
    ...mapMutations({
      setSeleServerInfo: 'SET_SELE_SERVERS_INFO'
    })
  },
  components: {
    orderBy,
    orderWx,
    Scroll
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .order-info
    flex-direction: column
    height: 100vh
    background-color: #f4f4f4
    overflow: hidden
    .title
      position: relative
      height: 88px
      background-color: #fff
      margin-bottom: 10px
      & > span
        position: absolute
        left: 0
        top: 0
        right: 0
        bottom: 0
        margin: auto
        display: inline-block
        width: 160px
        height: 88px
        text-align: center
        line-height: 88px
        font-weight: 600
        font-size: 36px
        color: #5b5b5b
        transform: skewX(-15deg)
      .back
        width: 120px
        height: 100%
        bg-image('../../common/imgs/order/back')
        background-size: 18px 30px
        background-repeat: no-repeat
        background-position: 30px center
    .order-content
      flex: 1
      overflow: hidden
      .order-con
        position: relative
      .order-img
        display: flex
        height: 200px
        margin-bottom: 10px
        .order-bg
          position: relative
          flex: 1
          background-color: #fff
          background-size: 750px 200px
          background-repeat: no-repeat
          background-position: center center
          .bg-1
            position: absolute
            left: 116px
            top: 0px
            width: 184px
            height: 200px
            background-repeat: no-repeat
          .bg-3
            position: absolute
            left: 132px
            top: 30px
            width: 205px
            height: 139px
            background-repeat: no-repeat
          .bg-font
            display: flex
            flex-direction: column
            justify-content: center
            position: absolute
            height: 200px
        .order-bg-1
          bg-image('../../common/imgs/orderinfo/order-infobg-1')
          .bg-1
            bg-image('../../common/imgs/orderinfo/order-bg-1')
            background-position: center center
            background-size: 114px 120px
          .bg-3
            bg-image('../../common/imgs/orderinfo/order-bg-3')
            background-position: center center
            background-size: 205px 139px
          .bg-font
            left: 395px
            line-height: 200px
            font-size: 24px
            color: #fff
        .order-bg-2
          bg-image('../../common/imgs/orderinfo/order-infobg-2')
          .bg-1
            bg-image('../../common/imgs/orderinfo/order-bg-2')
            background-size: 184px 103px
            background-position: left 63px
          .bg-font
            left: 354px
            h2, span
              font-size: 24px
              line-height: 38px
              color: #fff
      .order-title
        height: 110px
        background-color: #fff
        padding: 0px 30px
        .top
          display: flex
          padding-top: 10px
          height: 60px
          .top-name
            flex: 1
            display: flex
            line-height: 50px
            font-size: 30px
            span
              color: #5b5b5b
              margin-right: 20px
            .order-states
              width: 76px
              height: 50px
              background-size: 100% 100%
              background-repeat: no-repeat
              background-position: center center
              &.by
                bg-image('../../common/imgs/order/by')
              &.wx
                bg-image('../../common/imgs/order/repair')
              &.xc
                bg-image('../../common/imgs/order/wash')
          .localtion
            width: 60px
            bg-image('../../common/imgs/orderinfo/localtion')
            background-size: 43px 44px
            background-repeat: no-repeat
            background-position: right center
        .bottom
          height: 42px
          line-height: 42px
          font-size: 22px
          color: #5b5b5b
          span
            margin-right: 46px
      .order-other
        height: auto
        overflow: hidden
        .other-info
          overflow: hidden
          margin-bottom: 10px
          &.color
            .other-fw
              span:nth-child(1)
                color: #5b5b5b
          .other-fw
            display: flex
            padding: 0px 30px
            height: 72px
            line-height: 72px
            background-color: #fff
            &.green
              span:nth-child(2)
                color: #65d976
            span:nth-child(1)
              flex: 1
              font-size: 24px
              color: #ababab
            span:nth-child(2)
              flex: 1
              font-size: 24px
              color: #ff6868
              text-align: right
        .other
          padding: 30px
          background-color: #f2f2f2
          p
            font-size: 20px
            color: #9c9c9c
            line-height: 32px
            span
              margin-left: 15px
</style>
