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
  </div>
</template>

<script>
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
    background-color: green
    .user-core
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
          width: 118px
          line-height: 74px
          height: 74px
          font-size: 24px
          color: #fff
          text-align: left
          bg-image('sj')
          background-size: 11px 17px
          background-repeat: no-repeat
          background-position: right center
</style>
