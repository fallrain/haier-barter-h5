// 估价历史
const evaluateProductHistoryList = () =>
  import(/* webpackChunkName: "evaluateProductHistoryList" */ "@/views/evaluateProduct/evaluateProductHistoryList");
// 沟通记录
const evaluateProductDetail = () =>
  import(/* webpackChunkName: "evaluateProductDetail" */ "@/views/evaluateProduct/evaluateProductDetail");

// evaluateProductDetail

const prefix = "/evaluateProductHistoryList";
const module = "EvaluateProductHistoryList";
const data = [
  {
    path: `${prefix}/evaluateProductHistoryList`,
    name: `${module}.EvaluateProductHistoryList`,
    component: evaluateProductHistoryList,
    meta: {
      title: "估价历史"
    }
  },
  {
    path: `${prefix}/evaluateProductDetail`,
    name: `${module}.evaluateProductDetail`,
    component: evaluateProductDetail,
    meta: {
      title: "沟通记录"
    }
  }
];

export default data;
