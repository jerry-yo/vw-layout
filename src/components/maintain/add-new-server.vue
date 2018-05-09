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
        <div class="service-catalog" v-for="(res, resid) in newServer" :key="resid">
          <div class="service-title">{{res.serviceCatalog}}</div>
          <serverModel v-for="(item, index) in res.serviceCon" :key="index" :server="item" :serverid="index" :addServer="false"></serverModel>
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
      <div class="btn">添加</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import serverModel from '@/base/server-model'
import Scroll from '@/base/scroll/scroll'
export default {
  name: 'maintain',
  data () {
    return {
      checkServer: [],
      newServer: [
        {
          serviceCatalog: '雨刮器',
          serviceId: 1,
          serviceCon: [
            {
              groupItem: {
                keepServiceFirstItemBean: {
                  bottomRemark: '5000km/次',
                  serviceName: '雨刮器',
                  rightRemark: '共2个商品',
                  isRecommend: true
                },
                isChecked: false,
                action: false,
                state: 1
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
            }
          ]
        }, {
          serviceCatalog: '制动系统',
          serviceId: 2,
          serviceCon: [
            {
              groupItem: {
                keepServiceFirstItemBean: {
                  bottomRemark: '4000km/次',
                  serviceName: '刹车油',
                  rightRemark: '共2个商品',
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
            },
            {
              groupItem: {
                keepServiceFirstItemBean: {
                  bottomRemark: '3000km/次',
                  serviceName: '刹车片',
                  rightRemark: '共2个商品',
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
            }
          ]
        }, {
          serviceCatalog: '制动系统',
          serviceId: 3,
          serviceCon: [
            {
              groupItem: {
                keepServiceFirstItemBean: {
                  bottomRemark: '2000km/次',
                  serviceName: '空调滤清器',
                  rightRemark: '共2个商品',
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
            },
            {
              groupItem: {
                keepServiceFirstItemBean: {
                  bottomRemark: '2000km/次',
                  serviceName: '空调制冷剂',
                  rightRemark: '共2个商品',
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
            },
            {
              groupItem: {
                keepServiceFirstItemBean: {
                  bottomRemark: '2000km/次',
                  serviceName: '蒸发箱清洗',
                  rightRemark: '共2个商品',
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
      ]
    }
  },
  computed: {
    allPrice () {
      let price = 0
      this.newServer.forEach((ree) => {
        ree.serviceCon.forEach((item, index) => {
          if (item.groupItem.isChecked) {
            item.subItems.forEach((res, id) => {
              if (res.isChecked) {
                price += res.keepServiceSecondItemBean.minCommodityNumber * res.keepServiceSecondItemBean.commodityPrice
              }
            })
          }
        })
      })
      return price
    },
    allServerNum () {
      let nums = 0
      this.newServer.forEach((ree) => {
        ree.serviceCon.forEach((item, index) => {
          if (item.groupItem.isChecked) {
            nums++
          }
        })
      })
      return nums
    }
  },
  methods: {
    _goBack () {
      this.$router.go(-1)
    }
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
