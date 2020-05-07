const baseURL = 'basic';
const urls = {
  // 微信权限
  jsSign: '/common/weixin/jssign',
  userInfo: '/user/info',
  scanQRcode: '/product/scan-qrcode',
  // 构建微信授权URL给前端
  authorizedUrl: '/customer/oauth2/authorizedUrl',
  // 发送短信验证码给客户
  sendSms: '/customer/oauth2/send/sms',
  queryIndustry: '/common/industry/list',
  // 查询产品组
  industryList: '/common/industry/list',
  // 购买意愿
  buyIntention: '/common/dictionary/list/BUYINTENTION',
  uploadByMediaId: '/common/uploadByMediaId', // 同步前端微信上传的文件
  // 数据字典
  dictionary(type) {
    return `/common/dictionary/list/${type}`;
  },
  queryCustomerList: '/customer/queryCustomerList', // 查询直销员可选择入户服务人员列表 客户台账
  queryAccompanier: '/user/accompanyingUser', // 搜索随行参与人
  queryAddress(customerId) {
    return `/customer/address/list/${customerId}`; // 查询入户服务人员地址列表
  },
  createFamilyId: '/customer/create', // 创建顾客信息及地址信息
  queryFamilyInfo(customerFamilyId) {
    return `/customer/household/address/appliances/${customerFamilyId}`; // 查询顾客的住宅信息、家庭成员、家电信息
  },
  updataFamilyInfo: '/customer/household/address/update', // 修改顾客的住宅信息、家庭成员
  deleteHouseHold(customerFamilyAppliancesId) {
    return `/customer/appliances/delete/${customerFamilyAppliancesId}`; // 删除家电信息
  },
  saveHouseHold: '/customer/appliances/save', // 保存家电信息
  queryProductGroupList: '/common/product_group/list', // 查询所以产品类别
  queryHoseHoldPictures(customerFamilyAppliancesId) {
    // 查询家电上传的产品图片
    return `/customer/appliances/picture/query/${customerFamilyAppliancesId}`; // 查询顾客的住宅信息、家庭成员、家电信息
  },
  sellerRemind: '/seller/remind', // 新增提醒
};

Object.entries(urls).forEach(([key, value]) => {
  if (toString.call(value) === '[object Function]') {
    urls[key] = function (...args) {
      return baseURL + value(...args);
    };
  } else {
    urls[key] = baseURL + value;
  }
});

export default urls;
