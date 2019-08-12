<template>
  <div class="page-class">
    <div
      class="notice-class"
      v-show="noticeShow"
    >
      <p class="notice-p">您有三笔超过24小时未处理的订单，请及时跟进</p>
      <img
        src="@/assets/images/orderFollow-up/close@3x.png"
        alt=""
        class="notice-image"
        @click="noticeClose"
      >
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

    <!-- <div class="bar-v">
      <div
        class="bar-class"
        v-for="(item,index) in headList"
        :key="index"
      >
        <p class="order-span" v-bind:class="{active:item.isActive}" @click="headSwitch(index)">{{item.name}}</p>
        <img
          v-bind:src="item.activeIcon"
          class="xialaimage"
        >
      </div>
    </div> -->
    <!-- <b-pop-sort-type
    :show.sync="sortShow"
      :list="sortList"
      >
    </b-pop-sort-type>
    <b-pop-button
    :show.sync="scenarioShow"
    :list="scenarioList"
    ></b-pop-button> -->
   <div
        id="scrollView"
        ref="scrollView"
        class="mescroll"
   v-show="curScrollViewName==='scrollView'"
      >
      <b-order-follow-item
            :list="scrollView.list"
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
        <!-- <div
          class="label-class"
          v-for="(data,index) in scrollView.list"
          :key="index"
        > -->

          <!-- <img
            src="@/assets/images/orderFollow-up/yizhanzhujia@3x.png"
            class="labelImage"
          >
          <div class="row-class">
            <span class="label-span">{{data.userName}}</span>
            <span
              class="sex-class"
              v-show="data.userSex == '1'"
            >先生</span>
            <span
              class="sex-class"
              v-show="data.userSex == '2'"
            >女士</span>
            <span class="sex-class">
              <img
                src="@/assets/images/orderFollow-up/tel@3x.png"
                class="telImage"
              >
            </span>
            <span class="sex-class">{{data.userMobile}}</span>
          </div>
          <div class="row-class">
            <img
              src="@/assets/images/orderFollow-up/Haier@3x.png"
              class="brandImage"
              v-show="data.recordMode =='Haie'"
            >
            <img
              src="@/assets/images/orderFollow-up/Casarte@3x.png"
              class="brandImage"
              v-show="data.recordMode =='Casarte'"
            >
            <span class="hand-class">{{data.userS}}</span>
            <span class="handred-class">{{data.tardinessS}}</span>
            <span class="handgray-class">{{data.flowS}}</span>
          </div>
          <div class="row-class">
            <img
              src="@/assets/images/orderFollow-up/time@3x.png"
              class="timeImage"
            >
            <span class="time-label">{{data.updatedTime}}</span>
            <span class="information-class">详细信息</span>
            <img
              src="@/assets/images/orderFollow-up/xialablue@3x.png"
              class="information-xiala"
              @click="detailHide(index)"
            >
          </div>
          <div
            class="information-p"
            v-show="data.detailShow"
          >
            <p>意向产品：bingxiang</p>
            <p>海尔/8年</p>
          </div>
          <div class="bottom-class">
            <img
              src="@/assets/images/orderFollow-up/dian@3x.png"
              class="dian-Class"
              @click="showMore(index)"
            >
            <div
              v-show="data.show"
              class="show-class"
            >
              <p
                v-for="(item,index) in data.showList"
                :key="index"
                @click="updateOrderType(item.id)"
                class="show-p"
              >{{item.name}}</p>
            </div>
            <p class="bottom-button">成交录单</p>
            <p class="bottom-button">发券</p>
          </div>
        </div> -->
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
            <md-icon :name="item.icon" />
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
  Toast
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
    BPopSortType,BPopButton,BOrderFollowItem
  },
  data() {
    return {
      noticeShow: false,
      pageNum:1,
      // detailShow: false,
      searchWord: "",
      show: false,
      isFinished:true,
      curTab: 0,
      items: [
        {
          name: 0,
          label: "全部",
          icon: "home"
        },
        {
          name: 1,
          label: "跟进中",
          icon: "user"
        },
        {
          name: 2,
          label: "异常",
          icon: "user"
        },
        {
          name: 3,
          label: "已成交",
          icon: "user"
        }
      ],
      preIndex:'',
      currentScrollView:{},
      currentList:[],
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


    preparation() {},

    scenarioClick(item) {
      this.scenarioType = item.id;
      this.scenarioBlueShow = false;
      this.maskerHidden();
      this.searchData();
    },


    noticeClose() {
      this.noticeShow = false;
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
        if (item.userStatus === 1) {
          item.userS = "高潜";
          item.showList.push({ id: "2", name: "取消高潜" });
        } else {
          item.userS = "";
          item.showList.push({ id: "6", name: "设为高潜" });
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
          console.log("tag", "res");
          this.dataList = res.data.result;
          this.anylizeData();
          debugger;
        });
    },
    updateOrderType(type) {
      this.orderService
        .updateOrderFollowByType(
          {},
          {
            orderFollowId: this.ID,
            type: type,
            remark: ""
          }
        )
        .then(res => {
          if (res.code === 1) {
            Toast.succeed(res.msg);
            this.searchData();
          } else {
            Toast.failed(res.msg);
          }
        });
    },

  },
};
</script>

