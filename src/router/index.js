import Vue from 'vue';
import store from '@/store';
import Router from 'vue-router';
import routerData from '@/router/routerData';
import {
  axPost
} from '@/lib/ajax';

Vue.use(Router);
const router = new Router({
  mode: 'history',
  base: process.env.routerBase,
  routes: routerData.data,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition && !to.meta.scrollTop) {
      return savedPosition;
    }
    return {
      x: 0,
      y: 0
    };
  }
});
router.beforeEach((to, from, next) => {
  //
  if (to.name === 'SuggestionList' && from.name === 'SuggestionForm') {
    store.commit('addAliveExclude', 'SuggestionList');
  } else {
    store.commit('delAliveExclude', 'SuggestionList');
  }
  next();
});
router.afterEach(() => {
  Vue.prototype.basicService.jsSign(window.location.href).then(({ code, data }) => {
    if (code === 1) {
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        ...data,
        jsApiList: [
          'scanQRCode',
          'miniProgram.switchTab',
          'miniProgram.navigateTo',
          'switchTab',
          'navigateTo'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
    }
  });
});
export default router;
