import {mapMutations, mapGetters} from 'vuex'
import {handleCheckList} from '@/common/js/config'

// 检测单处理
export const checksObjMixin = {
  data () {
    return {
      nowCarCheck: []
    }
  },
  watch: {
    getDefaultCarInfo: function (newVal, oldVal) {
      if (newVal.defaultFlag === 1) {
        this._getCheckList()
      }
    },
    checksObj: function (newVal, oldVal) {
      if (newVal) {
        this.defaultCarCheck(newVal)
      }
    }
  },
  computed: {
    ...mapGetters([
      'checksObj'
    ])
  },
  methods: {
    defaultCarCheck (val) {
      for (let key in val) {
        if (key === this.getDefaultCarInfo.carNumber) {
          this.nowCarCheck = val[key]
        }
      }
    },
    getCCDCheckInfo (id) {
      this.$get(`${this.f6Url}/api/check/info`, {
        'Authorization': this.userInfo.token
      }, (res) => {
        if (res.code === 200) {
          if (res.data.maintainType === 'CCD') {
            this.carCheckDetailVoList = {
              list: res.data.carCheckDetailVoList,
              billDate: res.data.billDate.replace(/-/, '年').replace(/-/, '月').replace(/ /, '日 ') + ':00'
            }
          } else if (res.data.maintainType === 'YJD') {
            this.maintainPhotoVoList = {
              photoUrl: res.data.maintainPhotoVoList[0].photoUrl,
              billDate: res.data.billDate.replace(/-/, '年').replace(/-/, '月').replace(/ /, '日 ') + ':00'
            }
          }
        } else if (res.code === 401) {
          this.refreshToken(this.getCCDCheckInfo)
        }
      }, {
        pkId: id,
        idOwnOrg: this.stoteId,
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
          this.setChecksObj(handleCheckList(res.data, this.myCar))
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
    ...mapMutations({
      setChecksObj: 'SET_CHECKS_OBJ'
    })
  }
}
