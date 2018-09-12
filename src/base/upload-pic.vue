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
      imgArr: [],
      formData: '',
      imgList: []
    }
  },
  created () {
    this.formData = new FormData()
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
            _self.imgArr.push(res.localData.replace('jgp', 'jpeg'))
          } else {
            _self.imgArr.push(img)
          }
          Wx.getLocalImgData({
            localId: img,
            success: function (res) {
              if (window.__wxjs_is_wkwebview) {
                _self.formData.append('img1', _self.base64ToBlob(res.localData))
              } else {
                _self.formData.append('img1', _self.base64ToBlob('data:image/jpg;base64,' + res.localData))
              }
              _self.uploadFile()
            },
            fail: function (res) {
            }
          })
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
    },
    uploadFile () {
      this.api_file('api/common/upload', this.formData, (res) => {
        if (res.errorCode === 0) {
          this.imgList.push(res.data.id)
        }
      })
    },
    // base64 转  图片
    base64ToBlob (urlData) {
      var arr = urlData.split(',')
      var mime = arr[0].match(/:(.*?);/)[1] || 'image/png'
      // 去掉url的头，并转化为byte
      var bytes = window.atob(arr[1])
      // 处理异常,将ascii码小于0的转换为大于0
      var ab = new ArrayBuffer(bytes.length)
      // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
      var ia = new Uint8Array(ab)

      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      return new Blob([ab], {
        type: mime
      })
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
