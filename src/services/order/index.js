import urls from '../url/order.url';
import {
  axPostJson
} from '@/lib/ajax';

export default {
  queryOrderFollowlList(data) {
    /* 查询订单列表 */
    return axPostJson(urls.queryOrderFollowlList, data);
  }
};
