<template>
    <div class="order" flexContainer>
      <div class="title">
        <div class="back" @click="goBack" ></div>
        <span>我的订单</span>
      </div>
      <div class="tab-bar">
        <ul>
          <li :class="{'active-on':orderType === 1}" @click="setOrderType(1)"><span>预约中</span> </li>
          <li :class="{'active-on':orderType === 2}" @click="setOrderType(2)"><span>待确认</span> </li>
          <li :class="{'active-on':orderType === 3}" @click="setOrderType(3)"><span>待付款</span></li>
          <li :class="{'active-on':orderType === 4}" @click="setOrderType(4)"><span>已完成</span></li>
          <li :class="{'active-on':orderType === 5}" @click="setOrderType(5)"><span>已取消</span></li>
        </ul>
      </div>
      <Scroll class="order-container" ref="wrapperOrder">
        <ul class="content">
          <li v-for="item in order" :key="item.index" v-if="item.go === orderType">
            <div class="order-title" @click="goOrderInfo(item)">
              <div class="img"><img src="" alt="">  </div>
              <span class="car-id">苏DB5463</span>
              <div class="order-states" :class="{'by': item.state === 1, 'wx': item.state === 2, 'xc': item.state === 3}"></div>
            </div>
            <div class="order-content"  @click="goOrderInfo(item)">
              <orderBy v-if="item.state === 1">
              </orderBy>
              <orderWx v-if="item.state === 2">
              </orderWx>
              <orderXc v-if="item.state === 3">
              </orderXc>
            </div>
            <div class="order-foot">
              <div class="order-foot-1 foot" v-if="item.go === 1">
                <span class="car-state">已过期</span>
                <div class="order-set">
                  <div class="del-yy">取消预约</div>
                  <div class="call-dz">联系店长</div>
                </div>
              </div>
              <div class="order-foot-2 foot" v-if="item.go === 2">
                <span class="car-state">已到店</span>
                <div class="order-set">
                  <div class="call-dz">联系店长</div>
                  <div class="ok-go">确认服务</div>
                </div>
              </div>
              <div class="order-foot-3 foot" v-if="item.go === 3">
                <span class="car-state">服务进行中</span>
                <div class="order-set">
                  <div class="go-pay">付款</div>
                </div>
              </div>
              <div class="order-foot-4 foot" v-if="item.go === 4">
                <span class="car-state">2017年05月06日 15:30</span>
                <div class="order-set">
                  <div class="look-order">查看该次检测</div>
                </div>
              </div>
              <div class="order-foot-5 foot" v-if="item.go === 5">
                <div class="order-set">
                  <div class="del-order">删除订单</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </Scroll>
    </div>
</template>

