const OrderEntry = () => import(/* webpackChunkName: "OrderEntry" */ '@/views/order/OrderEntry');// 订单录入
const AddAddress = () => import(/* webpackChunkName: "AddAddress" */ '@/views/order/AddAddress');// 添加/编辑地址
const OrderFollowSearch = () => import('@/views/order/OrderFollowSearch');// 订单跟进
const OrderFollowCommitResult = () => import('@/views/order/OrderFollowCommitResult');
const OrderUploadInvoice = () => import(/* webpackChunkName: "OrderUploadInvoice" */ '@/views/order/OrderUploadInvoice');// 上传发票
const SearchProduct = () => import(/* webpackChunkName: "SearchProduct" */ '@/views/order/SearchProduct');// 搜索产品
const AddUserTag = () => import('@/views/order/AddUserTag');
const OrderFollowActivity = () => import('@/views/order/OrderFollowActivity');
const OrderModify = () => import(/* webpackChunkName: "OrderModify" */ '@/views/order/OrderModify');// 订单录入
const OrderConfirm = () => import(/* webpackChunkName: "OrderConfirm" */ '@/views/order/OrderConfirm');// 订单录入
const OrderDetail = () => import(/* webpackChunkName: "OrderDetail" */ '@/views/order/OrderDetail');// 订单详情
const ResidueGift = () => import(/* webpackChunkName: "OrderDetail" */ '@/views/order/ResidueGift');// 查询权益剩余量
const OrderSupplement = () => import(/* webpackChunkName: "OrderSupplement" */ '@/views/order/OrderSupplement');// 订单补录
const OrderRights = () => import(/* webpackChunkName: "OrderRights" */ '@/views/order/OrderRights');// 订单权益
const ApplyDeleteOrder = () => import(/* webpackChunkName: "ApplyDeleteOrder" */ '@/views/order/ApplyDeleteOrder');// 订单权益

const prefix = '/order';
const module = 'Order';
const data = [
  {
    path: '/',
    name: `${module}.OrderFollowSearch`,
    component: OrderFollowSearch,
    meta: {
      title: '订单跟进',
      params: {}
    }
  },
  {
    path: `${prefix}/orderEntry`,
    name: `${module}.OrderEntry`,
    component: OrderEntry,
    meta: {
      title: '订单录入',
    },
  },
  {
    path: `${prefix}/orderModify`,
    name: `${module}.OrderModify`,
    component: OrderModify,
    meta: {
      title: '订单修改'
    }
  },
  {
    path: `${prefix}/orderSupplement`,
    name: `${module}.OrderSupplement`,
    component: OrderSupplement,
    meta: {
      title: '订单补录'
    }
  },
  {
    path: `${prefix}/OrderConfirm`,
    name: `${module}.OrderConfirm`,
    component: OrderConfirm,
    meta: {
      title: '订单确认'
    }
  },
  {
    path: `${prefix}/addAddress`,
    name: `${module}.AddAddress`,
    component: AddAddress,
    meta: {
      title: '用户信息'
    }
  },

  {
    path: `${prefix}/orderUploadInvoice`,
    name: `${module}.OrderUploadInvoice`,
    component: OrderUploadInvoice,
    meta: {
      title: '上传发票'
    }
  },
  {
    path: `${prefix}/searchProduct`,
    name: `${module}.SearchProduct`,
    component: SearchProduct,
    meta: {
      title: '选择产品',
    }
  },
  {
    path: `${prefix}/orderFollowCommitResult`,
    name: `${module}.OrderFollowCommitResult`,
    component: OrderFollowCommitResult,
    meta: {
      title: '订单提交'
    }
  },
  {
    path: `${prefix}/OrderDetail`,
    name: `${module}.OrderDetail`,
    component: OrderDetail,
    meta: {
      title: '订单详情'
    }
  },

  {
    path: `${prefix}/addUserTag`,
    name: `${module}.AddUserTag`,
    component: AddUserTag,
    meta: {
      title: '新建用户标签'
    }
  },

  {
    path: `${prefix}/orderFollowActivity`,
    name: `${module}.OrderFollowActivity`,
    component: OrderFollowActivity,
    meta: {
      title: '订单huodong'
    }
  },
  {
    path: `${prefix}/orderRights`,
    name: `${module}.OrderRights`,
    component: OrderRights,
    meta: {
      title: '订单quanyi'
    }
  },
  {
    path: `${prefix}/residueGift`,
    name: `${module}.ResidueGift`,
    component: ResidueGift,
    meta: {
      title: '订单录入'
    }
  },
  {
    path: `${prefix}/applyDeleteOrder`,
    name: `${module}.ApplyDeleteOrder`,
    component: ApplyDeleteOrder,
    meta: {
      title: '订单删除'
    }
  },
];

export default data;
