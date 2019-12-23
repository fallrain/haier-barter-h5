import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import '@/lib/veeValidate';
import {
  Toast
} from 'mand-mobile';
import directives from './directive';
import mixin from './mixin';
import bUtil from '@/lib/util/util';
import '@/services';
import {
  axPost, axGet, axPostJson
} from './lib/ajax';
import BValidate from '@/lib/bValidate/BValidate';
import 'mescroll.js/mescroll.min.css';

// import Vconsole from 'vconsole';
// let vConsole = new Vconsole();

Vue.config.productionTip = false;
Vue.prototype.bUtil = bUtil;
Vue.prototype.axPost = axPost;
Vue.prototype.axPostJson = axPostJson;
Vue.prototype.axGet = axGet;
Vue.prototype.$toast = Toast;
Vue.prototype.BValidate = BValidate;


Object.keys(directives).forEach((name) => {
  Vue.directive(name, directives[name]);
});

// 全局混入
Vue.mixin(mixin);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

bUtil.getUserInfo();