<style scoped lang="scss">
.notice-class {
  height: 64px;
  background-color: #fdf0ce;
  color: #e89748;
  font-size: 24px;
}

.notice-p {
  line-height: 64px;
  margin-left: 24px;
}

.notice-image {
  width: 32px;
  height: 32px;
  position: absolute;
  right: 24px;
  top: 18px;
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

.orderFollowButtonRow {
  padding-left: 24px;
  padding-right: 24px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #666666;
  border: 1px #cccccc solid;
  font-size: 24px;
  // width: 180px;
  border-radius: 30px;
  float: left;
  margin-top: 10px;
  margin-left: 24px;
}

.bottom-button {
  padding-left: 24px;
  padding-right: 24px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #1969c6;
  border: 1px #1969c6 solid;
  font-size: 24px;
  // width: 180px;
  border-radius: 30px;
  float: right;
  margin-top: 5px;
  margin-left: 10px;
}
.bar-class .order-span.active{
  color:#1969c6
}
.order-span {
  display: inline-block;
  color: #666666;
  font-size: 28px;
  padding-left: 56px;
  line-height: 72px;
}
.order-span-blue {
  display: inline-block;
  color: #1969c6;
  font-size: 28px;
  padding-left: 56px;
  line-height: 72px;
}

.xialaimage {
  width: 36px;
  height: 36px;
  margin-top: 20px;
  position: absolute;
  margin-left: 14px;
}

.brandImage {
  height: 36px;
  width: 90px;
}
.telImage {
  height: 32px;
  width: 32px;
  margin-left: 10px;
  padding-bottom: 2px;
  top: 0;
}
.labelImage {
  height: 72px;
  width: 56px;
  float: right;
  right: 24px;
}
.timeImage {
  width: 32px;
  height: 32px;
  position: absolute;
  margin-top: 5px;
}

.time-label {
  color: #bbbbbb;
  font-size: 28px;
  margin-left: 40px;
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

.masker {
  width: 100%;
  background-color: #9999;
  height: 1200px;
  z-index: 10;
  position: absolute;
  opacity: 50%;
}

.sort-class {
  color: #333333;
  font-size: 28px;
  background-color: white;
  height: 80px;
  line-height: 80px;
  padding-left: 24px;
  border-bottom: 1px solid #eeeeee;
}

.select-sort {
  color: #1969c6;
  font-size: 28px;
  background-color: white;
  height: 80px;
  line-height: 80px;
  padding-left: 24px;
  border-bottom: 1px solid #eeeeee;
}

.label-class {
  margin-top: 16px;
  // height: 290px;
  background-color: white;
  padding: 24px;
}

.label-span {
  // display: inline;
  color: #333333;
  font-size: 36px;
}

.sex-class {
  color: #999999;
  font-size: 28px;
  margin-left: 10px;
}

.hand-class {
  color: #f5a623;
  font-size: 24px;
  margin-left: 16px;
}
.handred-class {
  color: #ff001f;
  font-size: 24px;
  margin-left: 16px;
}
.handgray-class {
  color: #cccccc;
  font-size: 24px;
  margin-left: 16px;
}

.information-class {
  color: #1969c6;
  font-size: 28px;
  margin-left: 230px;
}
.label-class{
  position: relative;
}
.information-xiala {
  width: 36px;
  height: 36px;
  margin-top: 5px;
  position: absolute;
  margin-left: 14px;
}

.information-p {
  color: #666666;
  font-size: 28px;
  margin-top: 10px;
  // line-height: 40px;
  p {
    line-height: 50px;
    height: 50px;
  }
}

.bottom-class {
  margin-top: 20px;
  padding-top: 15px;
  height: 80px;
  border-top: 1px solid #eeeeee;
}

.dian-Class {
  width: 36px;
  height: 6px;
  margin-top: 30px;
}

.page-class {
  background-color: #f5f5f5;
  height: 1330px;
}

.app-container {
  background-color: red !important;
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
.row-class {
  margin-bottom: 10px;
}
.show-class {
  position: absolute;
  height: 140px;
  width: 240px;
}
.show-p {
  color: #666666;
  font-size: 28px;
  text-align: center;
}
</style>
