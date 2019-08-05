<!-- message.wxml -->
<template>
  <div class="reportInstallList-container">
    <md-tab-bar
      class="common-fix-tabs"
      v-model="curTab"
      :items="tabs"
      :hasInk="false"
    ></md-tab-bar>
    <md-scroll-view
      v-show="curScrollViewName==='scrollView'"
      class="reportInstallList-view mt24"
      ref="scrollView"
      :scrolling-x="false"
      @refreshing="onRefresh"
      @end-reached="onEndReached"
      :end-reached-threshold="100"
      :immediate-check-end-reaching="scrollView.autoCheck"
      :auto-reflow="true"
    >
      <b-report-install-item
        v-for="(orderItem,orderIndex) in list['scrollView']"
        :key="orderIndex"
        :orderItem="orderItem"
        @click.native="jump(orderItem,orderIndex)"
      ></b-report-install-item>
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
    <md-scroll-view
      v-show="curScrollViewName==='scrollViewFinished'"
      class="reportInstallList-view mt24"
      ref="scrollView"
      :scrolling-x="false"
      @refreshing="onRefresh"
      @end-reached="onEndReached"
      :end-reached-threshold="100"
      :immediate-check-end-reaching="scrollViewFinished.autoCheck"
      :auto-reflow="true"
    >
      <b-report-install-item
        v-for="(orderItem,orderIndex) in list['scrollViewFinished']"
        :key="orderIndex"
        :orderItem="orderItem"
        @click.native="jump(orderItem,orderIndex)"
      ></b-report-install-item>
      <md-scroll-view-refresh
        slot="refresh"
        slot-scope="{ scrollTop, isRefreshActive, isRefreshing }"
        :scroll-top="scrollTop"
        :is-refreshing="isRefreshing"
        :is-refresh-active="isRefreshActive"
      ></md-scroll-view-refresh>
      <md-scroll-view-more
        slot="more"
        :is-finished="scrollViewFinished.isFinished"
      >
      </md-scroll-view-more>
    </md-scroll-view>
    <md-scroll-view
      v-show="curScrollViewName==='scrollViewOdd'"
      class="reportInstallList-view mt24"
      ref="scrollView"
      :scrolling-x="false"
      @refreshing="onRefresh"
      @end-reached="onEndReached"
      :end-reached-threshold="100"
      :immediate-check-end-reaching="scrollViewOdd.autoCheck"
      :auto-reflow="true"
    >
      <b-report-install-item
        v-for="(orderItem,orderIndex) in list['scrollViewOdd']"
        :key="orderIndex"
        :orderItem="orderItem"
        @click.native="jump(orderItem,orderIndex)"
      ></b-report-install-item>
      <md-scroll-view-refresh
        slot="refresh"
        slot-scope="{ scrollTop, isRefreshActive, isRefreshing }"
        :scroll-top="scrollTop"
        :is-refreshing="isRefreshing"
        :is-refresh-active="isRefreshActive"
      ></md-scroll-view-refresh>
      <md-scroll-view-more
        slot="more"
        :is-finished="scrollViewOdd.isFinished"
      >
      </md-scroll-view-more>
    </md-scroll-view>
  </div>
</template>
<script>
import {
  ScrollView,
  ScrollViewMore,
  ScrollViewRefresh,
  TabBar
} from 'mand-mobile';
import {
  BReportInstallItem
} from '@/components/business';

