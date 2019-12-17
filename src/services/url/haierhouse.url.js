const baseURL = 'campaign';
const urls = {
  myShopList: '/deco/myShop/list', // 我的一站筑家接口
  goodShopList: '/deco/goodShop/list', // 优秀门店
  addShopInfo: '/deco/shopInfo/add', // 开店申请接口


};

Object.entries(urls).forEach(([key, value]) => {
  urls[key] = baseURL + value;
});

export default urls;
