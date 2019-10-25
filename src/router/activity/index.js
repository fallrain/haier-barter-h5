const MarketingActivities = () => import(/* webpackChunkName: "MarketingActivities" */ '@/views/activity/MarketingActivities');
const ActivityDataAnalysis = () => import(/* webpackChunkName: "ActivityDataAnalysis" */ '@/views/activity/ActivityDataAnalysis');

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
  }
];

export default data;
