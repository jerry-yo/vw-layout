import Wx from 'Wx'
import {mapActions, mapGetters} from 'vuex'

export const wxMixin = {
  mounted () {
    this.wxReady()
  },
  methods: {
    wxReady () {
      Wx.ready(() => {
        Wx.hideAllNonBaseMenuItem()
      })
    }
  }
}
export const expireToken = {
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    refreshToken (callback = () => {}) {
      this.$post(`${this.gt1Url}/api/f6-app/getToken`, 1, (res) => {
        console.log(res)
        callback()
      }, {
        orderToken: this.userInfo.token
      })
    },
    ...mapActions([
      'updateUserInfo'
    ])
  }
}
