<template>
  <div class="order-test">
    <div class="order-title">
      <span>本次车辆检测故障（{{checkOut + '/' + orderTest}}）</span>
      <span>查看检测单</span>
    </div>
    <div class="order-content">
      <ul>
        <li v-for="(item, index) in orderTests" :key="index">
          <div class="check" :class="{'check-in': item.check === 1, 'check-out': item.check === 0, 'check-no': item.checkno}" @click="checkIn(index)">
            <span :class="{'fontbg': item.checkno}">{{item.name}}</span>
            <span :class="{'err': item.state === 1, 'warn': item.state === 2}"></span>
          </div>
          <div class="go-info">
            <span>{{item.info}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="order-warn">
      <span>灰色项服务请在本次服务后，在首页的“检测单”及“维修”中重新预约</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderTest',
  data () {
    return {
      orderTest: 3,
      checkOut: 0,
      orderTests: [{
        index: 0,
        name: '雨刮器',
        state: 2,
        info: '转向系统误差太大，需要调校',
        checkno: false,
        check: 0
      }, {
        index: 1,
        name: '转向系统',
        state: 1,
        info: '雨刮器折损，需要跟换新的雨刮器',
        checkno: true,
        check: 0
      }, {
        index: 2,
        name: '轮胎',
        state: 1,
        info: '轮胎磨损严重，需要及时修理',
        checkno: false,
        check: 0
      }]
    }
  },
  methods: {
    checkIn (id) {
      if (!this.orderTests[id].checkno) {
        this.orderTests[id].check === 1 ? this.orderTests[id].check = 0 : this.orderTests[id].check = 1
      }
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .order-test
    overflow: hidden
    .order-title
      display: flex
      height: 75px
      line-height: 75px
      background-color: #f2f2f2
      padding: 0px 30px
      span:nth-child(1)
        flex: 1
        font-size: 22px
        color: #5b5b5b
      span:nth-child(2)
        width: 155px
        bg-image('../../common/imgs/orderinfo/test-order')
        background-repeat: no-repeat
        background-size: 22px 26px
        background-position: left center
        font-size: 24px
        color: #9e9e9e
        text-align: right
        line-height: 77px
    .order-content, ul
      overflow: hidden
      li
        display: flex
        height: 90px
        background-color: #fff
        padding: 0 30px
        .check
          flex: 1
          display: flex
          background-size: 30px 30px
          background-repeat: no-repeat
          background-position: left center
          line-height: 90px
          padding-left: 68px
          &.check-in
            bg-image('../../common/imgs/orderinfo/check-in')
          &.check-out
            bg-image('../../common/imgs/orderinfo/check-out')
          &.check-no
            bg-image('../../common/imgs/orderinfo/check-no')
          span:nth-child(1)
            font-size: 28px
            color: #5b5b5b
            &.fontbg
              color: #bcbcbc
          span:nth-child(2)
            flex: 1
            background-size: 78px 56px
            background-repeat: no-repeat
            background-position: left center
            margin-left: 20px
            &.err
              bg-image('../../common/imgs/orderinfo/err')
            &.warn
              bg-image('../../common/imgs/orderinfo/warn')
        .go-info
          flex: 1
          bg-image('../../common/imgs/mind/leftright')
          background-size: 15px 24px
          background-repeat: no-repeat
          background-position: right center
          span
            float: right
            display: inline-block
            width: 110px
            height: 90px
            line-height:90px
            margin-right: 28px
            overflow: hidden
            white-space: nowrap
            text-overflow:ellipsis
            font-size: 22px
            color: #bcbcbc
    .order-warn
      display: flex
      padding: 0px 30px
      height: 63px
      span
        flex: 1
        padding-left: 35px
        line-height: 63px
        font-size: 20px
        color: #7e7e7e
        bg-image('../../common/imgs/orderinfo/test')
        background-size: 23px 23px
        background-repeat: no-repeat
        background-position: left center
</style>
