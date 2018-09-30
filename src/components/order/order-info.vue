<template>
  <div class="order-info" flexContainer>
    <div class="title">
      <div class="back" @click="goBack" ></div>
      <span>订单详情</span>
    </div>
    <Scroll class="order-content" ref="orderWarpper" :data="orderInfoShow">
      <div class="order-con">
        <div class="order-img" v-if="(orderType === 'yyz' && isExpiryTime.flag) || orderType === 'yqx'">
          <div class="order-bg-1 order-bg">
            <div :class="{'bg-3': isExpiryTime.flag, 'bg-1': orderType === 'yqx'}">
            </div>
            <div class="bg-font">
              预约{{true ? '已过期' : '已取消'}}
            </div>
          </div>
        </div>
        <div class="order-img" v-if="orderType === 'ywc'">
          <div class="order-bg-2 order-bg">
            <div class="bg-1">
            </div>
            <div class="bg-font">
              <span>服务完成</span>
              <h2>奇特异维修门店{{orderInfoShow.stationName.replace(/奇特异车业科技（江苏）股份有限公司/, ' - ')}}</h2>
            </div>
          </div>
        </div>
        <div class="order-title" v-if="orderInfoShow.stationName">
          <div class="top">
            <div class="top-name">
              <span>奇特异维修门店{{orderInfoShow.stationName.replace(/奇特异车业科技（江苏）股份有限公司/, ' - ')}}</span>
              <div class="order-states" :class="{'by': orderInfoShow.memoInfos.serverState === 1, 'wx': orderInfoShow.memoInfos.serverState === 2}"></div>
            </div>
            <div class="localtion" @click="_openLocation"></div>
          </div>
          <div class="bottom">
            <span>{{orderInfoShow.orderUserName}}</span>
            <span>{{orderInfoShow.userCarUnmber}}</span>
          </div>
        </div>
        <div class="order-con" v-if="orderInfoShow.memoInfos"  @click="goPartAndServerInfo">
          <orderBy v-if="(orderType === 'yyz' || orderType === 'yqx') && orderInfoShow.memoInfos.serverState === 1" :data="orderInfoShow.memoInfos" :money="'other'"></orderBy>
          <orderWx v-if="(orderType === 'yyz' || orderType === 'yqx') && orderInfoShow.memoInfos.serverState === 2" :data="orderInfoShow.memoInfos">
          </orderWx>
        </div>
        <div class="order-other" v-if="orderInfoShow.memoInfos">
          <div class="other-info">
            <div class="other-fw" v-if="orderType === 'yyz' || orderType === 'yqx'">
              <span>项目服务费</span>
              <span>{{orderInfoShow.memoInfos.serverState === 1 ? '￥' + orderInfoShow.memoInfos.serverMoney : '待定'}}</span>
            </div>
            <div class="other-yhq" v-if="false">
              <div class="yhq-con">
                <span>优惠券</span>
                <div class="yhq">
                  <span>暂无优惠券</span>
                </div>
              </div>
            </div>
            <div class="time-yy">
              <span>预约时间</span>
              <div class="time">
                <span>{{getFormatDate(orderInfoShow.orderReserveDate + orderInfoShow.orderReserveStart + 8 * 60 * 60 * 1000)}}</span>
              </div>
            </div>
            <div class="time-over">
              <span>到期时间</span>
              <div class="time">
                <span>{{getFormatDate(orderInfoShow.memoInfos.expireTemp, '---expire')}}</span>
              </div>
            </div>
          </div>
          <div class="order-money" v-if="orderType === 'ywc'">
            <p>配件费 <span>{{'￥' + 100}}</span>  </p>
            <p>优惠 <span class="green">{{'￥' + 200}}</span>  </p>
            <p>实付 <span class="red">{{'￥' + 300}}</span>  </p>
          </div>
          <div class="other">
            <p>预约单号:  <span>{{orderInfoShow.reservationNumber}}</span> </p>
            <p>下单时间:  <span>{{orderInfoShow.memoInfos.orderTime}}</span> </p>
            <p v-if="true">预约时间:  <span>{{getFormatDate(orderInfoShow.orderReserveDate + orderInfoShow.orderReserveStart + 8 * 60 * 60 * 1000)}}</span> </p>
            <p v-if="orderType === 'dfk'">到店时间:  <span>{{4}}</span> </p>
            <p v-if="orderType === 'ywc'">完工时间:  <span>{{5}}</span> </p>
          </div>
        </div>
      </div>
    </Scroll>
    <div class="order-btn" v-if="orderType !== 'yqx' || orderType === 'ywc'">
      <div class="order-foot-1 foot" v-show="orderType === 'yyz'">
        <span class="car-state">{{isExpiryTime.str}}</span>
        <div class="order-set">
          <div class="del-yy" @click="_cancelSubscribe">取消预约</div>
          <div class="call-dz"><a :href="'tel:' + orderInfoShow.responserTel">联系店长</a></div>
        </div>
      </div>
      <div class="order-foot-3" v-if="orderType === 'dfk'">
        <div class="server"><a href="tel: 0519-68191385">客服</a></div>
        <div class="tips">
          <span>共{{2}}项服务</span>
          <span>￥{{100}}</span>
        </div>
        <div class="btn">付款</div>
      </div>
    </div>
    <checkInfo v-if="faultInfoState" :data="orderInfoShow.memoInfos" :from="'order'" @closemask="closeCheckInfo"></checkInfo>
  </div>
