<template>
  <div class="maintain" flexContainer>
    <div class="action-bar">
      <div class="go-back"></div>
      <div class="font">
        <h2>东风本田-思域</h2>
        <p><span>苏DB5A68</span><span>丨</span><span>2300km</span></p>
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
    <div class="container" ref="maintain">
      <div class="wrapper">
        <serverModel v-for="(item, index) in serverList" :key="index" :server="item" :serverid="index"></serverModel>
      </div>
    </div>
    <div class="place-order">
      <div class="server">客服</div>
      <div class="tips">
        <div class="nums">
          不包含服务费
        </div>
        <div class="money">
          <span>共{{'1'}}项服务</span>
          <span>{{'￥2000.00'}}</span>
        </div>
      </div>
      <div class="btn">确认下单</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import serverModel from '@/base/server-model'
import BScorll from 'better-scroll'
export default {
  name: 'maintain',
  data () {
    return {
      maintainBScroll: null,
      serverList: [
        {
          groupItem: {
            keepServiceFirstItemBean: {
              bottomRemark: '5000km/次',
              serviceName: '保养常规服务',
              rightRemark: '共2个商品',
              isRecommend: true
            },
            isChecked: true,
            action: true,
            state: 2
          },
          subItems: [
            {
              keepServiceSecondItemBean: {
                classify: '级别11',
                commodityImageUrl: 'url',
                viscosity: '粘度11',
                trademark: '品牌11',
                specification: '规格11',
                remarkHint: '',
                minCommodityNumber: 1,
                commodityPrice: 200.0,
                commodityNumber: 1
              },
              isChecked: true,
              action: true,
              state: 1
            }, {
              keepServiceSecondItemBean: {
                classify: '级别12',
                commodityImageUrl: 'url',
                viscosity: '粘度12',
                trademark: '品牌12',
                specification: '规格12',
                remarkHint: '',
                minCommodityNumber: 1,
                commodityPrice: 200.0,
                commodityNumber: 1
              },
              isChecked: true,
              action: true,
              state: 1
            }
          ]
        }, {
          groupItem: {
            keepServiceFirstItemBean: {
              bottomRemark: '4000km/次',
              serviceName: '更换空调滤清器',
              rightRemark: '共3个商品',
              isRecommend: false
            },
            isChecked: false,
            action: false,
            state: 1
          },
          subItems: [
            {
              keepServiceSecondItemBean: {
                classify: '级别21',
                commodityImageUrl: 'url',
                viscosity: '粘度21',
                trademark: '品牌21',
                specification: '规格21',
                remarkHint: '',
                minCommodityNumber: 1,
                commodityPrice: 200.0,
                commodityNumber: 1
              },
              isChecked: false,
              action: -1,
              state: -1
            }, {
              keepServiceSecondItemBean: {
                classify: '级别22',
                commodityImageUrl: 'url',
                viscosity: '粘度22',
                trademark: '品牌22',
                specification: '规格22',
                remarkHint: '',
                minCommodityNumber: 1,
                commodityPrice: 200.0,
                commodityNumber: 1
              },
              isChecked: false,
              action: -1,
              state: -1
            }
          ]
        }, {
          groupItem: {
            keepServiceFirstItemBean: {
              bottomRemark: '3000km/次',
              serviceName: '更换燃油滤清器',
              rightRemark: '共4个商品',
              isRecommend: false
            },
            isChecked: false,
            action: false,
            state: 1
          },
          subItems: [
            {
              keepServiceSecondItemBean: {
                classify: '级别31',
                commodityImageUrl: 'url',
                viscosity: '粘度31',
                trademark: '品牌31',
                specification: '规格31',
                remarkHint: '',
                minCommodityNumber: 1,
                commodityPrice: 200.0,
                commodityNumber: 1
              },
              isChecked: false,
              action: -1,
              state: -1
            }, {
              keepServiceSecondItemBean: {
                classify: '级别32',
                commodityImageUrl: 'url',
                viscosity: '粘度32',
                trademark: '品牌32',
                specification: '规格32',
                remarkHint: '',
                minCommodityNumber: 1,
                commodityPrice: 200.0,
                commodityNumber: 1
              },
              isChecked: false,
              action: -1,
              state: -1
            }
          ]
        }, {
          groupItem: {
            keepServiceFirstItemBean: {
              bottomRemark: '2000km/次',
              serviceName: '更换空气滤清器',
              rightRemark: '共5个商品',
              isRecommend: false
            },
            isChecked: false,
            action: false,
            state: 1
          },
          subItems: [
            {
              keepServiceSecondItemBean: {
                classify: '级别41',
                commodityImageUrl: 'url',
                viscosity: '粘度41',
                trademark: '品牌41',
                specification: '规格41',
                remarkHint: '',
                minCommodityNumber: 1,
                commodityPrice: 200.0,
                commodityNumber: 1
              },
              isChecked: false,
              action: -1,
              state: -1
            }, {
              keepServiceSecondItemBean: {
                classify: '级别42',
                commodityImageUrl: 'url',
                viscosity: '粘度41',
                trademark: '品牌42',
                specification: '规格42',
                remarkHint: '',
                minCommodityNumber: 1,
                commodityPrice: 200.0,
                commodityNumber: 1
              },
              isChecked: false,
              action: -1,
              state: -1
            }
          ]
        }
      ]
    }
  },
  mounted () {
    this.$nextTick(function () {
      sessionStorage.setItem('serverList', JSON.stringify(this.serverList))
      this.maintainBScroll = new BScorll(this.$refs.maintain, {
        click: true
      })
    })
  },
  components: {
    serverModel
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.maintain
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
      h2
        font-size: 30px
        line-height: 42px
        color: #5b5b5b
        font-weight: bolder
        transform: skewX(-10deg)
      p
        font-size: 22px
        color: #5b5b5b
        line-height: 34px
        span:nth-child(2)
          margin: 0 15px
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
      padding-top: 20px
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
