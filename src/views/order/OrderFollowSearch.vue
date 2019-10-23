<template>
  <div class="page-class">
    <div class="">
      <md-notice-bar
        mode="closable"
        :time="4000"
      >
        您有{{noticeNum}}笔超过24小时未处理的订单，请及时跟进
      </md-notice-bar>
    </div>
    <div class="search-class">
      <input
        class="input-class"
        confirm-type="search"
        placeholder="搜索用户姓名、电话"
        placeholder-style="font-size: 28px;color: #BBBBBB;margin-left: 10px;"
        v-model="searchWord"
      />
      <img
        src="@/assets/images/orderFollow-up/search@3x.png"
        class="search-image"
        @click="fuzzySearch"
      >
      <p class="orderFollowButton-search" @click="handEntry()">手动录单</p>
    </div>
    <div
      id="scrollView"
      ref="scrollView"
      class="mescroll"
      v-show="curScrollViewName==='scrollView'"
    >
      <b-order-follow-item
        :list="scrollView.list"
        @checkClick="checkClicked"
        @popButtonClicked="buttonClicked"
        @updateOrderType="updateOrderType"
        @followButtonClick="followButtonClicked"
        @againEntry="againEntry"
        @itemClick="itemClick"
        @userService="userService"
        @maybeBuyer="maybeBuyer"
      ></b-order-follow-item>
    </div>
    <div
      id="scrollViewFinished"
      ref="scrollViewFinished"
      class="mescroll"
      v-show="curScrollViewName==='scrollViewFinished'"
    >
      <b-order-follow-item
        :list="scrollViewFinished.list"
        @checkClick="checkClicked"
        @popButtonClicked="buttonClicked"
        @updateOrderType="updateOrderType"
        @followButtonClick="followButtonClicked"
        @againEntry="againEntry"
        @itemClick="itemClick"
        @userService="userService"
        @maybeBuyer="maybeBuyer"
      ></b-order-follow-item>
    </div>
    <div
      id="scrollViewOdd"
      ref="scrollViewOdd"
      class="mescroll"
      v-show="curScrollViewName==='scrollViewOdd'"
    >
      <b-order-follow-item
        :list="scrollViewOdd.list"
        @checkClick="checkClicked"
        @popButtonClicked="buttonClicked"
        @updateOrderType="updateOrderType"
        @followButtonClick="followButtonClicked"
        @itemClick="itemClick()"
      ></b-order-follow-item>
    </div>
    <div
      id="scrollViewProgress"
      ref="scrollViewProgress"
      class="mescroll"
      v-show="curScrollViewName==='scrollViewProgress'"
    >
      <b-order-follow-item
        :list="scrollViewProgress.list"
        @checkClick="checkClicked"
        @popButtonClicked="buttonClicked"
        @updateOrderType="updateOrderType"
        @followButtonClick="followButtonClicked"
        @userService="userService"
        @itemClick="itemClick()"
        @maybeBuyer="maybeBuyer"
      ></b-order-follow-item>
    </div>
    <div style="height:60px"></div>
    <div class="md-example-child md-example-child-tabs md-example-child-tab-bar-4">
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
    <md-popup v-model="handEntryCon">
      <div class="popHand">
        您本月还有{{handCount}}个手工录单名额，超出限制后本月将不能手工录单！同时，手工录入的订单不能发放购机权益
        <div class="pop-div">
          <span @click="handEntryConfirm() " class="popConfirm1">确定</span>
          <span @click="handEntryCancel()" class="popConfirm2">取消</span>
        </div>

      </div>
    </md-popup>
  </div>
</template>
<script>
import {
  Icon,
  NoticeBar,
  ScrollView,
  ScrollViewMore,
  ScrollViewRefresh,
  TabBar,
  Toast,Popup
} from 'mand-mobile';
import {
  BPopButton,
  BPopSortType
} from '@/components/form';
import {
  BOrderFollowItem
} from '@/components/orderFollow';

