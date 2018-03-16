<template>
  <div class="home" flexContainer>
    <div class="home-top">
      <div class="sele-city">
        常州发的
        <span></span>
      </div>
      <span>GT1养车</span>
      <div class="message">
      </div>
    </div>
    <div class="slider">
    </div>
    <div class="car-info">

    </div>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .home
    flex-direction: column
    bg-image('../../common/imgs/home/homebg')
    background-size: 750px 540px
    background-repeat: no-repeat
    background-position:center top
    .home-top
      position: relative
      height: 80px
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
        line-height: 80px
        color: #fff
        font-size: 40px
        font-weight: 600
        transform: skewX(-15deg)
      .message
        float: right
        width: 80px
        height: 80px
        margin-right: 30px
        bg-image('../../common/imgs/mind/xx')
        background-size: 42px 42px
        background-repeat: no-repeat
        background-position: right center
    .slider
      height: 300px
    .car-info
      height: 187px
      width: 706px
      margin: 0 auto
      bg-image('../../common/imgs/home/carbg')
      background-size: 706px 187px
      background-repeat: no-repeat
      background-position: center center
</style>
