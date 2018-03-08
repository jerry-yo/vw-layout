<template>
  <div class="hello">
    <div w-750-300 aspectratio aspect-ratio="750/300">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Grid',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
[w-750-300] {
  width: 750px;
  background: yellow;
}
[w-750-300]{
  aspect-ratio:'750:300';
}
</style>
