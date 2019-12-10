import urls from '../url/basic.url';
import {
  axGet,
  axPost,
} from '@/lib/ajax';


export default {
  jsSign(url) {
    /* 微信权限 */
    return axGet(urls.jsSign, { url });
  },
  userInfo() {
    /* 微信权限 */
    return axGet(urls.userInfo);
  },
  scanQRcode(url) {
    /* 查询产品型号 */
    return axGet(urls.scanQRcode, { url });
  },
  authorizedUrl(data) {
    /* 查询产品型号 */
    return axPost(urls.authorizedUrl, data);
  }
};
