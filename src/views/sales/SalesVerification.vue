<template>
  <div class="h100vh">
    <b-search-input
      v-model="searchVal"
      @search="searchByCondition"
      placeholder="输入产品型号进行搜索"
    >
      <div class="salesVerification-search-right">
        <b-month-pop
          @choosed="confirmDate"
        ></b-month-pop>
        <i class="iconfont icon-wenhao" @click="showVertificalTipDialog"></i>
      </div>
    </b-search-input>
    <md-tab-bar
      class="salesVerification-tabs"
      v-model="curTab"
      :items="tabs"
      :hasInk="false"
    ></md-tab-bar>
    <div class="top_tip" v-show="curTab==2 || curTab==4">
      由于渠道传输数据时间有差异，导致部分销量尚未验证，请耐心等待或沟通相关业务代表。
    </div>
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
            type="verify"
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
              v-if="false"
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
            v-resetInput
          >
          <div
            class="salesVerification-qrcode-icon-wrap"
            @click="salesScanQRCode"
          >
            <i class="iconfont icon-saomiao"
            ></i>
          </div>
        </div>
        <p class="common-error mt16" v-show="qrCodeDialog.error">{{qrCodeDialog.errorText}}</p>
        <div class="salesVerification-qrcode-tips">
          提示信息：点击右上【扫描】，可扫产品条码自动带入输入框。
        </div>
      </div>
    </md-dialog>
    <md-dialog
      title="销量验证说明"
      :closable="false"
      v-model="vertificalTipDialog.show"
      class="verificationDialog"
    >
      <div>
        <p>
          1. 条码验证——录入20位机编码后系统实时验证，验证成功后，兑呗第二天更新验证结果
        </p>
        <p class="margin-top-xs">
          2. 联网验证——根据国美苏宁等渠道给兑呗传输的数据进行联网验证（及时性可能受渠道影响），验证成功后，兑呗第二天更新验证结果”
        </p>
      </div>
      <div class="margin-top text-center">
        <button
          type="button"
          class="common-submit-btn-default"
          @click="hideVertificalTipDialog"
        >知道了
        </button>
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
  TabBar,
  Toast
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
      },
      userinfo: {},
      vertificalTipDialog: {
        show: false,
        btns: [
          {
            text: '知道了',
            handler: this.hideVertificalTipDialog,
          },
        ]
      },
    };
  },
  created() {
    const userInfoStr = localStorage.getItem('userinfo');
    if (userInfoStr) {
      this.userinfo = JSON.parse(userInfoStr);
    }
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
    },
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
    showVertificalTipDialog(){
      this.vertificalTipDialog.show = true;
    },
    hideVertificalTipDialog(){
      this.vertificalTipDialog.show = false;
    },
    getQueryString(name) {
      const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
      const r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    confirmDate(dates) {
      /* 确认时间 */
      if (dates) {
        this.curSearchDate = `${dates[0].value}/${dates[1].value}`;
        this[this.curScrollViewName].mescroll.triggerDownScroll();
      }
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
    searchByCondition() {
      this[this.curScrollViewName].mescroll.triggerDownScroll();
    },
    search(page) {
      /* 搜索 */
      return this.salesService.getReportEhubProductGroupPage({
        pageNum: page.num,
        pageSize: page.size,
        // 状态
        dbDataStatus: this.curTab,
        // todo 门店id需从接口取
        mdId: this.userinfo.shopId,
        // 购机时间
        gjTime: this.bUtil.formatDate(this.curSearchDate, 'yyyy-MM'),
        // 直销员产品线编码 todo 接口取
        productLineCode: this.userinfo.productGroups,
        productCode: this.searchVal
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
            type: v.productModel,
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
                errorType: v.ehubExceptionType,
                tip: v.showMsg,
                ehubDataType: v.ehubDataType
              }
            ]
          }));
          if (page.num === 1) {
            this[this.curScrollViewName].list = listTemp;
          } else {
            this[this.curScrollViewName].list = this[this.curScrollViewName].list.concat(listTemp);
          }
        } else {
          this[this.curScrollViewName].mescroll.endErr();
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
        mdId: this.userinfo.shopId,
        gjTime: this.bUtil.formatDate(this.curSearchDate, 'yyyy-MM'),
        productCode: item.product
      }).then(({ code, data }) => {
        if (code === 1) {
          item.detail = data.map(v => ({
            hmcId: v.hmcId,
            id: `${v.id}`,
            buyName: v.yhName,
            time: v.gjTime,
            orderName: v.hmcName,
            errorReason: v.ehubMsg,
            ehubDataType: v.ehubDataType
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
        if (this.qrCodeForm.code.length == 20 || this.qrCodeForm.code.length == 22) {
          this.qrCodeDialog.errorText = '';
          this.qrCodeDialog.error = false;
          this.salesService.saveEhubBarCode({
            hmcId: this.userinfo.hmcid,
            id: this.qrCodeForm.id,
            barCode: this.qrCodeForm.code
          }).then((res) => {
            if (res.msg) {
              if (res.code === 1) {
                this.qrCodeDialog.open = false;
                Toast.succeed(res.msg);
                this[this.curScrollViewName].list = null;
                this[this.curScrollViewName].choosedIndex = false;
                this[this.curScrollViewName].mescroll.triggerDownScroll();
              } else {
                this.qrCodeDialog.errorText = res.msg;
                this.qrCodeDialog.error = true;
              }
            }
          });
        } else {
          this.qrCodeDialog.errorText = '条码编码不正确，请重新录入';
          this.qrCodeDialog.error = true;
        }
      }
    },
    getFailureOrder(itemInfo) {
      const argsObj = {
        mdId: this.userinfo.shopId,
        productCode: itemInfo.product,
        gjTime: this.bUtil.formatDate(this.curSearchDate, 'yyyy-MM')
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
        hmcId: this.userinfo.hmcid,
        id: item.detail[0].id,
        ehubExceptionType: item.detail[0].errorType
      }).then((res) => {
        if (res) {
          Dialog.alert({
            content: res.data,
            cancelText: '取消',
            confirmText: '确定',
            onConfirm: () => {
              this[this.curScrollViewName].mescroll.triggerDownScroll();
            }
          });
          // this[this.curScrollViewName].list.splice(index, 1);
          // this[this.curScrollViewName].mescroll.triggerDownScroll();
        }
        // else {
        //   item.detail[0].errorReason = res.data;
        // }
      });
    },
    salesScanQRCode() {
      wx.ready(() => {
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ['barCode'], // 可以指定扫二维码还是一维码，默认二者都有
          success: (res) => {
            const result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            if (result && typeof result === 'string') {
              this.qrCodeForm.code = result.split(',')[1];
            }
          }
        });
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
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 60px;
    height: 60px;
    border-radius: 100%;
    background: #1969C6;
    color: #fff;
    text-align: center;
    margin-left: 16px;
    .iconfont{
      font-size: 30px;
    }
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
  .reportInstallList-view {
    height: calc(100vh - 184px);
  }
  .top_tip{
    color: #f7c36e;
    background-color: #FFFFFF;
    padding: 10px 30px;
    font-size: 24px;
  }
  .verificationDialog{
    .md-dialog-body{
      max-height: 100vw !important;
      color: #333333;
    }
    .margin-top{
      margin-top: 30px;
    }
    .text-center{
      text-align: center;
    }
    .common-submit-btn-default{
      margin-top: 24px;
      width: 50%;
    }
    .margin-top-xs{
      margin-top: 10px;
    }
    .margin-left{
      margin-left: 30px;
    }
    .text-df{
      font-size: 28px;
    }
  }
</style>
