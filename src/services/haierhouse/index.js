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
};
