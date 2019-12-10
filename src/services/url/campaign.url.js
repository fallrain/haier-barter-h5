const baseURL = 'campaign';
const urls = {
  // 统计打电话次数
  recordFrequency: '/oldForNewController/recordFrequency'

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
