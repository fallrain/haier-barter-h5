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
  const timestamp = new Date().getTime();
  axPost(
    '/test/vipWeChat/jsSdk/getJsSign',
    {
      appId: 'wx2409ae17ef4a9f34',
      noncestr: timestamp,
      timestamp,
      url: window.location.href
    }
  ).then();
  next();
});
export default router;
