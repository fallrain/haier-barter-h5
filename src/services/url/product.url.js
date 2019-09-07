const baseURL = 'basic';
const urls = {
  // 根据子产品代码查询套机产品信息
  list: '/product',
  // 查询顾客地址列表
  customerAddressList(mobile) {
    return `/customer/address/list/${mobile}`;
  },
  // 新增用户地址
  addcustomerAddress: '/customer/create',
  // 更新顾客地址列表
  updateCustomerAddress: '/customer/address/update',
  // 查询用户默认地址
  deafaultCustomerAddress(mobile) {
    return `/customer/address/default/${mobile}`;
  },
  // 查询数据字典
  commonTypeQuery: '/common/dictionary/list/',
  // 根据storeid查询门店
  storeInfo(shopId) {
    return `/store/info/${shopId}`;
  }

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
