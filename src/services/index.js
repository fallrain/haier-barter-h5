import Vue from 'vue';
// 订单
import orderService from '@/services/order';
// 代报装
import reportInstall from '@/services/reportInstall';
// 销量验证
import sales from '@/services/sales';


Vue.prototype.orderService = orderService;
Vue.prototype.reportInstallService = reportInstall;
Vue.prototype.salesService = sales;
