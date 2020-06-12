import urls from '../url/basic.url';
import {
  axGet,
  axPost,
  axPostJson
} from '@/lib/ajax';


export default {
  jsSign(url) {
    /* 微信权限 */
    return axGet(urls.jsSign, { url, noLoading: true, requestNoToast: false, noToken: true, });
  },
  userInfo() {
    /* 微信权限 */
    return axGet(urls.userInfo);
  },
  scanQRcode(url) {
    /* 查询产品型号  */
    return axGet(urls.scanQRcode, { url });
  },
  authorizedUrl(data) {
    /* 构建微信授权URL给前端 */
    return axPost(urls.authorizedUrl, data, { noToken: true, });
  },
  sendSms(data) {
    /* 发送短信验证码给客户 */
    return axPost(urls.sendSms, data, { noToken: true, });
  },
  queryIndustry() {
    /* 查询产业组 */
    return axGet(urls.queryIndustry, { noToken: true, });
  },
  industryList() {
    /* 查询全部产业 */
    return axGet(urls.industryList, { noToken: true, });
  },
  getBuyIntention() {
    /* 查询购买意愿 */
    return axGet(urls.buyIntention);
  },
  uploadByMediaId(data, param) {
    /* 同步前端微信上传的文件 */
    return axPostJson(urls.uploadByMediaId, data, param);
  },
  activityType() {
    /* 查询活动类型 */
    return axGet(urls.dictionary('ACTIVITY_TYPE'));
  },
  dictionary(type) {
    /* 查询活动类型 */
    return axGet(urls.dictionary(type));
  },
  queryCustomerList(data, param) {
    /* 查询直销员可选择入户服务人员列表 */
    return axPostJson(urls.queryCustomerList, data, param);
  },
  queryAccompanier(param) {
    /* 搜索随行参与人 */
    return axGet(urls.queryAccompanier, param);
  },
  queryAddress(customerId) {
    /* 查询入户服务人员地址列表 */
    return axGet(urls.queryAddress(customerId));
  },
  createFamilyId(data, param) {
    /* 创建顾客信息及地址信息 */
    return axPostJson(urls.createFamilyId, data, param);
  },
  queryFamilyInfo(customerFamilyId) {
    /* 查询入户服务人员地址列表 */
    return axGet(urls.queryFamilyInfo(customerFamilyId));
  },
  updataFamilyInfo(data, param) {
    /* 修改顾客的住宅信息、家庭成员 */
    return axPostJson(urls.updataFamilyInfo, data, param);
  },
  deleteHouseHold(customerFamilyAppliancesId) {
    /* 删除家电信息 */
    return axGet(urls.deleteHouseHold(customerFamilyAppliancesId));
  },
  saveHouseHold(data, param) {
    /* 保存家电信息 */
    return axPostJson(urls.saveHouseHold, data, param);
  },
  queryProductGroupList() { // 查询产品组信息
    return axGet(urls.queryProductGroupList);
  },
  queryHoseHoldPictures(customerFamilyAppliancesId) {
    /* 查询家电图片 */
    return axGet(urls.queryHoseHoldPictures(customerFamilyAppliancesId));
  },
  queryHoseHoldPicturesForStory(customerId) {
    /* 查询家电图片 (添加入户故事用) */
    return axGet(urls.queryHoseHoldPicturesForStory(customerId));
  },
  sellerRemind(data, param) {
    /* 提交提醒 */
    return axPostJson(urls.sellerRemind, data, param);
  },
  microList(data) {
    /* 查询小微 */
    return axGet(urls.microList, data);
  },
  sceneTypeList() {
    /* 查询认筹活动列表 */
    return axGet(urls.dictionary('REMIND_BUSINESS_SCENARIOS'));
  },
  virtualGiftType() {
    /* 虚拟礼品 */
    return axGet(urls.dictionary('virtual_gift_type'));
  },
  industryGroup() {
    /* 查询全部产品组 */
    return axGet(urls.industryGroup);
  },
};
