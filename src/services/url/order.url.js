const baseURL = 'barter-manage';
const urls = {
  // 订单列表
  queryOrderFollowlList: '/orderFollow/queryOrderFollowlList',//订单跟进列表
  fuzzySearchOrderFollowList: '/orderFollow/fuzzySearchOrderFollowList',//模糊搜索列表
  updateOrderFollowByType: '/orderFollow/updateOrderFollowByType',//修改状态
  generateOrderNo:'/orderManage/generateOrderNo',//生成订单编号
  queryOrderInfoByOrderNo:'/orderManage/queryOrderInfoByOrderNo',//根据订单编号获取订单信息和订单产品信息
  queryOrderInvoiceByOrderNo:'/orderManage/queryOrderInvoiceByOrderNo',//根据订单编号获取订单凭证
  createOrder:'/orderManage/createOrder',//新建或修改存草稿订单
  createOrderSubmit:'e/orderManage/createOrderSubmit',//新建订单提交
  supplementOrderSubmit:'orderManage/supplementOrderSubmit',//补录订单提交
  createNewOrder:'/orderManage/createNewOrder',//录新订单,生成一条新的待办
};

Object.entries(urls).forEach(([key, value]) => {
  urls[key] = baseURL + value;
});

export default urls;