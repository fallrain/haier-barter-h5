import urls from '../url/basic.url';
import {
  axGet,
} from '@/lib/ajax';


export default {
  jsSign(url) {
    /* 微信权限 */
    return axGet(urls.jsSign, { url });
  }
};
