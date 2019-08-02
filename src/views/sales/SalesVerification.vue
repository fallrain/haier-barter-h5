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
      v-show="curScrollViewName==='scrollView'"
      class="salesVerification-view"
      ref="scrollView"
      :scrolling-x="false"
      @refreshing="onRefresh"
      @end-reached="onEndReached"
      :end-reached-threshold="100"
      :immediate-check-end-reaching="scrollView.autoCheck"
      :auto-reflow="true"
    >
      <div class="salesVerification-list">
        <b-scale-item
          v-for="(item,index) in list['scrollView']"
          :key="index"
          :data="item"
          :index="index"
          @barCodeDeclare="barCodeDeclare"
          @showDetail="showDetail"
          v-show="$data[curScrollViewName].choosedIndex===false || ($data[curScrollViewName].choosedIndex!==false && index===$data[curScrollViewName].choosedIndex)"
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
    <md-scroll-view
      v-show="curScrollViewName==='scrollViewVerify'"
      class="salesVerification-view"
      ref="scrollViewVerify"
      :scrolling-x="false"
      @refreshing="onRefresh"
      @end-reached="onEndReached"
      :end-reached-threshold="100"
      :immediate-check-end-reaching="scrollViewVerify.autoCheck"
      :auto-reflow="true"
    >
      <div class="salesVerification-list">
        <b-scale-item
          v-for="(item,index) in list['scrollViewVerify']"
          :key="index"
          :data="item"
          :index="index"
          @barCodeDeclare="barCodeDeclare"
          @showDetail="showDetail"
          v-show="$data[curScrollViewName].choosedIndex===false || ($data[curScrollViewName].choosedIndex!==false && index===$data[curScrollViewName].choosedIndex)"
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
        :is-finished="scrollViewVerify.isFinished"
      >
      </md-scroll-view-more>
    </md-scroll-view>
    <md-scroll-view
      v-show="curScrollViewName==='scrollViewOdd'"
      class="salesVerification-view"
      ref="scrollViewOdd"
      :scrolling-x="false"
      @refreshing="onRefresh"
      @end-reached="onEndReached"
      :end-reached-threshold="100"
      :immediate-check-end-reaching="scrollViewOdd.autoCheck"
      :auto-reflow="true"
    >
      <div class="salesVerification-list">
        <b-scale-item
          v-for="(item,index) in list['scrollViewOdd']"
          :key="index"
          type="exception"
          :data="item"
          :index="index"
          v-show="$data[curScrollViewName].choosedIndex===false || ($data[curScrollViewName].choosedIndex!==false && index===$data[curScrollViewName].choosedIndex)"
        >
          <button
            slot="headRight"
            type="button"
            class="common-btn-primary"
          >
            重新提报
          </button>
        </b-scale-item>
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
        :is-finished="scrollViewOdd.isFinished"
      >
      </md-scroll-view-more>
    </md-scroll-view>
    <md-scroll-view
      v-show="curScrollViewName==='scrollViewFail'"
      class="salesVerification-view"
      ref="scrollViewFail"
      :scrolling-x="false"
      @refreshing="onRefresh"
      @end-reached="onEndReached"
      :end-reached-threshold="100"
      :immediate-check-end-reaching="scrollViewFail.autoCheck"
      :auto-reflow="true"
    >
      <div class="salesVerification-list">
        <b-scale-item
          v-for="(item,index) in list['scrollViewFail']"
          :key="index"
          type="fail"
          :data="item"
          :index="index"
          v-show="$data[curScrollViewName].choosedIndex===false || ($data[curScrollViewName].choosedIndex!==false && index===$data[curScrollViewName].choosedIndex)"
        >
          <button
            slot="headRight"
            type="button"
            class="common-btn-primary"
          >
            修改订单
          </button>
        </b-scale-item>
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
        :is-finished="scrollViewFail.isFinished"
      >
      </md-scroll-view-more>
    </md-scroll-view>
    <md-scroll-view
      v-show="curScrollViewName==='scrollViewSuc'"
      class="salesVerification-view"
      ref="scrollViewSuc"
      :scrolling-x="false"
      @refreshing="onRefresh"
      @end-reached="onEndReached"
      :end-reached-threshold="100"
      :immediate-check-end-reaching="scrollViewSuc.autoCheck"
      :auto-reflow="true"
    >
      <div class="salesVerification-list">
        <b-scale-item
          v-for="(item,index) in list['scrollViewSuc']"
          :key="index"
          type="success"
          :data="item"
          :index="index"
          v-show="$data[curScrollViewName].choosedIndex===false || ($data[curScrollViewName].choosedIndex!==false && index===$data[curScrollViewName].choosedIndex)"
        >
        </b-scale-item>
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
        :is-finished="scrollViewSuc.isFinished"
      >
      </md-scroll-view-more>
    </md-scroll-view>
    <md-dialog
      title="请输入条码"
      class="salesVerification-dialog"
      :closable="false"
      v-model="qrCodeDialog.open"
      :btns="qrCodeDialog.btns"
    >
      <div>
        <div class="salesVerification-qrcode-par">
          <input
            class="salesVerification-qrcode-ipt"
            type="text"
            v-model="qrCodeForm.code"
            placeholder="请扫描条码信息"
          >
          <div
            class="salesVerification-qrcode-icon-wrap"
          >
            <i class="iconfont icon-saomiao"></i>
          </div>
        </div>
        <p class="common-error mt16" v-show="qrCodeDialog.error">{{qrCodeDialog.errorText}}</p>
        <div class="salesVerification-qrcode-tips">
          提示信息：发送到发送到发送到发送到发送到发放水电费水电费水电费是电费水费水电费水电费水电费是发送到
        </div>
      </div>
    </md-dialog>
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
  Dialog,
  ScrollView,
  ScrollViewMore,
  ScrollViewRefresh,
  TabBar
} from 'mand-mobile';

