const baseURL = 'manage';
const urls = {
  // 小程序端，根据关键字（产品编码、产品型号、产品组、产品品牌）查询产品信息
  list: '/product/list',
};

Object.entries(urls).forEach(([key, value]) => {
  urls[key] = baseURL + value;
});

export default urls;
