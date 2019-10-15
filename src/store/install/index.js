import Vuex from 'vuex';
import Vue from 'vue';
import mutationType from '../mutationsTypes';

Vue.use(Vuex);
export default {
  state: {
    // userInfo为模拟的用户信息
    newAddress: {
    }
  },
  mutations: {
    /* eslint注释请不要删除 */
    /* eslint-disable no-unused-expressions */
    updataNewAddress(state, data) {
      state.newAddress = data;
    }
  },
  actions: {
  },
  getters: {
    getNewAddress(state) {
      return state.newAddress;
    },
  }
};