<script type="text/ecmascript-6">
import Scroll from '@/base/scroll/scroll'
import orderBy from './order-by'
import orderWx from './order-wx'
import orderXc from './order-xc'
export default {
  name: 'order',
  data () {
    return {
      orderType: 1,
      index: 1,
      orderList: [
        {
          busLogoUrl: 'http://192.168.0.110:8080/chebiao1.png',
          licencePlate: '苏DA111保养',
          orderFormState: 1,
          serviceFinishTime: 1524182400000,
          serviceIsAlreadyFinish: false,
          userOrderFormKeepCarBean: {
            freeServiceOrProductIconUrl: '',
            productAllPrice: 1.0,
            useProductIconUrls: [],
            useProductNumber: 1,
            useServiceNumber: 1
          },
          whichService: 6
        }, {
          busLogoUrl: 'http://192.168.0.110:8080/chebiao2.png',
          licencePlate: '苏DA111保养',
          orderFormState: 1,
          serviceFinishTime: 1524182400000,
          serviceIsAlreadyFinish: true,
          userOrderFormKeepCarBean: {
            freeServiceOrProductIconUrl: 'http://192.168.0.110:8080/free1.jpg',
            productAllPrice: 1.0,
            useProductIconUrls: [
              'http://192.168.0.110:8080/product1.jpg',
              'http://192.168.0.110:8080/product2.jpg'
            ],
            useProductNumber: 1,
            useServiceNumber: 1
          },
          whichService: 6
        }, {
          busLogoUrl: 'http://192.168.0.110:8080/chebiao1.png',
          licencePlate: '苏DA111保养',
          orderFormState: 1,
          serviceFinishTime: 1524182400000,
          serviceIsAlreadyFinish: false,
          userOrderFormKeepCarBean: {
            freeServiceOrProductIconUrl: '',
            productAllPrice: 1.0,
            useProductIconUrls: [
              'http://192.168.0.110:8080/product2.jpg'
            ],
            useProductNumber: 1,
            useServiceNumber: 1
          },
          whichService: 6
        }, {
          busLogoUrl: 'http://192.168.0.110:8080/chebiao2.png',
          licencePlate: '苏DA111普洗',
          orderFormState: 1,
          serviceFinishTime: 1524182400000,
          serviceIsAlreadyFinish: true,
          userOrderFormWashCarBean: {
            washCarServiceDescribe: '我是普洗的描述，我是普洗的描述，我是普洗的描述',
            washCarServiceIcon: '',
            washCarServiceName: '普洗',
            washCarServicePrice: 36.0
          },
          whichService: 5
        }, {
          busLogoUrl: 'http://192.168.0.110:8080/chebiao1.png',
          licencePlate: '苏DA111精洗',
          orderFormState: 1,
          serviceFinishTime: 1524182400000,
          serviceIsAlreadyFinish: false,
          userOrderFormWashCarBean: {
            washCarServiceDescribe: '我是精洗的描述，我是精洗的描述，我是精洗的描述',
            washCarServiceIcon: '',
            washCarServiceName: '精洗',
            washCarServicePrice: 78.0
          },
          whichService: 5
        }, {
          busLogoUrl: 'http://192.168.0.110:8080/chebiao2.png',
          licencePlate: '苏DA111维修',
          orderFormState: 1,
          serviceFinishTime: 1524182400000,
          serviceIsAlreadyFinish: false,
          userOrderFormMaintainCarBean: {
            freeServiceOrProductIconUrl: 'http://192.168.0.110:8080/free2.jpg',
            maintainDescribe: '',
            productAllPrice: 3.0,
            useProductIconUrls: [],
            useProductNumber: 1,
            useServiceNumber: 2
          },
          whichService: 7
        }, {
          busLogoUrl: 'http://192.168.0.110:8080/chebiao1.png',
          licencePlate: '苏DA111维修',
          orderFormState: 1,
          serviceFinishTime: 1524182400000,
          serviceIsAlreadyFinish: true,
          userOrderFormMaintainCarBean: {
            freeServiceOrProductIconUrl: '',
            maintainDescribe: '',
            productAllPrice: 6.0,
            useProductIconUrls: [
              'http://192.168.0.110:8080/product2.jpg'
            ],
            useProductNumber: 3,
            useServiceNumber: 5
          },
          whichService: 7
        }, {
          busLogoUrl: 'http://192.168.0.110:8080/chebiao2.png',
          licencePlate: '苏DA111维修',
          orderFormState: 1,
          serviceFinishTime: 1524182400000,
          serviceIsAlreadyFinish: false,
          userOrderFormMaintainCarBean: {
            freeServiceOrProductIconUrl: 'http://192.168.0.110:8080/free1.jpg',
            maintainDescribe: '',
            productAllPrice: 12.0,
            useProductIconUrls: [
              'http://192.168.0.110:8080/product1.jpg',
              'http://192.168.0.110:8080/product2.jpg'
            ],
            useProductNumber: 8,
            useServiceNumber: 9
          },
          whichService: 7
        }
      ]
    }
  },
  computed: {
    order () {
      let arr = []
      for (let i = 0; i < 10; i++) {
        arr.push({
          index: i,
          state: i % 3 === 0 ? 3 : i % 3,
          go: i % 5 === 0 ? 5 : i % 5
        })
      }
      return arr
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    setOrderType (id) {
      this.orderType = id
    },
    gogo () {
      console.log('000')
    },
    goOrderInfo (res) {
      console.log(res)
      this.$router.push('/orderinfo?res=' + JSON.stringify(res))
    }
  },
  mounted () {
  },
  components: {
    orderBy,
    orderWx,
    orderXc,
    Scroll
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .order
    flex-direction: column
    height: 100vh
    background-color: #f4f4f4
    overflow: hidden
    .title
      position: relative
      height: 88px
      background-color: #fff
      & > span
        position: absolute
        left: 0
        top: 0
        right: 0
        bottom: 0
        margin: auto
        display: inline-block
        width: 160px
        height: 86px
        text-align: center
        line-height: 86px
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
    .tab-bar
      display: flex
      justify-content: center
      height: 82px
      background-color: #fafafa
      margin-bottom: 10px
      & > ul
        display: flex
        height: 82px
        li
          margin: 0px 31px
          font-size: 26px
          color: #5b5b5b
          line-height: 82px
          &.active-on
            color: #ff8040
    .order-container
      flex: 1
      overflow: hidden
      .content
        position: relative
        overflow: hidden
        li
          overflow: hidden
          margin-bottom: 10px
          .order-title
            display: flex
            align-items: center
            height: 70px
            background-color: #fff
            line-height: 70px
            padding: 0px 30px
            .img
              width: 40px
              height: 40px
              margin-right: 28px
              background-color: pink
            .car-id
              font-size: 26px
              color: #5b5b5b
              margin-right: 29px
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
          .order-content
            overflow: hidden
          .order-foot
            display: flex
            height: 78px
            background-color: #fff
            padding: 0px 30px
            .foot
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
                color: #acacac
                font-size: 20px
              .order-set
                .del-yy
                  border: 1px solid #bcbcbc
                  border-radius: 5px
                  color: #bcbcbc
                .call-dz
                  border: 1px solid #ff8040
                  border-radius: 5px
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
              .car-state
                float: left
                line-height: 78px
                color: #ff8040
                font-size: 20px
              .order-set
                .go-pay
                  bg-image('../../common/imgs/btn-bg')
                  color: #fff
                .ungo-pay
                  background-image: #c5c5c5
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
