import urls from '../url/campaign.url';
import {
  axGet,
  axPostJson,
} from '@/lib/ajax';

export default {
  recordFrequency(data) {
    /* 记录打电话 */
    return axPostJson(urls.recordFrequency, data, {
      requestNoToast: true,
      noLoading: true
    });
  },
  listOldForNewIndustry(params) {
    /* 估价产业 */
    return axGet(urls.listOldForNewIndustry, params);
  },
  statisticalParameter(params) {
    /* 年限 */
    return axGet(urls.statisticalParameter, params);
  },
  getOldForNewHistory(data) {
    /* 估价历史 */
    return axPostJson(urls.getOldForNewHistory, data);
  },
  batchSendMessage(data) {
    /* 批量发卡券 */
    return axPostJson(urls.batchSendMessage, data);
  },
  getOldForNewQueryList(data) {
    /* 按照临促人员openId查询估价列表 */
    return axPostJson(urls.getOldForNewQueryList, data);
  },
  statisticCalNum(data) {
    /* 临促人员添加沟通记录 */
    return axPostJson(urls.statisticCalNum, data);
  },
  addComRecordSave(data) {
  /* 临促人员添加沟通记录 */
    return axPostJson(urls.addComRecordSave, data);
  },
  queryComRecord(id) {
    /* 查询沟通记录 */
    return axGet(urls.queryComRecord(id));
  },
};
