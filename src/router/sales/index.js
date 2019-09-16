// 销量验证
const SalesVerification = () => import(/* webpackChunkName: "SalesVerification" */ '@/views/sales/SalesVerification');
// 选择订单
const SalesChooseOrder = () => import(/* webpackChunkName: "SalesVerification" */ '@/views/sales/SalesChooseOrder');

const prefix = '/sales';
const module = 'Sales';
const data = [
  {
    path: `${prefix}/salesVerification`,
    name: `${module}.SalesVerification`,
    component: SalesVerification,
    meta: {
      title: '销量验证'
    }
  },
  {
    path: `${prefix}/salesChooseOrder`,
    name: `${module}.SalesChooseOrder`,
    component: SalesChooseOrder,
    meta: {
      title: '选择订单'
    }
  }
];

export default data;
