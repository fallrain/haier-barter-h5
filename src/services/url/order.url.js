const baseURL = 'barter-manage';
const urls = {
  // 订单列表
  queryOrderFollowlList: '/orderFollow/queryOrderFollowlList',
  fuzzySearchOrderFollowList:'/orderFollow/fuzzySearchOrderFollowList',
  updateOrderFollowByType:'/orderFollow/updateOrderFollowByType'

};

Object.entries(urls).forEach(([key, value]) => {
  urls[key] = baseURL + value;
});

export default urls;
