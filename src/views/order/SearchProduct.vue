<template>
  <div>
    <b-notice-bar
      :show.sync="noticeShow"
      content="温馨提示：点击下方的【扫描】，可扫产品能效贴自动带入产品型号。"
    >
    </b-notice-bar>
    <b-search-input
      v-model="searchVal"
      @search="search"
    ></b-search-input>
  </div>
</template>

<script>
import {
  BNoticeBar
} from '@/components/form';

import {
  BSearchInput
} from '@/components/business';

export default {
  name: 'SearchProduct',
  components: {
    BNoticeBar,
    BSearchInput
  },
  data() {
    return {
      // 通知栏显示隐藏
      noticeShow: true,
      // search value
      searchVal: ''
    };
  },
  methods: {
    search(val) {
      /* 搜索产品 */
      console.log(val);
    }
  }
};
</script>

<style lang="scss">
  .searchProduct-notice-bar-title {
    color: #E89748;
  }
</style>
