const baseURL = 'manage';
const urls = {
  // 订单列表
  queryOrderFollowlList: '/orderFollow/queryOrderFollowList', // 订单跟进列表
  fuzzySearchOrderFollowList: '/orderFollow/fuzzySearchOrderFollowList', // 模糊搜索列表
  updateOrderFollowByType: '/orderFollow/updateOrderFollowByType', // 修改状态
  generateOrderNo: '/orderManage/generateOrderNo', // 生成订单编号
  queryOrderInfoByOrderNo: '/orderManage/queryOrderInfoByOrderNo', // 根据订单编号获取订单信息和订单产品信息
  queryOrderInvoiceByOrderNo: '/orderManage/queryOrderInvoiceByOrderNo', // 根据订单编号获取订单凭证
  createOrder: '/orderManage/createOrder', // 新建或修改存草稿订单
  createOrderSubmit: '/orderManage/createOrderSubmit', // 新建订单提交
  supplementOrderSubmit: 'orderManage/supplementOrderSubmit', // 补录订单提交
  createNewOrder: '/orderManage/createNewOrderFollow', // 录新订单,生成一条新的待办
  queryOverTwentyFourHourOrder: '/orderFollow/queryOverTwentyFourHourOrder', // 超过二十四小时订单
  generateOrderDetailId: '/orderManage/generateOrderDetailId', // 生成订单明细主键ID
  uploadInvoice: '/orderManage/hmcUploadInvoice', // 上传发票
  queryOrderDetailAndInvoice: '/orderManage/queryOrderDetailAndInvoice', // 根据订单ID查询发票信息
  checkInvoice: '/orderManage/checkInvoice', // 校验发票
  simpleUpload: '/file/simpleUpload',// 上传图片
  isReportInstallNew:'/reportInstall/isReportInstallNew',//查询产品是否需要代包装
  checkUpperLimitForSGLD:'/orderManage/checkUpperLimitForSGLD'//手工录单限制

};

Object.entries(urls).forEach(([key, value]) => {
  if (value === '/file/simpleUpload') {
    urls[key] = value;
  } else {
    urls[key] = baseURL + value;
  }
});

export default urls;
