import urls from '../url/activity.url';
import {
  axPost,
  axPostJson
} from '@/lib/ajax';

export default {
  queryActivityInfoListForHmc(data, param) {
    /* 营销活动之引流活动 */
    return axPostJson(urls.queryActivityInfoListForHmc, data, param);
  },
};
