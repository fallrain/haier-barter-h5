const baseURL = 'rights';
const urls = {
  // 小程序端，根据关键字（产品编码、产品型号、产品组、产品品牌）查询产品信息
  list(keyWords, pageNo, pageSize) {
    return `/product/list/${keyWords}/${pageNo}/${pageSize}`;
  },
  queryOrderOptionalRights: '/rightsManage/queryOrderOptionalRightsPage', // 根据订单信息查询可选权益信息
  queryOrderNotOptionalRights: '/rightsManage/queryOrderNotOptionalRightsPage', // 根据订单信息查询不可选权益信息
  queryRightsResidue: '/rightsManage/queryRightsResidue', // 查询礼品剩余量
  checkedOrderRights: '/rightsManage/checkedOrderRights', // jia
  uncheckedOrderRights: '/rightsManage/uncheckedOrderRights', // jian
  viewGifts: '/rightsManage/viewGifts', // 查询礼品
  viewOtherLimited: '/rightsManage/viewOtherLimited', // 查询限制
  queryRightsSingleConfigList: '/rightsSingleConfig/queryRightsSingleConfigList', // 根据权益编码查询权益活动单品配置信息列表
  queryRightsSetsByRightsNo: '/rightsSetsConfig/queryRightsSetsByRightsNo', // 根据权益编码查询权益活动套购组合配置信息
  queryRightsLimitConfigList: '/rightsLimitConfig/queryRightsLimitConfigList', // 查询限制信息
  confirmSelectedOrderRights: '/rightsManage/confirmSelectedOrderRights', // 确认选择订单权益
  queryOrderOptionalShareRights: '/rightsManage/queryOrderOptionalShareRights', // 同享
  queryOrderOptionalMutexRights: '/rightsManage/queryOrderOptionalMutexRights', // 互斥
  getRightsConfigInfo: '/rightsConfigInfo/getRightsConfigInfo', // 获取权益配置信息
  getRightsConfigInfoByOrderNo:'/rightsConfigInfo/getRightsConfigInfoByOrderNo',
  // getRightsConfigInfoByOrderNo(orderNo) {
  //   return `/rightsConfigInfo/getRightsConfigInfoByOrderNo/${orderNo}`;//订单页获取权益配置
  // }
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
