<template>
  <div class="home">
    <div class="home-top">
      <div class="sele-city">
        常州发的
        <span></span>
      </div>
      <span>GT1养车</span>
      <div class="message">
      </div>
    </div>
    <div class="container_1" ref="home">
      <div class="con">
        <div class="slider">
          <div class="bb">
          </div>
        </div>
        <div class="car-info">
          <div class="car-con">
            <div class="car-img">
              <img src="" alt="">
            </div>
            <div class="car-name">
              <div class="name">东风本田-思域</div>
              <div class="card-info">
                <div class="card">苏DB5A68</div>
                <div class="way">2300km</div>
              </div>
            </div>
            <div class="car-check" data-num="20">查看检测单</div>
          </div>
        </div>
        <div class="gt1-menu">
          <ul>
            <li @click="_goCarWash">
              <h2>洗车</h2>
              <h3>5元洗车活动</h3>
            </li>
            <li @click="_goMaintain">
              <h2>保养</h2>
              <h3>低价好配件</h3>
            </li>
            <li @click="_goRepair">
              <h2>维修</h2>
              <h3>一线专业技工</h3>
            </li>
            <li @click="_goRescue">
              <h2>救援</h2>
              <h3>闪电速达</h3>
            </li>
          </ul>
        </div>
        <div class="gt1-server">
          <ul>
            <li><h2>补胎换胎</h2></li>
            <li><h2>钣金喷漆</h2></li>
            <li><h2>违章查询</h2></li>
            <li><h2>年检代办</h2></li>
            <li><h2>买车险</h2></li>
            <li><h2>买车险</h2></li>
          </ul>

        </div>
        <div class="beizhu">
          灰色服务还未上线 敬请期待
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
  name: 'home',
  data () {
    return {
      homeBScroll: null
    }
  },
  methods: {
    // 洗车
    _goCarWash () {

    },
    // 维修
    _goRepair () {
      this.$router.push('/repair')
    },
    // 保养
    _goMaintain () {
      this.$router.push('/maintain')
    },
    // 救援
    _goRescue () {

    }
  },
  mounted: function () {
    this.homeBScroll = new BScroll(this.$refs.home, {
      click: true
    })
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .home
    flex: 1
    display: flex
    flex-direction: column
    bg-image('../../common/imgs/home/homebg')
    background-size: 750px 540px
    background-repeat: no-repeat
    background-position:center top
    overflow: hidden
    .home-top
      position: relative
      height: 88px
      .sele-city
        margin-top: 16px
        display: inline-block
        position: relative
        margin-left: 30px
        background-color: rgba(255, 255, 255, 0.85)
        border-radius: 5px
        font-size: 22px
        color: #fd9068
        padding: 16px 46px 16px 20px
        span
          position: absolute
          right: 0
          top: 0
          display: inline-block
          width: 32px
          height: 54px
          bg-image('../../common/imgs/home/sj-bottom')
          background-size: 12px 6px
          background-repeat: no-repeat
          background-position: left center
      & > span
        position: absolute
        left: 0
        right: 0
        top: 0
        bottom: 0
        margin: auto
        display: inline-block
        width: 180px
        line-height: 88px
        color: #fff
        font-size: 40px
        font-weight: 600
        transform: skewX(-15deg)
      .message
        float: right
        width: 80px
        height: 88px
        margin-right: 30px
        bg-image('../../common/imgs/mind/xx')
        background-size: 42px 42px
        background-repeat: no-repeat
        background-position: right center
    .container_1
      flex: 1
      overflow: hidden
      .con
        position: relative
        overflow: hidden
      .slider
        height: 300px
        background-color: rgba(0, 255, 255, 0.25)
        .bb
          height: 300px
          line-height: 300px
      .car-info
        height: 187px
        background-color: #fff
        .car-con
          width: 706px
          height: 187px
          padding: 4px 7px 12px 7px
          margin: 0 auto
          display: flex
          bg-image('../../common/imgs/home/carbg')
          background-size: 706px 187px
          background-repeat: no-repeat
          background-position: center center
          overflow: hidden
          .car-img
            width: 127px
            display: flex
            align-items: center
            justify-content: center
            img
              width: 50px
              height: 50px
              background-color: red
          .car-name
            flex: 1
            display: flex
            flex-direction: column
            align-items: flex-start
            justify-content: center
            border-right: 1px solid #e7e7e7
            .name
              height: 40px
              line-height: 40px
              font-size: 30px
              color: #5b5b5b
              font-weight: bolder
              transform: skewX(-10deg)
            .card-info
              padding-top: 7px
              height: 32px
              display: flex
              font-size: 24px
              color: #5b5b5b
              line-height: 34px
              .card
                width: 140px
                border-right: 1px solid #5b5b5b
              .way
                flex: 1
                padding-left: 28px
          .car-check
            background-color: #fff
            position: relative
            width: 160px
            bg-image('../../common/imgs/home/jcd')
            background-size: 67px 65px
            background-repeat: no-repeat
            background-position: center 40px
            padding-top: 120px
            line-height: 30px
            color: #636363
            font-size: 24px
            text-align: center
            &:after
              content: attr(data-num)
              line-height: 20px
              text-align: center
              padding: 5px 10px
              font-size: 20px
              color: #fff
              border-radius: 24px
              background-color: #ed3f14
              position: absolute
              top: 30px
              right: 20px
      .gt1-menu
        background-color: #fff
        min-height: 240px
        padding: 0px 30px
        ul
          min-height: 240px
          border-bottom: 1px solid #f2f2f2
          overflow: hidden
          li
            height: 232px
            width: 25%
            float: left
            display: flex
            flex-direction: column
            background-size: 90px 90px
            background-repeat: no-repeat
            background-position: center 40px
            &:nth-child(1)
              bg-image('../../common/imgs/home/xc')
            &:nth-child(2)
              bg-image('../../common/imgs/home/by')
            &:nth-child(3)
              bg-image('../../common/imgs/home/wx')
            &:nth-child(4)
              bg-image('../../common/imgs/home/jykb')
            & > h2
              padding-top: 146px
              text-align: center
              font-size: 24px
              color: #636363
            & > h3
              padding-top: 11px
              text-align: center
              font-size: 20px
              color: #acacac
      .gt1-server
        background-color: #fff
        overflow: hidden
        padding: 0 30px
        & > ul
          min-height: 180px
          overflow: hidden
          li
            width: 20%
            height: 139px
            float: left
            background-size: 35px 38px
            background-repeat: no-repeat
            background-position: center 35px
            &:nth-child(1)
              bg-image('../../common/imgs/home/lt')
            &:nth-child(2)
              bg-image('../../common/imgs/home/fjpq')
            &:nth-child(3)
              bg-image('../../common/imgs/home/wz')
            &:nth-child(4)
              bg-image('../../common/imgs/home/nj')
            &:nth-child(5)
              bg-image('../../common/imgs/home/cx')
            &:nth-child(6)
              bg-image('../../common/imgs/home/cx')
            & > h2
              padding-top: 85px
              font-size: 20px
              color: #651212
              text-align: center
      .beizhu
        font-size: 20px
        color: #b9b9b9
        text-align: center
        margin-bottom: 23px

</style>
