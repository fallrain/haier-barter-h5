const OrderEntry = () => import(/* webpackChunkName: "OrderEntry" */ '@/views/order/OrderEntry');// 订单录入
const orderFollowErr = () => import('@/views/order/orderFollowErr');
const orderFollowMiddle = () => import('@/views/order/orderFollowMiddle');
const orderFollowSearch = () => import('@/views/order/orderFollowSearch');
const orderFollowFinishend = () => import('@/views/order/orderFollowFinishend');
const prefix = '/order';
const data = [
  {
    path: '/',
    name: `${prefix}.orderFollowSearch`,
    component: orderFollowSearch,
    meta: {
      title: '订单跟进'
    }
  },
  {
    path: `${prefix}/orderEntry`,
    name: `${prefix}.OrderEntry`,
    component: OrderEntry,
    meta: {
      title: '订单录入'
    }
  },
  {
    path: `${prefix}/orderFollowErr`,
    name: `${prefix}.orderFollowErr`,
    component: orderFollowErr,
    meta: {
      title: '订单跟进查询'
    }
  },
  {
    path: `${prefix}/orderFollowMiddle`,
    name: `${prefix}.orderFollowMiddle`,
    component: orderFollowMiddle,
    meta: {
      title: '订单跟进查询'
    }
  },

  {
    path: `${prefix}/orderFollowFinishend`,
    name: `${prefix}.orderFollowFinishend`,
    component: orderFollowFinishend,
    meta: {
      title: '订单跟进查询'
    }
  },
];

export default data;
