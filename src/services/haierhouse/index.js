import urls from '../url/haierhouse.url';
import {
  axPostJson,
  axPost
} from '@/lib/ajax';

export default {
  queryMyShopList(data, param) {
    /* 我的一站筑家 */
    return axPostJson(urls.myShopList, data, param);
  },
  querGoodShopList(data, param) {
    /* 优秀门店 */
    return axPostJson(urls.goodShopList, data, param);
  },
  addShopInfo(data, param) {
    /* 新增筑家门店 */
    return axPostJson(urls.addShopInfo, data, param);
  },
  addDistrictInfo(data, param) {
    /* 新增筑小区信息 */
    return axPostJson(urls.addDistrictInfo, data, param);
  },
  queryShopAndDistrict(data, param) {
    /* 店铺申请信息查询接口 */
    return axPostJson(urls.queryShopAndDistrict, data, param);
  },
  queryCount(data, param) {
    return axPostJson(urls.queryCount, data, param);
  },
};
