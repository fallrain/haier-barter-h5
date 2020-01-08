const baseURL = 'campaign';
const urls = {
  queryPlanServiceList: '/visitService/plan/queryByCondition', // 入户服务计划
  queryOtherPlanServiceList: '/visitService/plan/queryOthersPlan', // 他人入户服务计划
  createPlanService: '/visitService/plan/add', // 创建入户服务计划
  changePlanService: '/visitService/plan/modify', // 修改入户服务计划
  deletePlanService: '/visitService/plan/delete', // 删除入户服务计划
  querySuccessPlanList: '/visitService/plan/querySuccessPlan', // 请求已入户计划列表
  queryDetailById: '/visitService/plan/queryDetailById', // 根据ID查询入户计划详情
  completeAppraise: '/visitService/plan/completeAppraise', // 已评价
  completeFamily: '/visitService/plan/completeFamily', // 已完善家庭信息
  completeAppliance: '/visitService/plan/completeAppliance', // 已完善家电信息
  completeStory: '/visitService/plan/completeStory', // 已完善服务故事信息
  getCanBeIssuedRights: '/vipCode/userManager/getCanBeIssuedRights', // 查询权益卡券信息
  addStory: '/visitService/story/add', // 新增故事
  modifyStory: '/visitService/story/modify', // 修改故事
  searchStoryByPlanId: '/visitService/story/searchStoryByPlanId', // 查询单挑故事
  queryFlagsById: '/visitService/plan/queryFlagsById', // 查询完善计划状态
  appraiseStatistics: '/visitService/statistics/appraiseStatistics', // 评价统计
  analysis: '/visitService/statistics/analysis', // 数据分析
};

Object.entries(urls).forEach(([key, value]) => {
  if (toString.call(value) === '[object Function]') {
    urls[key] = function (...args) {
      return baseURL + value(...args);
    };
  } else {
    if (key === 'getCanBeIssuedRights') {
      urls[key] = value;
    } else {
      urls[key] = baseURL + value;
    }
  }
});

export default urls;
