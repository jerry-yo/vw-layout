<template>
  <div class="mask-modal" v-show="visible" @click.native="gogo">
    <div class="modal">
      <div class="title">{{title}}</div>
      <div class="content">{{content}}</div>
      <div class="bor"></div>
      <div class="btn">
        <div class="cancel" @click="cancel">取消</div>
        <div class="btn-bor"></div>
        <div class="ok" @click="ok">确定</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Modal',
  data () {
    return {
      title: 'this is a title.',
      content: 'this is a content.',
      visible: false
    }
  },
  methods: {
    cancel () {
    },
    ok () {
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .mask-modal
    position: absolute
    left: 0
    top: 0
    right: 0
    bottom: 0
    display: flex
    justify-content: center
    align-items: center
    background-color: rgba(0, 0, 0, 0.5)
    .modal
      width: 540px
      min-height: 250px
      display: flex
      flex-direction: column
      background-color: rgba(255, 255, 255, 0.9)
      border-radius: 30px
      overflow: hidden
      .title
        height: 83px
        padding-top: 37px
        line-height: 46px
        text-align: center
        font-size: 32px
        font-weight: bold
      .content
        flex: 1
        font-size: 26px
        line-height: 40px
        padding: 0px 60px
        overflow: hidden
        text-align: center
      .bor
        height: 1px
        background-color: #d0d0d4
      .btn
        height: 88px
        display: flex
        .btn-bor
          width: 1px
          background-color: #d0d0d4
        .cancel, .ok
          flex: 1
          display: flex
          justify-content: center
          align-items: center
          font-size: 30px
          color: #007aff
</style>
