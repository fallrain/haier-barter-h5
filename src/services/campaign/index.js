import urls from '../url/campaign.url';
import {
  axPostJson,
} from '@/lib/ajax';

export default {
  recordFrequency(data) {
    /* 记录打电话 */
    return axPostJson(urls.recordFrequency, data, {
      requestNoToast: true,
      noLoading: true
    });
  }
};
