<template>
  <div>
    <b-search-input
      v-model="searchVal"
      @search="searchByCondition"
      placeholder="请输入姓名、电话、地址进行搜索"
    ></b-search-input>
    <b-order-follow-search-bar
      :sortArray="orderSortList"
      :sortType.sync="sortType"
      :isShowScenario="false"
    ></b-order-follow-search-bar>
    <div
      id="scrollView"
      ref="scrollView"
      class="mescroll evaluateProductList-scrollView"
    >
      <b-evaluate-product-list
        :list="list"
      ></b-evaluate-product-list>
    </div>
  </div>
</template>

<script>
import BSearchInput from '@/components/business/BSearchInput';
import BOrderFollowSearchBar from '@/components/orderFollow/BOrderFollowSearchBar';
import {
  BEvaluateProductList
} from '@/components/business/evaluateProduct';

export default {
  name: 'evaluateProductList',
  components: {
    BEvaluateProductList,
    BOrderFollowSearchBar,
    BSearchInput
  },
  data() {
    return {
      // 排序方式
      orderSortList: [
        {
          id: '1',
          name: '按名字降序'
        },
        {
          id: '2',
          name: '按照时间降序'
        }
      ],
      // 排序方式
      sortType: '',
      // 搜索关键词
      searchVal: '',
      // 估价历史
      list: [
        {}, {}, {}, {}, {}
      ]
    };
  },
  methods: {
    searchByCondition() {
      /* 搜索订单 */
    }
  }
};
</script>

<style lang="scss">
  .evaluateProductList-scrollView {
    height: calc(100vh - 164px);
  }
</style>
