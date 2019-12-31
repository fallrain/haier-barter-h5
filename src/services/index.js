import Vue from 'vue';
// base
import baseService from '@/services/base';
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
// 活动
import campaignService from '@/services/campaign';
// 活动
import activity from '@/services/activity';
// 一站筑家
import haierhouseService from '@/services/haierhouse';

Vue.prototype.basicService = basicService;
Vue.prototype.baseService = baseService;
Vue.prototype.orderService = orderService;
Vue.prototype.reportInstallService = reportInstall;
Vue.prototype.salesService = sales;
Vue.prototype.productService = product;
Vue.prototype.rightsService = rights;
Vue.prototype.campaignService = campaignService;
Vue.prototype.activityService = activity;
Vue.prototype.haierhouseService = haierhouseService;
