const baseURL = 'basic';
const urls = {
  jsSign: '/test/vipWeChat/jsSdk/getJsSign',
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
