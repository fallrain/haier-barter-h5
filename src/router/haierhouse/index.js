const HaierhouseEntry = () => import('@/views/haierhouse/HaierhouseEntry');// 一站筑家
const HaierhouseApplyBuildList = () => import('@/views/haierhouse/HaierhouseApplyBuildList');// 我的一站筑家
const HaierhouseApply = () => import('@/views/haierhouse/HaierhouseApply');// 筑家申请
const HaierhouseAreaInfo = () => import('@/views/haierhouse/HaierhouseAreaInfo');// 筑家小区信息
const ChoosePerson = () => import('@/views/haierhouse/ChoosePerson');// 筑家负责人列表
const HaierhouseDetail = () => import('@/views/haierhouse/HaierhouseDetail');// 筑家负责人列表
const DataAnalysis = () => import('@/views/haierhouse/DataAnalysis');// 数据分析

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
    path: `${prefix}/haierhouseApplyBuildList`,
    name: `${module}.HaierhouseApplyBuildList`,
    component: HaierhouseApplyBuildList,
    meta: {
      title: '我的一站筑家',
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
  },
  {
    path: `${prefix}/haierhouseDetail`,
    name: `${module}.HaierhouseDetail`,
    component: HaierhouseDetail,
    meta: {
      title: '筑家详情',
    },
  },
  {
    path: `${prefix}/dataAnalysis`,
    name: `${module}.DataAnalysis`,
    component: DataAnalysis,
    meta: {
      title: '筑家详情',
    },
  }
];

export default data;
