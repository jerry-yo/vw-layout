<template>
  <div class="text" flexContainer>
    <Badge count="9">
      <a href="#" class="demo-badge"></a>
    </Badge>
    <Badge count="100">
      <a href="#" class="demo-badge"></a>
    </Badge>
    <Badge count="39">
      <a href="#" class="demo-badge"></a>
    </Badge>
    <Badge dot>
      <a href="#" class="demo-badge"></a>
    </Badge>
  </div>
</template>

<script type="text/ecmascript-6">
import Badge from '@/base/badge'
export default {
  name: 'searchCar',
  components: {
    Badge
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .text
    flex-direction: column
    align-items: center
    justify-content: center
    height: 100vh
    background-color: rgba(0, 255, 0, 0.5)
    .demo-badge
      display: inline-block
      width: 100px
      height: 100px
      background-color: blue
</style>
