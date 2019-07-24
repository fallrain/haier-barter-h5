const OrderEntry = () => import(/* webpackChunkName: "OrderEntry" */ '@/views/order/OrderEntry');// 订单录入

const prefix = '/order';
const data = [
  {
    path: `${prefix}/orderEntry`,
    name: `${prefix}.OrderEntry`,
    component: OrderEntry,
    meta: {
      title: '订单录入'
    }
  }
];

export default data;
