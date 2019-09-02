import urls from '../url/product.url';
import {
  axPostJson, axPost, axGet,
} from '@/lib/ajax';

export default {
  list(param) {
    /* 查询订单列表 */
    return axGet(urls.list, param);
  },
};
