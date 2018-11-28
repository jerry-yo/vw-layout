<template>
  <div class="setmeal-list" flexContainer @touchmove.prevent>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <span>全部套餐</span>
    </div>
    <Scroll class="list" :data="setmealList">
      <ul class="con">
        <li  class="list-info" v-for="item in setmealList" :key="item.id" @click="goSetmealInfo(item.id)">
          <div class="list-info-left">
            <img :src="gt1UpdateImgUrl + item.img" alt="">
          </div>
          <div class="list-info-right">
            <p class="list-info-title">{{item.introduce}}</p>
            <p class="list-info-price">
              <span class="old">{{item.originalPrice}}</span>
              <span class="new-money">￥</span>
              <span class="new">{{item.preferentialPrice.replace('￥', '')}}</span>
            </p>
          </div>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
export default {
  name: 'setmealList',
  data () {
    return {
      page: 1,
      limit: 8,
      setmealList: []
    }
  },
  mounted () {
    this.getSetmealList()
  },
  methods: {
    _goBack () {
      this.$router.back()
    },
    getSetmealList () {
      this.$post(`${this.gt1Url}/api/f6-app/getSetmealList`, this.gt1Header, (res) => {
        if (res.errorCode === 0 && res.data.code === 0) {
          this.setmealList = res.data.data
        }
      }, {
        page: this.page,
        limit: this.limit
      })
    },
    goSetmealInfo (id) {
      this.$router.push('/setmeal-info?id=' + id)
    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.setmeal-list
  background-color: #f4f4f4
  flex-direction: column
  height: 100vh
  .action-bar
    position: relative;
    display: flex
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
      height: 86px
      text-align: center
      line-height: 86px
      font-weight: 600
      font-size: 36px
      color: #5b5b5b
      transform: skewX(-15deg)
    .go-back
      width: 120px
      height: 88px
      bg-image('../../common/imgs/order/back')
      background-repeat: no-repeat
      background-position: 30px center
      background-size: 18px 30px
  .list
    flex: 1
    overflow: hidden
    .con
      position: relative
    .list-info
      padding: 10px 30px
      display: flex
      height: 185px
      background-color: #fff
      overflow: hidden
      margin-bottom: 1px
      .list-info-left
        width: 200px
        margin-right: 40px
        img
          display: inline-block
          width: 100%
          height: 100%
          object-fit: cover
      .list-info-right
        flex: 1
        display: flex
        flex-direction: column
        justify-content: space-between
        padding-top: 12px
        .list-info-title
          height: 72px
          no-wrap-many(2)
          font-size: 26px
          color: #626262
          font-weight: bold
          line-height: 36px
        .list-info-price
          height: 48px
          display: flex
          align-items: flex-end
          justify-content: flex-end
          .old
            height: 38px
            width: auto
            line-height: 38px
            font-size: 16px
            color: #616161
            font-weight: bold
            text-decoration: line-through
          .new-money
            height: 38px
            width: 30px
            line-height: 38px
            font-size: 16px
            color: #ff6868
            font-weight: bold
            text-align: right
          .new
            height: 48px
            width: auto
            line-height: 48px
            font-size: 28px
            color: #ff6868
            font-weight: bold
</style>
