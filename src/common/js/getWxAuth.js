this.api_post('/api/wxPubilc/getJSSDK', (response) => {
  if (response.errorCode === 0) {
    this.Wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: response.data.appid, // 必填，企业号的唯一标识，此处填写企业号corpid
      timestamp: response.data.timestamp, // 必填，生成签名的时间戳
      nonceStr: response.data.nonceStr, // 必填，生成签名的随机串
      signature: response.data.signature, // 必填，签名，见附录1
      jsApiList: ['chooseImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
  }
}, {
  url: 'https://www.gt1.shop/gt1/'
})
