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
        :chooseAll.sync="chooseAll"
      ></b-evaluate-product-list>
    </div>
    <b-float-search
      :show.sync="filterListShow"
      :filterList="filterList"
      @confirm="queryByCondition"
    ></b-float-search>
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
      // 排序方式
      orderSortList: [
        {
          id: '1',
          name: '按名字降序'
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
        industryList: [],
        years: [],
        sortType: '0'
      },
      list: [],
      // 右侧浮动筛选显示隐藏
      filterListShow: false,
      // 右侧浮动筛选的数据
      filterList: [],
      // 选择所有
      chooseAll: false,
      // 产品组数据
      industryAy: [],
      industryData: {}
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
      const getStatisticalParameter = this.campaignService.statisticalParameter();
      // 查询购买意愿
      const getBuyIntention = this.basicService.getBuyIntention();
      Promise.all([getIndustryList, getStatisticalParameter, getBuyIntention]).then(([
        industryData,
        {
          code: yearCode,
          data: yearData
        },
        {
          code: buyIntentionCode,
          data: buyIntentionData
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
        if (yearCode === 1) {
          const buyTime = {
            name: '购买时间',
            isExpand: true,
            type: 'checkbox',
            data: []
          };
          buyTime.data = yearData.yeasList.map(v => ({
            key: v.outputYear,
            value: v.outputYear,
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
                v.isChecked = false;
                v.industryName = this.industryData[v.industry];
              });
              if (page.num === 1) {
                this.list = result;
                document.querySelector('.evaluateProductList-scrollView').scrollTo(0, 0);
              } else {
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
    queryByCondition(searchForm) {
      /* 按条件搜索 */
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
    confirmSendCoupon() {
      /* 确认发卡券 */
      const messageVos = [];
      this.list.forEach((order) => {
        if (order.isChecked) {
          messageVos.push({
            oldForNewId: order.id,
            industry: order.industry,
            mobile: order.userPhone,
            price: order.totalPrice,
            sendType: 1,
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
    }
  }
};
</script>

<style lang="scss">
  .evaluateProductList-scrollView {
    height: calc(100vh - 164px);

    &.active {
      padding-bottom: 120px;
    }
  }


</style>
