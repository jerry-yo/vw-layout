// 车辆管理

<template>
  <div class="vehicle-management" flexContainer>
    <div class="action-bar">
      <div class="go-back"></div>
      <div class="font">我的车库</div>
      <div class="management">编辑</div>
    </div>
    <div class="car-content">
      <ul>
        <li>
          <div class="img">
            <img src="" alt="">
          </div>
          <div class="con">
            <h2>东风本田-思域</h2>
            <p class="p1"><span>2016款</span>&nbsp;&nbsp;<span>1.5T</span>&nbsp;&nbsp;<span>自动豪华版</span></p>
            <p class="p2"><span>苏DB5A68</span><span>丨</span> <span>2300km</span></p>
          </div>
          <div class="right">
            <div class="btn">
              已设为默认
            </div>
          </div>
        </li>
        <li>
          <div class="img">
            <img src="" alt="">
          </div>
          <div class="con">
            <h2>东风本田-思域</h2>
            <p class="p1"><span>2016款</span>&nbsp;&nbsp;<span>1.5T</span>&nbsp;&nbsp;<span>自动豪华版</span></p>
            <p class="p2"><span>苏DB5A68</span><span>丨</span> <span>2300km</span></p>
          </div>
          <div class="right">
            <div class="btn">
              已设为默认
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="submit-btn">
      dd
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'vehicleManagement'
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .vehicle-management
    background-color: #f4f4f4
    flex-direction: column
    height: 100vh
    .action-bar
      position: relative
      height: 88px
      background-color: #fff
      margin-bottom: 10px
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
        color: #5b5b5b
        font-weight: bold
        transform: skewX(-10deg)
      .go-back
        display: inline-block
        float: left
        width: 120px
        height: 88px
        bg-image('../../common/imgs/order/back')
        background-repeat: no-repeat
        background-position: 30px center
        background-size: 18px 30px
      .management
        display: inline-block
        float: right
        width: 120px
        height: 88px
        padding-right: 30px
        font-size: 26px
        color: #5b5b5b
        line-height: 88px
        text-align: right
        background-color: #fff
    .submit-btn
      background-color: #f24847
      height: 100px
      line-height: 100px
    .car-content
      flex: 1
      display: flex
      ul
        flex: 1
        overflow: hidden
        li
          display: flex
          height: 208px
          background-color: #fff
          margin-bottom: 10px
          padding: 0 30px
          .img
            display: flex
            justify-content: center
            align-items: center
            width: 172px
            img
              width: 50px
              height: 50px
              background-color: blue
          .con
            flex: 1
            display: flex
            flex-direction: column
            justify-content: center
            h2
              font-size: 30px
              color: #5b5b5b
              font-weight: bold
              line-height: 44px
            p.p1
              font-size: 22px
              color: #5b5b5b
              line-height: 36px
            p.p2
              font-size: 22px
              color: #9d9d9d
              line-height: 36px
              span:nth-child(2)
                font-size: 22px
                color: #9d9d9d
                margin: 0 15px
          .right
            width: 147px
            display: flex
            align-items: center
            .btn
              width: 100%
              height: 42px
              font-size: 24px
              color: #fff
              text-align: center
              line-height: 42px
              background-color: red

</style>
