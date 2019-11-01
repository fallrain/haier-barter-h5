import urls from '../url/activity.url';
import {
  axPost,
  axPostJson,
  axGet
} from '@/lib/ajax';

export default {
  queryActivityInfoListForHmc(data, param) {
    /* 营销活动之引流活动 */
    return axPostJson(urls.queryActivityInfoListForHmc, data, param);
  },
  generateQrcode(data, data2, data3) {
    /* 营销活动之引流活动 */
    return axGet(`${urls.generateQrcode}?redirectUrl=${data}&activityId=${data2}&hmcId=${data3}`);
  },
};
