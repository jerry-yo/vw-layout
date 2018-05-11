<template>
  <div class="my-info" flexContainer>
    <myInfoMask v-if="modifyInfo" @closemask="_closeMask" :id="id" :info="modifyType"></myInfoMask>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="font">个人资料</div>
    </div>
    <div class="container">
      <div class="my_avatar">
        <div class="avatar">
          <img src="../../common/imgs/default.png" alt="">
        </div>
        <div class="title">
          更换头像
        </div>
      </div>
      <div class="my_nickname">
        <span>昵称</span>
        <div class="nickname" @click="_modifyInfo(1)">
          {{info.nickname}}
        </div>
      </div>
      <div class="my_phone" @click="_modifyInfo(2)">
        <span>手机号</span>
        <div class="phone">
          {{hidePhone}}
        </div>
      </div>
      <div class="my_name" @click="_modifyInfo(3)">
        <span>真实姓名</span>
        <div class="name">
          {{info.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import myInfoMask from '@/components/mind/my-info-mask'
export default {
  name: 'myInfo',
  data () {
    return {
      modifyInfo: false,
      info: {
        name: '朱佩琪',
        nickname: '朕最爱朱佩琪',
        phone: '18772815385'
      },
      id: 0
    }
  },
  computed: {
    hidePhone () {
      return this.info.phone.substr(0, 3) + '****' + this.info.phone.substr(7)
    },
    modifyType () {
      let str = ''
      switch (this.id) {
        case 1:
          str = this.info.nickname
          break
        case 2:
          str = this.info.phone
          break
        case 3:
          str = this.info.name
          break
      }
      return str
    }
  },
  methods: {
    _goBack () {
      this.$router.go(-1)
    },
    _modifyInfo (id) {
      this.id = id
      this.modifyInfo = true
    },
    _closeMask (res) {
      this.modifyInfo = false
      if (!res.modify) {
        return
      }
      switch (this.id) {
        case 1:
          this.info.nickname = res.info
          break
        case 2:
          this.info.phone = res.info
          break
        case 3:
          this.info.name = res.info
          break
      }
    }
  },
  components: {
    myInfoMask
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .my-info
    flex-direction: column
    height: 100vh
    background-color: #f4f4f4
    overflow: hidden
    .action-bar
      display: flex
      height: 88px
      background-color: #fff
      .font
        flex: 1
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        margin-right: 120px
        font-size: 36px
        color: #5b5b5b
        font-weight: bolder
        transform: skewX(-10deg)
      .go-back
        width: 120px
        height: 88px
        bg-image('../../common/imgs/order/back')
        background-repeat: no-repeat
        background-position: 30px center
        background-size: 18px 30px
    .container
      flex: 1
      .my_avatar
        display: flex
        height: 150px
        margin-top: 20px
        background-color: #fff
        overflow: hidden
        margin-bottom: 10px
        padding: 30px
        .avatar
          width: 90px
          overflow: hidden
          img
            display: inline-block
            width: 90px
            height: 90px
        .title
          flex: 1
          display: flex
          justify-content: flex-end
          align-items: center
          font-size: 26px
          color: #9e9e9e
          padding-right: 35px
          bg-image('../../common/imgs/mind/right_sj')
          background-repeat: no-repeat
          background-position: right center
          background-size: 14px 16px
      .my_nickname, .my_phone, .my_name
        height: 90px
        display: flex
        line-height: 90px
        margin-bottom: 1px
        background-color: #fff
        padding: 0 30px
        span
          font-size: 26px
          color: #5b5b5b
        div
          flex: 1
          display: flex
          justify-content: flex-end
          align-items: center
          font-size: 26px
          color: #9e9e9e
          padding-right: 35px
          bg-image('../../common/imgs/mind/leftright')
          background-repeat: no-repeat
          background-position: right center
          background-size: 15px 24px
</style>
