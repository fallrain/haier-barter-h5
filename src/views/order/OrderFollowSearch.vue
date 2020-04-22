<template>
  <div class="page-class">
    <div class="">
      <md-notice-bar
        v-if="noticeNum"
        mode="closable"
        :time="4000"
      >
        您有{{noticeNum}}笔超过24小时未处理的订单，请及时跟进
      </md-notice-bar>
    </div>
    <div class="search-class">

      <form action="" @submit.prevent="()=>{return false}">
        <input
          class="input-class"
          confirm-type="search"
          placeholder="搜索用户姓名、电话"
          placeholder-style="font-size: 28px;color: #BBBBBB;margin-left: 10px;"
          v-model="searchWord"
          type="search"
          @keyup.enter="fuzzySearch"
        />
      </form>

      <img
        src="@/assets/images/orderFollow-up/search@3x.png"
        class="search-image"
        @click="fuzzySearch"
      >
      <p class="orderFollowButton-search" @click="handEntry()">手动录单</p>
    </div>
    <b-order-follow-search-bar
      v-show="curScrollViewName==='scrollView'"
      :scenarioList="scenarioList"
      :businessType.sync="scrollView.businessType"
      :sortType.sync="scrollView.sortType"
      @checkClick="checkClicked"
      @popButtonClicked="buttonClicked"
    ></b-order-follow-search-bar>
    <div
      id="scrollView"
      ref="scrollView"
      class="mescroll"
      v-show="curScrollViewName==='scrollView'"
    >
      <b-order-follow-item
        :list="scrollView.list"
        @updateOrderType="updateOrderType"
        @followButtonClick="followButtonClicked"
        @againEntry="againEntry"
        @itemClick="itemClick"
        @gujiaClick="gujiaClick"
        @userService="userService"
        @maybeBuyer="maybeBuyer"
        @setWeixinStatus="setWeixinStatus"
        @setInvalidWeixinStatus="setInvalidWeixinStatus"
      ></b-order-follow-item>
    </div>
    <b-order-follow-search-bar
      v-show="curScrollViewName==='scrollViewFinished'"
      :scenarioList="scenarioList"
      :businessType.sync="scrollViewFinished.businessType"
      :sortType.sync="scrollViewFinished.sortType"
      @checkClick="checkClicked"
      @popButtonClicked="buttonClicked"
    ></b-order-follow-search-bar>
    <div
      id="scrollViewFinished"
      ref="scrollViewFinished"
      class="mescroll"
      v-show="curScrollViewName==='scrollViewFinished'"
    >
      <b-order-follow-item
        :list="scrollViewFinished.list"
        @updateOrderType="updateOrderType"
        @followButtonClick="followButtonClicked"
        @againEntry="againEntry"
        @itemClick="itemClick"
        @gujiaClick="gujiaClick"
        @userService="userService"
        @maybeBuyer="maybeBuyer"
        @setWeixinStatus="setWeixinStatus"
        @setInvalidWeixinStatus="setInvalidWeixinStatus"
      ></b-order-follow-item>
    </div>
    <b-order-follow-search-bar
      v-show="curScrollViewName==='scrollViewOdd'"
      :sortArray="oddOrderSortList"
      :scenarioList="oddScenarioList"
      :businessType.sync="scrollViewOdd.businessType"
      businessCheckType="radio"
      :businessTypeRadioCancel="true"
      :sortType.sync="scrollViewOdd.sortType"
      @checkClick="checkClicked"
      @popButtonClicked="buttonClicked"
    ></b-order-follow-search-bar>
    <div
      id="scrollViewOdd"
      ref="scrollViewOdd"
      class="mescroll"
      v-show="curScrollViewName==='scrollViewOdd'"
    >
      <b-order-follow-item
        type="odd"
        :list="scrollViewOdd.list"
        @updateOrderType="updateOrderType"
        @followButtonClick="followButtonClicked"
        @itemClick="itemClick"
        @gujiaClick="gujiaClick"
      ></b-order-follow-item>
    </div>
    <b-order-follow-search-bar
      v-show="curScrollViewName==='scrollViewProgress'"
      :defalutCheckedsortId="defalutCheckedsortId"
      :scenarioList="scenarioList"
      :businessType.sync="scrollViewProgress.businessType"
      :sortType.sync="scrollViewProgress.sortType"
      @checkClick="checkClicked"
      @popButtonClicked="buttonClicked"
    ></b-order-follow-search-bar>
    <div
      id="scrollViewProgress"
      ref="scrollViewProgress"
      class="mescroll"
      v-show="curScrollViewName==='scrollViewProgress'"
    >
      <b-order-follow-item
        :list="scrollViewProgress.list"
        @updateOrderType="updateOrderType"
        @followButtonClick="followButtonClicked"
        @userService="userService"
        @itemClick="itemClick"
        @gujiaClick="gujiaClick"
        @maybeBuyer="maybeBuyer"
        @setWeixinStatus="setWeixinStatus"
        @setInvalidWeixinStatus="setInvalidWeixinStatus"
      ></b-order-follow-item>
    </div>
    <div class="js-md-tab-bar md-example-child md-example-child-tabs md-example-child-tab-bar-4">
      <md-tab-bar
        v-model="curTab"
        :items="items"
        :has-ink="false"
      >
        <template slot="item" slot-scope="{ item }">
          <div class="custom-item">
            <div class="icon">
              <i class="iconfont1 icon-picGrid1" v-show="item.name == 1"></i>
              <i class="iconfont1 icon-picGrid2" v-show="item.name == 2"></i>
              <i class="iconfont1 icon-picGrid" v-show="item.name == 4"></i>
              <i class="iconfont1 icon-picGrid3" v-show="item.name == 3"></i>
            </div>
            <div class="text">
              <span v-text="item.label"></span>
            </div>
          </div>
        </template>
      </md-tab-bar>
    </div>
    <md-dialog
      title=""
      :closable="true"
      v-model="handEntryCon"
      :btns="basicDialog.btns"
    >
      您本月还有{{handCount}}个手工录单名额，超出限制后本月将不能手工录单！同时，手工录入的订单不能发放购机权益
    </md-dialog>
    <!--健康换新核销-->
    <md-dialog
      title="确定核销"
      :closable="true"
      v-model="showVerificationDialog"
      class="verificationDialog"
    >
      <div>
        <div class="verification-code">{{currentHeXiaoCode}}</div>
        <div>
          <button
            type="button"
            class="common-submit-btn-default"
            @click="doVerification"
          >确定
          </button>
        </div>
      </div>

    </md-dialog>
    <!--爱到家核销-->
    <md-dialog
      title="确定核销"
      :closable="true"
      v-model="showVerificationDialog_ADJ"
      class="verificationDialog"
    >
      <div>
        <div class="flex text-df algin-center justify-center line-height padding-top padding-bottom">
          <span>优惠券号：</span>
          <input v-model="verificationRemark" class="margin-left text-input" placeholder="请输入优惠券号"/>
        </div>
        <div class="flex">
          <button
            type="button"
            class="common-submit-btn-default"
            @click="()=>{return showVerificationDialog_ADJ=false}"
          >取消
          </button>
          <button
            type="button"
            class="common-submit-btn-default margin-left"
            @click="doVerification"
          >确定
          </button>
        </div>
      </div>

    </md-dialog>
  </div>
