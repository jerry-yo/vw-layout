<template>
  <div class="repair-report-info" flexContainer>
    <headerBar contentTitle="维修日志" contentColor="#5b5b5b" @leftClick="goBack"></headerBar>
    <Scroll class="repair-report-content" ref="repairReportWarpper" :data="repairInfo">
      <div class="repair-report-con" v-if="repairInfo.orderCode">
        <div class="order-title">
          <div class="top">
            <div class="top-name">
              <span>奇特异车业 - {{stationName}}</span>
              <div class="order-states wx"></div>
            </div>
            <a class="localtion" :href="`tel: ${repairInfo.storeTel}`"></a>
          </div>
          <div class="bottom">
            <span>{{repairInfo.carNumber}}</span>
          </div>
        </div>
        <div class="other-info color">
          <div class="other-fw green">
            <span>创建时间</span>
            <span>{{repairInfo.createTime}}</span>
          </div>
          <div class="other-fw">
            <span>维修技师</span>
            <span>{{repairInfo.storeStaff}}</span>
          </div>
        </div>
        <div class="repair-riji">
          <h2>维修记录</h2>
          <div class="repair-content">
            <p class="report-1">{{repairInfo.diagnosticResults}}</p>
            <p class="report-2">{{repairInfo.content}}</p>
          </div>
        </div>
        <div class="repair-imgs" v-if="showImgArr.length > 0">
          <h2>图片描述</h2>
          <imgsScroll :imgs="showImgArr"></imgsScroll>
        </div>
        <div class="repair-other-info">
          <p>工单号： {{repairInfo.orderCode}}</p>
          <p>完工时间： {{repairInfo.orderTime}}</p>
        </div>
      </div>
      <div class="repair-report-uncon" v-else>
        <div class="no-search">
          <img src="../../common/imgs/nosearch-gd.png" alt="">
          <p>报告生成中，请稍后......</p>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import imgsScroll from '@/base/imgsScroll'
import headerBar from '@/base/headerBar'
export default {
  components: {
    Scroll,
    imgsScroll,
    headerBar
  },
  props: {
    stationName: {
      type: String,
      required: true
    },
    billNo: {
      type: String,
      required: true
    },
    carNoWhole: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      repairInfo: {
        imgs: ''
      }
    }
  },
  computed: {
    showImgArr () {
      let imgs = this.repairInfo.imgs
      if (imgs.length > 0) {
        let arr = []
        imgs.split(',').forEach(item => {
          arr.push(this.gt1UpdateImgUrl + item)
        })
        return arr
      } else {
        return []
      }
    }
  },
  created () {
    this.getRepairReport()
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    async getRepairReport () {
      const data = await this.$postSync(`${this.gt1Url}/api/f6-app/getRepairInfo`, this.gt1Header, {
        storeName: `奇特异车业科技（江苏）股份有限公司${this.stationName}`,
        orderCode: this.billNo,
        carNumber: this.carNoWhole
      })
      if (data.errorCode === 0 && data.data.code === 0) {
        if (data.data.data) {
          this.repairInfo = data.data.data
        }
      } else {
        this.$Toast({
          message: '网络错误',
          position: 'bottom'
        })
      }
    }
  }
}
</script>

<style lang="stylus">
@import "../../common/stylus/mixin.styl"
.repair-report-info
  flex-direction: column
  height: 100vh
  background-color: #f4f4f4
  overflow: hidden
  .repair-report-content
    flex: 1
    overflow: hidden
    .repair-report-uncon
      width: 100%
      height: 100%
      display: flex
      justify-content: center
      align-items: center
      .no-search
        width: 400px
        height: 400px
        text-align: center
        img
          display: inline-block
          width: 317px
          height: 200px
        font-size: 28px
        color: #5b5b5b
        line-height: 100px
    .repair-report-con
      position: relative
      .order-title
        height: 110px
        background-color: #fff
        padding: 0px 30px
        margin-bottom: 10px
        .top
          display: flex
          padding-top: 10px
          height: 60px
          .top-name
            flex: 1
            display: flex
            line-height: 50px
            font-size: 30px
            span
              color: #5b5b5b
              margin-right: 20px
            .order-states
              width: 76px
              height: 50px
              background-size: 100% 100%
              background-repeat: no-repeat
              background-position: center center
              &.wx
                bg-image('../../common/imgs/order/repair')
          .localtion
            width: 60px
            bg-image('../../common/imgs/orderinfo/call-dz')
            background-size: 29px 28px
            background-repeat: no-repeat
            background-position: center center
        .bottom
          height: 42px
          line-height: 42px
          font-size: 22px
          color: #5b5b5b
          span
            margin-right: 46px
      .other-info
        overflow: hidden
        margin-bottom: 10px
        .other-fw
          display: flex
          padding: 0px 30px
          height: 72px
          line-height: 72px
          background-color: #fff
          &.green
            margin-bottom: 1px
          span:nth-child(1)
            flex: 1
            font-size: 24px
            color: #ababab
          span:nth-child(2)
            flex: 1
            font-size: 24px
            color: #5b5b5b
            text-align: right
      .repair-riji
        & > h2
          font-size: 32px
          font-weight: bold
          padding: 30px 30px 0px
          height: 80px
          color: #5b5b5b
        .repair-content
          min-height: 200px
          background-color: #fff
          padding: 20px 30px
          .report-1, .report-2
            text-indent: 2em
            font-size: 28px
            color: #666666
            line-height: 40px
      .repair-imgs
        & > h2
          font-size: 32px
          font-weight: bold
          padding: 30px 30px 0px
          height: 80px
          color: #5b5b5b
      .repair-other-info
        width: 100%
        height: 300px
        padding: 40px 30px
        color: #999
        font-size: 24px
        line-height: 40px
</style>
