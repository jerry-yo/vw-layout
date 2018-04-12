<template>
  <div class="upload-pic">
    <div class="con">
      <ul>
        <li v-for="(item, index) in imgArr" :key="index" class="imgs"></li>
        <li class="list-btn" @click="getPic" v-if="imgArr.length !== 8"></li>
        <li v-for="item in boxArr" :key="item.id" class="box"></li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'uploadPic',
  data () {
    return {
      imgArr: []
    }
  },
  computed: {
    boxArr () {
      if (this.imgArr.length > 3) {
        let arr = []
        for (let i = 0; i < 8 - this.imgArr.length - 1; i++) {
          arr.push({
            value: 'a_' + 1,
            id: this.imgArr.length + i
          })
        }
        return arr
      } else {
        let arr = []
        for (let i = 0; i < 4 - this.imgArr.length - 1; i++) {
          arr.push({
            value: 'a_' + 1,
            id: this.imgArr.length + i
          })
        }
        return arr
      }
    }
  },
  methods: {
    getPic () {
      this.imgArr.push(1)
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .upload-pic
    padding: 10px 30px
    background-color: #fff
    .con
      min-height: 150px
      ul
        display: flex
        flex-wrap: wrap
        justify-content: space-around
        li
          width: 150px
          height: 150px
          margin-bottom: 10px
          &.imgs
            background-color: rgba(255, 0, 255, 0.5)
          &.list-btn
            background-color: rgba(0, 255, 0, 0.5)

</style>
