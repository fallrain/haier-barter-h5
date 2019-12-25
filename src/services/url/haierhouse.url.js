const baseURL = 'campaign';
const urls = {
  myShopList: '/deco/myShop/list', // 我的一站筑家接口
  goodShopList: '/deco/goodShop/list', // 优秀门店
  addShopInfo: '/deco/shopInfo/add', // 开店申请接口
  addDistrictInfo: '/deco/districtInfo/add', // 小区信息录入接口
  queryShopAndDistrict: '/deco/shopAndDistrict/query', // 店铺申请信息查询接口
  simpleUpload: '/file/simpleUpload', // 上传图片

};

Object.entries(urls).forEach(([key, value]) => {
  if (value === '/file/simpleUpload') {
    urls[key] = value;
  } else {
    urls[key] = baseURL + value;
  }
});

export default urls;
