const state = {
  carBrand: [],
  routerAnimate: 'none',
  cityInfo: {
    lng: 119.9938,
    lat: 31.81196
  },
  addCar: {},
  myCar: [
    {
      default: true,
      exhaustVolume: '2.0T',
      idCard: '京888888',
      imageSrc: '/parentbrand/aodi.jpg',
      month: '1',
      name: '奥迪',
      pbid: 27,
      salesVersion: '2.0TFSI 无级 豪华型',
      series: {
        sbName: '一汽奥迪',
        vehicleSystem: ['198', 'A4', '1']
      },
      way: 0,
      year: '2008'
    }
  ],
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
  ]
}
export default state
