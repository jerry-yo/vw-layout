// 车辆共有人

<template>
  <div class="car-sharing" flexContainer>
    <div class="action-bar">
      <div class="go-back"></div>
      <div class="font">车辆所有人</div>
      <div class="sharing">添加</div>
    </div>
    <div class="list">
      <div class="list-info">
        <div class="img">
          <img src="" alt="">
        </div>
        <div class="list-title">
          <h2>绿驴驴驴驴驴</h2>
          <p>1386565683</p>
        </div>
        <div class="btn">
          <div class="del">
            删除
          </div>
        </div>
      </div>
      <h2>1/5</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'carSharing'
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.car-sharing
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
    .sharing
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
  .list
    flex: 1
    overflow: hidden
    .list-info
      height:172px
      display: flex
      background-color: #fff
      padding: 0 30px
      .img
        width: 126px
        display: flex
        align-items: center
        img
          display: inline-block
          width: 90px
          height: 90px
      .list-title
        flex: 1
        display: flex
        flex-direction: column
        justify-content: center
        h2
          font-size: 26px
          color: #5b5b5b
          line-height: 40px
        p
          font-size: 24px
          color: #b2b2b2
          line-height: 38px
      .btn
        width: 80px
        display: flex
        align-items: center
        .del
          flex: 1
          height: 44px
          border: 1px solid #bdbdbd
          font-size: 24px
          color: #b2b2b2
          text-align: center
          line-height: 44px
          border-radius: 3px
    & > h2
      height: 80px
      line-height: 80px
      text-align: center
      font-size: 24px
      color: #b2b2b2
</style>
