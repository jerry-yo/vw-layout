<template>
  <div class="loading-mask">
    <div class="sampleContainer">
      <svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
        <g fill="none" fill-rule="evenodd" stroke-width="2">
          <circle cx="22" cy="22" r="1">
            <animate attributeName="r"
                begin="0s" dur="1.8s"
                values="1; 20"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.165, 0.84, 0.44, 1"
                repeatCount="indefinite" />
            <animate attributeName="stroke-opacity"
                begin="0s" dur="1.8s"
                values="1; 0"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.3, 0.61, 0.355, 1"
                repeatCount="indefinite" />
          </circle>
          <circle cx="22" cy="22" r="1">
            <animate attributeName="r"
                begin="-0.9s" dur="1.8s"
                values="1; 20"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.165, 0.84, 0.44, 1"
                repeatCount="indefinite" />
            <animate attributeName="stroke-opacity"
                begin="-0.9s" dur="1.8s"
                values="1; 0"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.3, 0.61, 0.355, 1"
                repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Loading'
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .loading-mask
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    display: flex
    justify-content: center
    align-items: center
    .sampleContainer
      width: 160px
      height: 160px
      background-color: rgba(0, 0, 0, 0.5)
      display: flex
      justify-content: center
      align-items: center
      border-radius: 10px
      overflow: hidden
</style>
