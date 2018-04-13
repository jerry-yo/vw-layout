<template>
  <div class="toast">
    {{message}}
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'toast',
  props: {
    message: {
      type: String
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
</style>
