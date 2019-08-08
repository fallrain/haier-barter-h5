const baseURL = 'barter-manage';
const urls = {
  // 代报装列表
  queryReportInstallList: '/reportInstall/queryReportInstallList',
  // 详情
  queryReportInstallByOrderNo: '/reportInstall/queryReportInstallByOrderNo',
  // 提交
  agentReportInstall: '/reportInstall/agentReportInstall',
};

Object.entries(urls).forEach(([key, value]) => {
  urls[key] = baseURL + value;
});

export default urls;
