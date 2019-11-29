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
  detailCount(data) {
    /* 数据详情分析 */
    return axPostJson(urls.detailCount, data, null);
  },
  saveJoiner(data) {
    /* 数据详情分析 */
    return axPostJson(urls.saveJoiner, data, null);
  },
};