export default {
  name: 'SalesVerification',
  components: {
    'md-dialog': Dialog,
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
      scrollView: {
        isFinished: false,
        // 展开的条码序号
        choosedIndex: false,
        // 自动检测触发到底部
        autoCheck: true
      },
      // 待验证
      scrollViewVerify: {
        isFinished: false,
        choosedIndex: false,
        autoCheck: false
      },
      // 异常
      scrollViewOdd: {
        isFinished: false,
        choosedIndex: false,
        autoCheck: false
      },
      // 失败
      scrollViewFail: {
        isFinished: false,
        choosedIndex: false,
        autoCheck: false
      },
      // 成功
      scrollViewSuc: {
        isFinished: false,
        choosedIndex: false,
        autoCheck: false
      },
      // 销量列表
      list: {
        scrollView: [
          {
            name: '热水器',
            type: 'CEH-80V物联网',
            count: 12,
            detail: [
              {
                buyName: '张子强',
                time: '2019-06-03',
                orderName: '王强',
                errorReason: '谁知道是怎么回事',
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
        scrollViewVerify: [],
        scrollViewOdd: [],
        scrollViewFail: [],
        scrollViewSuc: [],
      },
      qrCodeDialog: {
        error: false,
        errorText: '',
        open: false,
        btns: [
          {
            text: '取消'
          },
          {
            text: '传入工资系统',
            handler: this.onQrCodeDialogConfirm,
          },
        ],
      },
      qrCodeForm: {
        code: ''
      }
    };
  },
  computed: {
    curScrollViewName() {
      // 当前tab下的scrollView的ref名字
      return {
        1: 'scrollView',
        2: 'scrollViewVerify',
        3: 'scrollViewOdd',
        4: 'scrollViewFail',
        5: 'scrollViewSuc'
      }[this.curTab];
    }
  },
  watch: {
    curTab(val) {
      const obj = {
        1: 'scrollView',
        2: 'scrollViewVerify',
        3: 'scrollViewOdd',
        4: 'scrollViewFail',
        5: 'scrollViewSuc'
      };
      Object.values(obj).forEach((v) => {
        this[v].autoCheck = false;
      });
      this[obj[val]].autoCheck = true;
    }
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
            this.list[this.curScrollViewName].push({
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
      /* 加载更多 */
      if (this[this.curScrollViewName].choosedIndex !== false) {
        this.$refs.scrollView.finishRefresh();
        this.$refs.scrollView.finishLoadMore();
        return;
      }
      this.scrollViewOnEndReached(this.search, this.curScrollViewName);
    },
    onRefresh() {
      /* 下拉刷新 */
      if (this[this.curScrollViewName].choosedIndex !== false) {
        this.$refs.scrollView.finishRefresh();
        this.$refs.scrollView.finishLoadMore();
        return;
      }
      this.scrollViewOnRefresh(this.search, this.curScrollViewName);
    },
    barCodeDeclare() {
      /* 销量申报 */
      this.qrCodeDialog.open = true;
      // 重置code
      this.qrCodeForm.code = '';
      this.qrCodeDialog.error = false;
    },
    showDetail({ isShowDetail, index }) {
      /* 显示详情后隐藏其他 */
      if (isShowDetail) {
        this[this.curScrollViewName].choosedIndex = index;
      } else {
        this[this.curScrollViewName].choosedIndex = false;
      }
    },
    onQrCodeDialogConfirm() {
      /* 传入工资系统提交 */
      if (!this.qrCodeForm.code) {
        this.qrCodeDialog.errorText = '请输入条码';
        this.qrCodeDialog.error = true;
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

  .salesVerification-dialog {
    .md-dialog-btn {
      font-size: 30px;
    }

    .md-dialog-title {
      color: #000;
      font-size: 28px;
      margin-bottom: 16px;
    }

    .md-dialog-body {
      padding: 24px 40px;
    }
  }

  .salesVerification-qrcode-par {
    display: flex;
    align-items: center;
  }

  .salesVerification-qrcode-ipt {
    flex-grow: 1;
    height: 60px;
    background: #F5F5F5;
    border-radius: 30px;
    padding-left: 24px;
    padding-right: 24px;
    border: 0;
  }

  .salesVerification-qrcode-icon-wrap {
    width: 60px;
    height: 60px;
    line-height: 60px;
    border-radius: 100%;
    background: #1969C6;
    color: #fff;
    text-align: center;
    margin-left: 16px;
  }

  .salesVerification-qrcode-icon {
    font-size: 40px;
  }

  .salesVerification-qrcode-tips {
    margin-top: 20px;
    font-size: 28px;
    color: #999;
    line-height: 40px;
  }
</style>
