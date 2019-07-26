const baseURL = 'barter-manage';
const urls = {
  // 订单列表
  queryOrderFollowlList: '/orderFollow/queryOrderFollowlList',
};

Object.entries(urls).forEach(([key, value]) => {
  urls[key] = baseURL + value;
});

export default urls;
