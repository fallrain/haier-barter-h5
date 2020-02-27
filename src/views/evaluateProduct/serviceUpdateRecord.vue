<template>
  <div class="container">
    <div class="reportInstallList-tab">
      <md-tab-bar v-model="curTab" :items="tabs" :hasInk="false"></md-tab-bar>
      <div class="count-class">共10人</div>
    </div>

    <div class="" v-show="curTab===1">
      <b-evaluate-member-item
      :userList="userList"
      ></b-evaluate-member-item>
    </div>
    <div class="" v-show="curTab===2">
      已联系
    </div>
    <div class="" v-show="curTab===3">
      未联系
    </div>
  </div>
</template>

<script>
import BEvaluateMemberItem from '@/components/business/evaluateProduct/BEvaluateMemberItem';
import {
  TabBar
} from 'mand-mobile';

export default {
  name: 'serviceUpdateRecord',
  components: {
    'md-tab-bar': TabBar,
    BEvaluateMemberItem
  },
  data() {
    return {
      // 当前选中tab
      curTab: 1,
      // tabs
      tabs: [
        {
          name: 1,
          label: '全部'
        },
        {
          name: 2,
          label: '已联系'
        },
        {
          name: 3,
          label: '未联系'
        }
      ],
      userList: [1, 2, 3, 4, 5, 6]
    };
  },
  methods: {
    barCodeClick(item) {
      /* 查看记录click */
      this.$router.push({
        name: 'EvaluateProductHistoryList.evaluateProductDetail',
        params: { isShow: true }
      });
    },
  }
};
</script>

<style lang="scss">
.reportInstallList-tab {
  display: flex;
  flex-direction: row;
  background-color: white;
  align-items: center;
  margin-bottom: 20px;

  .md-tab-bar {
    flex-grow: 1;
    background-color: #fff;
    border-bottom: 2px solid #eee;
  }
  .count-class {
    width: 100px;
    font-size: 24px;
  }
}
</style>
