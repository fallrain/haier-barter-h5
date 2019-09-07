const baseURL = 'basic';
const urls = {
  // 根据子产品代码查询套机产品信息
  list: '/product',
  // 查询顾客地址列表
  customerAddressList: '/customer/address/list',
  // 新增用户地址
  addcustomerAddress: '/customer/create',
  // 更新顾客地址列表
  updateCustomerAddress: '/customer/address/update',
  // 查询用户默认地址
  deafaultCustomerAddress: '/customer/address/default',
  // 查询数据字典
  commonTypeQuery: '/common/dictionary/list/',
  // 根据storeid查询门店
  storeInfo: '/store/info'

};

Object.entries(urls).forEach(([key, value]) => {
  urls[key] = baseURL + value;
});

export default urls;
