<template>
  <div id="main" flexContainer>
    <div flexContainer class="container">
      <router-view></router-view>
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
    background-color: #f4f4f4
    flex-direction: column
    height: 100vh
    .container
      flex: 1
</style>
