// 车辆管理

<template>
  <div class="vehicle-management" flexContainer>
    <div class="action-bar">
      <div class="go-back"></div>
      <div class="font">我的车库</div>
      <div class="vehicle-management">编辑</div>
    </div>
    <div class="car-content">
      <ul>
        <li>
          <div class="img">
            <img src="" alt="">
          </div>
          <div class="con">
            <h2></h2>
            <p></p>
            <p></p>
          </div>
          <div class="right">
            <div class="btn">

            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="submit-btn">
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
      .vehicle-management
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
    .car-content
      flex: 1
      display: flex
      ul
        overflow: hidden
        li
          height: 208px

</style>
