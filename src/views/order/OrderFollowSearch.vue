<template>
  <div class="page-class">
    <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-4">
    <md-notice-bar
      mode="closable"
      :time="4000"
    >
      您有{{noticeNum}}笔超过24小时未处理的订单，请及时跟进
    </md-notice-bar>
    </div>
    <div class="uni-form-item uni-column search-view">
      <input
        class="input-class"
        confirm-type="search"
        placeholder="搜索用户姓名、电话或产品"
        placeholder-style="font-size: 28px;color: #BBBBBB;margin-left: 10px;"
        v-model="searchWord"
      />
      <img
        src="@/assets/images/orderFollow-up/search@3x.png"
        class="search-image"
        @click="fuzzySearch()"
      >
      <p class="orderFollowButton">手动录单</p>
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
      ></b-order-follow-item>
   </div>
   <div
        id="scrollViewFinished"
        ref="scrollViewFinished"
        class="mescroll"
   v-show="curScrollViewName==='scrollViewFinished'"
      >
      <b-order-follow-item
            :list="scrollView.list"

      ></b-order-follow-item>
   </div>
   <div
        id="scrollViewOdd"
        ref="scrollViewOdd"
        class="mescroll"
   v-show="curScrollViewName==='scrollViewOdd'"
      >
      <b-order-follow-item
            :list="scrollView.list"

      ></b-order-follow-item>
   </div>
   <div
        id="scrollViewProgress"
        ref="scrollViewProgress"
        class="mescroll"
   v-show="curScrollViewName==='scrollViewProgress'"
      >
      <b-order-follow-item
            :list="scrollView.list"

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
            <i class="iconfont1 icon-picGrid" v-show="item.name == 0"></i>
            <i class="iconfont1 icon-picGrid1" v-show="item.name == 1"></i>
            <i class="iconfont1 icon-picGrid2" v-show="item.name == 2"></i>
            <i class="iconfont1 icon-picGrid3" v-show="item.name == 3"></i>
          </div>
          <div class="text">
            <span v-text="item.label"></span>
          </div>
        </div>
       </template>
    </md-tab-bar>
  </div>
  </div>
