import urls from '../url/rights.url';
import {
  axGet,
  axPostJson,
} from '@/lib/ajax';

export default {
  list(keyWords, pageNo, pageSize) {
    /* 查询订单列表 */
    return axGet(urls.list(keyWords, pageNo, pageSize));
  },
  queryOrderOptionalRights(data, param) {
    return axPostJson(urls.queryOrderOptionalRights, data, param);
  },
  queryOrderNotOptionalRights(data, param) {
    return axPostJson(urls.queryOrderNotOptionalRights, data, param);
  },
  checkedOrderRights(data, param) {
    return axPostJson(urls.checkedOrderRights, data, param);
  },
  uncheckedOrderRights(data, param) {
    return axPostJson(urls.uncheckedOrderRights, data, param);
  },
  queryRightsResidue(data, param) {
    return axGet(urls.queryRightsResidue, data, param);
  },
  queryRightsSingleConfigList(data, param) {
    return axPostJson(urls.queryRightsSingleConfigList, data, param);
  },
  queryRightsSetsByRightsNo(data, param) {
    return axPostJson(urls.queryRightsSetsByRightsNo, data, param);
  },
  queryRightsLimitConfigList(data, param) {
    return axPostJson(urls.queryRightsLimitConfigList, data, param);
  },
  confirmSelectedOrderRights(data, param) {
    return axPostJson(urls.confirmSelectedOrderRights, data, param);
  },
  queryOrderOptionalShareRights(data, param) {
    return axPostJson(urls.queryOrderOptionalShareRights, data, param);
  },
  queryOrderOptionalMutexRights(data, param) {
    return axPostJson(urls.queryOrderOptionalMutexRights, data, param);
  },
  viewGifts(data, param) {
    return axPostJson(urls.viewGifts, data, param);
  },
  viewOtherLimited(data, param) {
    return axPostJson(urls.viewOtherLimited, data, param);
  },
  getRightsConfigInfo(data, param) {
    return axPostJson(urls.getRightsConfigInfo, data, param);
  },
  getRightsConfigInfoByOrderNo(data, param) {
    return axGet(urls.getRightsConfigInfoByOrderNo, data, param);
  },
  queryRightsActivityList(data) {
    return axPostJson(`${urls.queryRightsActivityList}?keyword=${data}&rightsType=`);
  },
  // getRightsConfigInfoByOrderNo(orderNo){
  //   return axGet(urls.getRightsConfigInfoByOrderNo(orderNo))
  // },
};
