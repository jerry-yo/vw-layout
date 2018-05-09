<template>
  <div class="repair-pre" flexContainer>
    <div class="action-bar">
      <div class="go-back"></div>
      <div class="font">
        订单详情
      </div>
    </div>
    <div class="service-flow">
      <span class="bg bg1">选择服务</span>
      <span>-</span>
      <span class="bg bg2">选择门店</span>
      <span>-</span>
      <span class="bg bg3">确认订单</span>
      <span>-</span>
      <span class="bg bg4">到店服务</span>
    </div>
    <Scroll class="container" ref="repairPre">
      <div class="wrapper">
        <storeInfo></storeInfo>
        <div class="bespoke-date">
          <span>预约时间</span>
          <span>2017年3月26日</span>
        </div>
        <div class="car-info">
          <div> <span>服务车辆</span><div class="right"><img src="../../common/imgs/default.png" alt="">东风本田思域2016款1.5T自动尊耀版</div> </div>
          <div> <span>车牌号</span><span class="right">苏DB5A68</span> </div>
          <div> <span>联系人</span><span class="right">15251916566</span> </div>
        </div>
        <div class="fault-info">
          <div class="title">
            故障概要
          </div>
          <div class="fault-text">
            车子每次启动都发出卡拉卡拉的声音，发动机动力也变差了车子每次启动都发出卡拉卡拉的声音，发动机动力也变差了
          </div>
          <div class="fault-img">
            <ul :class="imgs.length > 4 ? 'more': ''">
              <li v-for="(item, index) in fillImgs" :key="index">
                <img src="" alt="">
              </li>
            </ul>
            <div class="go-img-info"></div>
          </div>
        </div>
        <div class="checkout-menu">
          <div class="title">
            检测单故障 <span>{{'(1' + '/' + '3)'}}</span>
          </div>
          <seleDetectionMenu :check="false"></seleDetectionMenu>
        </div>
      </div>
    </Scroll>
    <div class="place-order">
      <div class="server">客服</div>
      <div class="tips">预约不会产生任何费用 具体情况请到店后有技师介绍</div>
      <div class="btn">确认下单</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from '@/base/scroll/scroll'
import storeInfo from '@/base/store-info'
import seleDetectionMenu from '@/base/sele-detection-menu'
export default {
  name: 'repairPreOrder',
  data () {
    return {
      imgs: [0, 1, 2, 3]
    }
  },
  computed: {
    fillImgs () {
      if (this.imgs.length > 4) {
        let arr = this.imgs.slice(0, 4)
        return arr
      } else {
        return this.imgs
      }
    }
  },
  mounted () {
  },
  components: {
    storeInfo,
    seleDetectionMenu,
    Scroll
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.repair-pre
  background-color: #f4f4f4
  flex-direction: column
  height: 100vh
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
  .service-flow
    height: 70px
    background-color: #fff1e4
    padding: 0 30px
    display: flex
    font-size: 22px
    color: #ff803f
    align-items: center
    justify-content: space-between
    .bg
      padding-left: 30px
      background-size: 40px 40px
      background-repeat: no-repeat
      background-position: -10px center
      &.bg1
        bg-image('../../common/imgs/repair/sele_server')
      &.bg2
        bg-image('../../common/imgs/repair/sele_store')
      &.bg3
        bg-image('../../common/imgs/repair/order')
      &.bg4
        bg-image('../../common/imgs/repair/car')
        background-position: -7px center
  .container
    flex: 1
    overflow: hidden
    .wrapper
      position: relative
      .bespoke-date
        height: 90px
        display: flex
        line-height: 90px
        margin-bottom: 10px
        padding: 0 30px
        background-color: #fff
        span
          flex: 1
          &:nth-child(1)
            font-size: 24px
            color: #ababab
          &:nth-child(2)
            font-size: 22px
            color: #ff8040
            padding-right: 50px
            text-align: right
            bg-image('../../common/imgs/repair/go')
            background-repeat: no-repeat
            background-size: 15px 24px
            background-position: right center
      .car-info
        height: 180px
        display: flex
        flex-direction: column
        padding: 10px 30px
        margin-bottom: 10px
        background-color: #fff
        & > div
          flex: 1
          display: flex
          line-height: 60px
          span:nth-child(1)
            flex: 1
            font-size: 24px
            color: #ababab
          .right
            display: flex
            align-items: center
            padding-left: 60px
            text-align: center
            font-size: 22px
            color: #5b5b5b
            img
              display: inline-block
              width: 50px
              height: overflow
              margin-right: 15px
      .fault-info
        overflow: hidden
        .title
          height: 78px
          background-color: #f2f2f2
          padding: 0 30px
          padding-top: 30px
          line-height: 48px
          font-size: 24px
          color: #ababab
          font-weight: bold
        .fault-text
          background-color: #fff
          padding: 20px 30px
          min-height: 76px
          font-size: 22px
          color: #5b5b5b
          line-height: 36px
        .fault-img
          height: 144px
          display: flex
          padding: 0 30px
          padding-bottom: 34px
          background-color: #fff
          & > ul
            width: 510px
            display: flex
            li
              width: 110px
              margin-right: 10px
              img
                display: block
                width: 110px
                height: 110px
                background-color: rgba(0, 255, 0, 0.5)
            &.more
              bg-image('../../common/imgs/ellipsis')
              background-size: 27px 6px
              background-repeat: no-repeat
              background-position: right center
          .go-img-info
            flex: 1
            bg-image('../../common/imgs/mind/leftright')
            background-size: 15px 24px
            background-repeat: no-repeat
            background-position: right center
      .checkout-menu
        overflow: hidden
        .title
          height: 66px
          padding: 0 30px
          padding-top: 20px
          font-size: 22px
          color: #ababab
          line-height: 46px
          span
            letter-spacing: 3px
            margin-left: 15px
  .place-order
    height: 98px
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
      display: flex
      justify-content: center
      align-items: center
      padding: 0 28px
      font-size: 20px
      color: #b9b9b9
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
