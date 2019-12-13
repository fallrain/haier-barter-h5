const baseURL = 'campaign';
const urls = {
  myShopList: '/deco/myShop/list', // 我的一站筑家接口
  goodShopList: '/deco/goodShop/list', // 我的一站筑家接口

};

Object.entries(urls).forEach(([key, value]) => {
  urls[key] = baseURL + value;
});

export default urls;
