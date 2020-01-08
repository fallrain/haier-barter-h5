<template>
  <div class="data-analysis-box">
    <div class="">
      <div class="data-analysis-date-text">选择日期范围</div>
      <div class="data-analysis-date">
        <b-date-picker
          @input="searchResult"
          class="orderEntry-date"
          slot="right"
          type="date"
          title="请选择日期"
          :defaultDate="startTime"
          v-model="startTime"
        ></b-date-picker>
        <b-date-picker
          @input="searchResult"
          class="orderEntry-date"
          slot="right"
          type="date"
          title="请选择日期"
          :defaultDate="endTime"
          v-model="endTime"
        ></b-date-picker>
      </div>
    </div>
    <span class="data-analysis-date-text mt23">入户概览</span>
    <ul class="activityDataAnalysis-data-grid">
      <li class="activityDataAnalysis-data-grid-item">
        <div class="activityDataAnalysis-data-grid-item-num">{{dataObj.planCount}}</div>
        <div class="activityDataAnalysis-data-grid-item-user">计划入户数</div>
      </li>
      <li class="activityDataAnalysis-data-grid-item">
        <div class="activityDataAnalysis-data-grid-item-num">{{dataObj.serviceCount}}</div>
        <div class="activityDataAnalysis-data-grid-item-user">实际入户数 <i
          class="iconfont icon-wenhao activityDataAnalysis-data-grid-item-user"></i></div>
      </li>
      <li class="activityDataAnalysis-data-grid-item">
        <div class="activityDataAnalysis-data-grid-item-num">{{dataObj.favorableRate}}</div>
        <div class="activityDataAnalysis-data-grid-item-user">入户好评率</div>
      </li>
    </ul>
    <span class="data-analysis-date-text mt23">入户效果</span>
    <ul class="activityDataAnalysis-data-grid1">
<!--      <li class="activityDataAnalysis-data-grid-item">-->
<!--        <div class="activityDataAnalysis-data-grid-item-num1">{{dataObj.}}</div>-->
<!--        <div class="activityDataAnalysis-data-grid-item-user1">发展代言人</div>-->
<!--      </li>-->
      <li class="activityDataAnalysis-data-grid-item">
        <div class="activityDataAnalysis-data-grid-item-num1">{{dataObj.serviceCount}}</div>
        <div class="activityDataAnalysis-data-grid-item-user1">实际入户数</div>
      </li>
<!--      <li class="activityDataAnalysis-data-grid-item">-->
<!--        <div class="activityDataAnalysis-data-grid-item-num1">{{dataObj.readCount}}</div>-->
<!--        <div class="activityDataAnalysis-data-grid-item-user1">传播次数</div>-->
<!--      </li>-->
      <li class="activityDataAnalysis-data-grid-item">
        <div class="activityDataAnalysis-data-grid-item-num1">{{dataObj.orderCount}}</div>
        <div class="activityDataAnalysis-data-grid-item-user1">转化订单</div>
      </li>
      <li class="activityDataAnalysis-data-grid-item">
        <div class="activityDataAnalysis-data-grid-item-num1">{{dataObj.orderAmount}}</div>
        <div class="activityDataAnalysis-data-grid-item-user1">转化订单额</div>
      </li>
    </ul>

    <div class="body-item mt16">
      <img src="@/assets/images/houseServicer/completeInfor/icon5.png" alt="">
      <div class="content-center">
        <div class="title lh60">引导用户代言/传播</div>
      </div>
      <span class="content-right lh60">去推广</span>
    </div>
    <div class="body-item">
      <img src="@/assets/images/houseServicer/completeInfor/icon6.png" alt="">
      <div class="content-center">
        <div class="title lh60">引导用户以旧换新/复购</div>
      </div>
      <span class="content-right lh60">估换新</span>
      <span class="content-right lh60">去换购</span>
    </div>

  </div>
</template>

<script>

import {
  BDatePicker,
} from '@/components/form';

export default {
  name: 'BDataAnalysisItem',
  components: {
    BDatePicker,
  },
  props: {
    dataObj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      startTime: '',
      endTime: '',
      customerInfo: {
        beginTime: '',
        endTime: '',
        favorableRate: '',
        orderAmount: '',
        planCount: '',
        readCount: '',
        serviceCount: '',
        servicerId: '',
        shareCount: ''
      }
    };
  },
  methods: {
    searchResult() {
      if (this.startTime === '' || this.endTime === '') {
        return;
      }
      const obj = {
        beginTime: this.startTime,
        endTime: this.endTime,
        servicerId: JSON.parse(localStorage.getItem('userinfo')).hmcid
      };
      this.$emit('dealAnalysis', obj);
    }
  }
};
</script>

<style lang="scss">
  .data-analysis-box {
    display: flex;
    flex-direction: column;
    background: #F5F5F5;
    padding: 24px 24px 0 24px;
    height: 100%;
    width: 100%;
  }

  .data-analysis-date {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  .orderEntry-date {
    width: 320px;
    .b-date-picker-ipt{
      background: #fff;
    }
  }

  .data-analysis-date-text {
    font-size: 30px;
    font-weight: bold;
    color: #333333;
  }

  .activityDataAnalysis-data-grid {
    display: flex;
    flex-wrap: wrap;
    border-radius: 8px;
    padding: 46px 30px;
    background: linear-gradient(top, #1969C6, #4B90E0);
    margin-top: 23px;
    height: 178px;
    width: 100%;
  }
  .activityDataAnalysis-data-grid1 {
    display: flex;
    flex-wrap: wrap;
    border-radius: 8px;
    padding: 46px 30px;
    background: #ffffff;
    margin-top: 23px;
    width: 100%;
  }

  .activityDataAnalysis-data-grid-item {
    width: 33%;
    line-height: 1;
    text-align: center;
  }

  .activityDataAnalysis-data-grid-item-num {
    color: #ffffff;
    font-size: 44px;
    margin-bottom: 24px;
  }

  .activityDataAnalysis-data-grid-item-num1 {
    color: #1969C6;
    font-size: 32px;
    margin-bottom: 24px;
  }

  .activityDataAnalysis-data-grid-item-user {
    color: #ffffff;
    font-size: 28px;
  }
  .activityDataAnalysis-data-grid-item-user1 {
    color: #666666;
    font-size: 24px;
  }

  .activityDataAnalysis-data-grid-item:nth-child(n+4) {
    margin-top: 70px;
  }

  .data-analysis-bottom {
    background: #ffffff;
    width: 100%;
    margin-top: 16px;
  }

  .data-analysis-bottom-item {
    display: flex;
    flex-direction: row;
    height: 100px;
    width: 100%;
    align-items: center;
  }

  .data-analysis-bottom-item-img {
    width: 60px;
    height: 60px;
    margin-left: 20px;
    margin-right: 20px;
  }
  .body-item{
    background: #fff;
    height: 100px;
    padding: 20px 24px 0 20px;
    display: flex;
    border-bottom: 1px solid #F5F5F5;
    img{
      width: 60px;
      height: 60px;
      margin-right: 20px;
    }
    .content-center{
      flex-grow:1;
      .title{
        font-size: 28px;
        color: #666;
      }
      .words{
        font-size: 24px;
        color: #999;
      }
    }
    .content-right{
      font-size: 28px;
      color: #1969C6;
      text-decoration:underline;
    }
  }
</style>
