<template>
  <div class="h100vh">
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
    <div
      v-show="curScrollViewName==='scrollView'"
      class="reportInstallList-view mt24"
    >
      <div
        id="scrollView"
        ref="scrollView"
        class="mescroll"
      >
        <div class="salesVerification-list">
          <b-scale-item
            v-for="(item,index) in scrollView.list"
            :key="index"
            :data="item"
            :index="index"
            @barCodeDeclare="barCodeDeclare"
            @showDetail="showDetail"
            v-show="$data[curScrollViewName].choosedIndex===false || ($data[curScrollViewName].choosedIndex!==false && index===$data[curScrollViewName].choosedIndex)"
          ></b-scale-item>
        </div>
      </div>
    </div>
    <div
      v-show="curScrollViewName==='scrollViewVerify'"
      class="reportInstallList-view mt24"
    >
      <div
        id="scrollViewVerify"
        ref="scrollViewVerify"
        class="mescroll"
      >
        <div class="salesVerification-list">
          <b-scale-item
            v-for="(item,index) in scrollViewVerify.list"
            :key="index"
            :data="item"
            :index="index"
            @barCodeDeclare="barCodeDeclare"
            @showDetail="showDetail"
            v-show="$data[curScrollViewName].choosedIndex===false || ($data[curScrollViewName].choosedIndex!==false && index===$data[curScrollViewName].choosedIndex)"
          ></b-scale-item>
        </div>
      </div>
    </div>
    <div
      v-show="curScrollViewName==='scrollViewOdd'"
      class="reportInstallList-view mt24"
    >
      <div
        id="scrollViewOdd"
        ref="scrollViewOdd"
        class="mescroll"
      >
        <div class="salesVerification-list">
          <b-scale-item
            v-for="(item,index) in scrollViewOdd.list"
            :key="index"
            :data="item"
            :index="index"
            type="exception"
            @barCodeDeclare="barCodeDeclare"
            @showDetail="showDetail"
            v-show="$data[curScrollViewName].choosedIndex===false || ($data[curScrollViewName].choosedIndex!==false && index===$data[curScrollViewName].choosedIndex)"
          >
            <button
              slot="headRight"
              type="button"
              class="common-btn-primary"
              @click="reCommit(item, index)"
              v-show="item.detail[0].errorType"
            >
              重新提报
            </button>
          </b-scale-item>
        </div>
      </div>
    </div>
    <div
      v-show="curScrollViewName==='scrollViewFail'"
      class="reportInstallList-view mt24"
    >
      <div
        id="scrollViewFail"
        ref="scrollViewFail"
        class="mescroll"
      >
        <div class="salesVerification-list">
          <b-scale-item
            v-for="(item,index) in scrollViewFail.list"
            :key="index"
            :data="item"
            :index="index"
            type="fail"
            @barCodeDeclare="barCodeDeclare"
            @showDetail="showDetail"
            v-show="$data[curScrollViewName].choosedIndex===false || ($data[curScrollViewName].choosedIndex!==false && index===$data[curScrollViewName].choosedIndex)"
          >
            <button
              slot="headRight"
              type="button"
              class="common-btn-primary"
              @click="getFailureOrder(item)"
            >
              修改订单
            </button>
          </b-scale-item>
        </div>
      </div>
    </div>
    <div
      v-show="curScrollViewName==='scrollViewSuc'"
      class="reportInstallList-view mt24"
    >
      <div
        id="scrollViewSuc"
        ref="scrollViewSuc"
        class="mescroll"
      >
        <div class="salesVerification-list">
          <b-scale-item
            v-for="(item,index) in scrollViewSuc.list"
            :key="index"
            :data="item"
            :index="index"
            type="success"
            @barCodeDeclare="barCodeDeclare"
            @showDetail="showDetail"
            v-show="$data[curScrollViewName].choosedIndex===false || ($data[curScrollViewName].choosedIndex!==false && index===$data[curScrollViewName].choosedIndex)"
          ></b-scale-item>
        </div>
      </div>
    </div>
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
  TabBar
} from 'mand-mobile';

