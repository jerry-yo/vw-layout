<template>
  <div id="app" flexContainer @touchmove.prevent.stop>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  #app
    min-height: 100vh
</style>
