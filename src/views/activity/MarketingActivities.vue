<template>
  <div class="h100vh">
    <b-search-input
      v-model="searchVal"
      @search="searchByCondition"
      placeholder="输入产品型号进行搜索"
    >
    </b-search-input>
    <div class="activity-tab-bg activity-tab">
      <md-tab-bar
        v-model="current"
        :items="items"
        :hasInk="false"
      />
    </div>
    <div
      class="reportInstallList-view"
      v-show="curScrollViewName==='scrollViewRightsActivity'">
      <div
        id="scrollViewRightsActivity"
        ref="scrollViewRightsActivity"
        class="mescroll"
      >
        <div>
          <b-activity-item
            v-for="(item,index) in scrollViewRightsActivity.list"
            :key="index"
            :getData.sync="item"
            :isFinish="false"
            @minusCount="minusCount"
            @addCount="addCount"
            :hasData="false"
            @showLimit="showLimit"
            @showConfig="showConfig"
          ></b-activity-item>
        </div>
      </div>
    </div>
    <div class="reportInstallList-view"
         v-show="curScrollViewName==='scrollViewDrainageActivity'">
      <div
        id="scrollViewDrainageActivity"
        ref="scrollViewDrainageActivity"
        class="mescroll"
      >
        <div>
          <b-drainage-activity
            v-for="(item,index) in scrollViewDrainageActivity.list"
            :key="index"
            :getData.sync="item"></b-drainage-activity>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {
  BSearchInput
} from '@/components/business';

import {
  TabBar,
  Toast
} from 'mand-mobile';

import {
  BActivityItem,
  BDrainageActivity
} from '@/components/form';

export default {
  name: 'MarketingActivities',
  components: {
    [TabBar.name]: TabBar,
    BSearchInput,
    BActivityItem,
    BDrainageActivity
  },
  data() {
    return {
      current: 0,
      orderNo: '',
      items: [{
        name: 0,
        label: '购机权益活动'
      }, {
        name: 1,
        label: '引流活动'
      }],
      scrollViewRightsActivity: {
        mescroll: null,
        list: [
          {
            title: '6月场景套权益昆明小微',
            reason: '套餐价格不符合',
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
              gift: '500积分233222222222222333vvervevrdfvsrftbrthytnjuykuikiuktgteegtgythh235456',
              count: '6',
              remain: '2',
            }
            ]
          }, {
            title: '6月场景套权益昆明小微',
            reasn: '',
            brand: '海尔，卡萨帝',
            scope: '所有产品',
            data: '2019-07-30至2019-08-02',
            data2: '2019-08-30至2019-09-02',
            type: '海贝积分',
          }
        ],
        isListInit: false
      },
      scrollViewDrainageActivity: {
        mescroll: null,
        list: [{
          name: 'name',
          giftUrl: 'url',
          time: 'time',
          scope: 'scope',
          people: 'people'
        }],
        isListInit: false
      },
      // 搜索值
      searchVal: '',
    };
  },
  methods: {
    searchByCondition() {
      this[this.curScrollViewName].mescroll.triggerDownScroll();
    },
    minusCount(item) {
      // this.rightsService.uncheckedOrderRights({}, { orderNo: this.orderNo, rightsNo: item.rightsNo, pageNum: 1, pageSize: 10 }).then((res) => {
      //   if (res.code === 1) {
      //     const result = res.data.result;
      //     if (result && result.length > 0) {
      //       const list = result;
      //       this.anylizeData(list);
      //     }
      //     this[this.curScrollViewName].list = this.currentList;
      //   }
      // });
    },
    addCount(item) {
      // this.rightsService.checkedOrderRights({}, { orderNo: this.orderNo, rightsNo: item.rightsNo, pageNum: 1, pageSize: 10 }).then((res) => {
      //   if (res.code === 1) {
      //     const result = res.data.result;
      //     if (result && result.length > 0) {
      //       const list = result;
      //       console.log('currentList', list);
      //
      //       this.anylizeData(list);
      //     }
      //     this[this.curScrollViewName].list = this.currentList;
      //   }
      // });
    },
    showLimit(item) {
      // this.rightsService.queryRightsLimitConfigList({}, { limitType: 'model', rightsNo: item.rightsNo }).then((res) => {
      //   if (res.code === 1) {
      //     item.limitList = res.data;
      //   }
      // });
    },
    showConfig(item) {
      // if (this.subInfo.orderType === 0) {
      //   this.rightsService.queryRightsSingleConfigList({}, { rightsNo: item.rightsNo },).then((res) => {
      //     if (res.code === 1) {
      //       if (res.data.length > 0) {
      //         item.isShowConfig = true;
      //         item.configList = res.data;
      //       } else {
      //         item.configList = [];
      //       }
      //     }
      //   });
      // } else {
      //   this.rightsService.queryRightsSetsByRightsNo({}, { rightsNo: item.rightsNo }).then((res) => {
      //     if (res.code === 1) {
      //       if (res.data.length > 0) {
      //         item.isShowConfig = true;
      //         item.configList = res.data;
      //       } else {
      //         item.configList = [];
      //       }
      //     }
      //   });
      // }
    },
    showConfig(item) {
      // if (this.subInfo.orderType === 0) {
      //   this.rightsService.queryRightsSingleConfigList({}, { rightsNo: item.rightsNo },).then((res) => {
      //     if (res.code === 1) {
      //       if (res.data.length > 0) {
      //         item.isShowConfig = true;
      //         item.configList = res.data;
      //       } else {
      //         item.configList = [];
      //       }
      //     }
      //   });
      // } else {
      //   this.rightsService.queryRightsSetsByRightsNo({}, { rightsNo: item.rightsNo }).then((res) => {
      //     if (res.code === 1) {
      //       if (res.data.length > 0) {
      //         item.isShowConfig = true;
      //         item.configList = res.data;
      //       } else {
      //         item.configList = [];
      //       }
      //     }
      //   });
      // }
    }
    ,
  },
  computed: {
    curScrollViewName() {
      // 当前tab下的scrollView的ref名字
      return {
        0: 'scrollViewRightsActivity',
        1: 'scrollViewDrainageActivity'
      }[this.current];
    }
  }
  ,
};
</script>

<style lang="scss">

  .reportInstallList-view {
    height: calc(100vh - 152px);
  }

  .activity-tab-bg {
    .md-tab-bar {
      padding-left: 24px;
      padding-right: 24px;
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
