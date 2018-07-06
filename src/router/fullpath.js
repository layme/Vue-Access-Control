import Abstract from '../views/common/abstract.vue';

export default [{
  path: '/',
  name: '首页',
  component: (resolve) => require(['../views/index.vue'], resolve),
  children: [{
    path: '/v1',
    name: '订单管理',
    meta: {
      icon: '&#xe62e;'
    },
    component: Abstract,
    children: [{
      path: 'order/toListOrder.action',
      name: '订单查询',
      meta: {},
      component: (resolve) => require(['../views/order/orderList.vue'], resolve)
    }, {
      path: 'refund/toListRefund.action',
      name: '退款待处理',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }, {
      path: 'refund/toNewListRefund.action',
      name: '取消及退房处理',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }]
  }, {
    path: '/v2',
    name: '床位管理',
    meta: {
      icon: '&#xe62e;'
    },
    component: Abstract,
    children: [{
      path: 'project/toListProject.action',
      name: '项目管理',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }, {
      path: '/goods/toListGoods.action',
      name: '物品管理',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }, {
      path: 'bedType/toListBedType.action',
      name: '床型管理',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }, {
      path: 'houseType/toListHouseType.action',
      name: '房型管理',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }, {
      path: 'area/toListArea.action',
      name: '区域管理',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }, {
      path: 'stock/toListStock.action',
      name: '床位查询',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }, {
      path: 'houseTypeParent/toListHouseTypeParent.action',
      name: '大房型管理',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }]
  }, {
    path: '/v3',
    name: '密码锁管理',
    meta: {
      icon: '&#xe62e;'
    },
    component: Abstract,
    children: [{
      path: 'smartLock/changeLockPasswd.action',
      name: '密码修改',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }, {
      path: 'smartLock/toApplyTempLockPasswd.action',
      name: '临时密码申请',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }, {
      path: 'smartLock/toListPower.action',
      name: '密码锁电量监控',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }, {
      path: 'smartLock/toOrderPswLockList.action',
      name: '订单密码重置',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }, {
      path: 'smartLock/lockPswOutSource.action',
      name: '维修保洁密码申请',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }]
  }, {
    path: '/v4',
    name: '报表',
    meta: {
      icon: '&#xe62e;'
    },
    component: Abstract,
    children: [{
      path: 'report/toCheckInRate.action',
      name: '入住率',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }, {
      path: 'reportbreakEven/toBreakEven.action',
      name: '盈亏报表',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }, {
      path: 'reportOperation/toOperationManage.action',
      name: '运营指标管理',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }, {
      path: 'reportDaily/toReportDailyIndex.action',
      name: '单日运营指标',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }]
  }, {
    path: '/v5',
    name: '优惠信息',
    meta: {
      icon: '&#xe62e;'
    },
    component: Abstract,
    children: [{
      path: 'factivity/toListActivity.action',
      name: '优惠活动管理',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }, {
      path: 'coupon/toCouponList.action',
      name: '优惠券管理',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }, {
      path: 'coupon/toCouponListForZO.action',
      name: '优惠券查询',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }]
  }, {
    path: '/v6',
    name: '标签管理',
    meta: {
      icon: '&#xe62e;'
    },
    component: Abstract,
    children: [{
      path: 'label/toLabelList.action',
      name: '标签列表',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }]
  }, {
    path: '/v7',
    name: '模板管理',
    meta: {
      icon: '&#xe62e;'
    },
    component: Abstract,
    children: [{
      path: 'system/toEnumTree.action',
      name: '渠道配置',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }, {
      path: 'config/dic/toConfDicTree.action',
      name: '模板属性配置',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }, {
      path: 'config/dicItem/itemTree.action',
      name: '项目配置',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }]
  }, {
    path: '/v8',
    name: '营销管理',
    meta: {
      icon: '&#xe62e;'
    },
    component: Abstract,
    children: [{
      path: 'marketingActivity/toMarketingActivityList.action',
      name: '营销活动',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }, {
      path: 'project/toListSortProject.action',
      name: '项目排序',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }]
  }, {
    path: '/v9',
    name: '聊天管理',
    meta: {
      icon: '&#xe62e;'
    },
    component: Abstract,
    children: [{
      path: 'socialContact/list.action',
      name: '群列表',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }]
  }, {
    path: '/v10',
    name: '在线报修',
    meta: {
      icon: '&#xe62e;'
    },
    component: Abstract,
    children: [{
      path: 'repair/toListRepair.action',
      name: '维修单列表',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }]
  }, {
    path: '/v11',
    name: '项目权限管理',
    meta: {
      icon: '&#xe62e;'
    },
    component: Abstract,
    children: [{
      path: 'projectZO/toListProjectZo.action',
      name: '项目分配用户',
      meta: {},
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }]
  }]
}];
