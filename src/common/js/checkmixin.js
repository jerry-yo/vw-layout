import {mapMutations, mapGetters} from 'vuex'
import {handleCheckList} from '@/common/js/config'
import {expireToken} from '@/common/js/mixin'

// 检测单处理
export const checksObjMixin = {
  mixins: [expireToken],
  data () {
    return {
      checkDetectionInfo: {}
    }
  },
  watch: {
    getDefaultCarInfo: function (newVal, oldVal) {
      if (newVal.defaultFlag === 1) {
        this._getCheckList()
      }
    }
  },
  computed: {
    nowCarCheck () {
      let obj = {}
      if (!this.checksObj) {
        return
      }
      for (let key in this.checksObj) {
        if (key === this.carNumber) {
          obj = this.checksObj[key]
          break
        }
      }
      return obj
    },
    ...mapGetters([
      'checksObj'
    ])
  },
  methods: {
    getCCDCheckInfo (id, storeId) {
      this.$get(`${this.f6Url}/api/check/info`, {
        'Authorization': this.userInfo.token
      }, (res) => {
        if (res.code === 200) {
          if (res.data.maintainType === 'CCD') {
            this.checkDetectionInfo = res.data
          }
        } else if (res.code === 401) {
          this.refreshToken(this.getCCDCheckInfo)
        }
      }, {
        pkId: id,
        idOwnOrg: storeId,
        clientAppId: this.userInfo.appId,
        clientUserId: this.userInfo.fUserId
      })
    },
    // 获取检测单列表
    _getCheckList () {
      this.$get(`${this.f6Url}/api/check/list`, {
        'Authorization': this.userInfo.token
      }, (res) => {
        if (res.code === 200) {
          let obj = handleCheckList(res.data, this.myCar)
          this.setChecksObj(obj)
          if (this.typeName === 'home' || this.typeName === 'repair') {
            this.handleCheckInfo(obj)
          }
        } else if (res.code === 401) {
          this.refreshToken(this._getCheckList)
        }
      }, {
        userId: this.userInfo.userId,
        pageSize: 500,
        currentPage: 1,
        clientAppId: this.userInfo.appId,
        clientUserId: this.userInfo.fUserId
      })
    },
    handleCheckInfo (data) {
      for (let key in data) {
        if (key === this.carNumber) {
          if (data[key].ccd.length > 0) {
            this.getCCDCheckInfo(data[key].ccd[0].pkId, data[key].ccd[0].idOwnOrg)
          }
          break
        }
      }
    },
    ...mapMutations({
      setChecksObj: 'SET_CHECKS_OBJ'
    })
  }
}
