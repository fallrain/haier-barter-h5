export default {
  orderDeleteStatus(val) {
    /* 待删除的订单列表状态 */
    return {
      0: '待审核',
      1: '审核通过',
      2: '审核驳回',
      3: '人工处理'
    }[val] || '';
  }
};
