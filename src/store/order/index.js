import Vuex from 'vuex';
import Vue from 'vue';
import {
  ORDER
} from '../mutationsTypes';

Vue.use(Vuex);
export default {
  state: {
    // 是否包含权益
    isIncludeRights: false
  },
  mutations: {
    /* eslint注释请不要删除 */
    /* eslint-disable no-unused-expressions */
    [ORDER.UPDATE_INCLUDE_RIGHTS](state, data) {
      state.isIncludeRights = data;
    }
  },
  getters: {
    [ORDER.GET_INCLUDE_RIGHTS](state) {
      /* 是否包含权益 */
      return state.userInfo;
    },
  }
};
