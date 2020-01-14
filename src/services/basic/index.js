import urls from '../url/basic.url';
import {
  axGet,
  axPost,
} from '@/lib/ajax';


export default {
  jsSign(url) {
    /* 微信权限 */
    return axGet(urls.jsSign, { url, noLoading: true, requestNoToast: false, noToken: true, });
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
    /* 构建微信授权URL给前端 */
    return axPost(urls.authorizedUrl, data, { noToken: true, });
  },
  sendSms(data) {
    /* 发送短信验证码给客户 */
    return axPost(urls.sendSms, data, { noToken: true, });
  },
  queryIndustry() {
    /* 查询产业组 */
    return axGet(urls.queryIndustry);
  },
  activityType() {
    /* 查询活动类型 */
    return axGet(urls.dictionary('ACTIVITY_TYPE'));
  },

};
