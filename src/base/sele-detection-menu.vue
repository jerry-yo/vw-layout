<template>
  <div class="menu">
    <div class="detection-menu">
      <ul>
        <li v-for="(item, index) in data" :key="index">
          <div class="select-btn" v-if="check">
            <div class="sele-btn" :class="item.check ? 'check': 'nocheck'" @click="checkMenu(index)">
            </div>
          </div>
          <div class="sele-right" @click="_showInfoId(index, item)">
            <div class="select-info" :class="showState(item.state)">
              {{item.title}}
            </div>
            <div class="select-box">
            </div>
            <div class="go-info">
              {{item.textarea}}
            </div>
          </div>
        </li>
      </ul>
    </div>
    <CheckMask v-if="showInfo" @closemask="_closeMask" :data="faultInfo"></CheckMask>
  </div>
</template>

<script type="text/ecmascript-6">
import CheckMask from './check-info'
export default {
  name: 'detectionMenu',
  props: {
    check: {
      type: Boolean
    },
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      faultInfo: {},
      showInfo: false
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
    },
    _showInfoId (id, item) {
      this.faultInfo = item
      this.showInfo = true
      this.$emit('showinfo', id)
    },
    _closeMask () {
      this.showInfo = false
    }
  },
  components: {
    CheckMask
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
        .sele-right
          flex: 1
          display: flex
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
            bg-image('../common/imgs/orderinfo/warn')
          &.safe
            bg-image('../common/imgs/orderinfo/safe')
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
