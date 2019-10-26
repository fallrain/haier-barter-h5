const baseURL = 'basic';
const urls = {
  // 微信权限
  jsSign: '/common/weixin/jssign',
  userInfo: '/user/info',
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
