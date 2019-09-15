const baseURL = 'rights';
const urls = {
  // 小程序端，根据关键字（产品编码、产品型号、产品组、产品品牌）查询产品信息
  list(keyWords, pageNo, pageSize) {
    return `/product/list/${keyWords}/${pageNo}/${pageSize}`;
  },
  queryOrderOptionalRights:'/rightsManage/queryOrderOptionalRights',//根据订单信息查询可选权益信息
  queryOrderNotOptionalRights:'/rightsManage/queryOrderNotOptionalRights',//根据订单信息查询不可选权益信息
  queryRightsResidueByHmcId:'/rightsManage/queryRightsResidueByHmcId',//根据当前用户查询权益活动信息列表
  queryRightsResidueByOrderInfo:'/rightsManage/queryRightsResidueByOrderInfo',//根据订单信息检查已选权益剩余量
  querySelectedRightsByOrderInfo:'/rightsManage/querySelectedRightsByOrderInfo',//根据订单编码查询已选权益信息
  selectOrderRights:'/rightsManage/selectOrderRights'//根据订单编码选择权益
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