</template>

<script>
import Wx from 'Wx'
import Scroll from '@/base/scroll/scroll'
import orderBy from '@/components/order/order-by'
import orderWx from '@/components/order/order-wx'
import checkInfo from '@/base/check-info'
import {expireToken, cancelOrderYy} from '@/common/js/mixin'
import {handleWxOrder, handleByOrder, handleOrderPartList} from '@/common/js/config'
import {formatDate} from '@/common/js/date'
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'order-info',
  mixins: [expireToken, cancelOrderYy],
  data () {
    return {
      orderId: null,
      orderType: null,
      orderInfoShow: {},
      cancelOrderInfo: {},
      stationCode: '',
      faultInfoState: false
    }
  },
  computed: {
    isExpiryTime () {
      let now = new Date().getTime()
      let str = ''
      let flag = false
      if (this.orderInfoShow.memoInfos) {
        if (this.orderInfoShow.memoInfos.expireTemp < now) {
          str = '已过期'
          flag = true
        } else if (this.orderInfoShow.orderStatus === 5) {
          str = '已接收'
        }
      }
      return {
        str: str,
        flag: flag
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  mounted () {
    this.orderId = this.$route.query.id
    this.orderType = this.$route.query.type
    this.stationCode = this.$route.query.code ? this.$route.query.code : ''
    if (!this.orderId) {
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
      this.$get(`${this.f6Url}/api/clientOrder/info`, {
        'Authorization': this.userInfo.token
      }, (res) => {
        if (res.code === 401) {
          this.refreshToken(this._getOrderInfo)
        } else if (res.code === 200) {
          this.orderInfoShow = this.handleOrderInfo(res.data)
        }
      }, {
        orderId: this.orderId,
        clientAppId: this.userInfo.appId,
        clientUserId: this.userInfo.fUserId
      })
    },
    handleOrderInfo (data) {
      let arr = data.memo.split('\uA856')
      let memoInfos = null
      if (/维修/.test(arr[1])) {
        memoInfos = handleWxOrder(arr)
      }
      if (/保养/.test(arr[1])) {
        memoInfos = handleByOrder(arr)
      }
      return Object.assign(data, {
        memoInfos: memoInfos,
        stationCode: this.stationCode,
        carNumber: data.userCarUnmber,
        handleOrderPartList: handleOrderPartList(data.orderPartList)
      })
    },
    _openLocation () {
      Wx.openLocation({
        latitude: parseFloat(this.orderInfoShow.memoInfos.stationPositionY),
        longitude: parseFloat(this.orderInfoShow.memoInfos.stationPositionX),
        name: '',
        address: this.orderInfoShow.stationName,
        scale: 14,
        infoUrl: ''
      })
    },
    getFormatDate (temp, res) {
      console.log(temp, res)
      return formatDate('YYYY年MM月DD日 hh:mm:ss', parseFloat(temp))
    },
    _cancelSubscribe () {
      let _self = this
      this.$Modal.confirm({
        title: '提示信息',
        content: '是否取消预约订单？',
        onCancel: () => {
          _self.$Modal.remove()
        },
        onOk: () => {
          _self.cancelOrderInfo = _self.orderInfoShow
          _self.cancelOrderState()
          _self.$Modal.remove()
        }
      })
    },
    goPartAndServerInfo () {
      if (this.orderInfoShow.memoInfos.serverState === 1) {
        this.setSeleServerInfo(this.orderInfoShow.handleOrderPartList)
        this.$router.push('/server-info')
      } else if (this.orderInfoShow.memoInfos.serverState === 2) {
        if (this.orderInfoShow.memoInfos.faultImgs.length === 0 && this.orderInfoShow.memoInfos.faultText.length === 0) {
          this.$Toast({
            position: 'bottom',
            message: '暂无故障描述'
          })
        } else {
          this.faultInfoState = true
        }
      }
    },
    closeCheckInfo () {
      this.faultInfoState = false
    },
    ...mapMutations({
      setSeleServerInfo: 'SET_SELE_SERVERS_INFO'
    })
  },
  components: {
    orderBy,
    orderWx,
    Scroll,
    checkInfo
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
          .other-fw
            display: flex
            padding: 0px 30px
            height: 72px
            line-height: 72px
            background-color: #fff
            margin-bottom: 10px
            span:nth-child(1)
              flex: 1
              font-size: 24px
              color: #ababab
            span:nth-child(2)
              flex: 1
              font-size: 24px
              color: #ff6868
              text-align: right
          .other-yhq
            display: flex
            padding: 0px 30px
            margin-bottom: 10px
            height: 72px
            background-color: #fff
            .yhq-con
              flex: 1
              display: flex
              font-size: 24px
              color: #868686
              line-height: 72px
              bg-image('../../common/imgs/mind/yhq')
              background-size: 25px 25px
              background-repeat: no-repeat
              background-position: left center
              & > span
                margin-left: 55px
              .yhq
                flex: 1
                text-align: right
                padding-right: 35px
                bg-image('../../common/imgs/mind/leftright')
                background-size: 15px 24px
                background-repeat: no-repeat
                background-position: right center
          .time-yy
            display: flex
            height: 60px
            padding: 0px 30px
            background-color: #fff
            line-height: 60px
            span
              flex: 1
              font-size: 24px
              color: #ababab
            .time
              flex: 1
              text-align: right
              font-size: 24px
              span
                margin-left: 10px
                color: #ff8040
          .time-over
            display: flex
            height: 60px
            padding: 0px 30px
            background-color: #fff
            line-height: 60px
            span
              flex: 1
              font-size: 24px
              color: #ababab
            .time
              flex: 1
              text-align: right
              font-size: 24px
              span
                margin-left: 10px
                color: #5b5b5b
        .order-money
          padding: 0px 30px
          overflow: hidden
          background-color: #fff
          p
            height: 60px
            line-height: 60px
            font-size: 24px
            color: #5b5b5b
            span
              float: right
            .green
              color: #68e07e
            .red
              color: #ff7474
        .other
          padding: 30px
          background-color: #f2f2f2
          p
            font-size: 20px
            color: #9c9c9c
            line-height: 32px
            span
              margin-left: 15px
    .order-btn
      display: flex
      justify-content: center
      align-items: center
      height: 98px
      background-color: #fff
      .foot
        padding: 0px 30px
        flex: 1
        .order-set
          display: flex
          height: 78px
          align-items: center
          float: right
          overflow: hidden
          & > div
            width: 120px
            height: 48px
            margin-left: 18px
            font-size: 20px
            line-height: 48px
            text-align: center
            background-size: 100% 100%
            background-repeat: no-repeat
            background-position: center center
      .order-foot-1
        .car-state
          float: left
          line-height: 78px
          color: #ff8040
          font-size: 20px
        .order-set
          .del-yy
            border: 1px solid #bcbcbc
            border-radius: 5px
            color: #bcbcbc
          .call-dz
            border: 1px solid #ff8040
            border-radius: 5px
            a
              color: #ff8040
      .order-foot-2
        .car-state
          float: left
          line-height: 78px
          color: #ff8040
          font-size: 20px
        .order-set
          .ok-go
            bg-image('../../common/imgs/btn-bg')
            color: #ff
          .call-dz
            border: 1px solid #ff8040
            border-radius: 5px
            color: #ff8040
      .order-foot-3
        flex: 1
        display: flex
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
          padding: 0 10px
          display: flex
          padding-top: 48px
          line-height: 50px
          span:nth-child(1)
            color: #999999
            font-size: 12px
          span:nth-child(2)
            flex: 1
            display: flex
            justify-content: flex-end
            color: #de3e56
            font-size: 14px
            font-weight: bold
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
      .order-foot-4
        .car-state
          float: left
          line-height: 78px
          color: #acacac
          font-size: 20px
        .order-set
          .look-order
            width: 160px
            border: 1px solid #ff8040
            border-radius: 5px
            color: #ff8040
      .order-foot-5
        .order-set
          .del-order
            border: 1px solid #5b5b5b
            border-radius: 5px
            color: #5b5b5b
</style>
