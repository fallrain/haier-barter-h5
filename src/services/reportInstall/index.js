import urls from '../url/reportInstall.url';
import {
  axPost,
  axPostJson
} from '@/lib/ajax';

export default {
  queryReportInstallList(data) {
    /* 查询代报装列表 */
    return axPost(urls.queryReportInstallList, data);
  },
  queryReportInstallByOrderNo(data) {
    /* 查询代报装详情 */
    return axPost(urls.queryReportInstallByOrderNo, data);
  },
  agentReportInstall(data) {
    /* 提交代报装详情 */
    return axPostJson(urls.agentReportInstall, data);
  }
};
