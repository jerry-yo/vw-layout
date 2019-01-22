<template>
  <div class="my-info" flexContainer>
    <myInfoMask v-if="modifyInfo" @closemask="_closeMask" :id="id" :info="modifyType"></myInfoMask>
    <headerBar contentTitle="个人资料" contentColor="#5b5b5b" @leftClick="_goBack"></headerBar>
    <div class="container">
      <div class="my_avatar">
        <div class="avatar">
          <img v-lazy="localId" alt="">
        </div>
        <div class="title" @click="toggleAvatar">
          更换头像
        </div>
      </div>
      <div class="my_nickname">
        <span>昵称</span>
        <div class="nickname" @click="_modifyInfo(1)">
          {{userInfo.nickName}}
        </div>
      </div>
      <div class="my_phone">
        <span>手机号</span>
        <div class="phone">
          {{hidePhone}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myInfoMask from '@/components/mind/my-info-mask'
import headerBar from '@/base/headerBar'
import {mapGetters, mapActions} from 'vuex'
import {expireToken} from '@/common/js/mixin'
export default {
  name: 'myInfo',
  mixins: [expireToken],
  data () {
    return {
      modifyInfo: false,
      id: 0,
      localId: ''
    }
  },
  computed: {
    hidePhone () {
      return this.userInfo.userTel.substr(0, 3) + '****' + this.userInfo.userTel.substr(7)
    },
    modifyType () {
      let str = ''
      switch (this.id) {
        case 1:
          str = this.userInfo.nickName
          break
      }
      return str
    },
    ...mapGetters([
      'userInfo'
    ])
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
      if (res.modify) {
        this.modifyUserInfo(res.info, () => {
          this.updateUserInfo({
            nickName: res.info
          })
        })
      }
    },
    modifyUserInfo (res, callback = () => {}) {
      this.$put(`${this.f6Url}/api/clientUser`, {
        'Authorization': this.userInfo.token,
        'Content-Type': 'application/json'
      }, (res) => {
        if (res.code === 200) {
          callback()
        } else if (res.code === 401) {
          this.refreshToken(this.modifyUserInfo)
        } else {
          this.$Toast({
            position: 'bottom',
            message: '网络错误'
          })
        }
      }, {
        appId: this.userInfo.appId,
        deleteFlag: this.userInfo.deleteFlag,
        externalUserId: this.userInfo.externalUserId,
        gender: this.userInfo.gender,
        id: this.userInfo.id,
        imgSource: this.userInfo.imgSource,
        nickName: res,
        stationId: this.userInfo.stationId,
        userAddressCity: this.userInfo.userAddressCity,
        userAddressProvince: this.userInfo.userAddressProvince,
        userId: this.userInfo.userId,
        userName: this.userInfo.userName,
        userTel: this.userInfo.userTel,
        userType: this.userInfo.userType
      })
    },
    toggleAvatar () {
      this.$Toast({
        position: 'bottom',
        message: '请到GT1 APP修改头像'
      })
    },
    ...mapActions([
      'updateUserInfo'
    ])
  },
  components: {
    myInfoMask,
    headerBar
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
