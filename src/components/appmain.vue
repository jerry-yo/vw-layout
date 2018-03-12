<template>
  <div id="main" flexContainer @touchmove.prevent.stop>
    <div flexContainer class="container">
      <router-view/>
    </div>
    <v-footer/>
  </div>
</template>

<script>
import vfooter from '@/components/footer/footer'
export default {
  name: 'appmain',
  components: {
    'v-footer': vfooter
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  #main
    flex-direction: column
    min-height: 100vh
    .container
      flex: 1
</style>
