import urls from '../url/base.url';
import {
  axPost
} from '@/lib/ajax';

export default {
  jsSign(data) {
    /* 登录 */
    return axPost(urls.jsSign, data);
  }
};
