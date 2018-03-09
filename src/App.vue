<template>
  <div id="app" flexContainer>
    <div flexContainer class="container">
      <router-view/>
    </div>
    <v-footer/>
  </div>
</template>

<script>
import vfooter from '@/components/footer/footer'
export default {
  name: 'App',
  components: {
    'v-footer': vfooter
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  #app
    flex-direction: column
    min-height: 100vh
    .container
      flex: 1
</style>
