import urls from '../url/order.url';
import {
  axPostJson
} from '@/lib/ajax';

export default {
  queryOrderFollowlList(data, param) {
    /* 查询订单列表 */
    return axPostJson(urls.queryOrderFollowlList, data, param);
  },
  fuzzySearchOrderFollowList(data, param) {
    return axPostJson(urls.fuzzySearchOrderFollowList, data, param);
  },
  updateOrderFollowByType(data, param) {
    return axPostJson(urls.updateOrderFollowByType, data, param);
  }
};
