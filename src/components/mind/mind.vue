<template>
  <div class="mind">
    <div class="user-core" w-750-240 aspectratio aspect-ratio="750/240">
      <div class="user-con" aspectratio-content>
        <div class="user-head">
          <span>个人中心</span>
          <div class="user-xx"></div>
          <div class="user-sz"></div>
        </div>
        <div class="user-info">
          <div class="user-img">
            <img src="./yy@3x.png" alt="">
          </div>
          <div class="user-xm">
            <span>{{name}}</span>
            <div class="user-card">
              <span></span>
            </div>
          </div>
          <div class="user-go">
            <span>个人资料</span>
          </div>
        </div>
      </div>

    </div>
    <div class="user-order" flexContainer>
      <div class="my-order">
        <div class="order-title">我的订单</div>
        <div class="all-order">
          <span>全部订单</span>
        </div>
      </div>
      <div class="order-states">
        <div class="dfk-order">
          <span>待付款</span>
        </div>
        <div class="other-order">
          <div class="box"></div>
          <div class="yy-order">
            <span>预约中</span>
          </div>
          <div class="box"></div>
          <div class="dqr-order">
            <span>待确认</span>
          </div>
          <div class="box"></div>
          <div class="wc-order">
            <span>已完成</span>
          </div>
          <div class="box"></div>
          <div class="qx-order">
            <span>已取消</span>
          </div>
        </div>
      </div>
    </div>
    <div class="use-list">
      <div class="car">

      </div>
      <div class="quan">

      </div>
      <div class="kefu">

      </div>
      <div class="banben">

      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'mind',
  data () {
    return {
      name: '绿鲤鱼红鲤鱼与驴'
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  [w-750-240]
    background: url(../../common/imgs/mindbg.png) no-repeat center top
    background-size: 750px 240px
    overflow: hidden
  [w-750-240]
    aspect-ratio:'750:240'
  .mind
    width: 750px
    .user-core
      margin-bottom: 20px
      .user-con
        display: flex
        flex-direction: column
        box-sizing: border-box
        padding: 0 30px
      .user-head
        height: 88px
        & > span
          display: inline-block
          width: 180px
          line-height: 88px
          color: #fff
          font-size: 40px
          font-weight: 600
          transform: skewX(-15deg)
        .user-xx
          bg-image('xx')
        .user-sz
          bg-image('sz')
        .user-xx, .user-sz
          display: inline-block
          width: 83px
          height: 88px
          float: right
          margin-left: 20px
          background-position: center right
          background-size: 42px 42px
          background-repeat: no-repeat
      .user-info
        flex: 1
        display: flex
        padding-top: 30px
        .user-img
          display: inline-block
          width: 98px
          height: 98px
          border: 4px solid #fff
          background-color: #999
          margin-right: 32px
          float: left
        .user-xm
          flex: 1
          display: flex
          flex-direction: column
          float: left
          height: 100%
          & > span
            display: inline-block
            width: 300px
            height: 55px
            font-size: 30px
            color: #fff
            line-height: 55px
            font-weight: 600
            no-wrap()
          .user-card
            width: 88px
        .user-go
          flex: 1
          line-height: 74px
          height: 74px
          font-size: 24px
          color: #fff
          text-align: left
          bg-image('sj')
          background-size: 11px 17px
          background-repeat: no-repeat
          background-position: right center
          span
            float: right
            margin-right: 22px
    .user-order
      flex-direction: column
      height: 220px
      background-color: #fff
      margin-bottom: 20px
      .my-order
        display: flex
        padding: 0 30px
        height: 80px
        border-bottom: 1px solid #d8d8d8
        line-height: 80px
        .order-title
          flex: 1
          bg-image('mdd')
          background-size: 25px 25px
          background-position: left center
          background-repeat: no-repeat
          font-size: 28px
          color: #747474
          padding-left: 43px
        .all-order
          flex: 1
          width: 126px
          font-size: 24px
          color: #bcbcbc
          bg-image('leftright')
          background-size: 15px 24px
          background-position: center right
          background-repeat: no-repeat
          span
            float: right
            margin-right: 30px
      .order-states
        flex: 1
        padding-top: 31px
        display: flex
        align-items: center
        justify-content: center
        overflow: hidden
        span
          font-size: 20px
          color: #979696
          line-height: 52px
        .dfk-order
          width: 90px
          height: 94px
          padding-top: 42px
          bg-image('qb')
          background-size: 42px 42px
          background-position: center top
          background-repeat: no-repeat
          text-align: center
        .other-order
          display: flex
          width: 580px
          .box
            flex: 1
          .yy-order, .dqr-order, .wc-order, .qx-order
            width: 90px
            padding-top: 42px
            background-size: 42px 42px
            background-position: center top
            background-repeat: no-repeat
          .yy-order
            bg-image('yy')
          .dqr-order
            bg-image('dqr')
          .wc-order
            bg-image('wc')
          .qx-order
            bg-image('qx')
    .use-list
      width: 100%
      height: auto
      & > div
        width: 100%
        height: 90px
        margin-bottom: 10px
        background-color: #fff

</style>
