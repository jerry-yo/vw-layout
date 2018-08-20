<template>
  <div class="main" flexContainer>
    <router-view></router-view>
    <v-footer class="footer"></v-footer>
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
  .main
    height: 100vh
    background-color: #f4f4f4
    flex-direction: column
</style>
