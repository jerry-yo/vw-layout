<template>
  <div class="container">
    <div w-750-200  aspectratio aspect-ratio="750/200">
      <!-- <div aspectratio-content>
       <img src="//gw.alicdn.com/imgextra/i1/82/TB2M_c0jmB0XKJjSZFsXXaxfpXa_!!82-0-luban.jpg_q50.jpg" alt="" width="100%" height="100%">
      </div> -->
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
  /* z-index: 50000; */
}
[w-750-200]{
  aspect-ratio:'750:200';
}
</style>
