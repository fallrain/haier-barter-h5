import Vue from 'vue';
// 订单
import orderService from '@/services/order';
// 代报装
import reportInstall from '@/services/reportInstall';


Vue.prototype.orderService = orderService;
Vue.prototype.reportInstallService = reportInstall;
