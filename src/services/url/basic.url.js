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
  // 获取微信用户信息
  wxUserInfo: '/customer/oauth2/wxUserInfo',

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
