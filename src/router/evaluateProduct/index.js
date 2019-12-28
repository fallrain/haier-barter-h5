// 估价历史
const evaluateProductHistoryList = () => import(/* webpackChunkName: "evaluateProductHistoryList" */ '@/views/evaluateProduct/evaluateProductHistoryList');

const prefix = '/evaluateProductHistoryList';
const module = 'EvaluateProductHistoryList';
const data = [
  {
    path: `${prefix}/evaluateProductHistoryList`,
    name: `${module}.EvaluateProductHistoryList`,
    component: evaluateProductHistoryList,
    meta: {
      title: '估价历史'
    }
  }
];

export default data;
