  <template>
  <transition name="show">
    <div class="wash-info">
      <div class="header">
        <h2>洗车服务详情</h2>
        <div class="close" @click="closewindow"></div>
      </div>
      <div class="content">
        <ul>
          <li v-for="(item, index) in washinfo" :key="index">
            <div class="left">
              <div class="img">
                <img :src="gt1UpdateImgUrl + item.img" alt="">
              </div>
              <div class="info">
                <h2>{{item.title}}</h2>
                <p>{{item.content}}</p>
              </div>
            </div>
            <div class="right">
              ￥{{item.price}}
            </div>
          </li>
        </ul>
      </div>
      <div class="footer">
        <a class="footer-call" :href="'tel:' + storeinfo.responserTel">
          <span class="bg" >
            联系店长
          </span>
        </a>
        <div class="footer-box"></div>
        <div class="footer-txt">
          <p>地址如有偏差，请及时联系店长</p>
        </div>
        <div class="footer-btn" @click="_openLocation">
          <span class="bg" >
            去这里
          </span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Wx from 'Wx'
export default {
  props: {
    storeinfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      washinfo: []
    }
  },
  methods: {
    closewindow () {
      this.$emit('closewindow', false)
    },
    _openLocation () {
      Wx.openLocation({
        latitude: parseFloat(this.storeinfo.stationPositionY),
        longitude: parseFloat(this.storeinfo.stationPositionX),
        name: this.storeinfo.name,
        address: this.storeinfo.stationAddress,
        scale: 14,
        infoUrl: ''
      })
    },
    getWashInfo () {
      this.$post(`${this.gt1Url}/api/f6-app/getcarWashList`, this.gt1Header, (res) => {
        if (res.errorCode === 0 && res.data.code === 0) {
          this.washinfo = res.data.data
        }
      })
    }
  },
  created () {
    this.getWashInfo()
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .show-enter-active, .show-leave-active
    transition:  all .3s
  .show-enter, .show-leave-to
    transform: translateY(100%)
    opacity: 0
  .wash-info
    display: flex
    flex-direction: column
    position: absolute
    left: 0
    bottom: 0
    width: 100%
    min-height: 260px
    overflow: hidden
    background-color: #fff
    box-shadow: 0 -6px 10px rgba(0, 0, 0, 0.1)
    z-index: 200
    opacity: 1
    .header
      display: flex
      height: 78px
      h2
        flex: 1
        padding-left: 30px
        font-size: 28px
        color: #6c6c6c
        line-height: 78px
        font-weight: bold
      .close
        width: 78px
        bg-image('../../common/imgs/washcar/close')
        background-position: center center
        background-repeat: no-repeat
        background-size: 20px 20px
    .content
      flex: 1
      ul
        overflow: hidden
        li
          display: flex
          align-items: center
          height: 170px
          padding: 0 30px 0px 0px
          .right
            width: 100px
            display: flex
            justify-content: flex-end
            align-items: center
            font-size: 22px
            color: #ff7a7a
          .left
            flex: 1
            display: flex
            img
              width: 154px
              height: 90px
              margin-right: 30px
            .info
              flex: 1
              display: flex
              flex-direction: column
              h2
                font-size: 28px
                color: #5b5b5b
                font-weight: bold
              p
                margin-top: 21px
                width: 395px
                font-size: 22px
                color: #9f9f9f
                line-height: 24px
    .footer
      display: flex
      justify-content: center
      align-items: center
      -webkit-box-shadow:0 0 10px rgba(0, 0, 0, .1)
      -moz-box-shadow:0 0 10px rgba(0, 0, 0, .1)
      box-shadow:0 0 10px rgba(0, 0, 0, .1)
      .footer-call
        width: 130px
        bg-image('../../common/imgs/orderinfo/call-dz')
        background-repeat: no-repeat
        background-position: center 10px
        background-size: 29px 28px
        padding-top: 50px
        font-size: 22px
        color: #5b5b5b
        text-align: center
      .footer-box
        width: 1px
        height: 60px
        transform: scale(0.5, 1)
        background-color: #e3e3e3
      .footer-txt
        flex: 1
        display: flex
        justify-content: center
        align-items: center
        p
          flex: 1
          font-size: 20px
          color: #d1d1d1
          padding: 0px 20px
      .footer-btn
        width: 350px
        display: flex
        justify-content: center
        align-items: center
        height: 100px
        bg-image('../../common/imgs/washcar/btn_bg')
        background-repeat: no-repeat
        background-position: center center
        background-size: 750px 100%
        overflow: hidden
        .bg
          bg-image('../../common/imgs/washcar/now_lat')
          background-repeat: no-repeat
          background-position: left center
          background-size: 20px 26px
          font-size: 30px
          color: #fffefe
          padding-left: 40px
</style>
