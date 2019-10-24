import urls from '../url/order.url';
import {
  axPostJson, axPost, axGet,
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
  },
  generateOrderNo(data, param) {
    return axPostJson(urls.generateOrderNo, data, param);
  },
  queryOrderInfoByOrderNo(data, param) {
    return axPostJson(urls.queryOrderInfoByOrderNo, data, param);
  },
  queryOrderInvoiceByOrderNo(data, param) {
    return axPostJson(urls.queryOrderInvoiceByOrderNo, data, param);
  },
  createOrder(data, param) {
    return axPostJson(urls.createOrder, data, param);
  },
  createOrderSubmit(data, param) {
    return axPostJson(urls.createOrderSubmit, data, param);
  },
  supplementOrderSubmit(data, param) {
    return axPostJson(urls.supplementOrderSubmit, data, param);
  },
  createNewOrder(data, param) {
    return axPostJson(urls.createNewOrder, data, param);
  },
  queryOverTwentyFourHourOrder() {
    return axPost(urls.queryOverTwentyFourHourOrder);
  },
  generateOrderDetailId() {
    return axPost(urls.generateOrderDetailId);
  },
  uploadInvoice(data, param) {
    return axPostJson(urls.uploadInvoice, data, param);
  },
  queryOrderDetailAndInvoice(data, param) {
    return axPostJson(urls.queryOrderDetailAndInvoice, data, param);
  },
  checkInvoice(data, param) {
    return axPostJson(urls.checkInvoice, data, param);
  },
  simpleUpload() {
    return axPost(urls.simpleUpload);
  },
  isReportInstallNew(data,params){
    return axPostJson(urls.isReportInstallNew,data,params)
  },
  checkUpperLimitForSGLD(){
    return axPost(urls.checkUpperLimitForSGLD);
  },
  checkProductPrice(data, param) {
    return axPostJson(urls.checkProductPrice, data, param);
  },
  isAccordDeadline(data, param) {
    return axPostJson(urls.isAccordDeadline, data, param);
  },
  checkCreateOrder() {
    return axPostJson(urls.checkCreateOrder, {}, {});
  },
};
