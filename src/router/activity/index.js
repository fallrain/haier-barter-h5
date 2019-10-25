const MarketingActivities = () => import(/* webpackChunkName: "MarketingActivities" */ '@/views/activity/MarketingActivities');
const ActivityDataAnalysis = () => import(/* webpackChunkName: "ActivityDataAnalysis" */ '@/views/activity/ActivityDataAnalysis');
const ActivityQRCode = () => import(/* webpackChunkName: "ActivityDataAnalysis" */ '@/views/activity/ActivityQRCode');
const ActivityDetail = () => import(/* webpackChunkName: "ActivityDetail" */ '@/views/activity/ActivityDetail');

const prefix = '/activity';
const module = 'Activity';
const data = [
  {
    path: `${prefix}/marketingActivities`,
    name: `${module}.MarketingActivities`,
    component: MarketingActivities,
    meta: {
      title: '营销活动'
    }
  },
  {
    path: `${prefix}/activityDataAnalysis`,
    name: `${module}.ActivityDataAnalysis`,
    component: ActivityDataAnalysis,
    meta: {
      title: '数据分析'
    }
  },
  {
    path: `${prefix}/activityQRCode`,
    name: `${module}.ActivityQRCode`,
    component: ActivityQRCode,
    meta: {
      title: '活动二维码'
    }
  },
  {
    path: `${prefix}/activityDetail`,
    name: `${module}.ActivityDetail`,
    component: ActivityDetail,
    meta: {
      title: '活动详情  '
    }
  }
];

export default data;
