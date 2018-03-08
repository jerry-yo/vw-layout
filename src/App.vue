<template>
  <div id="app">
    <v-footer/>
  </div>
</template>

<script>
import vfooter from '@/components/footer/footer'
// import Banner from '@/components/Banner'
export default {
  name: 'App',
  components: {
    'v-footer': vfooter
    // Banner
  }
}
</script>

<style>
html {
  margin: 0;
  padding: 0;
  height: 100vh;
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: #f2f2f2;
}
* {
  box-sizing: inherit;

  &:before,
  &:after {
    box-sizing: inherit;
  }
}
img {
  width: 100%;
  height: auto;
  vertical-align: top;
  content: normal !important;
}
[aspectratio] {
  position: relative;
}
[aspectratio]::before {
  content: '';
  display: block;
  width: 1px;
  margin-left: -1px;
  height: 0;
}
[aspectratio-content] {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
[flexContainer] {
  display: flex;
  width: 750px;
}
.block {
  margin-top: 15px;
}
ul,li {
  list-style: none outside none;
  margin: 0;
  padding: 0;
}
figure {
  display: block;
  margin: 0;
}
</style>
