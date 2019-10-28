const baseURL = 'activity';
const urls = {
  // 营销活动之引流活动
  queryActivityInfoListForHmc: '/activityInfo/queryActivityInfoListForHmc',

};

Object.entries(urls).forEach(([key, value]) => {
  urls[key] = baseURL + value;
});

export default urls;
