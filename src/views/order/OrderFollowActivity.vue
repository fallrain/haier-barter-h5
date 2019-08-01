<template>
  <div>
    <div class="activity-tab-bg">
      <div class="md-example-child md-example-child-tabs md-example-child-tab-bar-3 activity-tab">
        <md-tab-bar
          v-model="current"
          :items="items"
          :hasInk="false"
        />
      </div>
    </div>

    <div class="md-example-child md-example-child-scroll-view md-example-child-scroll-view-2">
      <md-scroll-view
        ref="scrollView"
        :scrolling-x="false"
        @refreshing="$_onRefresh"
        @end-reached="$_onEndReached"
      >
        <md-scroll-view-refresh
          slot="refresh"
          slot-scope="{ scrollTop, isRefreshActive, isRefreshing }"
          :scroll-top="scrollTop"
          :is-refreshing="isRefreshing"
          :is-refresh-active="isRefreshActive"
        ></md-scroll-view-refresh>
        <b-activity-item
          v-for="(item,index) in dataList"
          :key="index"
          :getData="item"
        ></b-activity-item>
        <md-scroll-view-more
          slot="more"
          :is-finished="isFinished"
        >
        </md-scroll-view-more>
      </md-scroll-view>
    </div>
  </div>
</template>

<script>
import {
  TabBar,
  ScrollView,
  ScrollViewRefresh,
  ScrollViewMore,
} from 'mand-mobile';

import {
  BActivityItem
} from '@/components/form';

export default {
  name: 'OrderFollowActivity',
  components: {
    [TabBar.name]: TabBar,
    [ScrollView.name]: ScrollView,
    [ScrollViewRefresh.name]: ScrollViewRefresh,
    [ScrollViewMore.name]: ScrollViewMore,
    BActivityItem,
  },
  data() {
    return {
      current: 1,
      items: [{ name: 1, label: '可参与活动' }, { name: 2, label: '不可参与活动' }],
      isFinished: false,
      dataList: [
        {
          title: '6月场景套权益昆明小微',
          brand: '海尔，卡萨帝',
          scope: '所有产品',
          data: '2019-07-30至2019-08-02',
          data2: '2019-08-30至2019-09-02',
          type: '海贝积分',
          product: [{
            name: 'KFR-35GW/A4RCA21AU1套机空调 + 50T82电视',
            gift: '7500积分',
            count: '666',
            remain: '222',
          }, {
            name: '50T82电视',
            gift: '500积分',
            count: '6',
            remain: '2',
          }
          ]
        }, {
          title: '6月场景套权益昆明小微',
          brand: '海尔，卡萨帝',
          scope: '所有产品',
          data: '2019-07-30至2019-08-02',
          data2: '2019-08-30至2019-09-02',
          type: '海贝积分',
        }
      ],
    };
  },
  mounted() {
    window.ScrollViewTrigger1 = () => {
      this.$refs.scrollView.triggerRefresh();
    };
  },
  methods: {
    $_onRefresh() {
      // async data
      setTimeout(() => {
        this.list += 5;
        this.$refs.scrollView.finishRefresh();
      }, 2000);
    },
    $_onEndReached() {
      if (this.isFinished) {
        return;
      }
      // async data
      setTimeout(() => {
        const dataListitem = {
          title: '111',
          brand: '卡萨帝',
        };
        this.dataList.push(dataListitem);
        if (this.dataList.length >= 5) {
          this.isFinished = true;
        }
        this.$refs.scrollView.finishLoadMore();
      }, 1000);
    },
  },
};
</script>

<style lang="scss">

  .md-example-child-scroll-view-2 {
    /*height: 100%;*/
    /*background: #F5F5F5;*/

    /*.scroll-view-item {*/
    /*  text-align: center;*/
    /*  font-size: 28px;*/
    /*  font-family: DINAlternate-Bold;*/
    /*  border-bottom: .5px solid #efefef;*/
    /*}*/
  }

  .activity-tab-bg {
    .md-tab-bar {
      padding-left: 24px;
      padding-right: 24px;
      margin-top: 16px;
      margin-bottom: 8px;
      background: #f5f5f5;
    }
  }

  .activity-tab {
    .md-tab-bar-item {
      padding: 0;
      margin: 0;
      width: 50%;
      font-size: 28px;
      color: #666;
      justify-content: center;
      background: #fff;

      &:first-child {
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
      }

      &:last-child {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
      }


      &.is-active {
        color: #fff;
        background: #1969C6;
        font-size: 28px;
        height: 60px;
        width: 50%;

        &:first-child {
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
        }

        &:last-child {
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }
      }
    }

    .md-tab-bar-item {
      min-height: 0;
    }
  }
</style>
