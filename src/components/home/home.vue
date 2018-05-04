 <template>
  <div class="home">
    <div class="home-top">
      <div class="sele-city">
        常州发的
        <span></span>
      </div>
      <span>GT1养车</span>
      <div class="message">
      </div>
    </div>
    <Scroll class="container_1" ref="home">
      <div class="con">
        <div class="slider">
          <Swiper  :autoplay="autoPlay" :duration="duration" :slidetype="slideType" :recommends="recommends" :color="color" :pagination="pagination">

          </Swiper>
        </div>
        <div class="car-info">
          <div class="car-con">
            <div class="info-tab" :class="carInfo.id ? '' : 'nocar'">
              <div class="car-img" v-show="carInfo.id ? true : false">
                <img src="" alt="">
              </div>
              <div class="car-name"  v-show="carInfo.id ? true : false">
                <div class="name">{{carInfo.carName}}</div>
                <div class="card-info">
                  <div class="card">{{carInfo.carCard}}</div>
                  <div class="way">{{carInfo.carWay}}</div>
                </div>
              </div>
            </div>
            <div class="car-check">
              <Badge count="9">
                <img src="../../common/imgs/home/jcd@2x.png" alt="" >
              </Badge>
              <p>查看检测单</p>
            </div>
          </div>
        </div>
        <div class="gt1-menu">
          <ul>
            <li @click="_goCarWash">
              <div class="img">
                <div class="action"></div>
              </div>
              <h2>洗车</h2>
              <h3>5元洗车活动</h3>
            </li>
            <li @click="_goMaintain">
              <div class="img">
                <div class="action"></div>
              </div>
              <h2>保养</h2>
              <h3>低价好配件</h3>
            </li>
            <li @click="_goRepair">
              <div class="img">
                <div class="action"></div>
              </div>
              <h2>维修</h2>
              <h3>一线专业技工</h3>
            </li>
            <li @click="_goRescue">
              <div class="img">
                <div class="action"></div>
              </div>
              <h2>救援</h2>
              <h3>闪电速达</h3>
            </li>
          </ul>
        </div>
        <div class="gt1-server">
          <ul>
            <li><h2>补胎换胎</h2></li>
            <li><h2>钣金喷漆</h2></li>
            <li><h2>违章查询</h2></li>
            <li><h2>年检代办</h2></li>
            <li><h2>买车险</h2></li>
          </ul>
        </div>
        <div class="beizhu">
          灰色服务还未上线 敬请期待
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from '@/base/scroll/scroll'
import Badge from '@/base/badge'
import Swiper from '@/base/swiper/swiper-slider-animate'
export default {
  name: 'home',
  data () {
    return {
      homeBScroll: null,
      carInfo: {
        imgUrl: '',
        id: 0,
        carName: '东风本田-思域',
        carWay: '2300km',
        carCard: '苏DB5A68'
      },
      recommends: [{
        id: 1,
        linkUrl: 'https://y.qq.com/m/act/chunwan2018/v3/index.html?ADTAG=jiaodiantu',
        picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M0000044SNAC19jwin.jpg'
      }, {
        id: 2,
        linkUrl: 'http://y.qq.com/w/album.html?albummid=001u8nwR0H4x7z',
        picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000003b2lHy424XQS.jpg'
      }, {
        id: 3,
        linkUrl: 'https://y.qq.com/apg/156/index.html?ADTAG=5',
        picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000000HDstc2PVKnq.jpg'
      }, {
        id: 4,
        linkUrl: 'http://y.qq.com/w/album.html?albummid=003l5sT818BTyn',
        picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000001LLLb51HkIVE.jpg'
      }, {
        id: 5,
        linkUrl: 'https://c.y.qq.com/node/m/client/music_headline/index.html?_hidehd=1&_button=2&zid=619582',
        picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000000Wq2eW3VkzJ9.jpg'
      }],
      autoPlay: 5000,
      duration: 500,
      slideType: 'left',
      color: '#fff',
      pagination: true
    }
  },
  methods: {
    // 洗车
    _goCarWash () {
      this.$router.push('/washcar')
    },
    // 维修
    _goRepair () {
      this.$router.push('/repair')
    },
    // 保养
    _goMaintain () {
      this.$router.push('/maintain')
    },
    // 救援
    _goRescue () {

    }
  },
  mounted () {
  },
  components: {
    Badge,
    Swiper,
    Scroll
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .home
    flex: 1
    display: flex
    flex-direction: column
    bg-image('../../common/imgs/home/homebg')
    background-size: 750px 540px
    background-repeat: no-repeat
    background-position:center top
    overflow: hidden
    .home-top
      position: relative
      height: 88px
      .sele-city
        margin-top: 16px
        display: inline-block
        position: relative
        margin-left: 30px
        background-color: rgba(255, 255, 255, 0.85)
        border-radius: 5px
        font-size: 22px
        color: #fd9068
        padding: 16px 46px 16px 20px
        span
          position: absolute
          right: 0
          top: 0
          display: inline-block
          width: 32px
          height: 54px
          bg-image('../../common/imgs/home/sj-bottom')
          background-size: 12px 6px
          background-repeat: no-repeat
          background-position: left center
      & > span
        position: absolute
        left: 0
        right: 0
        top: 0
        bottom: 0
        margin: auto
        display: inline-block
        width: 180px
        line-height: 88px
        color: #fff
        font-size: 40px
        font-weight: 600
        transform: skewX(-15deg)
      .message
        float: right
        width: 80px
        height: 88px
        margin-right: 30px
        bg-image('../../common/imgs/mind/xx')
        background-size: 42px 42px
        background-repeat: no-repeat
        background-position: right center
    .container_1
      flex: 1
      overflow: hidden
      .con
        position: relative
        overflow: hidden
      .slider
        height: 300px
      .car-info
        height: 187px
        .car-con
          width: 706px
          height: 187px
          padding: 4px 14px 12px 7px
          margin: 0 auto
          display: flex
          bg-image('../../common/imgs/home/carbg')
          background-size: 706px 187px
          background-repeat: no-repeat
          background-position: center center
          overflow: hidden
          .info-tab
            flex: 1
            display: flex
            &.nocar
              bg-image('../../common/imgs/home/nocar')
              background-size: 374px 60px
              background-repeat: no-repeat
              background-position: center center
            .car-img
              width: 127px
              display: flex
              align-items: center
              justify-content: center
              img
                width: 50px
                height: 50px
                background-color: red
            .car-name
              flex: 1
              display: flex
              flex-direction: column
              align-items: flex-start
              justify-content: center
              border-right: 1px solid #e7e7e7
              .name
                height: 40px
                line-height: 40px
                font-size: 30px
                color: #5b5b5b
                font-weight: bolder
                transform: skewX(-10deg)
              .card-info
                padding-top: 7px
                height: 32px
                display: flex
                font-size: 24px
                color: #5b5b5b
                line-height: 34px
                .card
                  width: 140px
                  border-right: 1px solid #5b5b5b
                .way
                  flex: 1
                  padding-left: 28px
          .car-check
            display: flex
            flex-direction: column
            align-items: center
            justify-content: center
            background-color: #fff
            position: relative
            width: 160px
            padding-top: 28px
            img
              display: block
              width: 67px
              height: 65px
            p
              line-height: 56px
              color: #636363
              font-size: 24px
              text-align: center
      .gt1-menu
        min-height: 240px
        padding: 0px 30px
        ul
          min-height: 240px
          border-bottom: 1px solid #f2f2f2
          overflow: hidden
          li
            height: 232px
            width: 25%
            float: left
            display: flex
            flex-direction: column
            justify-content: center
            align-items: center

            &:nth-child(1)
              .img
                bg-image('../../common/imgs/home/xc')
            &:nth-child(2)
              .img
                bg-image('../../common/imgs/home/by')
            &:nth-child(3)
              .img
                bg-image('../../common/imgs/home/wx')
            &:nth-child(4)
              .img
                bg-image('../../common/imgs/home/jykb')
            .img
              position: relative
              width: 90px
              height: 90px
              background-size: 90px 90px
              background-repeat: no-repeat
              background-position: center center
              .action
                position: absolute
                right: -30px
                top: -23px
                width: 63px
                height: 46px
                bg-image('../../common/imgs/home/action')
                background-size: 63px 46px
                background-repeat: no-repeat
                background-position: center center
            & > h2
              padding-top: 16px
              text-align: center
              font-size: 24px
              color: #636363
            & > h3
              padding-top: 11px
              text-align: center
              font-size: 20px
              color: #acacac
      .gt1-server
        overflow: hidden
        padding: 0 30px
        & > ul
          min-height: 180px
          overflow: hidden
          li
            width: 20%
            height: 139px
            float: left
            background-size: 35px 38px
            background-repeat: no-repeat
            background-position: center 35px
            &:nth-child(1)
              bg-image('../../common/imgs/home/lt')
            &:nth-child(2)
              bg-image('../../common/imgs/home/fjpq')
            &:nth-child(3)
              bg-image('../../common/imgs/home/wz')
            &:nth-child(4)
              bg-image('../../common/imgs/home/nj')
            &:nth-child(5)
              bg-image('../../common/imgs/home/cx')
            &:nth-child(6)
              bg-image('../../common/imgs/home/cx')
            & > h2
              padding-top: 85px
              font-size: 20px
              color: #651212
              text-align: center
      .beizhu
        font-size: 20px
        color: #b9b9b9
        text-align: center
        line-height: 40px
        background-color: #f2f2f2
        margin-bottom: 23px

</style>
