<template>
  <div class="detection-menu">
    <ul>
      <li v-for="(item, index) in menus" :key="index">
        <div class="select-btn" v-if="check">
          <div class="sele-btn" :class="item.check ? 'check': 'nocheck'" @click="checkMenu(index)">
          </div>
        </div>
        <div class="select-info" :class="showState(item.id)">
          {{item.name}}
        </div>
        <div class="select-box">
        </div>
        <div class="go-info">
          {{item.info}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'detectionMenu',
  props: {
    check: {
      type: Boolean
    }
  },
  data () {
    return {
      menus: [{
        check: false,
        id: 0,
        name: '景观灯',
        state: 0,
        info: '别来烦我了真的很烦'
      }, {
        check: true,
        id: 1,
        name: '发动机丢了',
        state: 2,
        info: '别来烦我了真的很烦'
      }, {
        check: false,
        id: 2,
        name: '方向盘松了',
        state: 2,
        info: '别来烦我了真的很烦'
      }, {
        check: false,
        id: 3,
        name: '车门剐蹭',
        state: 1,
        info: '别来烦我了真的很烦'
      }, {
        check: true,
        id: 4,
        name: '尾灯不亮了',
        state: 2,
        info: '别来烦我了真的很烦'
      }, {
        check: false,
        id: 5,
        name: '刹车片消失了',
        state: 2,
        info: '别来烦我了真的很烦'
      }, {
        check: true,
        id: 6,
        name: '要命了',
        state: 1,
        info: '别来烦我了真的很烦'
      }]
    }
  },
  methods: {
    showState (id) {
      if (id === 0) {
        return 'safe'
      } else {
        return id === 1 ? 'warn' : 'error'
      }
    },
    checkMenu (index) {
      this.menus[index].check = !this.menus[index].check
    }
  }

}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../common/stylus/mixin.styl"
  .detection-menu
    overflow: hidden
    ul
      overflow: hidden
      li
        height: 90px
        display: flex
        background-color: #fff
        margin-bottom: 1px
        padding: 0 30px
        .select-btn
          width: 68px
          display: flex
          align-items: center
          .sele-btn
            width: 30px
            height: 30px
            background-repeat: no-repeat
            background-size: 30px 30px
            background-position: center center
            &.check
              bg-image('../common/imgs/repair/sele')
            &.nocheck
              bg-image('../common/imgs/repair/unsele')
        .select-info
          padding-right: 86px
          line-height: 90px
          font-size: 28px
          color: #5b5b5b
          background-repeat: no-repeat
          background-size: 78px 56px
          background-position: right center
          &.error
            bg-image('../common/imgs/orderinfo/err')
          &.warn
            bg-image('../common/imgs/orderinfo/err')
          &.safe
            bg-image('../common/imgs/orderinfo/err')
        .select-box
          flex: 1
        .go-info
          width: 134px
          padding-right: 30px
          line-height: 90px
          font-size: 22px
          color: #aaaaaa
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          bg-image('../common/imgs/mind/leftright')
          background-repeat: no-repeat
          background-size: 15px 24px
          background-position: right center

</style>
