<template xmlns:v-slot="">
  <div>
<!--    头部-->
    <div class="houseService-header">
      <span @click="changeStep(1)" class="header-item"  :class="{'active':current==1}">
        <div class="icon-style" v-show="current!=1">
          <img
            src="@/assets/images/houseServicer/home_icons/ruhujihua.png"
          >
          <span class="tagNum">{{tagNum1}}</span>
        </div>
        <div class="icon-style1" v-show="current==1">
          <img
            src="@/assets/images/houseServicer/home_icons/ruhujihua1.png"
          >
          <span class="tagNum">{{tagNum1}}</span>
        </div>
        <p class="title">入户计划</p>
      </span>
      <span @click="changeStep(2)" class="header-item" :class="{'active':current==2}">
        <div class="icon-style" v-show="current!=2">
          <img
            src="@/assets/images/houseServicer/home_icons/yiruhu.png"
          >
           <span class="tagNum">{{tagNum2}}</span>
        </div>
        <div class="icon-style1" v-show="current==2">
          <img
            src="@/assets/images/houseServicer/home_icons/yiruhu1.png"
          >
          <span class="tagNum">{{tagNum2}}</span>
        </div>
        <p class="title">已入户</p>
      </span>
      <span @click="changeStep(3)" class="header-item" :class="{'active':current==3}">
        <div class="icon-style" v-show="current!=3">
          <img
            src="@/assets/images/houseServicer/home_icons/yipingjia.png"
          >
          <span class="tagNum">{{tagNum3}}</span>
        </div>
        <div class="icon-style1" v-show="current==3">
          <img
            src="@/assets/images/houseServicer/home_icons/yipingjia1.png"
          >
          <span class="tagNum">{{tagNum3}}</span>
        </div>
        <p class="title">已评价</p>
      </span>
      <span @click="changeStep(4)" class="header-item" :class="{'active':current==4}">
        <div class="icon-style" v-show="current!=4">
          <img
            src="@/assets/images/houseServicer/home_icons/shujufenxi.png"
          >
          <span class="tagNum">{{tagNum4}}</span>
        </div>
        <div class="icon-style1" v-show="current==4">
          <img
            src="@/assets/images/houseServicer/home_icons/shujufenxi1.png"
          >
          <span class="tagNum">{{tagNum4}}</span>
        </div>
        <p class="title">数据分析</p>
      </span>
    </div>
    <!--    内容-->
<!--    计划入户-->
    <div style="padding-bottom: 50px;" v-show="current === 1">
      <b-house-service-item
      @updatePlan="updatePlan"
      @changePlan="changePlan"
      @checkPlan="checkPlan"
      @morePlan="morePlan"
      :list="myPlanServices"
      :otherlist="otherPlanServices"
      :isMoreMyPlan="isMoreMyPlan"
      ></b-house-service-item>
    </div>
<!--    已入户-->
    <div id="finshedService" v-show="current === 2">
      <b-finished-item
        @completeUserInfo="completeUserInfo"
        :list="mySuccessPlan"
      ></b-finished-item>
    </div>
    <!--    已评价-->
    <div v-show="current === 3">
      <b-evaluate-item
          :dataObj="appraiseData"
      ></b-evaluate-item>
    </div>
    <!--    数据分析-->
    <div v-show="current === 4">
      <b-data-analysis-item
        :dataObj="analysisData"
        @dealAnalysis="dealAnalysis"
      ></b-data-analysis-item>
    </div>
  </div>
</template>

<script>
import {
  Toast, Popup, PopupTitleBar, Button, Icon
} from 'mand-mobile';

import {
  BHouseServiceItem,
  BFinishedItem,
  BEvaluateItem,
  BDataAnalysisItem
} from '@/components/houseService';

