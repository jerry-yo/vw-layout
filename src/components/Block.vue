<template>
  <div class="container1">
    <div w-750-200  aspectratio aspect-ratio="750/200">

    </div>
  </div>
</template>

<script>
export default {
  name: 'blcok',
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
  background: green;
}
[w-750-200]{
  aspect-ratio:'750:200';
}
</style>
