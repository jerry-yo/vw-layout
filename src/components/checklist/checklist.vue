// 检测单
<template>
  <div class="check-list" flexContainer>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'checklist'
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .check-list
    flex-direction: column
    height: 100vh
    background-color: #f4f4f4
    overflow: hidden

</style>
