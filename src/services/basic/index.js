import urls from '../url/basic.url';
import {
  axGet,
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
  industryList() {
    /* 查询全部产业 */
    return axGet(urls.industryList);
  },
  getBuyIntention() {
    /* 查询购买意愿 */
    return axGet(urls.buyIntention);
  },
};
