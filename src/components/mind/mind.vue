<template>
  <div class="mind">
    <div class="user-core" w-750-240 aspectratio aspect-ratio="750/240">
      <div class="user-con" aspectratio-content>
        <div class="user-head">
          <span>个人中心</span>
          <div class="user-xx"></div>
          <div class="user-sz" @click="_goSetUp"></div>
        </div>
        <div class="user-info">
          <div class="user-img">
            <img v-lazy="userInfo.imgSource" alt="">
          </div>
          <div class="user-xm" v-if="userInfo.token">
            <span>{{userInfo.name ? userInfo.name : userInfo.userTel}}</span>
            <div class="user-card">
              <span></span>
            </div>
          </div>
          <div class="user-cm" v-else>
            <div>
              <span @click="goLogin">登录</span><span class="pad">/</span><span @click="goRegister">注册</span>
            </div>
          </div>
          <div class="user-go" @click="_goMyInfo">
            <span>个人资料</span>
          </div>
        </div>
      </div>

    </div>
    <div class="user-order" flexContainer>
      <div class="my-order">
        <div class="order-title">我的订单</div>
        <div class="all-order" @click="_goOrder(1)">
          <!-- <router-link :to="{ name: 'subscribe', path: '/order/subscribe' }"> -->
          <span>全部订单</span>
          <!-- </router-link> -->
        </div>
      </div>
      <div class="order-states">
        <div class="dfk-order">
          <!-- <router-link :to="{ name: 'subscribe', path: '/order/subscribe' }" class="link-a"> -->
            <div class="link-a" @click="_goOrder(1)">
              <Badge count="0" :solid="false" :color="'#ff623d'">
                <div class="img"></div>
              </Badge>
              <span>预约中</span>
            </div>
          <!-- </router-link> -->
        </div>
        <!-- <div class="yy-order">
          <router-link :to="{ name: 'confirmed', path: '/order/confirmed' }" class="link-a">
            <Badge  count="22" :solid="false" :color="'#ff623d'">
              <div class="img"></div>
            </Badge>
            <span>待确认</span>
          </router-link>
        </div> -->
        <div class="dqr-order">
          <!-- <router-link :to="{ name: 'obligation', path: '/order/obligation'}" class="link-a"> -->
          <div class="link-a" @click="_goOrder(2)">
            <Badge  count="0" :solid="false" :color="'#ff623d'">
              <div class="img"></div>
            </Badge>
            <span>待付款</span>
          </div>
          <!-- </router-link> -->
        </div>
        <div class="wc-order">
          <!-- <router-link :to="{ name: 'complete', path: '/order/complete' }" class="link-a"> -->
          <div class="link-a" @click="_goOrder(3)">
            <Badge  count="0" :solid="false" :color="'#ff623d'">
              <div class="img"></div>
            </Badge>
            <span>已完成</span>
          </div>
          <!-- </router-link> -->
        </div>
        <div class="qx-order">
          <!-- <router-link :to="{ name: 'cancel', path: '/order/cancel' }" class="link-a"> -->
          <div class="link-a" @click="_goOrder(4)">
            <Badge  count="0" :solid="false" :color="'#ff623d'">
              <div class="img"></div>
            </Badge>
            <span>已取消</span>
          </div>
          <!-- </router-link> -->
        </div>
      </div>
    </div>
    <div class="use-list">
      <div class="car" @click="_goGarage">
        <span>我的车库</span>
        <div class="car-title title">
          <span>{{myCar.length > 0 ? `${myCar.length}辆爱车` : '去添加车辆'}}</span>
        </div>
      </div>
      <div class="quan">
        <span>我的优惠券</span>
        <div class="quan-title title">
          <span>暂时没有优惠券</span>
        </div>
      </div>
      <div class="kefu">
        <span>客服热线</span>
        <div class="kefu-title">
          <a href="tel:400-180-8811">400-180-8811</a>
        </div>
      </div>
      <div class="banben">
        <span>版本信息</span>
        <div class="banben-title title">
          <span>2.0.1</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Badge from '@/base/badge'