export default {
  name: 'SalesVerification',
  components: {
    'md-dialog': Dialog,
    'md-tab-bar': TabBar,
    BMonthPop,
    BScaleItem,
    BSearchInput
  },
  data() {
    return {
      // 搜索值
      searchVal: '',
      // 搜索日期
      curSearchDate: this.bUtil.formatDate(new Date(), 'yyyy-MM'),
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
        // 下拉刷新对象
        mescroll: null,
        list: [
          /* {
             name: '热水器',
             type: 'CEH-80V物联网',
             count: 12,
             detail: [
               {
                 buyName: '张子强',
                 time: '2019-06-03',
                 orderName: '王强',
                 errorReason: '谁知道是怎么回事',
               }
             ]
           } */
        ],
        // 是否已经刷新过
        isListInit: false,
        // 展开的条码序号
        choosedIndex: false,
      },
      // 待验证
      scrollViewVerify: {
        // 下拉刷新对象
        mescroll: null,
        list: [],
        // 是否已经刷新过
        isListInit: false,
        // 展开的条码序号
        choosedIndex: false,
      },
      // 异常
      scrollViewOdd: {
        // 下拉刷新对象
        mescroll: null,
        list: [],
        // 是否已经刷新过
        isListInit: false,
        // 展开的条码序号
        choosedIndex: false,
      },
      // 失败
      scrollViewFail: {
        // 下拉刷新对象
        mescroll: null,
        list: [],
        // 是否已经刷新过
        isListInit: false,
        // 展开的条码序号
        choosedIndex: false,
      },
      // 成功
      scrollViewSuc: {
        // 下拉刷新对象
        mescroll: null,
        list: [],
        // 是否已经刷新过
        isListInit: false,
        // 展开的条码序号
        choosedIndex: false,
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
        code: '',
        id: '',
        hmcId: ''
      }
    };
  },
  created() {

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
    confirmDate(dates) {
      /* 确认时间 */
      debugger;
    },
    upCallback(page) {
      // 下载过就设置已经初始化
      this[this.curScrollViewName].isListInit = true;
      // 如果已经展开，则禁止请求数据，直接结束刷新数据
      if (this[this.curScrollViewName].choosedIndex !== false) {
        this[this.curScrollViewName].mescroll.endUpScroll(null);
        this[this.curScrollViewName].mescroll.endDownScroll();
        return;
      }
      this.search(page).then(({ result, pages }) => {
        this.$nextTick(() => {
          // 通过当前页的数据条数，和总页数来判断是否加载完
          this[this.curScrollViewName].mescroll.endByPage(result.length, pages);
        });
      });
    },
    search(page) {
      /* 搜索 */
      return this.salesService.getReportEhubProductGroupPage({
        pageNum: page.num,
        pageSize: page.size,
        // 状态
        dbDataStatus: this.curTab,
        // todo 门店id需从接口取
        mdId: '1',
        // 购机时间
        gjTime: this.curSearchDate,
        // 直销员产品线编码 todo 接口取
        productLineCode: 'AA',
        productCode: ''
      }).then(({ code, data }) => {
        const sroviewObj = {};
        if (code === 1) {
          const {
            result,
            pages
          } = data;
          sroviewObj.pages = pages;
          sroviewObj.result = result;

          const listTemp = result.map(v => ({
            name: v.productLine,
            type: v.product,
            count: v.dataCount,
            product: v.product,
            detail: [
              {
                hmcId: v.hmcId,
                id: `${v.id}`,
                buyName: v.yhName,
                time: v.gjTime,
                orderName: v.hmcName,
                errorReason: v.ehubMsg,
                errorType: v.ehubExceptionType
              }
            ]
          }));
          if (page.num === 1) {
            this[this.curScrollViewName].list = listTemp;
          } else {
            this[this.curScrollViewName].list = this[this.curScrollViewName].list.concat(listTemp);
          }
        }
        return sroviewObj;
      });
    },
    barCodeDeclare(detail) {
      /* 销量申报 */
      this.qrCodeDialog.open = true;
      // 重置code
      this.qrCodeForm.code = '';
      this.qrCodeDialog.error = false;
      this.qrCodeForm.id = detail.id;
      this.qrCodeForm.hmcId = detail.hmcId;
    },
    showDetail({ item, isShowDetail, index }) {
      /* 显示详情后隐藏其他 */
      // 查询二级详情
      this.salesService.getReportEhubByProductList({
        dbDataStatus: this.curTab,
        // todo
        mdId: '1',
        gjTime: this.curSearchDate,
        productCode: item.product
      }).then(({ code, data }) => {
        if (code === 1) {
          item.detail = data.map(v => ({
            hmcId: v.hmcId,
            id: `${v.id}`,
            buyName: v.yhName,
            time: v.gjTime,
            orderName: v.hmcName,
            errorReason: v.ehubMsg
          }));
        }
      });
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
      } else {
        this.salesService.saveEhubBarCode({
          hmcId: 'A00123',
          id: this.qrCodeForm.id,
          barCode: this.qrCodeForm.code
        }).then((res) => {
          if (res.code === 1) {

          } else {

          }
        });
      }
    },
    getFailureOrder(itemInfo) {
      const argsObj = {
        mdId: 1,
        productCode: itemInfo.product,
        gjTime: this.curSearchDate
      };
      this.$router.push({
        name: 'Sales.SalesChooseOrder',
        params: {
          ...argsObj
        }
      });
    },
    reCommit(item, index) {
      this.salesService.reportEhubAgain({
        hmcId: 'A00123',
        id: item.detail[0].id,
        ehubExceptionType: item.detail[0].errorType
      }).then((res) => {
        if (res.code === 1) {
          this[this.curScrollViewName].list.splice(index, 1);
        } else {
          item.detail[0].errorReason = res.data;
        }
      });
    },
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
