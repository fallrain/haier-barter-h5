import urls from '../url/house.url';
import {
  axPostJson, axPost, axGet,
} from '@/lib/ajax';

export default {
  queryPlanServiceList(data, param) {
    /* 查询当前计划入户列表 */
    return axPostJson(urls.queryPlanServiceList, data, param);
  },
  queryOtherPlanServiceList(data, param) {
    /* 查询其他入户计划列表 */
    return axPostJson(urls.queryOtherPlanServiceList, data, param);
  },
  createPlanService(data, param) {
    /* 创建入户服务计划 */
    return axPostJson(urls.createPlanService, data, param);
  },
  changePlanService(data, param) {
    /* 创建入户服务计划 */
    return axPostJson(urls.changePlanService, data, param);
  },
  deletePlanService(data, param) {
    /* 删除入户服务计划 */
    return axPostJson(urls.deletePlanService, data, param);
  },
  querySuccessPlanList(data, param) {
    /* 查询已入户计划列表 */
    return axPostJson(urls.querySuccessPlanList, data, param);
  },
  queryDetailById(param) {
    /* 根据ID查询入户计划详情 */
    return axGet(urls.queryDetailById, param);
  },
  queryFlagsById(param) {
  /* 查询完善资料状态 */
    return axGet(urls.queryFlagsById, param);
  },
  completeAppraise(param) {
    /* 已评价 */
    return axGet(urls.completeAppraise, param);
  },
  completeFamily(param) {
    /* 完善家庭信息 */
    return axGet(urls.completeFamily, param);
  },
  completeAppliance(param) {
    /* 完善家电信息 */
    return axGet(urls.completeAppliance, param);
  },
  completeStory(param) {
    /* 完善故事信息 */
    return axGet(urls.completeStory, param);
  },
  getCanBeIssuedRights(param) {
    return axGet(urls.getCanBeIssuedRights, param);
  },
  addStory(data, param) {
    /* 新增故事 */
    return axPostJson(urls.addStory, data, param);
  },
  modifyStory(data, param) {
    /* 修改故事 */
    return axPostJson(urls.modifyStory, data, param);
  },
  searchStoryByPlanId(data, param) {
    /* 查询单条故事 */
    return axPostJson(urls.searchStoryByPlanId, data, param);
  },
  appraiseStatistics(param) {
    /* 评价统计 */
    return axGet(urls.appraiseStatistics, param);
  },
  analysis(data, param) {
    /* 数据分析 */
    return axPostJson(urls.analysis, data, param);
  },
  appraiseAdd(data, param) {
    /* 邀请评价 */
    return axPostJson(urls.appraiseAdd, data, param);
  },
};
