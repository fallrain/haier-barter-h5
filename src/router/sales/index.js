// 销量验证
const SalesVerification = () => import(/* webpackChunkName: "SalesVerification" */ '@/views/sales/SalesVerification');

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
  }
];

export default data;
