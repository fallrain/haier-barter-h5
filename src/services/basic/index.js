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
    /* 构建微信授权URL给前端 */
    return axPost(urls.authorizedUrl, data);
  },
  sendSms(data) {
    /* 发送短信验证码给客户 */
    return axPost(urls.sendSms, data);
  },
  wxUserInfo(data) {
    /* 获取微信用户信息 */
    return axPost(urls.wxUserInfo, data);
  },
};
