import Vue from 'vue';
// basic
import basicService from '@/services/basic';
// 订单
import orderService from '@/services/order';
// 代报装
import reportInstall from '@/services/reportInstall';
// 销量验证
import sales from '@/services/sales';
// 产品搜索
import product from '@/services/product';
// 权益
import rights from '@/services/rights';

Vue.prototype.basicService = basicService;
Vue.prototype.orderService = orderService;
Vue.prototype.reportInstallService = reportInstall;
Vue.prototype.salesService = sales;
Vue.prototype.productService = product;
Vue.prototype.rightsService = rights;
