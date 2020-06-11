import {
  HOUSE_SERVICE
} from '../mutationsTypes';

export default {
  state: {
    // 随行参与人
    participants: {
      accompanyingId: '',
      accompanyingName: ''
    }
  },
  mutations: {
    /* eslint注释请不要删除 */
    /* eslint-disable no-unused-expressions */
    [HOUSE_SERVICE.UPDATE_PARTICIPANT](state, data) {
      /* 更改随行人数据 */
      state.participants = data;
    }
  },
  getters: {
    [HOUSE_SERVICE.GET_PARTICIPANT](state) {
      /* 是否包含权益 */
      return state.participants;
    },
  }
};
