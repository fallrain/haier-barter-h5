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
  if (to.name === 'SuggestionList' && from.name === 'SuggestionForm') {
    store.commit('addAliveExclude', 'SuggestionList');
  } else {
    store.commit('delAliveExclude', 'SuggestionList');
  }
  const timestamp = `${new Date().getTime()}`.substr(0, 10);
  axPost(
    '/test/vipWeChat/jsSdk/getJsSign',
    {
      appId: 'wx2409ae17ef4a9f34',
      noncestr: timestamp,
      timestamp,
      url: window.location.href
    }
  ).then((response) => {
    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: 'wx2409ae17ef4a9f34', // "wx1514378cc449f87d", // 必填，公众号的唯一标识
      timestamp, // 必填，生成签名的时间戳
      nonceStr: timestamp, // 必填，生成签名的随机串
      signature: response.data.jsSignature, // 必填，签名，见附录1
      jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
  });
  next();
});
export default router;
