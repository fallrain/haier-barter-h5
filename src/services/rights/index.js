import urls from '../url/rights.url';
import {
  axPostJson, axPost, axGet, axGetUrl,
} from '@/lib/ajax';

export default {
  list(keyWords, pageNo, pageSize) {
    /* 查询订单列表 */
    return axGet(urls.list(keyWords, pageNo, pageSize));
  },
  queryOrderOptionalRights(data, param) {
    return axPostJson(urls.queryOrderOptionalRights, data, param);

  },
  queryOrderNotOptionalRights(data,param){
    return axPostJson(urls.queryOrderNotOptionalRights,data,param)
  },
  checkedOrderRights(data,param) {
    return axPostJson(urls.checkedOrderRights,data,param)
  },
  uncheckedOrderRights(data,param) {
    return axPostJson(urls.uncheckedOrderRights,data,param)
  },
  queryRightsResidue(){
    return axGet(urls.queryRightsResidue)
  }



};