  <template>
  <transition name="show">
    <div class="wash-info">
      <div class="header">
        <h2>洗车服务详情</h2>
        <div class="close" @click="closewindow"></div>
      </div>
      <div class="content">
        <ul>
          <li v-for="(item, index) in washinfo" :key="item.id" @click="radioCheck(item, index)">
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
              <span>￥{{item.price}}</span>
              <span :class="`radio ${item.check ? 'radio-checked' : ''}`" >
                <span class="radio-inner"></span>
              </span>
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
        <div class="footer-btn" @click="_goYuyue">
          去预约
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
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
  computed: {
    ...mapGetters([
      'userInfo',
      'myCar'
    ])
  },
  methods: {
    closewindow () {
      this.$emit('closewindow', false)
    },
    _goYuyue () {
      if (this.userInfo && this.myCar.length) {
        let id = this.$parent.preMarkerId
        this.setDefaultStoreId(id)
        for (let value of this.washinfo) {
          if (value.check) {
            this.setUpdateOrder(value)
          }
        }
      }
      this.$router.push('/repair-pre-order?server=xc')
    },
    getWashInfo () {
      this.$post(`${this.gt1Url}/api/f6-app/getcarWashList`, this.gt1Header, (res) => {
        if (res.errorCode === 0 && res.data.code === 0) {
          this.washinfo = res.data.data
          this.washinfo.forEach((item, index) => {
            if (index === 0) {
              item.check = true
            } else {
              item.check = false
            }
          })
        }
      })
    },
    radioCheck (item, index) {
      if (item.check) {
        return
      }
      this.washinfo.forEach((res, id) => {
        if (id === index) {
          this.$set(this.washinfo, id, Object.assign({}, this.washinfo[id], {
            check: true
          }))
        } else {
          this.$set(this.washinfo, id, Object.assign({}, this.washinfo[id], {
            check: false
          }))
        }
      })
    },
    ...mapMutations({
      setUpdateOrder: 'SET_UPDATE_ORDER',
      setDefaultStoreId: 'SET_DEFAULTSTORE_ID'
    })
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
            height: 140px
            width: 100px
            display: flex
            flex-direction: column
            justify-content: center
            align-items: flex-end
            font-size: 22px
            color: #ff7a7a
            .radio
              display:inline-block
              margin-right:4px
              white-space:nowrap
              position:relative
              line-height:1
              vertical-align:middle
              cursor:pointer
              margin-top: 20px
              .radio-inner
                display:inline-block
                width:28px
                height:28px
                position:relative
                top:0
                left:0
                background-color:#fff
                border:1px solid #dcdee2
                border-radius: 50%
                -webkit-transition:all .2s ease-in-out
                transition:all .2s ease-in-out
              .radio-inner:after
                box-sizing: border-box
                position:absolute
                width: 20px
                height:20px
                left:2px
                top:2px
                border-radius: 50%
                display:table
                border-top:0
                border-left:0
                content:' '
                background-color: rgb(255, 102, 42)
                opacity:0
                -webkit-transition:all .2s ease-in-out
                transition:all .2s ease-in-out
                -webkit-transform:scale(0)
                -ms-transform:scale(0)
                transform:scale(0)
            .radio-checked
              .radio-inner
                border-color: rgb(255, 102, 42)
              .radio-inner:after
                opacity:1
                -webkit-transform:scale(1)
                -ms-transform:scale(1)
                transform:scale(1)
                -webkit-transition:all .2s ease-in-out
                transition:all .2s ease-in-out
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
        font-size: 30px
        color: #fffefe
</style>
