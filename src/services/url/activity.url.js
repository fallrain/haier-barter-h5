const baseURL = 'activity';
const urls = {
  // 营销活动之引流活动
  queryActivityInfoListForHmc: '/activityInfo/queryActivityInfoListForHmc',
  // 二维码
  generateQrcode: '/activityInfo/generate-qrcode',
  // 数据详情分析
  detailCount: '/activity/detail/count',
  saveJoiner: '/activityJoiner/saveJoiner', // 活动报名接口
  qrCodeCreate: '/activity/qrCode/create', // 二维码生成接口
  shareCount: '/activity/share/count', // 浏览、分享、转发计数接口
  queryActivityInfoDetails: '/activityInfo/queryActivityInfoDetails', // 营销活动详情
  validateJoiner: '/activityJoiner/validateJoiner', // 验证用户是否报名活动接口
};

Object.entries(urls).forEach(([key, value]) => {
  urls[key] = baseURL + value;
});

export default urls;
