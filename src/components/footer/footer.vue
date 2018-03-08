<template>
  <!-- <div class="container" > -->
    <div class="footer" w-750-98 aspectratio aspect-ratio="750/98">
      <div class="home active-on">
        <span>首页</span>
      </div>
      <div class="mind">
        <span>我的</span>
      </div>
    </div>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'vfooter'
}
</script>

<style lang="css">
  [w-750-98] {
    display: flex;
    width: 750px;
    background: #fff;
  }
  .footer > div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: italic;
    font-size: 20px;
    color: #8a8989;
  }
  .footer > div.active-on{
    color: #ff3c16;
  }
  [w-750-98] {
    aspect-ratio:'750:98';
  }
</style>
