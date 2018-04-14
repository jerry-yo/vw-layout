<template>
  <div class="server-model" flexContainer >
    <div class="menu" @click="_showInfo">
      <div class="check">
        <div class="btn" :class="server.groupItem.isChecked ? 'check' : 'nocheck'" @click.stop="_checkServer"></div>
      </div>
      <div class="server-info">
        <div class="title">{{server.groupItem.keepServiceFirstItemBean.serviceName}}<span v-if="server.groupItem.keepServiceFirstItemBean.isRecommend">推荐</span> </div>
        <div class="tips">{{server.groupItem.keepServiceFirstItemBean.bottomRemark}}</div>
      </div>
      <div class="operation" v-if="addServer">
        <div class="state1" v-show="server.groupItem.state === 1">
          {{server.groupItem.keepServiceFirstItemBean.rightRemark}}
        </div>
        <div class="state2" v-show="server.groupItem.state === 2">
          <div class="edit" @click.stop="_editServer">编辑</div>
        </div>
        <div class="state3" v-show="server.groupItem.state === 3">
          <div class="sort" @click.stop="_saveServer">保存</div>
          <div class="change" @click.stop="_cancelServer">取消</div>
        </div>
      </div>
    </div>
    <ul class="good-list" v-if="server.groupItem.action">
      <li v-for="(item, index) in server.subItems" :key="index">
        <div class="tab-check">
          <div class="btn" :class="item.isChecked ? 'check': 'nocheck'" @click="_checkGood(index)" v-if="addServer"></div>
        </div>
        <div class="img">
          <img src="" alt="">
        </div>
        <div class="good-info">
          <div class="change" v-if="server.groupItem.state === 2">
            <div class="parameter">
              <div class="left">
                <div class="name">级别： <span>{{item.keepServiceSecondItemBean.classify}}</span></div>
                <div class="brand">品牌：<span>{{item.keepServiceSecondItemBean.trademark}}</span></div>
              </div>
              <div class="right">
                <div class="viscosity">粘度：<span>{{item.keepServiceSecondItemBean.viscosity}}</span></div>
                <div class="spec">规格：<span>{{item.keepServiceSecondItemBean.specification}}</span></div>
              </div>
            </div>
            <div class="tips">{{item.keepServiceSecondItemBean.minCommodityNumber}}辆“思域”选择了此产品</div>
            <div class="buy-info">
              <span>￥{{item.keepServiceSecondItemBean.commodityPrice}}</span>
              <span>X{{item.keepServiceSecondItemBean.commodityNumber}}</span>
            </div>
          </div>
          <div class="no-change" v-if="server.groupItem.state === 3  && addServer">
            <span>￥{{(item.keepServiceSecondItemBean.commodityPrice).toFixed(2)}}</span>
            <div class="input-num">
              <counter :goodsinfo="item"></counter>
            </div>
            <div class="change-btn">
              <div class="btn" @click="_changeGood">更换</div>
            </div>
          </div>

        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import counter from '@/base/counter'
