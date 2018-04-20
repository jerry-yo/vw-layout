<template>
  <div class="vehicle-certification" flexContainer>
    <div class="example">
      <div class="img">
        <img src="" alt="for example">
      </div>
      <p>行驶证信息仅用于认证，我们将为您严格保密</p>
    </div>
    <div class="car-info">
      <div class="info-1">
        <span>车牌号</span>
        <span>苏DB5463</span>
      </div>
      <div class="info-2">
        <span>发动机号</span>
        <div class="input">
          <input type="text" name="" value="" placeholder="用于核实车主本人" maxlength="8">
        </div>
      </div>
    </div>
    <div class="submit-btn">
      <div class="btn">

      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'vehicleCertification'
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .vehicle-certification
    margin-top: 10px
    flex: 1
    flex-direction: column
    .example
      padding-top: 16px
      background-color: #fff
      height: 485px
      margin-bottom: 20px
      .img
        width: 556px
        height: 384px
        border: 1px solid #ff673b
        margin: 0 auto
        padding: 7px
        margin-bottom: 32px
        img
          display: block
          width: 100%
          height: 100%
          background-color: red
      p
        text-align: center
        font-size: 20px
        color: #9c9c9c
        line-height: 20px
    .car-info
      height: 161px
      background-color: #fff
      margin-bottom: 43px
      & > div
        height: 80px
        line-height: 80px
        display: flex
        padding: 0 30px
      .info-1
        border-bottom: 1px solid #f2f2f2
        font-size: 26px
        color: #5b5b5b
        span
          flex: 1
        span:nth-child(2)
          text-align: right
      .info-2
        font-size: 26px
        color: #5b5b5b
        .input
          flex: 1
          input
            height: 80px
            float: right
            text-align: right
            font-size: 26px
            color: #5b5b5b
            border: none
            background: none
            outline: none
            &::-webkit-input-placeholder
              color: #bebebe
              text-align: right
    .submit-btn
      height: 88px
      display: flex
      padding: 0 30px
      .btn
        flex: 1
        background-color: red
</style>
