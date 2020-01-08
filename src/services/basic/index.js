import urls from '../url/basic.url';
import {
  axGet, axPostJson
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
    /* 查询产品型号  */
    return axGet(urls.scanQRcode, { url });
  },
  queryIndustry() {
    /* 查询产业组 */
    return axGet(urls.queryIndustry);
  },
  uploadByMediaId(data, param) {
    /* 同步前端微信上传的文件 */
    return axPostJson(urls.uploadByMediaId, data, param);
  }
};