</template>
<script>
import {
  Icon,
  TabBar,
  ScrollView,
  ScrollViewRefresh,
  ScrollViewMore,
  Toast,NoticeBar
} from "mand-mobile";
import {BPopSortType,BPopButton} from '@/components/form';
import {BOrderFollowItem} from '@/components/orderFollow'

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
    BPopSortType,BPopButton,BOrderFollowItem
  },
  data() {
    return {
      pageNum:1,
      searchWord: "",
      show: false,
      isFinished:true,
      curTab: 0,
      handleList:[],
      noticeNum:'',
      items: [
        {
          name: 0,
          label: "全部",
          icon: "quanbu"
        },
        {
          name: 1,
          label: "跟进中",
          icon: "genjin"
        },
        {
          name: 2,
          label: "异常",
          icon: "yichang"
        },
        {
          name: 3,
          label: "已成交",
          icon: "chengjiao"
        }
      ],
      preIndex:'',
      currentScrollView:{},
      currentList:[],
      checkedsortId: "",
      checkedButtonId: "",
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
      //进行中
      scrollViewProgress: {
        mescroll: null,
        list: [],
        isListInit: false
      }
    };
  },
  created() {
    // this.searchData();
this.getNoticeData();
  },
   computed: {
    curScrollViewName() {
      // 当前tab下的scrollView的ref名字
      return {
        0: 'scrollView',
        1: 'scrollViewProgress',
        2: 'scrollViewOdd',
        3: 'scrollViewFinished',
      }[this.curTab];
    }
  },
  watch: {
    curTab(val) {
      const obj = {
         0: 'scrollView',
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
    getNoticeData(){
      this.orderService
        .queryOverTwentyFourHourOrder().then(res => {
            if(res.code === 1){
              this.noticeNum = res.data
            }
        })
    },
    change(item, index, prevIndex){
      debugger
      this.curTab = index
    },
    headSwitch(index){
      if(index === this.preIndex){
        this.headList[index].isActive = false
        this.preIndex = ''
        this.sortShow = false
        this.scenarioShow = false
        return
      }
      for(var i = 0; i < this.headList.length;i ++){
        if(i === index){
          this.preIndex = index
          this.headList[i].isActive = true
        }else{
           this.headList[i].isActive = false
        }
      }
      if(index === 0){
        this.sortShow = true
        this.scenarioShow = false
      }else if(index === 1){
        this.sortShow = false
        this.scenarioShow = true
      }else{
        this.sortShow = false
        this.scenarioShow = false
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

    checkClicked(val){
      this.checkedsortId = val;
      this.searchData({ num: 0,size: 10})
    },
    buttonClicked(val){
      this.checkedButtonId = val;
      this.searchData({ num: 0,size: 10})
    },

    searchData(page) {
      return this.orderService
        .queryOrderFollowlList(
          {
            hmcId: "A0008949",
            queryType:this.curTab,
            sortType: this.sortType,
            recordMode: '',
            userStatus: '',
            orderFollowStatus: '',
            flowType: '',
            flowStatus: '',
            orderFollowSource: '',
            businessScenarios: this.scenarioType,
            sourceSystem: '',
            orderFollowStartDate: '',
            orderFollowEndDate: ''
          },
          {
            pageNum: page.num,
            pageSize: page.size
          }
        )
        .then(res => {
          const sroviewObj = {};
        if (res.code === 1) {
          const {
            result,
            pages
          } = res.data;
          sroviewObj.pages = pages;
          sroviewObj.result = result;
          if (result && result.length > 0) {
           const curList = result
           this.anylizeData(curList)
            // this.$nextTick(() => {
           if (page.num === 1) {
              this[this.curScrollViewName].list = this.currentList;
            } else {
              this[this.curScrollViewName].list = this[this.curScrollViewName].list.concat(this.currentList);
            }
        // });

          }
          // this.dataList = res.data.result;
        } else {
          this[this.curScrollViewName].mescroll.endErr();
        }
        return sroviewObj;

        });
    },
    anylizeData(curList) {
      curList.forEach(item => {
        item.showList = [];
         this.$set(item, "detailShow", false);
        this.$set(item, "show", false);
        if(this.curTab === 0){
         if (item.userStatus === 1) {
          item.userS = "高潜";
          item.showList.push({ id: "2", name: "取消高潜" },{id:'3',name:'暂不跟进'});
        } else {
          item.userS = "";
          item.showList.push({ id: "6", name: "设为高潜" },{id:'3',name:'暂不跟进'});
        }
      }else if(this.curTab === 1){
        if (item.userStatus === 1) {
          item.userS = "高潜";
          item.showList.push({ id: "2", name: "取消高潜" },{id:'3',name:'暂不跟进'});
        } else {
          item.userS = "";
          item.showList.push({ id: "6", name: "设为高潜" },{id:'3',name:'暂不跟进'});
        }
      }else if(this.curTab === 3){
          item.showList.push({ id: "", name: "重新录单" },{id:'',name:'直接取消'});
      }else{

      }

      if(item.orderNo !=''){
         item.showDetail = true
        if(item.flowStatus != 2){
          item.productList = []
         this.orderService.queryOrderInfoByOrderNo({},{orderNo:item.orderNo}).then(response =>{
              if(response.code === 1){
                  const resData  = response.data
                  if(resData.orderDetailDtoList.length !== 0){
                    item.productList = resData.orderDetailDtoList
                    item.productList.forEach(val =>{
                      if(val.productBrand == 'haier'){
                        val.productBrandCN = '海尔'
                      }else{
                        val.productBrandCN ='卡萨帝'
                      }
                    })
                  }
              }
          })
        }else{
          if(item.add1 == ''){
            item.showDetail = false
          }
        }
      }else{
        item.showDetail = false
      }

        if (item.tardinessStatus === 1) {
          item.tardinessS = "已拖期";
        } else {
          item.usetardinessS = "";
        }
        if (item.flowStatus === 3) {
          item.flowS = "已忽略";
          this.grayShow = true;
        } else {
          item.flowS = "";
          this.grayShow = false;
        }
      });
      this.currentList = curList

    },
    fuzzySearch() {
      const page = { num: 0,
          size: 10}
      this.orderService
        .fuzzySearchOrderFollowList(
          {},
          {
            pageNum: 1,
            pageSize: 10,
            hmcId: "A0008949",
            keyword: this.searchWord
          }
        )
        .then(res => {
           const sroviewObj = {};
        if (res.code === 1) {
          const {
            result,
            pages
          } = res.data;
          sroviewObj.pages = pages;
          sroviewObj.result = result;
          if (result && result.length > 0) {
           const curList = result
           this.anylizeData(curList)
           if (page.num === 1) {
              this[this.curScrollViewName].list = this.currentList;
            } else {
              this[this.curScrollViewName].list = this[this.curScrollViewName].list.concat(this.currentList);
            }
          }
        }
        return sroviewObj;
        });
    },
    updateOrderType(type) {
        this.searchData({ num: 0,size: 10})
    },

  },
};
</script>

<style scoped lang="scss">
.orderFollowButton {
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
  right: 20px;
  top: 10px;
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
  .md-notice-bar{
    color:#E89748 ;
    background-color: #FDF0CE ;
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
.iconfont1{
 font-family: "iconfont" !important;
  font-size: 45px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
