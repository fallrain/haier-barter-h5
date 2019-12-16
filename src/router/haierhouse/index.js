const HaierhouseEntry = () => import('@/views/haierhouse/HaierhouseEntry');// 一站筑家
const HaierhouseApply = () => import('@/views/haierhouse/HaierhouseApply');// 筑家申请

const prefix = '/haierhouse';
const module = 'Haierhouse';
const data = [
  {
    path: `${prefix}/haierhouseEntry`,
    name: `${module}.HaierhouseEntry`,
    component: HaierhouseEntry,
    meta: {
      title: '一站筑家',
    },
  },
  {
    path: `${prefix}/haierhouseApply`,
    name: `${module}.HaierhouseApply`,
    component: HaierhouseApply,
    meta: {
      title: '筑家申请',
    },
  }
];

export default data;