export default {
  name: '',
  components: {
    [TabBar.name]: TabBar,
    [Icon.name]: Icon,
    [ScrollView.name]: ScrollView,
    [ScrollViewRefresh.name]: ScrollViewRefresh,
    [ScrollViewMore.name]: ScrollViewMore,
    [Toast.name]: Toast,
    [NoticeBar.name]: NoticeBar,
    BPopSortType,
    BPopButton,
    BOrderFollowItem,
    [Popup.name]: Popup
  },
  data() {
    return {
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
          label: '订单',
          icon: 'chengjiao'
        }
      ],
      sortType: '',
      preIndex: '',
      currentScrollView: {},
      currentList: [],
      checkedsortId: '',
      checkedButtonId: '',
      fuzzysearch: false,
      // 订单跟进全部
      scrollView: {
        mescroll: null,
        list: [],
        isListInit: false
      },
      // 已完成
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
      },
      // 进行中
      scrollViewProgress: {
        mescroll: null,
        list: [],
        isListInit: false
      },
      fuzzy:false,
      businessType:'',
      handEntryCon:false,
      handCount:''
    };
  },
  activated() {
    // window.location.reload();
  },
  created() {
    if (localStorage.getItem('confirm') === 'list') {
      this.curTab = 3;
      localStorage.setItem('confirm', '');
    }
    const userinfostr = localStorage.getItem('userinfo');
    this.userinfo = JSON.parse(userinfostr);
    // this.userinfo = {
    //   // hmcid: 'a0008949',
    //   // mobile: '18561715460',
    //   // shopId: '8800136445',
    //   // hmcid:'01467897',
    //   // mobile: '15253269729',
    //   // shopId: '8700000484',
    //   // hmcid: 'a0032188',
    //   // mobile: '13905427400',
    //   // shopId: '8700048360',
    //   hmcid: 'Z0166654',
    //   orderMode: 'Haier',
    //   // orderMode: 'Casarte',
    //   mobile: '15621017056',
    //   shopId: '8800266470',
    //   token:'eyJhbGciOiJIUzI1NiJ9.eyJBdXRob3JpdGllcyI6WyJST0xFX1NFTExFUiIsIlJPTEVfQVBQIl0sInN1YiI6IlowMTY2NjU0Iiwia2luZCI6MSwicG9pbnQiOjEsImlhdCI6MTU3MTY0MzUxOSwiZXhwIjoxNTcyNTA3NTE5fQ.enFcDUUuaR_IrewO533cyA9zGShVrHJIAT0VmHDsv-Y'
    // };
    // const Str = JSON.stringify(this.userinfo);
    // localStorage.setItem('userinfo', Str);
    // localStorage.setItem('acces_token', this.userinfo.token);

    this.getNoticeData();
  },
  computed: {
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
  mounted() {console.log('mounted')
    // 创建当前tab的MeScroll对象，并下拉刷新
    this.bUtil.scroviewTabChange(this.curScrollViewName, this);
  },
  methods: {
    getQueryString(name) {
      const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
      const r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    getNoticeData() {
      this.orderService
        .queryOverTwentyFourHourOrder().then((res) => {
          if (res.code === 1) {
            this.noticeNum = res.data;
          }
        });
    },
    change(item, index, prevIndex) {
      this.curTab = index;
    },
    handEntry() {
      const orderMode = JSON.parse(localStorage.getItem('userinfo')).orderMode;
      if (orderMode == 'Casarte') {
        Toast.failed('卡萨帝模式，不支持手动录单');
        return;
      }
      this.orderService.checkUpperLimitForSGLD().then(res => {
        if(res.code === 1){
          this.handEntryCon = true
          this.handCount = res.data
        }else {
            Toast.info('您已没有手动录单条数，请选择其他录单方式', 3000);
        }
      })

    },
    handEntryConfirm(){
      this.handEntryCon = false
      this.$router.push({
        name: 'Order.OrderEntry',
        params: { customerConsigneeInfo: {}, region: 'hand' }
      });
    },
    handEntryCancel(){
      this.handEntryCon = false
    },
    itemClick(index) {
      this.$router.push({
        name: 'Order.OrderDetail',
        params: { orderNo: this.currentList[index % 10].orderNo }
      });
    },
    againEntry(item) {
      // this.orderService.createNewOrder({}, { orderNo: item.orderNo }).then((res) => {
      //   if (res.code === 1) {
      //     Toast.succeed(res.msg);
      //   }
      // });
      this.$router.push({
        name: 'Order.OrderEntry',
        params: { customerConsigneeInfo: {
          userName: item.userName,
          mobile: item.userMobile,
          recordMode: item.recordMode
        },
        region: 'new' }
      });
    },
    // 入户服务
    userService(item) {
      wx.miniProgram.navigateTo({
        // url: `/pages/userService/userService?userId=${item.userId}&userName=${item.userName}&mobile=${item.userMobile}&workFlowId=${item.workFlowId}&flowStatus=${item.flowStatus}&domainName=${item.domainName}&id=${item.id}` });
        url: `/pages/userService/userService?userName=${item.userName}&mobile=${item.userMobile}&flowStatus=${item.flowStatus}&id=${item.id}`});
    },
    // 潜在客户
    maybeBuyer(item) {
      wx.miniProgram.navigateTo({ url: '/pages/mabyByuser/mabyByuser', userId: item.userId });
    },
    // searchProduct(item) {
    //   this.orderService.queryOrderInfoByOrderNo({}, { orderNo: item.orderNo }).then((response) => {
    //     if (response.code === 1) {
    //       const resData = response.data;
    //       if (resData.orderDetailDtoList.length !== 0) {
    //         item.productList = resData.orderDetailDtoList;
    //         item.productList.forEach((val) => {
    //           if (val.productBrand === 'haier') {
    //             val.productBrandCN = '海尔';
    //           } else {
    //             val.productBrandCN = '卡萨帝';
    //           }
    //         });
    //       }
    //     }
    //   });
    // },
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
      this.businessType = ''
      this.searchData(page).then(({ result, pages }) => {
        this.$nextTick(() => {
          // 通过当前页的数据条数，和总页数来判断是否加载完
          this[this.curScrollViewName].mescroll.endByPage(result.length, pages);
        });
      });
    },

    checkClicked(val) {
      this.updateList = true;
      this.sortType = val;
      this.businessType = ''
      this.searchData({
        num: 0,
        size: 10
      });
    },
    buttonClicked(val) {
      this.updateList = true;
      this.businessType = val.itemCode
      this.searchData({
        num: 0,
        size: 10
      });
    },
    followButtonClicked(val, info) {
      if (val.name === '成交录单') {
        this.$router.push({
          name: 'Order.OrderEntry',
          params: { customerConsigneeInfo: {
            userName: info.userName,
            mobile: info.userMobile,
            userId: info.userId,
            recordMode: info.recordMode,
            businessScenarios: info.businessScenarios,
            sourceSn: info.sourceSn,
            id: info.id,
          },
          region: 'new' }
        });
      } else if (val.name === '继续录单') {
        this.$router.push({
          name: 'Order.OrderModify',
          params: { orderNo: info.orderNo, orderFollowId: info.id }
        });
      } else if (val.name === '补录订单') {
        this.$router.push({
          name: 'Order.OrderSupplement',
          params: { orderNo: info.orderNo, orderFollowId: info.id }
        });
      } else {
        // val.name === '录新订单'
        // 生成一条新的待办
        this.orderService.createNewOrder({}, { orderNo: info.orderNo }).then((res) => {
          if (res.code === 1) {
            const orderFollowId = res.data.id;
            this.$router.push({
              name: 'Order.OrderEntry',
              params: { customerConsigneeInfo: {
                userName: info.userName,
                mobile: info.userMobile,
                userId: info.userId,
                recordMode: info.recordMode,
                businessScenarios: info.businessScenarios,
                sourceSn: info.sourceSn,
                id: orderFollowId,
              },
              region: 'new' }
            });
          }
        });
      }
    },

    searchData(page) {
      console.log('keyword', this.searchWord);
      return this.orderService
        .queryOrderFollowlList(
          {
            hmcId: this.userinfo.hmcid,
            storeId: this.userinfo.shopId,
            queryType: this.curTab,
            sortType: this.sortType,
            recordMode: '',
            userStatus: '',
            orderFollowStatus: '',
            flowType: '',
            flowStatus: '',
            orderFollowSource: '',
            businessScenarios: this.businessType,
            sourceSystem: '',
            orderFollowStartDate: '',
            orderFollowEndDate: '',
            keyWord: this.searchWord
          },
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
            if(this.fuzzy){
              if(result.length === 0){
                this[this.curScrollViewName].list = [];
                Toast.failed('搜索结果不存在')
                this.fuzzy = false
                return
              }
            }
            if (result && result.length > 0) {
              const curList = result;
              this.anylizeData(curList);
              if (!this.updateList) {
                console.log(page);
                if (page.num === 1) {
                  console.log(this.curScrollViewName)
                  this[this.curScrollViewName].list = [];

                  this[this.curScrollViewName].list = this.currentList;
                } else {
                  this[this.curScrollViewName].list = this[this.curScrollViewName].list.concat(this.currentList);
                  console.log(this[this.curScrollViewName].list);
                }
              } else {
                this[this.curScrollViewName].list = [];
                this[this.curScrollViewName].list = this.currentList;
                // this.updateList = false;
              }

              // });
            } else {
              Toast.failed('暂无数据')
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
        /*
        0-跟进中  1-已完成  2-草稿  3-暂不跟进 4-取消 5-异常
        */
        if (item.flowStatus === 1) {
          // item.buttonList = [{ name: '录新订单' }, { name: '退货' }, { name: '换货' }];// 已完成
          // item.buttonList = [{ name: '录新订单' },{ name: '补录订单' }];// 已完成
          item.buttonList = [{ name: '录新订单' }];
        } else if (item.flowStatus === 0) {
          // item.buttonList = [{ name: '成交录单' }, { name: '发放卡券' }];
          item.buttonList = [{ name: '成交录单' }];
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
            item.showList = [];
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
          if (item.businessScenarios === 'SMLD') {
            item.showList.push({
              id: '20',
              name: '入户服务'
            }, {
              id: '21',
              name: '潜在客户'
            });
          }
        } else if (this.curTab === 3) {
          item.showList = [];
          // item.showList.push({
          //   id: '10',
          //   name: '重新录单'
          // }, {
          //   id: '11',
          //   name: '直接取消'
          // });
        } else {
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
    fuzzySearch() {
      this.updateList = true;
      const page = {
        num: 1,
        size: 10
      };
      this.businessType = ''
      this.searchData(page);
      this.fuzzy = true
    },
    updateOrderType(type) {
      this.updateList = true;
      this.businessType = ''
      this.searchData({
        num: 0,
        size: 10
      });
    },

  },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'Order.OrderFollowCommitResult' || from.name === 'Order.OrderConfirm') {
      next();
      window.location.reload();
    }
    next();
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'Order.OrderFollowCommitResult' || to.name === 'Order.OrderConfirm' || to.name === 'Order.OrderUploadInvoice') {
      wx.miniProgram.switchTab({ url: 'pages/tool/tool' });
      next();
    }
    next();
  },
};
</script>

<style scoped lang="scss">
  .md-notice-bar {
    position: absolute;
    width: 100%;
  }
  .search-class{
    width: 100%;
    height: 90px;
    background-color: #f5f5f5;
    position: fixed;
    top: 0;
    z-index: 12;
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

  .bar-class {
    height: 72px;
    width: 250px;
    float: left;
    position: relative;
  }

  .bar-v {
    background-color: white;
    height: 72px;
    margin-top: 15px;
  }

  .bottom-class {
    margin-top: 20px;
    padding-top: 15px;
    height: 80px;
    border-top: 1px solid #eeeeee;
  }

  .page-class {
    background-color: #f5f5f5;
    height: 1330px;

    .md-notice-bar {
      color: #E89748;
      background-color: #FDF0CE;
    }
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
  .popHand{
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
</style>