export default {
  name: 'serverModel',
  props: {
    server: {
      type: Object
    },
    serverid: {
      type: Number,
      required: true
    },
    addServer: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      locationServerList: null
    }
  },
  methods: {
    _showInfo () {
      this.server.groupItem.action = !this.server.groupItem.action
      if (this.server.groupItem.action) {
        this.server.groupItem.state = 2
      } else {
        this.server.groupItem.state = 1
      }
    },
    _checkGood (index) {
      let flag = false
      this.server.subItems[index].isChecked = !this.server.subItems[index].isChecked
      this.server.subItems.forEach((item, id) => {
        if (item.isChecked) {
          flag = true
        }
      })
      if (!flag) {
        this.server.groupItem.isChecked = false
      } else {
        this.server.groupItem.isChecked = true
      }
    },
    _checkServer () {
      if (this.server.groupItem.isChecked) {
        this.server.groupItem.isChecked = false
        this.server.subItems.forEach((item) => {
          item.isChecked = false
        })
      } else {
        this.server.groupItem.isChecked = true
        this.server.subItems.forEach((item) => {
          item.isChecked = true
        })
      }
    },
    _editServer () {
      this.server.groupItem.state = 3
    },
    _saveServer () {
      this.locationServerList = JSON.parse(sessionStorage.getItem('serverList'))
      this.server.groupItem.state = 2
      this.locationServerList[this.serverid] = this.server
      sessionStorage.setItem('serverList', JSON.stringify(this.locationServerList))
    },
    _cancelServer () {
      this.locationServerList = JSON.parse(sessionStorage.getItem('serverList'))
      this.server.groupItem.state = 2
      this.$set(this.server, 'subItems', this.locationServerList[this.serverid].subItems)
    },
    _changeGood () {
    }
  },
  mounted () {
    this.$nextTick(function () {
    })
  },
  components: {
    counter
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../common/stylus/mixin.styl"
  .server-model
    min-height: 90px
    display: flex
    flex-direction: column
    background-color: #fff
    margin-bottom: 10px
    padding: 0 30px
    overflow: hidden
    .menu
      height: 90px
      display: flex
      .check
        width: 57px
        display: flex
        align-items: center
        .btn
          width: 30px
          height: 30px
          &.check
            bg-image('../common/imgs/repair/sele')
            background-repeat: no-repeat
            background-size: 30px 30px
            background-position: center center
          &.nocheck
            bg-image('../common/imgs/repair/unsele')
            background-repeat: no-repeat
            background-size: 30px 30px
            background-position: center center
      .server-info
        display: flex
        flex-direction: column
        padding-top: 18px
        .title
          height: 34px
          line-height: 34px
          font-size: 26px
          color: #5b5b5b
          span
            display: inline-block
            width: 65px
            height: 30px
            text-align: center
            line-height: 30px
            font-size: 18px
            color: #ffffff
            background-color: #ff6252
            margin-left: 18px
        .tips
          height: 32px
          line-height: 32px
          font-size: 22px
          color: #c4c4c4
      .operation
        flex: 1
        display: flex
        .state1, .state2, .state3
          flex: 1
          display: flex
          justify-content: flex-end
          align-items: center
          & > div
            width: 70px
            height: 38px
            border: 1px solid #ff7843
            margin-left: 12px
            border-radius: 5px
            font-size: 20px
            color: #ff8244
            text-align: center
            line-height: 38px
          .sort
            background-color: #ff8244
            color: #fff
        .state1
          font-size: 24px
          color: #c7c7c7
    .good-list
      overflow: hidden
      li
        height: 192px
        display: flex
        padding: 15px 0px
        border-top: 1px solid #f5f5f5
        .tab-check
          width: 55px
          display: flex
          align-items: center
          justify-content: center
          .btn
            width: 30px
            height: 30px
            &.check
              bg-image('../common/imgs/repair/sele')
              background-repeat: no-repeat
              background-size: 30px 30px
              background-position: center center
            &.nocheck
              bg-image('../common/imgs/repair/unsele')
              background-repeat: no-repeat
              background-size: 30px 30px
              background-position: center center
        .img
          width: 177px
          img
            display: block
            width: 160px
            height: 160px
            border: 1px solid #d2d2d2
            background-color: rgba(255, 0, 0, 0.5)
        .good-info
          flex: 1
          display: flex
          .change
            flex: 1
            display: flex
            flex-direction: column
            .parameter
              height: 90px
              display: flex
              .left, .right
                flex: 1
              .left
                margin-right: 60px
              .name, .brand, .viscosity, .spec
                height: 50%
                display: flex
                align-items: center
                font-size: 24px
                color: #a8a8a8
                span
                  flex: 1
                  font-size: 24px
                  color: #5b5b5b
                  text-align: right
            .tips
              height: 30px
              line-height: 30px
              text-align: center
              background-color: #b7b7b7
              font-size: 20px
              color: #ffffff
            .buy-info
              flex: 1
              display: flex
              span:nth-child(1)
                flex:1
                padding-top: 13px
                font-size: 30px
                color: #ff6868
              span:nth-child(2)
                flex:1
                padding-top: 17px
                font-size: 24px
                color: #a8a8a8
                text-align: right
          .no-change
            flex: 1
            display: flex
            align-items: center
            & > span
              font-size: 30px
              color: #ff6868
            .input-num
              flex:1
              display: flex
              justify-content: center
              align-items: center
            .change-btn
              width: 74px
              .btn
                width: 70px
                height: 38px
                background-color: #fff
                border: 2px solid #ff7843
                font-size: 20px
                color: #ff7843
                text-align: center
                line-height: 38px
</style>
