const state = {
  carBrand: [],
  routerAnimate: 'none',
  cityInfo: {
    lng: 119.9938,
    lat: 31.81196
  },
  addCar: {},
  myCar: [],
  cityList: [],
  storeList: [],
  serachHis: {
    'store': [],
    'city': [],
    'brand': []
  },
  serachInfo: {},
  area: ['京', '沪', '浙', '苏', '粤', '鲁', '晋', '冀', '渝', '川', '豫', '辽', '吉', '黑', '皖', '鄂', '湘', '赣', '闽', '陕', '甘', '宁', '蒙', '津', '桂', '云', '贵', '琼', '青', '新', '藏', '港', '澳'],
  serverList: [
    {
      groupItem: {
        keepServiceFirstItemBean: {
          bottomRemark: '5000km/次',
          serviceName: '保养常规服务',
          rightRemark: 5,
          isRecommend: true
        },
        isChecked: true,
        action: true,
        state: 2
      },
      subItems: [
        {
          keepServiceSecondItemBean: {
            classify: '机油',
            commodityImageUrl: 'url',
            viscosity: '粘度11',
            trademark: '品牌11',
            specification: '规格11',
            remarkHint: '',
            minCommodityNumber: 1,
            commodityPrice: 200.0,
            commodityNumber: 1
          },
          isChecked: true,
          action: true,
          state: 1
        }, {
          keepServiceSecondItemBean: {
            classify: '机油滤清器',
            commodityImageUrl: 'url',
            viscosity: '粘度12',
            trademark: '品牌12',
            specification: '规格12',
            remarkHint: '',
            minCommodityNumber: 1,
            commodityPrice: 200.0,
            commodityNumber: 1
          },
          isChecked: true,
          action: true,
          state: 1
        }
      ]
    }
  ],
  allServerList: [
    {
      serviceCatalog: '过滤系统',
      serviceId: 1,
      serviceCon: [
        {
          groupItem: {
            keepServiceFirstItemBean: {
              bottomRemark: '5000km/次',
              serviceName: '更换空气滤清器',
              rightRemark: 5,
              isRecommend: false
            },
            isChecked: false,
            action: false,
            state: 2
          },
          subItems: [
            {
              keepServiceSecondItemBean: {
                classify: '空气滤清器',
                commodityImageUrl: 'url',
                viscosity: '粘度12',
                trademark: '品牌12',
                specification: '规格12',
                remarkHint: '',
                minCommodityNumber: 1,
                commodityPrice: 240.0,
                commodityNumber: 1
              },
              isChecked: false,
              action: true,
              state: 1
            }
          ]
        }, {
          groupItem: {
            keepServiceFirstItemBean: {
              bottomRemark: '5000km/次',
              serviceName: '更换空调滤清器',
              rightRemark: 5,
              isRecommend: true
            },
            isChecked: false,
            action: false,
            state: 2
          },
          subItems: [
            {
              keepServiceSecondItemBean: {
                classify: '空调滤清器',
                commodityImageUrl: 'url',
                viscosity: '粘度12',
                trademark: '品牌12',
                specification: '规格12',
                remarkHint: '',
                minCommodityNumber: 1,
                commodityPrice: 60.0,
                commodityNumber: 1
              },
              isChecked: false,
              action: false,
              state: 1
            }
          ]
        }, {
          groupItem: {
            keepServiceFirstItemBean: {
              bottomRemark: '5000km/次',
              serviceName: '更换燃油滤清器',
              rightRemark: 5,
              isRecommend: true
            },
            isChecked: false,
            action: false,
            state: 2
          },
          subItems: [
            {
              keepServiceSecondItemBean: {
                classify: '燃油滤清器',
                commodityImageUrl: 'url',
                viscosity: '粘度12',
                trademark: '品牌12',
                specification: '规格12',
                remarkHint: '',
                minCommodityNumber: 1,
                commodityPrice: 80.0,
                commodityNumber: 1
              },
              isChecked: false,
              action: false,
              state: 1
            }
          ]
        }
      ]
    }, {
      serviceCatalog: '刹车系统',
      serviceId: 2,
      serviceCon: [
        {
          groupItem: {
            keepServiceFirstItemBean: {
              bottomRemark: '5000km/次',
              serviceName: '更换刹车片服务',
              rightRemark: 5,
              isRecommend: false
            },
            isChecked: false,
            action: false,
            state: 2
          },
          subItems: [
            {
              keepServiceSecondItemBean: {
                classify: '刹车片',
                commodityImageUrl: 'url',
                viscosity: '粘度11',
                trademark: '品牌11',
                specification: '规格11',
                remarkHint: '',
                minCommodityNumber: 1,
                commodityPrice: 120.0,
                commodityNumber: 1
              },
              isChecked: false,
              action: false,
              state: 1
            }
          ]
        }
      ]
    }, {
      serviceCatalog: '汽车美容',
      serviceId: 3,
      serviceCon: [
        {
          groupItem: {
            keepServiceFirstItemBean: {
              bottomRemark: '4000km/次',
              serviceName: '室内空气净化',
              rightRemark: 0,
              isRecommend: false,
              serverPrice: 160.00
            },
            isChecked: false,
            action: false,
            state: 1
          },
          subItems: []
        }, {
          groupItem: {
            keepServiceFirstItemBean: {
              bottomRemark: '10000km/次',
              serviceName: '机器打蜡',
              rightRemark: 0,
              isRecommend: false,
              serverPrice: 80.00
            },
            isChecked: false,
            action: false,
            state: 1
          },
          subItems: []
        }
      ]
    }
  ],
  staticServerList: [
    {
      groupItem: {
        keepServiceFirstItemBean: {
          bottomRemark: '5000km/次',
          serviceName: '保养常规服务',
          rightRemark: 5,
          isRecommend: true
        },
        isChecked: true,
        action: true,
        state: 2
      },
      subItems: [
        {
          keepServiceSecondItemBean: {
            classify: '机油',
            commodityImageUrl: 'url',
            viscosity: '粘度11',
            trademark: '品牌11',
            specification: '规格11',
            remarkHint: '',
            minCommodityNumber: 1,
            commodityPrice: 200.0,
            commodityNumber: 1
          },
          isChecked: true,
          action: true,
          state: 1
        }, {
          keepServiceSecondItemBean: {
            classify: '机油滤清器',
            commodityImageUrl: 'url',
            viscosity: '粘度12',
            trademark: '品牌12',
            specification: '规格12',
            remarkHint: '',
            minCommodityNumber: 1,
            commodityPrice: 200.0,
            commodityNumber: 1
          },
          isChecked: true,
          action: true,
          state: 1
        }
      ]
    }
  ],
  staticAllServerList: [
    {
      serviceCatalog: '过滤系统',
      serviceId: 1,
      serviceCon: [
        {
          groupItem: {
            keepServiceFirstItemBean: {
              bottomRemark: '5000km/次',
              serviceName: '更换空气滤清器',
              rightRemark: 5,
              isRecommend: false
            },
            isChecked: false,
            action: false,
            state: 2
          },
          subItems: [
            {
              keepServiceSecondItemBean: {
                classify: '空气滤清器',
                commodityImageUrl: 'url',
                viscosity: '粘度12',
                trademark: '品牌12',
                specification: '规格12',
                remarkHint: '',
                minCommodityNumber: 1,
                commodityPrice: 240.0,
                commodityNumber: 1
              },
              isChecked: false,
              action: true,
              state: 1
            }
          ]
        }, {
          groupItem: {
            keepServiceFirstItemBean: {
              bottomRemark: '5000km/次',
              serviceName: '更换空调滤清器',
              rightRemark: 5,
              isRecommend: true
            },
            isChecked: false,
            action: false,
            state: 2
          },
          subItems: [
            {
              keepServiceSecondItemBean: {
                classify: '空调滤清器',
                commodityImageUrl: 'url',
                viscosity: '粘度12',
                trademark: '品牌12',
                specification: '规格12',
                remarkHint: '',
                minCommodityNumber: 1,
                commodityPrice: 60.0,
                commodityNumber: 1
              },
              isChecked: false,
              action: false,
              state: 1
            }
          ]
        }, {
          groupItem: {
            keepServiceFirstItemBean: {
              bottomRemark: '5000km/次',
              serviceName: '更换燃油滤清器',
              rightRemark: 5,
              isRecommend: true
            },
            isChecked: false,
            action: false,
            state: 2
          },
          subItems: [
            {
              keepServiceSecondItemBean: {
                classify: '燃油滤清器',
                commodityImageUrl: 'url',
                viscosity: '粘度12',
                trademark: '品牌12',
                specification: '规格12',
                remarkHint: '',
                minCommodityNumber: 1,
                commodityPrice: 80.0,
                commodityNumber: 1
              },
              isChecked: false,
              action: false,
              state: 1
            }
          ]
        }
      ]
    }, {
      serviceCatalog: '刹车系统',
      serviceId: 2,
      serviceCon: [
        {
          groupItem: {
            keepServiceFirstItemBean: {
              bottomRemark: '5000km/次',
              serviceName: '更换刹车片服务',
              rightRemark: 5,
              isRecommend: false
            },
            isChecked: false,
            action: false,
            state: 2
          },
          subItems: [
            {
              keepServiceSecondItemBean: {
                classify: '刹车片',
                commodityImageUrl: 'url',
                viscosity: '粘度11',
                trademark: '品牌11',
                specification: '规格11',
                remarkHint: '',
                minCommodityNumber: 1,
                commodityPrice: 120.0,
                commodityNumber: 1
              },
              isChecked: false,
              action: false,
              state: 1
            }
          ]
        }
      ]
    }, {
      serviceCatalog: '汽车美容',
      serviceId: 3,
      serviceCon: [
        {
          groupItem: {
            keepServiceFirstItemBean: {
              bottomRemark: '4000km/次',
              serviceName: '室内空气净化',
              rightRemark: 0,
              isRecommend: false,
              serverPrice: 160.00
            },
            isChecked: false,
            action: false,
            state: 1
          },
          subItems: []
        }, {
          groupItem: {
            keepServiceFirstItemBean: {
              bottomRemark: '10000km/次',
              serviceName: '机器打蜡',
              rightRemark: 0,
              isRecommend: false,
              serverPrice: 80.00
            },
            isChecked: false,
            action: false,
            state: 1
          },
          subItems: []
        }
      ]
    }
  ],
  defaultStoreId: 0,
  subscribeInfo: {},
  detectionMenus: [
    {
      id: 2,
      time: '2018年05月26日 19:20:42',
      lastTime: '',
      faultGroupItem: [
        {
          faultType: 1,
          title: '左侧车漆耗损',
          state: 1,
          textarea: '我是真的故障了，相信我',
          imgs: ['', '', ''],
          carPaintPlace: 'right',
          repairResults: 0
        }, {
          faultType: 1,
          title: '车顶漆耗损',
          state: 2,
          textarea: '我是真的故障了，相信我',
          imgs: ['', '', ''],
          carPaintPlace: 'up-before',
          repairResults: 1
        }, {
          faultType: 0,
          title: '车圈松了',
          state: 2,
          textarea: '我是真的故障了，相信我',
          imgs: ['', '', ''],
          repairResults: 0
        }
      ]
    }, {
      id: 1,
      time: '2018年2月28日 12:38:16',
      lastTime: '2017年12月26日 15:26:36',
      faultGroupItem: []
    }, {
      id: 0,
      time: '2017年12月26日 15:26:36',
      lastTime: '',
      faultGroupItem: [
        {
          faultType: 1,
          title: '左侧车漆耗损',
          state: 1,
          textarea: '我是真的故障了，相信我',
          imgs: ['', '', ''],
          carPaintPlace: 'right',
          repairResults: 0
        }, {
          faultType: 1,
          title: '车顶漆耗损',
          state: 2,
          textarea: '我是真的故障了，相信我',
          imgs: ['', '', ''],
          carPaintPlace: 'up-before',
          repairResults: 1
        }, {
          faultType: 0,
          title: '车圈松了',
          state: 2,
          textarea: '我是真的故障了，相信我',
          imgs: ['', '', ''],
          repairResults: 0
        }, {
          faultType: 0,
          title: '车圈松了',
          state: 2,
          textarea: '我是真的故障了，相信我',
          imgs: [''],
          repairResults: 0
        }, {
          faultType: 0,
          title: '车圈松了',
          state: 1,
          textarea: '我是真的故障了，相信我',
          imgs: ['', '', ''],
          repairResults: 2
        }
      ]
    }
  ],
  orderList: [
    {
      orderId: '201709281630246801',
      orderTime: 1506587424,
      appointmentTime: 1506664800,
      expiryTime: 1506666600,
      orderFormState: 1,
      store: {
        name: '奇特异维修门店-晋陵路维修中心',
        phone: '13912345180'
      },
      userOrderFormKeepCarBean: {
        freeServiceOrProductIconUrl: '',
        productAllPrice: 200.0,
        useProductIconUrls: ['', '', ''],
        useProductNumber: 1,
        useServiceNumber: 1,
        useServicePrice: 20.00
      },
      whichService: 1
    }, {
      orderFormState: 1,
      orderId: '201711221012386801',
      orderTime: 1511316758,
      appointmentTime: 1511339400,
      expiryTime: 1511341200,
      store: {
        name: '奇特异保养门店-兰陵锦轩店',
        phone: '15051959973'
      },
      userOrderFormKeepCarBean: {
        freeServiceOrProductIconUrl: 'http://192.168.0.110:8080/free1.jpg',
        productAllPrice: 460.0,
        useProductIconUrls: [
          'http://192.168.0.110:8080/product1.jpg',
          'http://192.168.0.110:8080/product2.jpg'
        ],
        useProductNumber: 2,
        useServiceNumber: 1,
        useServicePrice: 40.00
      },
      whichService: 1
    }, {
      orderFormState: 1,
      orderId: '201802280936466801',
      orderTime: 1519781806,
      appointmentTime: 1519799400,
      expiryTime: 1519801200,
      store: {
        name: '奇特异保养门店-塑化城店',
        phone: '18118389990'
      },
      userOrderFormKeepCarBean: {
        freeServiceOrProductIconUrl: '',
        productAllPrice: 390.0,
        useProductIconUrls: [''],
        useProductNumber: 3,
        useServiceNumber: 1,
        useServicePrice: 45.00
      },
      whichService: 1
    }, {
      orderFormState: 1,
      orderId: '201804121922176801',
      orderTime: 1523532137,
      appointmentTime: 1523980800,
      expiryTime: 1524067200,
      store: {
        name: '奇特异保养门店-邹区灯城店',
        phone: '68957257'
      },
      userOrderFormRepairCarBean: {
        useProductIconUrls: ['', ''],
        faultDetails: '啊沙发大师傅大事发生地方撒发大水发发送到发二娃千峰是阿打算发沙发沙发大撒的发生大师的发生大'
      },
      whichService: 2
    }, {
      orderFormState: 1,
      orderId: '201806101855206801',
      orderTime: 1528628120,
      appointmentTime: 1528905600,
      expiryTime: 1528992000,
      store: {
        name: '奇特异保养门店-邹区泰富店',
        phone: '13506566126'
      },
      userOrderFormRepairCarBean: {
        useProductIconUrls: [''],
        faultDetails: '啊沙发大师傅大事发生地方撒发大水发发送到发二娃千峰是阿打算发沙发沙发大撒的发生大师的发生大'
      },
      whichService: 2
    }, {
      orderFormState: 3,
      orderId: '201806091231116801',
      orderTime: 1528518671,
      appointmentTime: 1528597800,
      completionTime: 1528599504,
      serviceIsAlreadyFinish: true,
      store: {
        name: '奇特异保养门店-邹区灯城店',
        phone: '68957257'
      },
      userOrderFormKeepCarBean: {
        freeServiceOrProductIconUrl: '',
        productAllPrice: 680.0,
        useProductIconUrls: ['', '', ''],
        useProductNumber: 4,
        useServiceNumber: 1,
        useServicePrice: 70.00
      },
      whichService: 1
    }, {
      orderFormState: 3,
      orderId: '201806101130246801',
      orderTime: 1528601424,
      appointmentTime: 1528646400,
      serviceIsAlreadyFinish: false,
      store: {
        name: '奇特异维修门店-晋陵路维修中心',
        phone: '13912345180'
      },
      userOrderFormRepairCarBean: {
        freeServiceOrProductIconUrl: '',
        maintainDescribe: '',
        productAllPrice: 880.0,
        useProductIconUrls: ['', ''],
        useProductNumber: 6,
        useServiceNumber: 2,
        useServicePrice: 180.00
      },
      whichService: 2
    }, {
      orderFormState: 4,
      orderId: '201709281630246802',
      orderTime: 1506587424,
      appointmentTime: 1506664800,
      completionTime: 1506666480,
      paymentTime: 1506666720,
      store: {
        name: '奇特异保养门店-邹区泰富店',
        phone: '13506566126'
      },
      userOrderFormKeepCarBean: {
        freeServiceOrProductIconUrl: '',
        productAllPrice: 390.0,
        useProductIconUrls: [''],
        useProductNumber: 2,
        useServiceNumber: 1,
        useServicePrice: 200.00
      },
      whichService: 1
    }, {
      orderFormState: 4,
      orderId: '201802280936466802',
      orderTime: 1519781806,
      appointmentTime: 1519799400,
      completionTime: 1519801680,
      paymentTime: 1519801920,
      store: {
        name: '奇特异保养门店-邹区灯城店',
        phone: '68957257'
      },
      userOrderFormKeepCarBean: {
        freeServiceOrProductIconUrl: 'http://192.168.0.110:8080/free1.jpg',
        productAllPrice: 1200.0,
        useProductIconUrls: [
          'http://192.168.0.110:8080/product1.jpg',
          'http://192.168.0.110:8080/product2.jpg'
        ],
        useProductNumber: 6,
        useServiceNumber: 1,
        useServicePrice: 300.00
      },
      whichService: 1
    }, {
      orderFormState: 4,
      orderId: '201804121922176802',
      orderTime: 1523532137,
      appointmentTime: 1523980800,
      completionTime: 1524544752,
      paymentTime: 1524557458,
      store: {
        name: '奇特异维修门店-晋陵路维修中心',
        phone: '13912345180'
      },
      userOrderFormRepairCarBean: {
        freeServiceOrProductIconUrl: '',
        maintainDescribe: '',
        productAllPrice: 620.00,
        useProductIconUrls: ['', ''],
        useProductNumber: 2,
        useServiceNumber: 2,
        useServicePrice: 180.00
      },
      whichService: 2
    }, {
      orderFormState: 4,
      orderId: '201806101855206802',
      orderTime: 1528628120,
      appointmentTime: 1528646400,
      completionTime: 1528716131,
      paymentTime: 1528718291,
      store: {
        name: '奇特异维修门店-晋陵路维修中心',
        phone: '13912345180'
      },
      userOrderFormRepairCarBean: {
        freeServiceOrProductIconUrl: '',
        productAllPrice: 965.00,
        useProductIconUrls: ['', ''],
        useProductNumber: 3,
        useServiceNumber: 5,
        useServicePrice: 60.00
      },
      whichService: 2
    }, {
      orderFormState: 5,
      orderId: '201709281630246803',
      orderTime: 1506587424,
      appointmentTime: 1506664800,
      cancellationTime: 1506598224,
      store: {
        name: '奇特异保养门店-兰陵锦轩店',
        phone: '15051959973'
      },
      userOrderFormKeepCarBean: {
        freeServiceOrProductIconUrl: 'http://192.168.0.110:8080/free1.jpg',
        productAllPrice: 1.0,
        useProductIconUrls: [
          'http://192.168.0.110:8080/product1.jpg',
          'http://192.168.0.110:8080/product2.jpg'
        ],
        useProductNumber: 1,
        useServiceNumber: 1,
        useServicePrice: 20.00
      },
      whichService: 1
    }, {
      orderFormState: 5,
      orderId: '201802280936466803',
      orderTime: 1519781806,
      appointmentTime: 1519799400,
      cancellationTime: 1519802416,
      store: {
        name: '奇特异保养门店-邹区泰富店',
        phone: '13506566126'
      },
      userOrderFormKeepCarBean: {
        freeServiceOrProductIconUrl: '',
        productAllPrice: 1.0,
        useProductIconUrls: [''],
        useProductNumber: 1,
        useServiceNumber: 1,
        useServicePrice: 20.00
      },
      whichService: 1
    }, {
      orderFormState: 5,
      orderId: '201806111958116801',
      orderTime: 1528718291,
      appointmentTime: 1528819200,
      cancellationTime: 1528719333,
      store: {
        name: '奇特异维修门店-晋陵路维修中心',
        phone: '13912345180'
      },
      userOrderFormRepairCarBean: {
        useProductIconUrls: ['', ''],
        faultDetails: '啊沙发大师傅大事发生地方撒发大水发发送到发二娃千峰是阿打算发沙发沙发大撒的发生大师的发生大'
      },
      whichService: 2
    }
  ],
  orderInfo: {},
  userInfo: {}
}
export default state
/* 故障单
  falutType : 1 漆面 0 其他
  state: 0 安全 1 预警 2 紧急
  carPaintPlace: 车漆耗损部位： left  right before after up-before up-after
  repairResults:  0 处理成功  1 新增  2 遗留
*/
