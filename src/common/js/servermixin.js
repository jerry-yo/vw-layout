import {mapGetters, mapMutations} from 'vuex'
// 服务模块 操作
export const handleServerModel = {
  computed: {
    ...mapGetters([
      'staticServerList',
      'allServerList'
    ])
  },
  methods: {
    // 修改材料数量
    _changeNumberParent (res) {
      let obj = {
        pkId: res[1].pkId,
        partInfo: Object.assign(res[1].partInfo, {
          number: res[0].number
        })
      }
      this.modifyAllServerList(JSON.parse(JSON.stringify(obj)))
    },
    // 展示服务材料
    _clickServerParent (server) {
      if (server.partInfo !== null) {
        if (server.state === -1) {
          this.modifyAllServerList({
            pkId: server.pkId,
            state: 0
          })
        } else if (server.state === 0) {
          this.modifyAllServerList({
            pkId: server.pkId,
            state: -1
          })
        }
      } else {
        this.$Toast({
          position: 'bottom',
          message: '暂无产品信息'
        })
      }
    },
    // 选择服务材料
    _checkGoodParent (server) {
      let obj = {
        pkId: server.pkId,
        obj: {
          isChecked: !server.partInfo.isChecked
        }
      }
      this.modifyAllServerPartInfo(JSON.parse(JSON.stringify(obj)))
    },
    // 选择服务
    _checkServerParent (server) {
      if (server.isChecked) {
        this.modifyAllServerList({
          pkId: server.pkId,
          isChecked: false
        })
      } else {
        this.modifyAllServerList({
          pkId: server.pkId,
          isChecked: true
        })
      }
    },
    // 开始修改
    _editServerParent (server) {
      this.modifyAllServerList({
        pkId: server.pkId,
        state: 1
      })
    },
    // 保存修改
    _saveServerParent (server) {
      this.modifyAllServerList({
        pkId: server.pkId,
        state: 0
      })
      this.setStaticServerList(JSON.parse(JSON.stringify(this.allServerList)))
    },
    // 取消修改
    _cancelServerParent (server) {
      let staticServerPartInfo = this.getStaticServerList(server.pkId)
      this.modifyAllServerList({
        pkId: server.pkId,
        partInfo: JSON.parse(JSON.stringify(Object.assign(staticServerPartInfo.partInfo, {
          isChecked: server.partInfo.isChecked
        }))),
        state: 0
      })
    },
    // 获取参考服务信息
    getStaticServerList (id) {
      let obj = {}
      this.staticServerList.forEach(item => {
        if (item.pkId === id) {
          obj = item
        }
      })
      return obj
    },
    ...mapMutations({
      modifyAllServerList: 'MODIFY_ALL_SERVER_LIST',
      modifyAllServerPartInfo: 'MODIFY_ALL_SETVER_PARTINFO',
      setStaticServerList: 'SET_STATIC_SERVER_LIST'
    })
  }
}
