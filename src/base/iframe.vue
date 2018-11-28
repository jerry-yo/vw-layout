<template>
  <div class="v-html">
    <iframe ref="iframe" src="https://m.imooc.com/" @load="loaded" scrolling="no" class="iframe" :height="html+ 100"></iframe>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      html: 0
    }
  },
  methods: {
    loaded () {
      const vm = this.$refs.iframe.contentWindow || this.$refs.iframe.contentDocument.parentWindow
      if (vm.document.body) {
        this.html = vm.document.documentElement.scrollHeight || vm.document.body.scrollHeight
        this.$emit('setHeight', this.html)
      }
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../common/stylus/mixin.styl"
  .v-html
    position: relative
    width: 100%
    height: auto
    .iframe
      position: relative
      width: 100%
      z-index: -1

</style>
