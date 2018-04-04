// 我的车库
<template>
  <div class="garage" flexContainer>
    <div class="action-bar">
      <div class="go-back"></div>
      <div class="font">我的车库</div>
      <div class="vehicle-management">管理</div>
    </div>
    <div class="slider">
      <div class="bb">
        dds
      </div>
    </div>
    <div class="car-menu">
      <div class="car-con">
        <div class="owner">
          <h2>车主认证</h2>
        </div>
        <div class="sharing">
          <h2>车辆共有人</h2>
        </div>
        <div class="record">
          <h2>检测记录</h2>
        </div>
      </div>
    </div>
    <div class="car-info">
      <div class="car-models">
        <span>具体车型</span>
        <span>2016款 1.5T 自动尊耀版</span>
      </div>
      <div class="car-others">
        <div class="car-displacement">
          <span>发动机排量</span>
          <span>1.5T</span>
        </div>
        <div class="car-age">
          <span>生产年份</span>
          <span>2008年</span>
        </div>
      </div>
      <div class="car-others-2">
        <div class="car-far">
          <span>行驶里程</span>
          <span>2003KM</span>
        </div>
        <div class="car-time">
          <span>注册时间</span>
          <span>2016年12月18日</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'garage'
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .garage
    flex: 1
    background-color: #f2f2f2
    height: 100vh
    flex-direction: column
    bg-image('../../common/imgs/mindbg')
    background-repeat: no-repeat
    background-position: center top
    background-size: 750px 281px
    .action-bar
      position: relative
      height: 88px
      .font
        position: absolute
        left: 0
        top: 0
        right: 0
        bottom: 0
        margin: auto
        width: 180px
        height: 88px
        line-height: 88px
        text-align: center
        font-size: 36px
        color: #ffffff
        font-weight: bold
        transform: skewX(-10deg)
      .go-back
        display: inline-block
        float: left
        width: 120px
        height: 88px
        bg-image('../../common/imgs/car/back')
        background-repeat: no-repeat
        background-position: 30px center
        background-size: 18px 30px
      .vehicle-management
        display: inline-block
        float: right
        width: 120px
        height: 88px
        padding-right: 30px
        font-size: 26px
        color: #fff
        line-height: 88px
        text-align: right
    .slider
      height: 275px
      line-height: 275px
      margin-bottom: 18px
      .bb
        height: 275px
    .car-menu
      height: 154px
      padding: 0 30px
      background-color: #fff
      .car-con
        height: 154px
        display: flex
        & > div
          flex: 1
          & > h2
            margin-top: 105px
            line-height: 22px
            text-align: center
            font-size: 22px
            color: #5b5b5b
        .record
          bg-image('../../common/imgs/car/record')
          background-size: 56px 55px
          background-repeat: no-repeat
          background-position: center 30px
        .sharing
          bg-image('../../common/imgs/car/sharing')
          background-size: 56px 55px
          background-repeat: no-repeat
          background-position: center 30px
        .owner
          bg-image('../../common/imgs/car/owner')
          background-size: 56px 55px
          background-repeat: no-repeat
          background-position: center 30px
    .car-info
      height: 272px
      background-color: #fff
      .car-models
        height: 90px
        display: flex
        padding: 0 30px
        border-bottom: 1px solid #f2f2f2
        span:nth-child(1)
          width: 120px
          line-height: 90px
          color: #bcbcbc
          font-size: 22px
        span:nth-child(2)
          flex: 1
          line-height: 90px
          color: #5b5b5b
          font-size: 26px
          text-align: right
      .car-others
        height: 90px
        display: flex
        border-bottom: 1px solid #f2f2f2
        .car-displacement
          flex: 1
          padding: 0 30px
          display: flex
          border-right: 1px solid #f2f2f2
          span:nth-child(1)
            width: 120px
            line-height: 90px
            color: #bcbcbc
            font-size: 22px
          span:nth-child(2)
            flex: 1
            line-height: 90px
            color: #5b5b5b
            font-size: 26px
            text-align: right
        .car-age
          flex: 1
          padding: 0 30px
          display: flex
          span:nth-child(1)
            width: 120px
            line-height: 90px
            color: #bcbcbc
            font-size: 22px
          span:nth-child(2)
            flex: 1
            line-height: 90px
            color: #5b5b5b
            font-size: 26px
            text-align: right
      .car-others-2
        height: 90px
        display: flex
        .car-far
          flex: 1
          padding: 0 30px
          display: flex
          border-right: 1px solid #f2f2f2
          span:nth-child(1)
            width: 120px
            line-height: 90px
            color: #bcbcbc
            font-size: 22px
          span:nth-child(2)
            flex: 1
            line-height: 90px
            color: #5b5b5b
            font-size: 26px
            text-align: right
        .car-time
          flex: 1
          padding: 0 30px
          display: flex
          span:nth-child(1)
            width: 120px
            line-height: 90px
            color: #bcbcbc
            font-size: 22px
          span:nth-child(2)
            flex: 1
            line-height: 90px
            color: #5b5b5b
            font-size: 26px
            text-align: right
    .box
      flex: 1
      background-color: pink
</style>