export default {
  name: 'HouseServiceEntry',
  components: {
    [Toast.name]: Toast,
    BHouseServiceItem,
    BFinishedItem,
    BEvaluateItem,
    BDataAnalysisItem,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Button.name]: Button,
    [Icon.name]: Icon,
  },
  data() {
    return {
      tagNum1: 0,
      tagNum2: 0,
      tagNum3: 0,
      tagNum4: 0,
      isMoreMyPlan: false,
      isMoreOtherPlan: false,
      pageNum: 1,
      currentItem: {},
      current: 1,
      myPlanServices: [ // 我的入户计划用户信息
      ],
      otherPlanServices: [ // 其他的入户计划用户信息
      ],
      mySuccessPlan: [ // 我的已入户计划用户信息
      ],
      appraiseData:{},
      analysisData:{},
      userinfo: {}
    };
  },
  computed: {},
  mounted() {

  },
  activated() {
    this.getMyPlan();// 入户计划列表查询
    this.getOtherPlan();// 其他入户计划列表查询
    this.getMySuccessPlan();// 查询已入户计划列表
  },
  created() {
    this.userinfo = JSON.parse(localStorage.getItem('userinfo'));
  },
  methods: {
    // 入户计划列表查询
    getMyPlan() {
      const data = {
        servicerId: this.userinfo.hmcid,
        pageNum: this.pageNum,
        pageSize: '10'
      };
      this.houseService.queryPlanServiceList(data, {}).then((res) => {
        if (res.code === 1) {
          res.data.result.forEach((item, index) => {
            res.data.result[index].arrowtag = false;
            res.data.result[index].dealproducts = item.productNames.split(',');
          });
          if (this.pageNum === 1) {
            this.myPlanServices = [];
            this.myPlanServices = res.data.result;
          } else {
            this.myPlanServices.concat(res.data.result);
          }
          console.log(this.myPlanServices);
          this.tagNum1 = res.data.total;
          if (this.myPlanServices < this.tagNum1) {
            this.isMoreMyPlan = true;
          } else {
            this.isMoreMyPlan = false;
          }
        }
      });
    },
    // 其他入户计划列表查询
    getOtherPlan() {
      const param = {
        servicerId: this.userinfo.hmcid,
        pageNum: '1',
        pageSize: '10'
      };
      // param.servicerId = this.userinfo.hmcid;
      this.houseService.queryOtherPlanServiceList(param, '').then((res) => {
        this.otherPlanServices = res.data.result;
      });
    },
    updatePlan() { // 更新计划列表
      this.getMyPlan();
      this.getMySuccessPlan();
    },
    changePlan(item) { // 修改计划列表
      this.currentItem = item;
      this.$router.push({
        name: 'Houseservice.AddServiceUser',
        params: { customerInfo: item },
      });
    },
    checkPlan(item) { // 查看计划
      this.$router.push({
        name: 'Houseservice.CheckPlan',
        query: { id: item.id }
      });
    },
    morePlan() {
      this.pageNum++;
      this.getMyPlan();
    },
    getMySuccessPlan() { // 查询已入户计划列表
      const data = {
        servicerId: this.userinfo.hmcid,
        pageNum: '1',
        pageSize: '20'
      };
      this.houseService.querySuccessPlanList(data, {}).then((res) => {
        if (res.code === 1) {
          res.data.result.forEach((item, index) => {
            res.data.result[index].arrowtag = false;
            res.data.result[index].dealProducts = res.data.result[index].productNames.split(',');
          });
          this.mySuccessPlan = res.data.result;
          this.tagNum2 = res.data.total;
        }
      });
    },
    completeUserInfo(item) {
      this.currentItem = item;
      this.$router.push({
        name: 'Houseservice.CompleteUserInfor',
        params: {},
      });
    },
    dealAppraise() {
      const servicerId = JSON.parse(localStorage.getItem('userinfo')).hmcid;
      this.houseService.appraiseStatistics({
        servicerId
      }).then((res) => {
        if (res.code === 1) {
          this.appraiseData = res.data;
        }
      });
    },
    dealAnalysis(obj) {
      this.houseService.analysis({
        ...obj
      }).then((res) => {
        if (res.code === 1) {
          this.analysisData = res.data;
        }
      });
    },
    changeStep(current) { // 头部切换
      this.current = current;
      if (this.current === 3) { // 更新评价数据
        this.dealAppraise();
      }
      if (this.current === 4) { // 更新数据分析
        // this.dealAnalysis();
      }
    },
    getQueryString(name) {
      const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
      const r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'Houseservice.CompleteUserInfor') {
      const obj = { completeInfo: this.currentItem };
      to.query.completeInfo = JSON.stringify(obj);
    }
    next();// 必须要有这个，否则无法跳转
  },
};
</script>
<style lang="scss">
  .houseService-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 168px;
    background: #fff;
    padding: 0 50px;
    .header-item{
      font-size: 28px;
      text-align: center;
      color: #666;
      .icon-style{
        position: relative;
        display: block;
        margin: 0 auto;
        width: 72px;
        height: 72px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .icon-style1{
        position: relative;
        display: block;
        margin: 0 auto;
        width: 88px;
        height: 88px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .tagNum{
        display: block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        color: #fff;
        background: #ff001c;
        position: absolute;
        top: -6px;
        right: -16px;
        font-size: 19px;
        line-height: 30px;
      }
    }
  }
  .header-item.active {
    .title{
      color: #333;
    }
  }
</style>
