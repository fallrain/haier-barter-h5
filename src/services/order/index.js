import urls from '../url/order.url';
import {
  axGet,
  axPostJson,
  axPost
} from '@/lib/ajax';

export default {
  queryOrderFollowList(data, param) {
    /* 查询订单列表 */
    return axPostJson(urls.queryOrderFollowList, data, param);
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
  createOrderForSGLD(data, param) {
    return axPostJson(urls.createOrderForSGLD, data, param);
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
  isReportInstallNew(data, params) {
    return axPostJson(urls.isReportInstallNew, data, params);
  },
  checkUpperLimitForSGLD() {
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
  ifUploadInvoice(params) {
    /* 检查是否可以跳过上传发票 */
    return axPostJson(urls.ifUploadInvoice, null, params);
  },
  checkInvoiceByMediaId(data) {
    /* 上传发票并校验 */
    return axPost(urls.checkInvoiceByMediaId, data);
  },
  deleteOrderByHmc(params) {
    /* 检查是否可以跳过上传发票 */
    return axPostJson(urls.deleteOrderByHmc, null, params);
  },
  orderDeletionApprovalApply(data) {
    /* 订单删除申请 */
    return axPostJson(urls.orderDeletionApprovalApply, data);
  },
  queryRightsReviewList(data, params) {
    /* 查询需要删除的订单的列表 */
    return axPostJson(urls.queryRightsReviewList, data, params);
  },
  checkRepeatCreateOrder(data) {
    /* 检查重复录单 */
    return axPostJson(urls.checkRepeatCreateOrder, data, {
      requestNoToast: true
    });
  },
  updateStatusForYJHX(params) {
    /* 以旧换新标记手机号、微信是否添加或者无效 */
    return axPostJson(urls.updateStatusForYJHX, null, params);
  },
  queryAdjCouponInfo(params) {
    /* 查询领取优惠券信息 */
    return axPostJson(urls.queryAdjCouponInfo, null, params);
  },
  getLocationByBaiduMap(param) {
    /* 查询地理位置 */
    return axGet(urls.getLocationByBaiduMap, param);
  },
};
