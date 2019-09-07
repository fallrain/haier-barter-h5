import urls from '../url/product.url';
import {
  axPostJson, axPost, axGet, axGetUrl,
} from '@/lib/ajax';

export default {
  list(appendUrl) {
    /* 查询订单列表 */
    return axGetUrl(urls.list, appendUrl);
  },
  customerAddressList(mobile) {
    return axGet(urls.customerAddressList(mobile));
  },
  updateCustomerAddress(data, param) {
    return axPostJson(urls.updateCustomerAddress, data, param);
  },
  addcustomerAddress(data, param) {
    return axPostJson(urls.addcustomerAddress, data, param);
  },
  deafaultCustomerAddress(mobile) {
    return axGet(urls.deafaultCustomerAddress(mobile));
  },
  commonTypeQuery(param) {
    return axGet(urls.commonTypeQuery, param);
  },
  storeInfo(shopId) {
    return axGet(urls.storeInfo(shopId));
  }

};
