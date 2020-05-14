import urls from '../url/basic.url';
import {
  axGet, axPostJson
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
    /* 查询产品型号 */
    return axGet(urls.scanQRcode, { url });
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
  uploadByMediaId(data, param) {
    /* 同步前端微信上传的文件 */
    return axPostJson(urls.uploadByMediaId, data, param);
  }
};
