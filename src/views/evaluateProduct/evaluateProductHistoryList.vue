<template>
  <div>
    <b-search-input
      v-model="searchForm.customer"
      @search="queryByCondition('')"
      placeholder="请输入姓名、电话、地址进行搜索"
    ></b-search-input>
    <b-order-follow-search-bar
      :sortArray="orderSortList"
      :sortType.sync="searchForm.sortType"
      :isShowScenario="false"
      :isShowFilter="true"
      :otherHeadList="multiOptionsAy"
      @checkClick="queryBySortType"
    >
    </b-order-follow-search-bar>
    <div
      id="scrollView"
      ref="scrollView"
      class="mescroll evaluateProductList-scrollView"
      :class="[isMultiChooseMode && 'active']"
    >
      <b-evaluate-product-list
        :list="list"
        :multiChooseMode="isMultiChooseMode"
        @confirmCoupon="confirmSendCoupon"
        @shareClick="shareClick"
        :chooseAll.sync="chooseAll"
      ></b-evaluate-product-list>
    </div>
    <b-float-search
      :show.sync="filterListShow"
      :filterList="filterList"
      :conditions="conditions"
      @confirm="confirmSearch"
    ></b-float-search>
    <div class="popContainer" v-if="isShowPopContainer" @click="closeShare" style="z-index: 100000">
      <img src="@/assets/images/activity/activity-share.png" alt="" class="activity-detail-share">
    </div>
  </div>
</template>

<script>
import BSearchInput from '@/components/business/BSearchInput';
import BOrderFollowSearchBar from '@/components/orderFollow/BOrderFollowSearchBar';
import {
  BEvaluateProductList
} from '@/components/business/evaluateProduct';
import {
  BFloatSearch
} from '@/components/business/common';

import {
  mapGetters
} from 'vuex';

import {
  GET_USER
} from '@/store/mutationsTypes';

