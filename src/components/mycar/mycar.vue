<template>
  <div id="mycar" flexContainer>
    <div class="">

    </div>
  </div>
</template>

<script>
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
