<template>
  <div class="server-model" flexContainer >
    <div class="menu" @click="_showInfo">
      <div class="check-btn" v-if="hasCheck">
        <div class="btn" :class="server.isChecked ? 'check' : 'nocheck'" @click.stop="_checkServer"></div>
      </div>
      <div class="server-info">
        <div class="title">{{server.name}}<span v-if="server.customerType === 'cg' || server.customerType === 'tj'">{{server.customerType === 'cg' ? '常规': server.customerType === 'tj' ? '推荐': ''}}</span> </div>
        <div class="tips">共{{server.partInfo !== null && server.partInfo ? 1 : 0}}件材料</div>
      </div>
      <div class="operation">
        <div class="state1" v-show="!hasCheck || server.state === -1 ">
          <span>{{`服务费￥${server.amount}`}}起</span>
        </div>
        <div class="state2" v-show="server.state === 0 && hasCheck">
          <div class="edit" @click.stop="_editServer">编辑</div>
        </div>
        <div class="state3" v-show="server.state === 1 && hasCheck">
          <div class="sort" @click.stop="_saveServer">保存</div>
          <div class="change" @click.stop="_cancelServer">取消</div>
        </div>
      </div>
    </div>
    <ul class="good-list" v-if="server.partInfo !== null && server.state > -1">
      <li>
        <div class="tab-check" v-if="hasCheck">
          <div class="btn" :class="server.partInfo.isChecked ? 'check': 'nocheck'" @click="_checkGood"></div>
        </div>
        <div class="img">
          <img :src="imgpartUrl + server.partInfo.customCode" alt="">
        </div>
        <div class="good-info">
          <div class="change" v-if="server.state === 0">
            <div class="parameter">
              <div class="top">
                <div class="brand">品牌：<span>{{server.partInfo.brand + ' ' + server.partInfo.supplierCode}}</span></div>
              </div>
              <div class="bottom">
                <div class="spec">规格：<span>{{server.partInfo.spec}}</span></div>
              </div>
            </div>
            <!-- <div class="tips">{{'1'}}辆“思域”选择了此产品</div> -->
            <div class="buy-info">
              <span>￥{{server.partInfo.sellPrice}}起</span>
              <span>{{`X  ${server.partInfo.number}`}}</span>
            </div>
          </div>
          <div class="no-change" v-if="server.state === 1">
            <span>￥{{server.partInfo.sellPrice}}</span>
            <div class="input-num">
              <counter :goodsinfo="server.partInfo" @change="_changeNumber"></counter>
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
    hasCheck: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    // 修改材料数量
    _changeNumber (res) {
      this.$emit('changeNumber', [res, this.server])
    },
    // 展示服务材料
    _showInfo () {
      this.$emit('clickServer', this.server)
    },
    // 选择服务材料
    _checkGood () {
      this.$emit('checkGood', this.server)
    },
    // 选择服务
    _checkServer () {
      this.$emit('checkServer', this.server)
    },
    // 开始修改
    _editServer () {
      this.$emit('editServer', this.server)
    },
    // 保存修改
    _saveServer () {
      this.$emit('saveServer', this.server)
    },
    // 取消修改
    _cancelServer () {
      this.$emit('cancelServer', this.server)
    },
    // 更换材料
    _changeGood () {
      this.$router.push(`/change-pre?pid=${this.server.code}&idMdmPart=${this.server.partInfo.idMdmPart}&pkid=${this.server.pkId}`)
    }
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
      .check-btn
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
        justify-content: center
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
        .good-info
          flex: 1
          display: flex
          .change
            flex: 1
            display: flex
            flex-direction: column
            justify-content: center
            .parameter
              height: 90px
              display: flex
              flex-direction: column
              .top, .bottom
                flex: 1
                margin-right: 20px
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
              height: 40px
              display: flex
              span:nth-child(1)
                flex:1
                line-height: 40px
                font-size: 30px
                color: #ff6868
              span:nth-child(2)
                flex:1
                line-height: 40px
                font-size: 24px
                color: #a8a8a8
                text-align: right
                margin-right: 20px
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
                border-radius: 4px
</style>
