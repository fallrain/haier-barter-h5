import urls from '../url/base.url';
import {
  axPost, axGet
} from '@/lib/ajax';

export default {
  jsSign(data) {
    /* 登录 */
    return axPost(urls.jsSign, data);
  },
  userInfo() {
    /* 查询直销员信息 */
    return axGet(urls.userInfo);
  },
};
