const baseURL = 'activity';
const urls = {
  // 营销活动之引流活动
  queryActivityInfoListForHmc: '/activityInfo/queryActivityInfoListForHmc',
  // 二维码
  generateQrcode: '/activityInfo/generate-qrcode',
  // 数据详情分析
  detailCount: '/detail/count',
  // 活动报名接口
  saveJoiner: 'activityJoiner/saveJoiner',

};

Object.entries(urls).forEach(([key, value]) => {
  urls[key] = baseURL + value;
});

export default urls;
