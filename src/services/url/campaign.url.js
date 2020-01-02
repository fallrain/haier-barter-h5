const baseURL = 'campaign';
const urls = {
  // 统计打电话次数
  recordFrequency: '/oldForNewController/recordFrequency',
  // 估价产业
  listOldForNewIndustry: '/oldForNewController/listOldForNewIndustry/2',
  // 查询年限
  statisticalParameter: '/oldForNewController/statisticalParameter/BX',
  // 查询估价列表信息
  getOldForNewHistory: '/oldForNewController/queryList',
  // 批量发卡券
  batchSendMessage: '/oldForNewController/batchSendMessage'
};

Object.entries(urls).forEach(([key, value]) => {
  if (toString.call(value) === '[object Function]') {
    urls[key] = function (...args) {
      return baseURL + value(...args);
    };
  } else {
    urls[key] = baseURL + value;
  }
});

export default urls;
