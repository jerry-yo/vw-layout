<template>
  <div class="hello">
    <div w-750-200  aspectratio aspect-ratio="750/200">

    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
[w-750-200] {
  width: 750px;
  background: red;
}
[w-750-220]{
  aspect-ratio:'750:220';
}
</style>
