<template>
  <div>
    <b-search-input
      v-model="searchVal"
      @search="search"
      placeholder="搜索用户姓名、电话或产品"
    >
      <div class="salesVerification-search-right">
        <b-month-pop
          @choosed="confirmDate"
        ></b-month-pop>
        <i class="iconfont icon-wenhao"></i>
      </div>
    </b-search-input>
    <md-tab-bar
      class="salesVerification-tabs"
      v-model="curTab"
      :items="tabs"
      :hasInk="false"
    ></md-tab-bar>
    <md-scroll-view
      class="salesVerification-view"
      ref="scrollView"
      :scrolling-x="false"
      @refreshing="onRefresh"
      @end-reached="onEndReached"
      :end-reached-threshold="100"
      :immediate-check-end-reaching="true"
      :auto-reflow="true"
    >
      <div class="salesVerification-list">
        <b-scale-item
          v-for="(item,index) in list"
          :key="index"
          :data="item"
          :index="index"
          @barCodeDeclare="barCodeDeclare"
          @showDetail="showDetail"
          v-show="choosedIndex===false || (choosedIndex!==false && index===choosedIndex)"
        ></b-scale-item>
      </div>
      <md-scroll-view-refresh
        slot="refresh"
        slot-scope="{ scrollTop, isRefreshActive, isRefreshing }"
        :scroll-top="scrollTop"
        :is-refreshing="isRefreshing"
        :is-refresh-active="isRefreshActive"
      ></md-scroll-view-refresh>
      <md-scroll-view-more
        slot="more"
        :is-finished="scrollView.isFinished"
      >
      </md-scroll-view-more>
    </md-scroll-view>
  </div>
</template>

<script>
import {
  BScaleItem,
  BSearchInput
} from '@/components/business';

import {
  BMonthPop
} from '@/components/form';

import {
  ScrollView,
  ScrollViewMore,
  ScrollViewRefresh,
  TabBar
} from 'mand-mobile';

export default {
  name: 'SalesVerification',
  components: {
    'md-tab-bar': TabBar,
    'md-scroll-view': ScrollView,
    'md-scroll-view-refresh': ScrollViewRefresh,
    'md-scroll-view-more': ScrollViewMore,
    BMonthPop,
    BScaleItem,
    BSearchInput
  },
  data() {
    return {
      // 搜索值
      searchVal: '',
      // 当前激活的tab
      curTab: 1,
      // tabs
      tabs: [
        {
          name: 1,
          label: '待申报'
        },
        {
          name: 2,
          label: '待验证'
        },
        {
          name: 3,
          label: '异常'
        },
        {
          name: 4,
          label: '验证失败'
        },
        {
          name: 5,
          label: '验证成功'
        }
      ],
      // 销量列表
      list: [
        {
          name: '热水器',
          type: 'CEH-80V物联网',
          count: 12,
          detail: [
            {
              buyName: '张子强',
              time: '2019-06-03',
              orderName: '王强'
            },
            {
              buyName: '张子强',
              time: '2019-06-03',
              orderName: '王强'
            },
            {
              buyName: '张子强',
              time: '2019-06-03',
              orderName: '王强'
            },
            {
              buyName: '张子强',
              time: '2019-06-03',
              orderName: '王强'
            },
            {
              buyName: '张子强',
              time: '2019-06-03',
              orderName: '王强'
            },
            {
              buyName: '张子强',
              time: '2019-06-03',
              orderName: '王强'
            },
            {
              buyName: '张子强',
              time: '2019-06-03',
              orderName: '王强'
            },
            {
              buyName: '张子强',
              time: '2019-06-03',
              orderName: '王强'
            },
            {
              buyName: '张子强',
              time: '2019-06-03',
              orderName: '王强'
            },
            {
              buyName: '张子强',
              time: '2019-06-03',
              orderName: '王强'
            },
            {
              buyName: '张子强',
              time: '2019-06-03',
              orderName: '王强'
            },
            {
              buyName: '张子强',
              time: '2019-06-03',
              orderName: '王强'
            }
          ]
        }
      ],
      // 被查看详情的item的index
      choosedIndex: false
    };
  },
  methods: {
    confirmDate(dates) {
      /* 确认时间 */
    },
    search() {
      /* 搜索 */
      return new Promise((resolve) => {
        setTimeout(() => {
          for (let i = 0; i < 20; i++) {
            this.list.push({
              name: '热水器',
              type: 'CEH-80V物联网',
              count: 12,
              detail: [
                {
                  buyName: '张子强',
                  time: '2019-06-03',
                  orderName: '王强'
                },
                {
                  buyName: '张子强',
                  time: '2019-06-03',
                  orderName: '王强'
                },
                {
                  buyName: '张子强',
                  time: '2019-06-03',
                  orderName: '王强'
                }
              ]
            });
          }
          // todo 模拟
          this.todoNum || (this.todoNum = 1);
          resolve({
            isFinished: this.todoNum++ > 1
          });
        }, 1500);
      });
    },
    onEndReached() {
      /* 下载更多 */
      if (this.choosedIndex !== false) {
        this.$refs.scrollView.finishRefresh();
        this.$refs.scrollView.finishLoadMore();
        return;
      }
      this.scrollViewOnEndReached(this.search);
    },
    onRefresh() {
      if (this.choosedIndex !== false) {
        this.$refs.scrollView.finishRefresh();
        this.$refs.scrollView.finishLoadMore();
        return;
      }
      this.scrollViewOnRefresh(this.search);
    },
    barCodeDeclare() {
      /* 销量申报 */
    },
    showDetail({ isShowDetail, index }) {
      /* 显示详情后隐藏其他 */
      if (isShowDetail) {
        this.choosedIndex = index;
      } else {
        this.choosedIndex = false;
      }
    }
  }
};
</script>

<style lang="scss">
  .salesVerification-search-right {
    display: flex;
    align-items: center;
    width: 180px;

    .icon-wenhao {
      color: #CCC;
      font-size: 40px;
      margin-left: 16px;
    }
  }

  .salesVerification-list {
    background: #fff;
    padding-left: 24px;
    border-top: 1px solid #eee;
  }

  .salesVerification-view {
    height: calc(100vh - 170px);
  }

  .salesVerification-tabs {
    height: 72px;
    background: #fff;

    .md-tab-bar-item {
      height: 72px;
      min-height: 72px;
    }
  }
</style>
