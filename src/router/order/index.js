const OrderEntry = () => import(/* webpackChunkName: "OrderEntry" */ '@/views/order/OrderEntry');// 订单录入
const AddAddress = () => import(/* webpackChunkName: "AddAddress" */ '@/views/order/AddAddress');// 添加/编辑地址
const orderFollowSearch = () => import('@/views/order/orderFollowSearch');
const orderFollowCommitResult = () => import('@/views/order/orderFollowCommitResult');
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
    path: `${prefix}/orderFollowCommitResult`,
    name: `${module}.orderFollowCommitResult`,
    component: orderFollowCommitResult,
    meta: {
      title: '订单提交'
    }
  },
];

export default data;
