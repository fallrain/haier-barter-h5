const HaierhouseEntry = () => import('@/views/haierhouse/HaierhouseEntry');// 一站筑家

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
  }
];

export default data;
