<template>
  <div class="order-xc">
    <div class="xc-left">
      <img :src="gt1UpdateImgUrl + info.img" alt="">
    </div>
    <div class="xc-con">
      <h3>{{info.title}}</h3>
      <p>{{info.content}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderXc',
  props: {
    info: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .order-xc
    display: flex
    align-items: center
    height: 147px
    padding-right:30px
    background: #fafafa
    .xc-left
      img
        width: 154px
        height: 90px
        margin-right: 30px
    .xc-con
      flex: 1
      height: 147px
      display: flex
      flex-direction: column
      align-items: center
      h3
        padding-top: 32px
        height: 60px
        width: 100%
        text-align: left
        fonts-size: 28px
        color: #5b5b5b
        margin-bottom: 20px
      p
        font-size: 22px
        color: #9f9f9f
        height: 52px
        line-height: 26px
        word-break: break-all
        overflow : hidden
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
</style>
