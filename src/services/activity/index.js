import urls from '../url/activity.url';
import {
  axPost,
  axPostJson,
  axGet,
  axGetBlob
} from '@/lib/ajax';

export default {
  queryActivityInfoListForHmc(data, param) {
    /* 营销活动之引流活动 */
    return axPostJson(urls.queryActivityInfoListForHmc, data, param);
  },
  generateQrcode(data, data2, data3) {
    /* 营销活动之引流活动 */
    return axGetBlob(`${urls.generateQrcode}?redirectUrl=${data}&activityId=${data2}&hmcId=${data3}`);
  },
  detailCount(data, param) {
    /* 数据详情分析 */
    return axPostJson(urls.detailCount, data, param);
  },
  saveJoiner(data) {
    /* 数据详情分析 */
    return axPostJson(urls.saveJoiner, data, null);
  },
  qrCodeCreate(data,) {
    /* 二维码生成接口 */
    return axPostJson(urls.qrCodeCreate, data, {
      returnResponse: true,
      requestNoToast: true
    },
    {
      responseType: 'blob'
    });
  },
  shareCount(data, param) {
    /* 浏览、分享、转发计数接口 */
    return axPostJson(urls.shareCount, data, param);
  },
  queryActivityInfoDetails(data, param) {
    /* 活动详情查询 */
    return axPostJson(urls.queryActivityInfoDetails, data, param);
  },
  validateJoiner(data, param) {
    /* 活动详情查询 */
    return axPostJson(urls.validateJoiner, data, param);
  },
};
