<template>
  <div class="upload-pic">
    <div class="con">
      <ul>
        <li v-for="(item, index) in imgArr" :key="index" class="imgs">
          <img :src="item" alt="" >
          <i @click="deleteImg(index)"></i>
        </li>
        <li class="list-btn" @click="seleRepairImgs" v-if="imgArr.length !== 8"></li>
        <li v-for="item in boxArr" :key="item.id" class="box"></li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Wx from 'Wx'
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
    seleRepairImgs () {
      let _self = this
      Wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'],
        success: function (res) {
          let img = res.localIds[0]
          if (window.__wxjs_is_wkwebview) {
            Wx.getLocalImgData({
              localId: img,
              success: function (res) {
                var localData = res.localData
                _self.imgArr.push(localData.replace('jgp', 'jpeg'))
              },
              fail: function (res) {
              }
            })
          } else {
            _self.imgArr.push(img)
          }
        }
      })
    },
    deleteImg (id) {
      let arr = []
      this.imgArr.forEach((item, index) => {
        if (id !== index) {
          arr.push(item)
        }
      })
      this.imgArr = arr
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../common/stylus/mixin.styl"
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
          position: relative
          width: 150px
          height: 150px
          margin-bottom: 10px
          border-radius: 4px
          overflow: hidden
          &.list-btn
            bg-image('../common/imgs/repair/upimg')
            background-position: center center
            background-repeat: no-repeat
            background-size: 150px 150px
          img
            display: block
            width: 100%
            height: 100%
            object-fit: cover
          i
            display: block
            position: absolute
            right: 4px
            top: 4px
            width: 30px
            height: 30px
            bg-image('../common/imgs/repair/close')
            background-position: center center
            background-repeat: no-repeat
            background-size: 30px 30px

</style>
