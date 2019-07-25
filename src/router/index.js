import Vue from 'vue';
import store from '@/store';
import Router from 'vue-router';
import routerData from '@/router/routerData';

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

  next();
});
export default router;
