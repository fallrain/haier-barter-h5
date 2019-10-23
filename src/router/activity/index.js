const MarketingActivities = () => import(/* webpackChunkName: "MarketingActivities" */ '@/views/activity/MarketingActivities');

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
];

export default data;
