import Wx from 'Wx'

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
