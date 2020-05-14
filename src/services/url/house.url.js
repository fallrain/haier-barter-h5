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
  appraiseAdd: '/visitService/appraise/add', // 邀请评价
  sendWeiXinMsg: '/visitService/evaluation/sendWeiXinMsg', // 发送模板消息邀请评价
  queryHistoryPlan: '/visitService/plan/queryHistoryPlan',// 查询历史入户服务接口
  queryByCondition: '/visitService/story/queryByCondition',// 查询入户服务故事列表
  // shareToList: '/visitService/story/shareToList',// 分享入户服务故事到列表
  shareToList(storeId) {
    // 查询家电上传的产品图片(添加入户故事用)
    return `/visitService/story/shareToList/${storeId}`; // 查询家电图片
  },
  
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