</template>
<script>
import {
  Dialog,
  Icon,
  NoticeBar,
  Popup,
  ScrollView,
  ScrollViewMore,
  ScrollViewRefresh,
  TabBar,
  Toast
} from 'mand-mobile';
import {
  BOrderFollowItem
} from '@/components/orderFollow';
import BOrderFollowSearchBar from '../../components/orderFollow/BOrderFollowSearchBar';

import {
  mapGetters
} from 'vuex';

import {
  GET_USER
} from '@/store/mutationsTypes';

export default {
  name: '',
  components: {
    BOrderFollowSearchBar,
    [TabBar.name]: TabBar,
    [Icon.name]: Icon,
    [ScrollView.name]: ScrollView,
    [ScrollViewRefresh.name]: ScrollViewRefresh,
    [ScrollViewMore.name]: ScrollViewMore,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog,
    [NoticeBar.name]: NoticeBar,
    BOrderFollowItem,
    [Popup.name]: Popup
  },
  data() {
    return {
      defalutCheckedsortId: '',
      updateList: false,
      pageNum: 1,
      searchWord: '',
      show: false,
      isFinished: true,
      userinfo: {},
      curTab: 1,
      handleList: [],
      noticeNum: '',
      items: [
        {
          name: 1,
          label: '跟进中',
          icon: 'genjin'
        },
        {
          name: 2,
          label: '异常',
          icon: 'yichang'
        },
        {
          name: 4,
          label: '草稿',
          icon: 'quanbu'
        },
        {
          name: 3,
          label: '已成交',
          icon: 'chengjiao'
        }
      ],
      preIndex: '',
      currentScrollView: {},
      currentList: [],
      checkedsortId: '',
      checkedButtonId: '',
      fuzzysearch: false,
      // 订单跟进全部
      scrollView: {
        // 场景值
        businessType: '',
        // 排序方式
        sortType: '1',
        mescroll: null,
        list: [],
        isListInit: false
      },
      // 已完成
      scrollViewFinished: {
        // 场景值
        businessType: '',
        // 排序方式
        sortType: '2',
        mescroll: null,
        list: [],
        isListInit: false
      },
      // 异常
      scrollViewOdd: {
        // 场景值
        businessType: '',
        // 排序方式
        sortType: '1',
        mescroll: null,
        list: [],
        isListInit: false
      },
      // 进行中
      scrollViewProgress: {
        // 场景值
        businessType: '',
        // 排序方式
        sortType: '1',
        mescroll: null,
        list: [],
        isListInit: false
      },
      fuzzy: false,
      businessType: '',
      handEntryCon: false,
      handCount: '',
      basicDialog: { // 模态框
        btns: [
          {
            text: '取消',
            handler: this.handEntryCancel,
          },
          {
            text: '确认',
            handler: this.handEntryConfirm,
          },
        ],
      },
      // 业务场景下拉数据
      scenarioList: [],
      // 异常订单场景
      oddScenarioList: [
        {
          itemCode: '0',
          itemName: '待审核'
        },
        {
          itemCode: '1',
          itemName: '审核通过'
        },
        {
          itemCode: '2',
          itemName: '审核驳回'
        },
        {
          itemCode: '3',
          itemName: '人工处理'
        }
      ],
      // 异常订单-排序方式
      oddOrderSortList: [
        {
          id: '1',
          name: '按照更新时间降序'
        },
        {
          id: '2',
          name: '按照创建时间降序'
        }
      ],
      showVerificationDialog: false,
      showVerificationDialog_ADJ: false,
      currentHeXiaoCode: null,
      currentHeXiaoId: null,
      verificationRemark: ""
    };
  },
  activated() {
    // window.location.reload();
  },
  created() {
    if (this.$route.query.businessScenarios) {
      // 一站筑家跳转过来的
      this.scrollViewProgress.businessType = this.$route.query.businessScenarios;
      this.defalutCheckedsortId = this.$route.query.businessScenarios;
      console.log(this.scrollViewProgress);
    }
    if (localStorage.getItem('confirm') === 'list') {
      this.curTab = 3;
      localStorage.setItem('confirm', '');
    } else if (localStorage.getItem('confirm') === 'caogao') {
      this.curTab = 4;
      localStorage.setItem('confirm', '');
    }
    const userinfostr = localStorage.getItem('userinfo');
    this.userinfo = JSON.parse(userinfostr);

    this.getNoticeData();
    this.getScenarioList();
  },
  computed: {
    ...mapGetters([
      GET_USER
    ]),
    curScrollViewName() {
      // 当前tab下的scrollView的ref名字
      return {
        4: 'scrollView',
        1: 'scrollViewProgress',
        2: 'scrollViewOdd',
        3: 'scrollViewFinished',
      }[this.curTab];
    }
  },
  watch: {
    curTab(val) {
      const obj = {
        4: 'scrollView',
        1: 'scrollViewProgress',
        2: 'scrollViewOdd',
        3: 'scrollViewFinished',
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
    getScenarioList() {
      /* 获取业务场景下拉数据 */
      this.productService.commonTypeQuery('BUSINESS_SCENARIOS').then((res) => {
        if (res.code === 1) {
          this.scenarioList = res.data;
        }
      });
    },
    // 获取消息
    getNoticeData() {
      this.orderService
        .queryOverTwentyFourHourOrder().then((res) => {
          if (res.code === 1) {
            this.noticeNum = res.data;
          }
        });
    },
    change(item, index) {
      this.curTab = index;
    },
    // 手工录单
    handEntry() {
      this.orderService.checkCreateOrder().then((res) => { // 判断店铺是否冻结
        if (res.code === 1) {
          const orderMode = JSON.parse(localStorage.getItem('userinfo')).orderMode;
          if (orderMode === 'Casarte') {
            Toast.failed('卡萨帝模式，不支持手动录单');
            return;
          }
          this.orderService.checkUpperLimitForSGLD().then((sgldRes) => {
            if (sgldRes.code === 1) {
              this.handEntryCon = true;
              this.handCount = sgldRes.data;
            }
          });
        }
      });
    },
    handEntryConfirm() {
      /* 手工录单弹窗确认 */
      this.handEntryCon = false;
      this.$router.push({
        name: 'Order.OrderEntry',
        params: {
          customerConsigneeInfo: {},
          region: 'hand'
        }
      });
    },
    handEntryCancel() {
      this.handEntryCon = false;
    },
    itemClick(followItem) {
      this.$router.push({
        name: 'Order.OrderDetail',
        params: {
          orderNo: followItem.orderNo
        }
      });
    },
    gujiaClick(item) {
      wx.miniProgram.navigateTo({
        // url: `/pages/userService/userService?userId=${item.userId}&userName=${item.userName}&mobile=${item.userMobile}&workFlowId=${item.workFlowId}&flowStatus=${item.flowStatus}&domainName=${item.domainName}&id=${item.id}` });
        url: `/pages/message/valuationInfo/valuationInfo?odlfornewdbId=${item.sourceSn}&workFlowId=${item.id}&storeId=${item.storeId}`
      });
    },
    againEntry(item) {
      this.$router.push({
        name: 'Order.OrderEntry',
        params: {
          customerConsigneeInfo: {
            username: item.userName,
            mobile: item.userMobile,
            recordMode: item.recordMode,
            businessScenarios: item.businessScenarios,
          },
          region: 'new'
        }
      });
    },
    // 入户服务
    userService(item) {
      const {
        businessScenarios
      } = item;
      const args = {
        userId: item.userId,
        userName: item.userName,
        mobile: item.userMobile,
        flowStatus: item.flowStatus,
        workFlowId: item.id,
        hmcId: this.userinfo.hmcid,
        orderNo: item.orderNo,
        businessScenarios
      };
        // 爱到家需要传add4，add4是预留字段，由其他系统传递而来
      if (businessScenarios === 'ADJ') {
        args.add4 = item.add4;
        args.sourceSn = item.sourceSn;
      }
      const argsStr = this.bUtil.genQueryStringByObj(args);
      wx.miniProgram.navigateTo({
        url: `/pages/userService/userService${argsStr}`
      });
    },
    // 潜在客户
    maybeBuyer(item) {
      wx.miniProgram.navigateTo({
        url: `/pages/mabyByuser/mabyByuser?userId=${item.userId}&userName=${item.userName}&mobile=${item.userMobile}&flowStatus=${item.flowStatus}&workFlowId=${item.id}&domainName=${item.recordMode}&orderNo=${item.orderNo}`
      });
    },
    headSwitch(index) {
      if (index === this.preIndex) {
        this.headList[index].isActive = false;
        this.preIndex = '';
        return;
      }
      for (let i = 0; i < this.headList.length; i++) {
        if (i === index) {
          this.preIndex = index;
          this.headList[i].isActive = true;
        } else {
          this.headList[i].isActive = false;
        }
      }
    },
    upCallback(page) {
      // 下载过就设置已经初始化
      this[this.curScrollViewName].isListInit = true;
      this.searchData(page).then(({ result, pages }) => {
        this.$nextTick(() => {
          // 通过当前页的数据条数，和总页数来判断是否加载完
          this[this.curScrollViewName].mescroll.endByPage(result.length, pages);
        });
      });
    },
    checkClicked() {
      // 刷新页面、重置页码
      this.$nextTick(() => {
        this[this.curScrollViewName].mescroll.resetUpScroll();
      });
    },
    buttonClicked() {
      // 刷新页面
      this.$nextTick(() => {
        this[this.curScrollViewName].mescroll.resetUpScroll();
      });
    },
    followButtonClicked(val, info) {
      /* 订单按钮点击操作，包括继续录单、录新订单等等 */
      console.log(info);
      // 是否是以旧换新
      const oldForNew = info.businessScenarios === 'YJHX' ? 1 : undefined;
      if (val.name === '成交录单') {
        this.orderService.checkCreateOrder().then((res) => { // 判断店铺是否冻结
          if (res.code != -1) {
            const freezeMsg = res.data;
            this.$router.push({
              name: 'Order.OrderEntry',
              params: {
                customerConsigneeInfo: {
                  username: info.userName,
                  mobile: info.userMobile,
                  userId: info.userId,
                  recordMode: info.recordMode,
                  businessScenarios: info.businessScenarios,
                  sourceSn: info.sourceSn,
                  smld: true,
                  id: info.id,
                  freezeMsg,
                  oldForNew
                },
                region: 'new'
              }
            });
          }
        });
      } else if (val.name === '继续录单') {
        this.orderService.checkCreateOrder().then((res) => { // 判断店铺是否冻结
          if (res.code != -1) {
            this.$router.push({
              name: 'Order.OrderModify',
              params: {
                orderNo: info.orderNo,
                orderFollowId: info.id,
                businessScenarios: info.businessScenarios,
                recordMode: info.recordMode,
                region: 'continue',
                oldForNew
              }
            });
          }
        });
      } else if (val.name === '补录订单') {
        this.orderService.checkCreateOrder().then((res) => { // 判断店铺是否冻结
          if (res.code != -1) {
            this.$router.push({
              name: 'Order.OrderSupplement',
              params: {
                orderNo: info.orderNo,
                orderFollowId: info.id,
                oldForNew
              }
            });
          }
        });
      } else if (val.name === '核销') {
        if(info.businessScenarios === 'ADJ'){
          this.showVerificationDialog_ADJ = true;
        }else{
          this.showVerificationDialog = true;
        }
        this.verificationRemark = "";
        this.currentHeXiaoCode = info.add5;
        this.currentHeXiaoId = info.id;
      } else {
        // val.name === '录新订单'
        this.orderService.checkCreateOrder().then((res) => { // 判断店铺是否冻结
          if (res.code === 1) {
            const freezeMsg = res.data;
            // 生成一条新的待办
            this.orderService.createNewOrder({}, { orderFollowId: info.id }).then((createNewOrderRes) => {
              if (res.code === 1) {
                const orderFollowId = createNewOrderRes.data.id;
                this.$router.push({
                  name: 'Order.OrderEntry',
                  params: {
                    customerConsigneeInfo: {
                      freezeMsg,
                      username: info.userName,
                      mobile: info.userMobile,
                      userId: info.userId,
                      // recordMode: info.recordMode,
                      recordMode: res.data.recordMode,
                      businessScenarios: info.businessScenarios,
                      sourceSn: info.sourceSn,
                      id: orderFollowId,
                      oldForNew
                    },
                    region: 'new'
                  }
                });
              }
            });
          }
        });
      }
    },
    searchData(page) {
      /* 搜索订单 */
      let queryServiceName;
      let searchData;
      // 异常订单是单独的接口
      if (this.curScrollViewName === 'scrollViewOdd') {
        queryServiceName = 'queryRightsReviewList';
        searchData = {
          keyWord: this.searchWord,
          sortType: this[this.curScrollViewName].sortType * 1,
          status: this[this.curScrollViewName].businessType || '',
          hmcId: this[GET_USER].hmcid
        };
      } else {
        queryServiceName = 'queryOrderFollowList';
        searchData = {
          hmcId: this.userinfo.hmcid,
          storeId: this.userinfo.shopId,
          queryType: this.curTab,
          sortType: this[this.curScrollViewName].sortType * 1,
          recordMode: '',
          userStatus: '',
          orderFollowStatus: '',
          flowType: '',
          flowStatus: '',
          orderFollowSource: '',
          businessScenarios: this[this.curScrollViewName].businessType,
          sourceSystem: '',
          orderFollowStartDate: '',
          orderFollowEndDate: '',
          keyWord: this.searchWord
        };
      }
      return this.orderService[queryServiceName](
        searchData,
        {
          pageNum: page.num,
          pageSize: page.size,
        }
      )
        .then((res) => {
          const sroviewObj = {};
          if (res.code === 1) {
            const {
              result,
              pages
            } = res.data;
            sroviewObj.pages = pages;
            sroviewObj.result = result;
            if (result && result.length > 0) {
              this.anylizeData(result);
              console.log(page);
              if (page.num === 1) {
                console.log(this.curScrollViewName);
                this[this.curScrollViewName].list = [];
                this[this.curScrollViewName].list = this.currentList;
              } else {
                if (page.num > 1 && res.data.pages === 1) {
                  // todo
                } else {
                  this[this.curScrollViewName].list = this[this.curScrollViewName].list.concat(this.currentList);
                  console.log(this[this.curScrollViewName].list);
                }
              }
            } else {
              Toast.failed('暂无数据');
              this[this.curScrollViewName].list = [];
            }
          } else {
            this[this.curScrollViewName].mescroll.endErr();
          }
          return sroviewObj;
        });
    },
    anylizeData(curList) {
      curList.forEach((item) => {
        /**
           0-跟进中  1-已完成  2-草稿  3-暂不跟进 4-取消 5-异常
           * */
        if (item.flowStatus === 1) {
          // item.buttonList = [{ name: '录新订单' }, { name: '退货' }, { name: '换货' }];// 已完成
          // item.buttonList = [{ name: '录新订单' },{ name: '补录订单' }];// 已完成
          item.buttonList = [{ name: '录新订单' }];
        } else if (item.flowStatus === 0) {
          // item.buttonList = [{ name: '成交录单' }, { name: '发放卡券' }];
          item.buttonList = [{ name: '成交录单' }];
          if(item.businessScenarios === 'JKHXJ_RC'){
            if(item.writeOff == '0'){
              item.buttonList.push({ name: '核销' });
            }else if(item.writeOff == '1'){
              item.buttonList.push({ name: '已核销', disabled:true });
            }else if(item.writeOff == '2'){
              item.buttonList.push({ name: '无法核销', disabled:true });
            }
          }
          if(item.businessScenarios === 'ADJ'){
            if(item.writeOff == '0'){
              item.buttonList.push({ name: '核销' });
            }
          }
        } else if (item.flowStatus === 5) {
          item.buttonList = [{ name: '刷新' }, { name: '修改订单' }, { name: '录新订单' }];
        } else if (item.flowStatus === 2) {
          item.buttonList = [{ name: '继续录单' }];
        } else {
          item.buttonList = [];
        }

        item.showList = [];
        this.$set(item, 'detailShow', false);
        this.$set(item, 'show', false);
        if (this.curTab === 0) {
          if (item.userStatus === 1) {
            item.userS = '高潜';
            item.showList.push({
              id: '7',
              name: '取消高潜'
            }, {
              id: '3',
              name: '暂不跟进'
            });
          } else {
            item.userS = '';
            item.showList = [];
            item.showList.push({
              id: '6',
              name: '设为高潜'
            }, {
              id: '3',
              name: '暂不跟进'
            });
          }
        } else if (this.curTab === 1 || this.curTab === 4) {
          if (item.userStatus === 1) {
            item.userS = '高潜';
            item.showList = [
              {
                id: '7',
                name: '取消高潜'
              },
              {
                id: '3',
                name: '暂不跟进'
              }
            ];
          } else {
            item.userS = '';
            item.showList = [
              {
                id: '6',
                name: '设为高潜'
              },
              {
                id: '3',
                name: '暂不跟进'
              }
            ];
          }
          // 扫码录单 爱到家添加入户服务、潜在顾客、健康换新
          if (item.businessScenarios === 'SMLD' || item.businessScenarios === 'ADJ' || item.businessScenarios === 'JKHXJ_RC') {
            item.showList.push({
              id: '20',
              name: '入户服务'
            },
            {
              id: '21',
              name: '潜在客户'
            });
          }
        } else if (this.curTab === 3) {
          item.showList = [];
        }
        // 以旧换新,添加标记'已加微信' '无效微信'
        if (item.businessScenarios === 'YJHX') {
          const {
            add5
          } = item;
          if (add5 === '1') {
            item.showList.push({
              id: '22',
              name: '取消已加微信'
            },
            {
              id: '23',
              name: '无效微信',
              hide: true
            });
          } else if (add5 === '2') {
            item.showList.push({
              id: '22',
              name: '已加微信',
              hide: true
            },
            {
              id: '23',
              name: '取消无效微信'
            });
          } else {
            item.showList.push({
              id: '22',
              name: '已加微信'
            },
            {
              id: '23',
              name: '无效微信'
            });
          }
        }

        if (item.orderNo !== '') {
          item.showDetail = true;
          if (item.flowStatus !== 2) {
            item.productList = [];
          } else {
            if (item.add1 == '') {
              item.showDetail = false;
            }
          }
        } else {
          item.showDetail = false;
        }

        if (item.tardinessStatus === 1) {
          item.tardinessS = '已拖期';
        } else {
          item.usetardinessS = '';
        }
        if (item.flowStatus === 3) {
          item.flowS = '已忽略';
          this.grayShow = true;
        } else {
          item.flowS = '';
          this.grayShow = false;
        }
      });
      this.currentList = curList;
    },
    doVerification(){
      this.orderService.updateOrderFollowByType(
        {},
        {
          orderFollowId: this.currentHeXiaoId,
          type: '8',
          remark: this.verificationRemark
        }
      ).then((res) => {
        if (res.code === 1) {
          this.showVerificationDialog = false;
          this.showVerificationDialog_ADJ = false;
          this.updateOrderType();
        }
      });
    },
    fuzzySearch() {
      // 刷新页面、重置页码
      this[this.curScrollViewName].mescroll.resetUpScroll();
      this.fuzzy = true;
    },
    updateOrderType() {
      // this.updateList = true;
      // 刷新页面、重置页码
      this[this.curScrollViewName].mescroll.resetUpScroll();
    },
    updateStatusForYJHX(item, status) {
      /* 更新有效微信or无效微信状态 */
      return this.orderService.updateStatusForYJHX({
        orderFollowId: item.id,
        status
      });
    },
    showWeixinOptions(item) {
      /* 显示设置已加微信or无效微信选项 */
      for (let i = 0; i < item.showList.length; i++) {
        const option = item.showList[i];
        if (option.id === '22' || option.id === '23') {
          option.hide = false;
        }
      }
    },
    setWeixinStatus(item, index) {
      /* 设置是否已加微信 */
      const status = item.add5 === '1' ? '0' : '1';
      this.updateStatusForYJHX(item, status).then(({ code }) => {
        if (code === 1) {
          item.add5 = status;
          if (status === '1') {
            item.showList[index].name = '取消已加微信';
            const validWxOption = item.showList.find(v => v.id === '23');
            // 隐藏设置无效微信
            this.$set(validWxOption, 'hide', true);
          } else {
            item.showList[index].name = '已加微信';
            this.showWeixinOptions(item);
          }
        }
      });
    },
    setInvalidWeixinStatus(item, index) {
      /* 设置是否是无效微信 */
      const status = item.add5 === '2' ? '0' : '2';
      this.updateStatusForYJHX(item, status).then(({ code }) => {
        if (code === 1) {
          item.add5 = status;
          if (status === '2') {
            item.showList[index].name = '取消无效微信';
            const validWxOption = item.showList.find(v => v.id === '22');
            // 隐藏设置有效微信
            this.$set(validWxOption, 'hide', true);
          } else {
            item.showList[index].name = '无效微信';
            this.showWeixinOptions(item);
          }
        }
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'Order.OrderFollowCommitResult' || from.name === 'Order.OrderConfirm' || from.name === 'Order.OrderEntry' || from.name === 'Order.OrderModify') {
      next();
      // this.$router.go(0);
      // window.location.reload();
      // let href = window.location.href;
      // href += (href.indexOf('?') > -1 ? '&' : '?') + `
      // _t =${(Math.random() + '').replace('.', '')}`;
      // window.location.replace(href);
    } else {
      next();
    }
  },
  beforeRouteLeave(to, from, next) {
    // wx.miniProgram.switchTab({ url: '/pages/tool/tool' });
    if (to.name === 'Order.OrderFollowCommitResult' || to.name === 'Order.OrderConfirm' || to.name === 'Order.OrderUploadInvoice') {
      wx.miniProgram.switchTab({ url: '/pages/tool/tool' });
      // wx.miniProgram.navigateTo({ url: '/pages/tool/tool' });
      // next();
    } else if (to.name === 'Haierhouse.HaierhouseEntry') {
      this.$destroy();
      next();
    } else {
      next();
    }
  },
};
</script>

<style scoped lang="scss">
  .mescroll {
    /*padding: 21.6vw 0 0 0 !important;*/
    /*position: fixed;
    top: 21.6vw;*/
    // 90 72 50
    height: calc(100vh - 212px);
  }

  .md-notice-bar {
    position: absolute;
    height: 80px;
    width: 100%;
  }

  .search-class {
    width: 100%;
    height: 90px;
    background-color: #f5f5f5;
  }

  .orderFollowButton-search {
    padding-left: 24px;
    padding-right: 24px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #1969c6;
    border: 1px #1969c6 solid;
    font-size: 28px;
    width: 180px;
    border-radius: 30px;
    position: absolute;
    top: 15px;
    left: 560px;
  }

  .search-image {
    width: 32px;
    height: 32px;
    position: absolute;
    left: 480px;
    top: 25px;
  }

  .search-view {
    position: relative;
    padding-bottom: 10px;
  }

  .input-class {
    width: 500px;
    background-color: white;
    border-radius: 20px;
    border: 0 !important;
    height: 60px;
    margin-left: 24px;
    margin-top: 14px;
    padding-left: 30px !important;
    color: #666666;
    font-size: 28px;
    padding-right: 50px !important;
  }

  .bottom-class {
    margin-top: 20px;
    padding-top: 15px;
    height: 80px;
    border-top: 1px solid #eeeeee;
  }

  .page-class {
    background-color: #f5f5f5;

    .md-notice-bar {
      color: #E89748;
      background-color: #FDF0CE;
      height: 80px;
    }
  }

  .notice-bar {
    height: 80px;
  }

  .md-example-child-tab-bar-4 {
    position: fixed;
    bottom: 0;
    width: 750px;
    z-index: 10;
    background-color: red;

    .custom-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      // flex: 1;
    }

    .text {
      font-size: 20px;
    }

    .md-tab-bar-inner {
      width: 750px !important;
    }

    .md-tab-bar {
      padding: 0 !important;
    }
  }

  .iconfont1 {
    font-family: "iconfont" !important;
    font-size: 45px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .popHand {
    text-align: center;
    font-size: 34px;
    color: #1969C6;
    width: 600px;
    height: 290px;
    background-color: white;
    border-radius: 20px;
    padding-top: 40px;

  }

  .pop-div {
    margin-top: 10px;
    border-top: 1px solid #1969C6;
    text-align: center;
    padding-top: 20px;

    .popConfirm2 {
      display: inline-block;
      width: 300px;
    }

    .popConfirm1 {
      display: inline-block;
      width: 300px;
      border-right: 1px #1969C6 solid;
    }
  }
  .verificationDialog{
    ::v-deep.md-dialog-body{
      max-height: 60vw !important;
      text-align: center;
    }
    .verification-code{
      font-size:40px;
      font-family:PingFang SC;
      font-weight:bold;
      line-height:27px;
      color:rgba(25,105,198,1);
    }
    .common-submit-btn-default{
      margin-top: 24px;
    }
    .flex{
      display: flex;
    }
    .margin-left{
      margin-left: 30px;
    }
    .text-df{
      font-size: 28px;
    }
    .algin-center{
      align-items: center;
    }
    .justify-center{
      justify-content: center;
    }
    .text-input{
      line-height: 30px;
      padding: 0 20px;
      width: 260px;
      height: 50px;
    }
    .line-height{
      line-height: 50px;
      height: 50px;
    }
    .padding-top{
      padding-top: 60px;
    }
    .padding-bottom{
      padding-bottom: 60px;
    }
  }
</style>
