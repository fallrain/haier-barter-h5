const OrderEntry = () => import(/* webpackChunkName: "OrderEntry" */ '@/views/order/OrderEntry');// 订单录入
const AddAddress = () => import(/* webpackChunkName: "AddAddress" */ '@/views/order/AddAddress');// 添加/编辑地址
const OrderUploadInvoice = () => import(/* webpackChunkName: "OrderUploadInvoice" */ '@/views/order/OrderUploadInvoice');// 上传发票
const SearchProduct = () => import(/* webpackChunkName: "SearchProduct" */ '@/views/order/SearchProduct');// 搜索产品
const OrderFollowErr = () => import('@/views/order/OrderFollowErr');
const OrderFollowMiddle = () => import('@/views/order/OrderFollowMiddle');
const OrderFollowSearch = () => import('@/views/order/OrderFollowSearch');
const OrderFollowFinishend = () => import('@/views/order/OrderFollowFinishend');
const OrderFollowCommitResult = () => import('@/views/order/OrderFollowCommitResult');
const AddUserTag = () => import('@/views/order/AddUserTag');
const OrderFollowActivity = () => import('@/views/order/OrderFollowActivity');
const prefix = '/order';
const module = 'Order';
const data = [
  {
    path: '/',
    name: `${module}.orderFollowSearch`,
    component: OrderFollowSearch,
    meta: {
      title: '订单跟进'
    }
  },
  {
    path: `${prefix}/orderEntry`,
    name: `${module}.OrderEntry`,
    component: OrderEntry,
    meta: {
      title: '订单录入'
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
      title: '选择产品'
    }
  },
  {
    path: `${prefix}/orderFollowErr`,
    name: `${module}.OrderFollowErr`,
    component: OrderFollowErr,
    meta: {
      title: '订单跟进查询'
    }
  },
  {
    path: `${prefix}/orderFollowMiddle`,
    name: `${module}.OrderFollowMiddle`,
    component: OrderFollowMiddle,
    meta: {
      title: '订单跟进查询'
    }
  },

  {
    path: `${prefix}/orderFollowFinishend`,
    name: `${module}.OrderFollowFinishend`,
    component: OrderFollowFinishend,
    meta: {
      title: '订单跟进查询'
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
      title: '订单录入'
    }
  },
];

export default data;
