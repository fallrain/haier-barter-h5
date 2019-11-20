const baseURL = '';
const urls = {
  jsSign: '/test/vipWeChat/jsSdk/getJsSign',
};

Object.entries(urls).forEach(([key, value]) => {
  urls[key] = baseURL + value;
});

export default urls;
