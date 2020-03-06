// 估价历史
const evaluateProductHistoryList = () =>
  import(/* webpackChunkName: "evaluateProductHistoryList" */ "@/views/evaluateProduct/evaluateProductHistoryList");
// 沟通记录
const evaluateProductDetail = () =>
  import(/* webpackChunkName: "evaluateProductDetail" */ "@/views/evaluateProduct/evaluateProductDetail");

//服务换新记录 serviceUpdateRecord
const serviceUpdateRecord = () =>
  import(/* webpackChunkName: "serviceUpdateRecord" */ "@/views/evaluateProduct/serviceUpdateRecord");

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
  },
  {
    path: `${prefix}/serviceUpdateRecord`,
    name: `${module}.serviceUpdateRecord`,
    component: serviceUpdateRecord,
    meta: {
      title: "服务换新记录"
    }
  }
];

export default data;
