const baseURL = 'basic';
const urls = {
  // 小程序端，根据关键字（产品编码、产品型号、产品组、产品品牌）查询产品信息
  list(keyWords, pageNo, pageSize) {
    return `/product/list/${keyWords}/${pageNo}/${pageSize}`;
  },
  price(productCode, productGroup) {
    return `/product/price/${productCode}/${productGroup}`;
  },
  // 查询顾客地址列表
  customerAddressList(mobile) {
    return `/customer/address/list/${mobile}`;
  },
  // 根据手机号查询顾客地址列表
  customerAddressListForCustomerTel(mobile) {
    return `/customer/address/list/mobile/${mobile}`;
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
  commonTypeQuery(type) {
    return `/common/dictionary/list/${type}`;
  },
  // 根据storeid查询门店
  storeInfo(shopId) {
    return `/store/info/${shopId}`;
  },
  userList(storeId) {
    return `/user/list/${storeId}`;
  },
  industryGroup: '/common/product_group/list/1', // 获取全部产品组

  industryGroupList: '/common/product_group/list' // 获取全部产品组

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
