<template>
  <div class="order" flexContainer>
    <headerBar contentTitle="我的订单" contentColor="#5b5b5b" @leftClick="goBack"></headerBar>
    <div class="tab-bar">
      <ul>
        <li ><router-link :to="{ name: 'subscribe', path: '/subscribe' }"><span>预约中</span></router-link></li>
        <li ><router-link :to="{ name: 'obligation', path: '/obligation' }"><span>待付款</span></router-link></li>
        <li ><router-link :to="{ name: 'complete', path: '/complete' }"><span>已完成</span></router-link></li>
        <li ><router-link :to="{ name: 'cancel', path: '/cancel' }"><span>已取消</span></router-link></li>
      </ul>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import headerBar from '@/base/headerBar'
export default {
  name: 'order',
  components: {
    headerBar
  },
  data () {
    return {
    }
  },
  methods: {
    goBack () {
      this.$router.push('/mind')
    }
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
    .tab-bar
      display: flex
      height: 82px
      background-color: #fafafa
      margin-bottom: 10px
      & > ul
        flex: 1
        display: flex
        height: 82px
        li
          flex: 1
          margin: 0px 31px
          font-size: 26px
          color: #5b5b5b
          display: flex
          justify-content: center
          align-items: center
          .active-on
            color: #ff8040
    .content
      flex: 1
      display: flex
</style>
