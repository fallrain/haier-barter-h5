<!-- message.wxml -->
<template>
  <div>
    <div class="reportInstallList-tab">
    <md-tab-bar
      v-model="curTab"
      :items="tabs"
      :hasInk="false"
    ></md-tab-bar>
    </div>
    <div
      v-show="curScrollViewName==='scrollViewFinished'"
      class="reportInstallList-view reportInstallList-container"
    >
      <div
        id="scrollViewFinished"
        ref="scrollViewFinished"
        class="mescroll"
      >
        <div>
          <b-report-install-item-new
            v-for="(orderItem,orderIndex) in scrollViewFinished.list"
            :key="orderIndex"
            :orderItem="orderItem"
            :isShow="true"
          ></b-report-install-item-new>
        </div>
      </div>
    </div>
    <div
      v-show="curScrollViewName==='scrollViewOdd'"
      class="reportInstallList-view reportInstallList-container"
    >
      <div
        id="scrollViewOdd"
        ref="scrollViewOdd"
        class="mescroll"
      >
        <div>
          <b-report-install-item-new
            v-for="(orderItem,orderIndex) in scrollViewOdd.list"
            :key="orderIndex"
            :orderItem="orderItem"
            :isShow="false"
          ></b-report-install-item-new>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  TabBar
} from 'mand-mobile';
import {
  BReportInstallItemNew
} from '@/components/business';

export default {
  name: 'ReportInstallList',
  components: {
    BReportInstallItemNew,
    'md-tab-bar': TabBar
  },
  data() {
    return {
      // 当前选中tab
      curTab: 1,
      // tabs
      tabs: [
        {
          name: 1,
          label: '已报装'
        },
        {
          name: 2,
          label: '报装异常'
        }
      ],
      // 已包装
      scrollViewFinished: {
        mescroll: null,
        list: [],
        isListInit: false
      },
      // 异常
      scrollViewOdd: {
        mescroll: null,
        list: [],
        isListInit: false
      }
    };
  },
  computed: {
    curScrollViewName() {
      // 当前tab下的scrollView的ref名字
      return {
        1: 'scrollViewFinished',
        2: 'scrollViewOdd'
      }[this.curTab];
    }
  },
  watch: {
    curTab(val) {
      const obj = {
        1: 'scrollViewFinished',
        2: 'scrollViewOdd'
      };
      const viewName = obj[val];
      // tab切换后，创建新MeScroll对象（若无创建过），没有加载过则加载
      this.bUtil.scroviewTabChange(viewName, this);
    }
  },
  mounted() {
    // 创建当前tab的MeScroll对象，并下拉刷新
    this.bUtil.scroviewTabChange(this.curScrollViewName, this);
  },
  methods: {
    upCallback(page) {
      // 下载过就设置已经初始化
      this[this.curScrollViewName].isListInit = true;
      this.search(page).then(({result, pages, total}) => {
        this.$nextTick(() => {
          // 通过当前页的数据条数，和总数据量来判断是否加载完
          this[this.curScrollViewName].mescroll.endBySize(result.length, total);
        });
      });
    },
    search(page) {
      const formData = {
        pageNum: page.num,
        pageSize: page.size,
        hmcId: 'a0008949',
        type: this.curTab
      };
      return this.reportInstallService.queryReportInstallList(formData).then((res) => {
        const sroviewObj = {};
        if (res.code === 1) {
          const {
            result,
            pages,
            total
          } = res.data;
          sroviewObj.pages = pages;
          sroviewObj.result = result;
          sroviewObj.total = total;
          if (result && result.length > 0) {
            const curList = result.map(item => ({
              ...item,
              domainName: 'Haier',
              orderTime: item.requireServiceDate ? item.requireServiceDate.substring(0, 16) : ''
            }));
            if (page.num === 1) {
              this[this.curScrollViewName].list = curList;
            } else {
              this[this.curScrollViewName].list = this[this.curScrollViewName].list.concat(curList);
            }
          }
        } else {
          this[this.curScrollViewName].mescroll.endErr();
        }
        return sroviewObj;
      });
    },
  }
};
</script>
<style lang="scss">

  .reportInstallList-tab {
    .md-tab-bar {
      background-color: #fff;
      border-bottom: 2px solid #EEE;
    }

    .md-tab-bar-item {
      min-height: 72px;
      color: #666;
      font-size: 28px;

      &.is-active {
        color: #1969C6;
      }
    }
  }

  .reportInstallList-container {
    height: 100vh;
    background: #FBFBFB;
  }

  .reportInstallList-view {
    height: calc(100vh - 108px);
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

</style>
