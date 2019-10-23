import urls from '../url/product.url';
import {
  axPostJson, axPost, axGet, axGetUrl,
} from '@/lib/ajax';

export default {
  list(keyWords, pageNo, pageSize) {
    /* 查询订单列表 */
    // return axGetUrl(urls.list, appendUrl);
    return axGet(urls.list(keyWords, pageNo, pageSize));
  },
  price(productCode,productGroup ) {
    /* 查询订单列表 */
    // return axGetUrl(urls.list, appendUrl);
    return axGet(urls.price(productCode,productGroup ));
  },
  customerAddressList(mobile) {
    return axGet(urls.customerAddressList(mobile));
  },
  customerAddressListForCustomerTel(mobile) {
    return axGet(urls.customerAddressListForCustomerTel(mobile));
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
  commonTypeQuery(type) {
    return axGet(urls.commonTypeQuery(type));
  },
  storeInfo(shopId) {
    return axGet(urls.storeInfo(shopId));
  },
  userList(storeId) {
    return axGet(urls.userList(storeId));
  }

};
