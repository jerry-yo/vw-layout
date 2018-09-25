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
      <div class="footer" @click="_openLocation">
        <span class="bg" >
          去这里
        </span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
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
      this.Wx.openLocation({
        latitude: parseFloat(this.washinfo.lat), // 纬度，浮点数，范围为90 ~ -90
        longitude: parseFloat(this.washinfo.lng), // 经度，浮点数，范围为180 ~ -180。
        name: this.washinfo.title, // 位置名
        address: this.washinfo.address, // 地址详情说明
        scale: 18 // 地图缩放级别,整形值,范围从1~28。默认为最大
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
      height: 100px
      bg-image('../../common/imgs/washcar/btn_bg')
      background-repeat: no-repeat
      background-position: center center
      background-size: 750px 100px
      .bg
        bg-image('../../common/imgs/washcar/now_lat')
        background-repeat: no-repeat
        background-position: left center
        background-size: 20px 26px
        font-size: 30px
        color: #fffefe
        padding-left: 40px
</style>
