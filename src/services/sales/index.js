import urls from '../url/sales.url';
import {
  axPost
} from '@/lib/ajax';

export default {
  getReportEhubProductGroupPage(data) {
    /* 查询销量一级展示列表 */
    return axPost(urls.getReportEhubProductGroupPage, data);
  },
  getReportEhubByProductList(data) {
    /* 查询二级列表 */
    return axPost(urls.getReportEhubByProductList, data);
  }
};
