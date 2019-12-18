const HaierhouseEntry = () => import('@/views/haierhouse/HaierhouseEntry');// 一站筑家
const HaierhouseApply = () => import('@/views/haierhouse/HaierhouseApply');// 筑家申请
const HaierhouseAreaInfo = () => import('@/views/haierhouse/HaierhouseAreaInfo');// 筑家小区信息
const ChoosePerson = () => import('@/views/haierhouse/ChoosePerson');// 筑家负责人列表

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
  },
  {
    path: `${prefix}/choosePerson`,
    name: `${module}.ChoosePerson`,
    component: ChoosePerson,
    meta: {
      title: '筑家负责人',
    },
  },
  {
    path: `${prefix}/haierhouseAreaInfo`,
    name: `${module}.HaierhouseAreaInfo`,
    component: HaierhouseAreaInfo,
    meta: {
      title: '筑家小区信息',
    },
  }
];

export default data;
