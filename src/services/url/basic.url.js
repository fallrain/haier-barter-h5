const baseURL = 'basic';
const urls = {
  // 微信权限
  jsSign: '/common/weixin/jssign',
  userInfo: '/user/info',
  scanQRcode: '/product/scan-qrcode',
  // 构建微信授权URL给前端
  authorizedUrl: '/customer/oauth2/authorizedUrl',
  // 发送短信验证码给客户
  sendSms: '/customer/oauth2/send/sms',
  queryIndustry: '/common/industry/list',
  // 查询产品组
  industryList: '/common/industry/list',
  // 购买意愿
  buyIntention: '/common/dictionary/list/BUYINTENTION',
  uploadByMediaId: '/common/uploadByMediaId', // 同步前端微信上传的文件
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
