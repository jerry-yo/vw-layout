// 车主认证

<template>
  <div class="car-owner" flexContainer>
    <headerBar contentTitle="车主认证" contentColor="#5b5b5b" @leftClick="_goBack"></headerBar>
    <div class="container">
      <vehicleCertification :vin-type="vinType"></vehicleCertification>
    </div>
  </div>
</template>

<script>
import vehicleCertification from './vehicle-certification'
import headerBar from '@/base/headerBar'
export default {
  name: 'carOwner',
  data () {
    return {
      vinType: 0
    }
  },
  methods: {
    _goBack () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.vinType = parseInt(this.$route.query.carid)
  },
  components: {
    vehicleCertification,
    headerBar
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.car-owner
  background-color: #f4f4f4
  flex-direction: column
  height: 100vh
  .container
    flex: 1
    display: flex
</style>
