import urls from '../url/sales.url';
import {
  axPost
} from '@/lib/ajax';

export default {
  getReportEhubProductGroupPage(data) {
    /* 查询销量一级展示列表 */
    return axPost(urls.getReportEhubProductGroupPage, data);
  },
  getReportEhubByProductList(data) {
    /* 查询二级列表 */
    return axPost(urls.getReportEhubByProductList, data);
  },
  getValidationFailureOrder(data) {
    /* 展示验证失败的销量对应的订单 */
    return axPost(urls.getValidationFailureOrder, data);
  },
  reportEhubAgain(data) {
    /* 展示验证失败的销量对应的订单 */
    return axPost(urls.reportEhubAgain, data);
  },
  saveEhubBarCode(data) {
    /* 条码提报 */
    return axPost(urls.saveEhubBarCode, data, {requestNoToast: true});
  }
};
