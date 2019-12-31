const baseURL = 'manage';
const urls = {
  // 销量一级展示列表
  getReportEhubProductGroupPage: '/reportEhub/getReportEhubProductGroupPage',
  // 二级
  getReportEhubByProductList: '/reportEhub/getReportEhubByProductList',
  // 展示验证失败的销量对应的订单
  getValidationFailureOrder: '/reportEhub/getValidationFailureOrder',
  // 异常销量重传接口
  reportEhubAgain: '/reportEhub/reportEhubAgain',
  // 条码提报
  saveEhubBarCode: '/reportEhub/saveEhubBarCode',
  getproGrpList: '/buildHouse/proGrpList' // 查询产业列表
};

Object.entries(urls).forEach(([key, value]) => {
  urls[key] = baseURL + value;
});

export default urls;