export default {
  name: 'evaluateProductList',
  components: {
    BEvaluateProductList,
    BFloatSearch,
    BOrderFollowSearchBar,
    BSearchInput
  },
  data() {
    return {
      isShowPopContainer: false,
      // 排序方式
      orderSortList: [
        {
          id: '1',
          name: '按名字升序'
        },
        {
          id: '0',
          name: '按照时间降序'
        }
      ],
      // 搜索栏增加的批量操作、筛选
      multiOptionsAy: [
        {
          show: true,
          name: '筛选',
          isActive: false,
          icon: 'icon-shaixuan',
          activeClass: '',
          customeClick: this.toggleFilter.bind(this)
        },
        {
          show: true,
          name: '批量操作',
          isActive: false,
          icon: 'icon-piliang-copy',
          customeClick: this.toggleMultiChooseOrder.bind(this)
        }
      ],
      // 是否开启多选模式
      isMultiChooseMode: false,
      // 估价历史
      scrollView: {
        mescroll: null,
        isListInit: false
      },
      // 搜索参数
      searchForm: {
        customer: '',
        buyIntention: '',
        distributeStatus: '',
        industryList: [],
        years: [],
        sneakType: '',
        sortType: '0',
        addWxStatus: ''
      },
      list: [],
      // 右侧浮动筛选显示隐藏
      filterListShow: false,
      // 右侧浮动筛选的数据
      filterList: [],
      // 浮动搜索key,type
      conditions: [
        {
          key: 'industryList',
          type: 'checkbox'
        },
        {
          key: 'sneakType',
          type: 'radio'
        },
        {
          key: 'buyIntention',
          type: 'radio'
        },
        {
          key: 'distributeStatus',
          type: 'radio'
        },
        {
          key: 'addWxStatus',
          type: 'radio'
        }
      ],
      // 选择所有
      chooseAll: false,
      // 产品组数据
      industryAy: [],
      industryData: {},
    };
  },
  created() {
    this.getFilterList();
  },
  mounted() {
    // 创建当前tab的MeScroll对象，并下拉刷新
    this.bUtil.scroviewTabChange('scrollView', this);
  },
  watch: {
    filterListShow(val) {
      const body = document.querySelector('body');
      if (val) {
        body.addEventListener('touchmove', this.preventDefault, { passive: false });
        body.style.position = 'fixed';
      } else {
        body.removeEventListener('touchmove', this.preventDefault);
        body.style.position = 'static';
      }
    }
  },
  computed: {
    curScrollViewName() {
      return 'scrollView';
    },
    ...mapGetters([
      GET_USER
    ])
  },
  filters: {
    industryFilter(val) {
      return this.industryData[val] || '';
    }
  },
  methods: {
    closeShare() {
      this.isShowPopContainer = false;
    },
    preventDefault(e) {
      if (!document.querySelector('.bFloatSearch-cnt-list').contains(e.target)) {
        e.preventDefault();
      }
    },
    searchByCondition() {
      /* 搜索订单 */
    },
    toggleMultiChooseOrder() {
      /* toggle多选订单模式 */
      this.isMultiChooseMode = !this.isMultiChooseMode;
    },
    toggleFilter() {
      /* 切换筛选显示隐藏 */
      this.filterListShow = !this.filterListShow;
    },
    convertIndustryList(industryData) {
      // 用来避免多次循环显示产业名的object
      industryData.forEach((v) => {
        this.industryData[v.industry] = v.industryName;
      });
    },
    getIndustryList() {
      /* 获取产业数据 */
      if (this.industryAy.length) {
        return Promise.resolve(this.industryAy);
      }
      return this.campaignService.listOldForNewIndustry().then(({ code, data }) => {
        if (code === 1) {
          this.convertIndustryList(data);
          this.industryAy = data;
        }
        return this.industryAy;
      });
    },
    getFilterList() {
      /* 构建右侧搜索栏目的数据 */
      // 查询产业数据
      const getIndustryList = this.getIndustryList();
      // 查询年限
      // const getStatisticalParameter = this.campaignService.statisticalParameter();
      // 查询潜客
      const getSneakType = this.productService.commonTypeQuery('SNEAK_TYPE');
      // 查询购买意愿
      const getBuyIntention = this.basicService.getBuyIntention();
      // 查询分配状态
      const getDistributeStatus = this.basicService.dictionary('distribute_status');
      // 获取微信状态
      const getWxStatus = this.basicService.dictionary('add_wx_status');
      Promise.all([
        getIndustryList,
        getSneakType,
        getBuyIntention,
        getDistributeStatus,
        getWxStatus,
      ]).then(([
        industryData,
        {
          code: sneakCode,
          data: sneakData
        },
        {
          code: buyIntentionCode,
          data: buyIntentionData
        },
        {
          code: distributeStatusCode,
          data: distributeStatusData
        },
        {
          code: wxStatusCode,
          data: wxStatusData
        }
      ]) => {
        if (industryData) {
          const industry = {
            name: '产业',
            isExpand: true,
            type: 'checkbox',
            data: []
          };
          industry.data = industryData.map(v => ({
            key: v.industry,
            value: v.industryName,
            isChecked: false
          }));
          this.filterList.push(industry);
        }
        if (sneakCode === 1) {
          const buyTime = {
            name: '潜客类型',
            isExpand: true,
            type: 'radio',
            data: []
          };
          buyTime.data = sneakData.map(v => ({
            key: v.itemCode,
            value: v.itemName,
            isChecked: false
          }));
          this.filterList.push(buyTime);
        }
        if (buyIntentionCode === 1) {
          const buyIntention = {
            name: '购买意向',
            tips: '(单选)',
            isExpand: true,
            type: 'radio',
            data: []
          };
          buyIntention.data = buyIntentionData.map(v => ({
            key: v.itemCode,
            value: v.itemName,
            isChecked: false
          }));
          this.filterList.push(buyIntention);
        }
        // 分配状态
        if (distributeStatusCode === 1) {
          const distributeStatus = {
            name: '分配状态',
            isExpand: true,
            type: 'radio',
            data: []
          };
          distributeStatus.data = distributeStatusData.map(v => ({
            key: v.itemCode,
            value: v.itemName,
            isChecked: false
          }));
          this.filterList.push(distributeStatus);
        }
        // 加微信状态
        if (wxStatusCode === 1) {
          const wxStatus = {
            name: '加微信状态',
            isExpand: true,
            type: 'radio',
            data: []
          };
          wxStatus.data = wxStatusData.map(v => ({
            key: v.itemCode,
            value: v.itemName,
            isChecked: false
          }));
          this.filterList.push(wxStatus);
        }
      });
    },
    upCallback(page) {
      // 加载过就设置已经初始化
      this.scrollView.isListInit = true;
      this.query(page).then(({ code, data }) => {
        if (code === 1) {
          const {
            result,
            total
          } = data;
          this.$nextTick(() => {
            this.getIndustryList().then(() => {
              result.forEach((v) => {
                if (this.chooseAll === true) {
                  v.isChecked = true;
                } else {
                  v.isChecked = false;
                }
                v.industryName = this.industryData[v.industry];
              });
              if (page.num === 1) {
                this.list = result;
                document.querySelector('.evaluateProductList-scrollView').scrollTo(0, 0);
              } else {
                // this.chooseAll = false;
                this.list = this.list.concat(result);
              }
              // 通过当前页的数据条数，和总数据量来判断是否加载完
              this.scrollView.mescroll.endBySize(result.length, total);
            });
          });
        } else {
          this.scrollView.mescroll.endErr();
        }
      });
    },
    query(page) {
      /* 查询估价历史 */
      return this.campaignService.getOldForNewHistory({
        hmcId: this[GET_USER].hmcid,
        ...this.searchForm,
        pageNo: page.num,
        pageSize: page.size,
      });
    },
    confirmSearch(searchForm) {
      // 检查搜索值是否不一样
      if (
        // !this.bUtil.isSameValueOfOneDimensional(this.searchForm.industryList, searchForm.industryList)
        !this.judgeArrsSame(this.searchForm.industryList, searchForm.industryList)
        || this.searchForm.sneakType !== searchForm.sneakType
        || this.searchForm.buyIntention !== searchForm.buyIntention
        || this.searchForm.distributeStatus !== searchForm.distributeStatus
        || this.searchForm.addWxStatus !== searchForm.addWxStatus
      ) {
        this.queryByCondition(searchForm);
      }
    },
    queryByCondition(searchForm) {
      /* 按条件搜索 */
      this.chooseAll = false;
      if (searchForm) {
        this.searchForm = {
          ...this.searchForm,
          ...searchForm
        };
      }

      this.scrollView.mescroll.resetUpScroll();
    },
    queryBySortType() {
      /* sortType更新后调用 */
      this.$nextTick(() => {
        this.queryByCondition();
      });
    },
    confirmSendCoupon(ids) {
      /* 确认发卡券 */
      const messageVos = [];
      this.list.forEach((order) => {
        if (order.isChecked) {
          messageVos.push({
            oldForNewId: order.id,
            industry: order.industryName,
            mobile: order.userPhone,
            price: order.totalPrice,
            sendType: ids[0],
            userName: order.userName,
          });
        }
      });
      // 发短信
      this.campaignService.batchSendMessage(messageVos).then(({ code, msg }) => {
        if (code === 1) {
          this.$dialog.alert({
            content: msg
          });
          // 重置选择
          this.chooseAll = false;
          this.list.forEach((order) => {
            order.isChecked = false;
          });
        }
      });
    },
    shareClick() {
      this.isShowPopContainer = true;
      const idList = [];
      this.list.forEach((order) => {
        if (order.isChecked) {
          idList.push(order.id);
        }
      });
      console.log(idList);
      wx.ready(() => {
        wx.miniProgram.postMessage({
          data: {
            oldForNewIds: idList
          }
        });
      });
    },
    judgeArrsSame(arr1, arr2) {
      if (arr1.sort().toString() === arr2.sort().toString()) {
        return true;
      }
      return false;
    }
  },
};
</script>

<style lang="scss">
  .evaluateProductList-scrollView {
    height: calc(100vh - 164px);

    &.active {
      padding-bottom: 120px;
    }
  }
  .popContainer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  .activity-detail-share {
    position: fixed;
    right: 128px;
    width: 493px;
    height: 694px;
  }
</style>
