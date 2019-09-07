import urls from '../url/product.url';
import {
  axPostJson, axPost, axGet, axGetUrl,
} from '@/lib/ajax';

export default {
  list(appendUrl) {
    /* 查询订单列表 */
    return axGetUrl(urls.list, appendUrl);
  },
  customerAddressList(param) {
    return axGet(urls.customerAddressList, param);
  },
  updateCustomerAddress(param) {
    return axPost(urls.updateCustomerAddress, param);
  },
  addcustomerAddress(param) {
    return axPostJson(urls.addcustomerAddress, param);
  },
  deafaultCustomerAddress(param) {
    return axGet(urls.deafaultCustomerAddress, param);
  },
  commonTypeQuery(param) {
    return axGet(urls.commonTypeQuery, param);
  },
  storeInfo(param) {
    return axGet(urls.storeInfo, param);
  }

};
