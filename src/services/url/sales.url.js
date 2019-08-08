const baseURL = 'barter-manage';
const urls = {
  // 销量一级展示列表
  getReportEhubProductGroupPage: '/reportEhub/getReportEhubProductGroupPage',
  // 二级
  getReportEhubByProductList: '/reportEhub/getReportEhubByProductList',
  // 展示验证失败的销量对应的订单
  getValidationFailureOrder: '/reportEhub/getValidationFailureOrder',
};

Object.entries(urls).forEach(([key, value]) => {
  urls[key] = baseURL + value;
});

export default urls;
