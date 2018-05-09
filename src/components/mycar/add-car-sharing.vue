// 车辆共有人

<template>
  <div class="add-car-sharing" flexContainer>
    <div class="action-bar">
      <div class="go-back"></div>
      <div class="search">
        <input type="text" name="" value="" placeholder="请输入完整手机号" maxlength="11">
      </div>
      <div class="sharing">搜索</div>
    </div>
    <Scroll class="list">
      <ul class="list-con">
        <li  class="list-info">
          <div class="img">
            <img src="" alt="">
          </div>
          <div class="list-title">
            <h2>绿驴驴驴驴驴</h2>
            <p>1386565683</p>
          </div>
          <div class="btn">
            <div class="add">
              添加
            </div>
          </div>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from '@/base/scroll/scroll'
export default {
  name: 'addCarSharing',
  components: {
    Scroll
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.add-car-sharing
  background-color: #f4f4f4
  flex-direction: column
  height: 100vh
  .action-bar
    display: flex
    height: 88px
    background-color: #fff
    margin-bottom: 10px
    .search
      flex: 1
      display: flex
      align-items: center
      input
        padding: 0px 30px
        text-align: center
        font-size: 26px
        color: #5b5b5b
        width: 100%
        height: 60px
        outline: none
        border: 1px solid #cfcfcf
        background-color: #f2f2f2
        border-radius: 60px
        &::-webkit-input-placeholder
          font-size: 24px
          color: #bbbbbb
    .go-back
      width: 120px
      height: 88px
      bg-image('../../common/imgs/order/back')
      background-repeat: no-repeat
      background-position: 30px center
      background-size: 18px 30px
    .sharing
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
    .list-con
      position: relative
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
          background-color: #ccc
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
        .add
          flex: 1
          height: 44px
          border: 1px solid #ff7646
          font-size: 24px
          color: #ff7646
          text-align: center
          line-height: 44px
          border-radius: 3px
</style>
