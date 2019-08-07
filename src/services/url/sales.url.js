const baseURL = 'barter-manage';
const urls = {
  // 销量一级展示列表
  getReportEhubProductGroupPage: '/reportEhub/getReportEhubProductGroupPage',
  // 二级
  getReportEhubByProductList: '/reportEhub/getReportEhubByProductList',
};

Object.entries(urls).forEach(([key, value]) => {
  urls[key] = baseURL + value;
});

export default urls;
