// 车辆检测单

<template>
  <div class="detection-record" flexContainer>
    <div class="action-bar">
      <div class="go-back" @click="_goBack"></div>
      <div class="font">
        <h2>东风本田-思域</h2>
        <p><span>苏DB5A68</span><span>丨</span><span>2300km</span></p>
      </div>
    </div>
    <Scroll class="list">
      <ul class="con">
        <li  class="list-info">
          <div class="left">
            <div class="time">
              <span>2018年01月01日 10:30</span>
              <span v-if="isflag">经检查您的爱车没有异常</span>
            </div>
            <div class="abnormal"  v-if="!isflag">
              <div class="err-info">
                <div>新增</div>
                <div><span>远光灯</span><span class="err"></span></div>
              </div>
              <div class="err-info">
                <div>新增</div>
                <div><span>轮胎胎压异常</span><span class="err"></span></div>
              </div>
              <div class="err-info">
                <div>新增</div>
                <div><span>雨刮器</span><span class="success"></span></div>
              </div>
              <div class="err-info">
                <div>处理完成</div>
                <div><span>远光灯</span><span class="success"></span></div>
              </div>
            </div>
          </div>
          <div class="right"  v-if="!isflag">
          </div>
        </li>
        <li  class="list-info">
          <div class="left">
            <div class="time">
              <span>2018年01月01日 10:30</span>
              <span v-if="isflag">经检查您的爱车没有异常</span>
            </div>
            <div class="abnormal"  v-if="!isflag">
              <div class="err-info">
                <div>新增</div>
                <div><span>远光灯</span><span class="err"></span></div>
              </div>
              <div class="err-info">
                <div>新增</div>
                <div><span>轮胎胎压异常</span><span class="err"></span></div>
              </div>
              <div class="err-info">
                <div>新增</div>
                <div><span>雨刮器</span><span class="success"></span></div>
              </div>
              <div class="err-info">
                <div>处理完成</div>
                <div><span>远光灯</span><span class="success"></span></div>
              </div>
            </div>
          </div>
          <div class="right"  v-if="!isflag">
          </div>
        </li>
        <li  class="list-info">
          <div class="left">
            <div class="time">
              <span>2018年01月01日 10:30</span>
              <span v-if="isflag">经检查您的爱车没有异常</span>
            </div>
            <div class="abnormal"  v-if="!isflag">
              <div class="err-info">
                <div>新增</div>
                <div><span>远光灯</span><span class="err"></span></div>
              </div>
              <div class="err-info">
                <div>新增</div>
                <div><span>轮胎胎压异常</span><span class="err"></span></div>
              </div>
              <div class="err-info">
                <div>新增</div>
                <div><span>雨刮器</span><span class="success"></span></div>
              </div>
              <div class="err-info">
                <div>处理完成</div>
                <div><span>远光灯</span><span class="success"></span></div>
              </div>
            </div>
          </div>
          <div class="right"  v-if="!isflag">
          </div>
        </li>
        <li  class="list-info">
          <div class="left">
            <div class="time">
              <span>2018年01月01日 10:30</span>
              <span v-if="isflag">经检查您的爱车没有异常</span>
            </div>
            <div class="abnormal"  v-if="!isflag">
              <div class="err-info">
                <div>新增</div>
                <div><span>远光灯</span><span class="err"></span></div>
              </div>
              <div class="err-info">
                <div>新增</div>
                <div><span>轮胎胎压异常</span><span class="err"></span></div>
              </div>
              <div class="err-info">
                <div>新增</div>
                <div><span>雨刮器</span><span class="success"></span></div>
              </div>
              <div class="err-info">
                <div>处理完成</div>
                <div><span>远光灯</span><span class="success"></span></div>
              </div>
            </div>
          </div>
          <div class="right"  v-if="!isflag">
          </div>
        </li>
        <li  class="list-info">
          <div class="left">
            <div class="time">
              <span>2018年01月01日 10:30</span>
              <span v-if="isflag">经检查您的爱车没有异常</span>
            </div>
            <div class="abnormal"  v-if="!isflag">
              <div class="err-info">
                <div>新增</div>
                <div><span>远光灯</span><span class="err"></span></div>
              </div>
              <div class="err-info">
                <div>新增</div>
                <div><span>轮胎胎压异常</span><span class="err"></span></div>
              </div>
              <div class="err-info">
                <div>新增</div>
                <div><span>雨刮器</span><span class="success"></span></div>
              </div>
              <div class="err-info">
                <div>处理完成</div>
                <div><span>远光灯</span><span class="success"></span></div>
              </div>
            </div>
          </div>
          <div class="right"  v-if="!isflag">
          </div>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from '@/base/scroll/scroll'
export default {
  name: 'detectionRecord',
  data () {
    return {
      isflag: false
    }
  },
  methods: {
    _goBack () {
      this.$router.go(-1)
    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.detection-record
  background-color: #f4f4f4
  flex-direction: column
  height: 100vh
  .action-bar
    display: flex
    height: 88px
    background-color: #fff
    margin-bottom: 10px
    .font
      flex: 1
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      margin-right: 120px
      h2
        font-size: 30px
        line-height: 42px
        color: #5b5b5b
        font-weight: bolder
        transform: skewX(-10deg)
      p
        font-size: 22px
        color: #5b5b5b
        line-height: 34px
        span:nth-child(2)
          margin: 0 15px
    .go-back
      width: 120px
      height: 88px
      bg-image('../../common/imgs/order/back')
      background-repeat: no-repeat
      background-position: 30px center
      background-size: 18px 30px
  .list
    flex: 1
    overflow: hidden
    .con
      position: relative
    .list-info
      padding: 17px 30px
      display: flex
      min-height: 90px
      background-color: #fff
      overflow: hidden
      .left
        flex: 1
        display: flex
        flex-direction: column
        .time
          height: 56px
          display: flex
          line-height: 56px
          span:nth-child(1)
            flex: 1
            font-size: 24px
            color: #a3a2a2
          span:nth-child(2)
            flex: 1
            font-size: 24px
            color: #5b5b5b
            font-weight: bold
            text-align: right
        .abnormal
          overflow: hidden
          .err-info
            height: 56px
            display: flex
            line-height: 56px
            & > div:nth-child(1)
              width: 235px
              text-align: right
              font-size: 22px
              color: #ff5555
              line-height: 56px
            & > div:nth-child(2)
              flex: 1
              padding-left: 20px
              font-size: 24px
              color: #5b5b5b
              overflow: hidden
              span:nth-child(1)
                margin-right: 17px
                display: inline-block
                height: 56px
                float:left
              span:nth-child(2)
                display: inline-block
                float:left
                width: 78px
                height: 56px
                background-size: 78px 56px
                background-repeat: no-repeat
                background-position: center center
                &.err
                  bg-image('../../common/imgs/orderinfo/err')
                &.success
                  bg-image('../../common/imgs/orderinfo/warn')
      .right
        width: 30px
        bg-image('../../common/imgs/mind/leftright')
        background-repeat: no-repeat
        background-size: 15px 24px
        background-position: right center
</style>