import {mapGetters} from 'vuex'
export default {
  name: 'mind',
  data () {
    return {
      name: '绿鲤鱼红鲤鱼与驴'
    }
  },
  methods: {
    _goOrder (id) {
      if (!this.userInfo.token) {
        this.$Modal.confirm({
          title: '提示信息',
          content: '此服务需登录，是否登录？',
          onCancel: () => {
            this.$Modal.remove()
          },
          onOk: () => {
            this.$router.push('/login')
            this.$Modal.remove()
          }
        })
      } else {
        if (id === 1) {
          this.$router.push('/order/subscribe')
        } else if (id === 2) {
          this.$router.push('/order/obligation')
        } else if (id === 3) {
          this.$router.push('/order/complete')
        } else if (id === 4) {
          this.$router.push('/order/cancel')
        }
      }
    },
    _goGarage () {
      this.$router.push('/garage')
    },
    _goSetUp () {
      this.$router.push('/set-up')
    },
    _goMyInfo () {
      this.$router.push('/my-info')
    },
    goRegister () {
      this.$router.push('/register')
    },
    goLogin () {
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapGetters([
      'myCar',
      'userInfo'
    ])
  },
  components: {
    Badge
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
    flex: 1
    overflow: hidden
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
          bg-image('../../common/imgs/mind/xx')
        .user-sz
          bg-image('../../common/imgs/mind/sz')
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
          margin-right: 32px
          float: left
          img
            display: inline-block
            width: 100%
            height: 100%
        .user-cm
          flex: 1
          display: flex
          div
            height: 98px
            font-size: 24px
            color: #fff
            line-height: 98px
            font-weight: 600
            .pad
              margin: 0 10px
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
          bg-image('../../common/imgs/mind/sj')
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
        .order-title
          flex: 1
          display: flex
          align-items: center
          bg-image('../../common/imgs/mind/mdd')
          background-size: 25px 25px
          background-position: left center
          background-repeat: no-repeat
          font-size: 28px
          color: #747474
          padding-left: 43px
        .all-order
          flex: 1
          display: flex
          align-items: center
          justify-content: flex-end
          width: 126px
          font-size: 24px
          color: #bcbcbc
          bg-image('../../common/imgs/mind/leftright')
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
        .dfk-order, .yy-order, .dqr-order, .wc-order, .qx-order
          flex: 1
          display: flex
          justify-content: center
          align-items: center
          .link-a
            display: flex
            flex-direction: column
            justify-content: center
            align-items: center
          .img
            width: 42px
            height: 42px
            background-size: 42px 42px
            background-position: center top
            background-repeat: no-repeat
            text-align: center
        .dfk-order
          .img
            bg-image('../../common/imgs/mind/qb')
        .yy-order
          .img
            bg-image('../../common/imgs/mind/yy')
        .dqr-order
          .img
            bg-image('../../common/imgs/mind/dqr')
        .wc-order
          .img
            bg-image('../../common/imgs/mind/wc')
        .qx-order
          .img
            bg-image('../../common/imgs/mind/qx')
    .use-list
      width: 100%
      height: auto
      & > div
        display: flex
        justify-content: space-between
        width: 100%
        height: 90px
        line-height: 90px
        padding-left: 84px
        margin-bottom: 10px
        font-size: 28px
        color: #747474
        background-color: #fff
        background-size: 25px 25px
        background-position: 30px center
        background-repeat: no-repeat
        .kefu-title
          min-width: 195px
          height: 90px
          padding-left: 35px
          margin-right: 30px
          padding-right: 32px
          line-height: 90px
          font-size: 24px
          color: #bcbcbc
          text-align: right
          bg-image('../../common/imgs/mind/dh')
          background-size: 20px 20px
          background-repeat: no-repeat
          background-position: left center
        .title
          flex: 1
          display: flex
          justify-content: flex-end
          align-items: center
          margin-right: 30px
          padding-right: 32px
          bg-image('../../common/imgs/mind/leftright')
          background-size: 15px 24px
          background-repeat: no-repeat
          background-position: right center
          font-size: 24px
          color: #bcbcbc
      .car
        bg-image('../../common/imgs/mind/mcar')
      .quan
        bg-image('../../common/imgs/mind/yhq')
      .kefu
        bg-image('../../common/imgs/mind/kf')
      .banben
        bg-image('../../common/imgs/mind/gt')

</style>