export default {
  name: 'ReportInstallList',
  components: {
    BReportInstallItem,
    'md-scroll-view': ScrollView,
    'md-scroll-view-refresh': ScrollViewRefresh,
    'md-scroll-view-more': ScrollViewMore,
    'md-tab-bar': TabBar
  },
  data() {
    return {
      // 当前选中tab
      curTab: 0,
      // tabs
      tabs: [
        {
          name: 0,
          label: '待报装'
        },
        {
          name: 1,
          label: '已报装'
        },
        {
          name: 2,
          label: '报装异常'
        }
      ],
      scrollView: {
        isFinished: false,
        // 自动检测触发到底部
        autoCheck: true,
        pageNum: 1,
        pageSize: 10
      },
      // 已包装
      scrollViewFinished: {
        isFinished: false,
        autoCheck: false,
        pageNum: 1,
        pageSize: 10
      },
      // 异常
      scrollViewOdd: {
        isFinished: false,
        autoCheck: false,
        pageNum: 1,
        pageSize: 10
      },
      list: {
        scrollView: [],
        scrollViewFinished: [],
        scrollViewOdd: []
      }
    };
  },
  computed: {
    curScrollViewName() {
      // 当前tab下的scrollView的ref名字
      return {
        0: 'scrollView',
        1: 'scrollViewFinished',
        2: 'scrollViewOdd'
      }[this.curTab];
    }
  },
  watch: {
    curTab(val) {
      const obj = {
        0: 'scrollView',
        1: 'scrollViewFinished',
        2: 'scrollViewOdd'
      };
      Object.values(obj).forEach((v) => {
        this[v].autoCheck = false;
      });
      this[obj[val]].autoCheck = true;
    }
  },
  methods: {
    search(isInit) {
      const formData = {
        pageNum: this.scrollView.pageNum,
        pageSize: this.scrollView.pageSize,
        hmcId: 'a0008949',
        type: this.curTab
      };
      return this.reportInstallService.queryReportInstallList(formData).then((res) => {
        if (res.code === 1) {
          const {
            result: data
          } = res.data;
          if (data && data.length > 0) {
            const curList = data.map(item => ({
              ...item,
              domainName: 'Haier',
              orderTime: item.requireServiceDate ? item.requireServiceDate.substring(0, 16) : ''
            }));
            if (isInit) {
              this.list[this.curScrollViewName] = curList;
            } else {
              this.list[this.curScrollViewName] = this.list[this.curScrollViewName].concat(curList);
            }
          }
        }
        return {
          isFinished: true
        };
      });
    },
    onEndReached() {
      /* 加载更多 */
      this.scrollViewOnEndReached(this.search, this.curScrollViewName);
    },
    onRefresh() {
      /* 下拉刷新 */
      this.scrollViewOnRefresh(this.search, this.curScrollViewName);
    },
    jump(orderItem, orderIndex) {
      /* 跳转报装详情 */
      const argsObj = {
        userId: undefined,
        userName: orderItem.customerName,
        mobile: orderItem.phoneNumber,
        orderNo: orderItem.orderNo,
        workFlowId: orderItem.orderId,
        parentPage: 'list', // 从何处跳过去的，此处代表列表
        flowStatus: this.curTab, // 判断待报装、非待报装
        itemIndex: orderIndex
      };
      this.$router.push({
        name: 'ReportInstall.ReportInstallDetail',
        query: {
          ...argsObj
        }
      });
    },
  }
};
</script>
<style lang="scss">
  .reportInstallList-container {
    padding: 24px;
  }

  .reportInstallList-view {
    height: calc(100vh - 60px);
  }

  .reportInstallList-orderItem-card {
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 16px;
    padding: 24px 0 24px 24px;
    background: #fff;
    margin-bottom: 16px;
  }

  .reportInstallList-orderItem-card-portrait {
    width: 160px;
    height: 160px;
    margin-right: 24px;
  }

  .reportInstallList-orderItem-cnt-item {
    margin-top: 14px;
  }

  .reportInstallList-orderItem-cnt-item .iconfont {
    color: #1969c6;
    margin-right: 16px;
  }

  .reportInstallList-orderItem-cnt-item:first-child {
    margin-top: 0;
  }

  .reportInstallList-orderItem-cnt-item.name {
    color: #333;
    font-size: 32px;
    line-height: 40px;
  }

  .reportInstallList-orderItem-cnt-item.tel {
    color: #666;
    font-size: 32px;
    line-height: 32px;
  }

  .reportInstallList-orderItem-cnt-item.time {
    color: #999;
    font-size: 26px;
    line-height: 28px;
  }

  .reportInstallList-orderItem-card-mark {
    position: absolute;
    top: 30px;
    right: 0;
    width: 192px;
    height: 48px;
    background: #4a90e2;
    border-radius: 24px 0px 0px 24px;
    padding-left: 20px;
    text-align: center;
    font-size: 28px;
    line-height: 48px;
    color: #fff;
  }

  .reportInstallList-orderItem-card-mark-0 {
    background: #4a90e2;
  }

  .reportInstallList-orderItem-card-mark-1 {
    background: #4a90e2;
  }

  .reportInstallList-orderItem-card-mark-2 {
    background: #f5a623;
  }

  .reportInstallList-orderItem-card-mark-3 {
    background: #29ab91;
  }

</style>
