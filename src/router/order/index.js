const OrderEntry = () => import(/* webpackChunkName: "OrderEntry" */ '@/views/order/OrderEntry');// 订单录入
const AddAddress = () => import(/* webpackChunkName: "AddAddress" */ '@/views/order/AddAddress');// 添加/编辑地址
const orderFollowErr = () => import('@/views/order/orderFollowErr');
const orderFollowMiddle = () => import('@/views/order/orderFollowMiddle');
const orderFollowSearch = () => import('@/views/order/orderFollowSearch');
const orderFollowFinishend = () => import('@/views/order/orderFollowFinishend');
const prefix = '/order';
const module = 'Order';
const data = [
  {
    path: '/',
    name: `${module}.orderFollowSearch`,
    component: orderFollowSearch,
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
    path: `${prefix}/orderFollowErr`,
    name: `${module}.orderFollowErr`,
    component: orderFollowErr,
    meta: {
      title: '订单跟进查询'
    }
  },
  {
    path: `${prefix}/orderFollowMiddle`,
    name: `${module}.orderFollowMiddle`,
    component: orderFollowMiddle,
    meta: {
      title: '订单跟进查询'
    }
  },

  {
    path: `${prefix}/orderFollowFinishend`,
    name: `${module}.orderFollowFinishend`,
    component: orderFollowFinishend,
    meta: {
      title: '订单跟进查询'
    }
  },
];

export default data;
