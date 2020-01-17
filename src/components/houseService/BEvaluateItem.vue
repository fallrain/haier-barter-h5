<template>
  <div class="houseServiceItemClass">
    <div class="fs30 text-333 mb20">
      用户评价统计
    </div>
    <div class="evaluate-statistics mb20">
      <div class="left">
        <p class="fs48 mb30">{{dataObj.serviceCount}}</p>
        <p class="fs28">入户服务次数</p>
      </div>
      <div class="right">
        <p class="fs48 mb30 text-warning">{{dataObj.averageScore}}</p>
        <p class="fs28">评价分数</p>
      </div>
    </div>
    <div class="evaluate-show">
      <div class="fs30 text-333 mb20">
        用户评价
      </div>
      <div class="evaluate-taglist">
        <div class="evaluate-tag active">全部</div>
        <div class="evaluate-tag" v-for="(item, index) in dataObj.sign" :key="index">
          <span v-show="item.signId === '1'" class="">服务态度（{{item.signCount}}）</span>
          <span v-show="item.signId === '2'" class="">服务质量（{{item.signCount}}）</span>
          <span v-show="item.signId === '3'" class="">服务流程（{{item.signCount}}）</span>
          <span v-show="item.signId === '4'" class="">人员素质（{{item.signCount}}）</span>
        </div>
      </div>
      <div class="evalute-list">
        <div class="evalute-item" v-for="(item, index) in dataObj.descriptions" :key="index">
          <div class="text-999 fs24 mb16">用户：{{item.userName}} &nbsp;&nbsp;时间：{{item.createdTime}}</div>
          <div class="text-333 fs24">{{item.description}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Icon, Toast, Button
} from 'mand-mobile';

export default {
  name: '',
  components: {
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [Button.name]: Button,
  },
  props: ['dataObj'],
  data() {
    return {
    };
  },
  activated() {
  },
  created() {
  },
  methods: {
  }
};
</script>

<style scoped lang="scss">
  .houseServiceItemClass {
    padding: 25px;
    font-size: 28px;
  }
  .evaluate-statistics{
    position: relative;
    height: 200px;
    background: #fff;
    border-radius: 10px;
    padding: 14px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    .left{
      padding-top: 30px;
      width: 50%;
      height: 100%;
      border-right: 1px solid #D0D0D0;
    }
    .right{
      padding-top: 30px;
      height: 100%;
      flex-grow: 1;
    }
  }
  .evaluate-show{
    .evaluate-taglist{
      overflow: hidden;
      clear: both;
      .evaluate-tag{
        font-size: 24px;
        padding: 10px 16px;
        border: 1px solid #D0D0D0;
        border-radius: 30px;
        float: left;
        margin-right: 24px;
        margin-bottom: 16px;
        background: #fff;
      }
      .evaluate-tag.active{
        color: #1969C6;
        border-color: #1969C6;
      }
    }
    .evalute-list{
      background: #fff;
      padding: 0 24px;
      border-radius: 10px;
      .evalute-item{
        padding: 24px 0;
        border-bottom: 1px solid #D0D0D0;
      }
      .evalute-item:last-child{
        border-bottom: none;
      }
    }
  }
  .rows {
    display: flex;
    justify-content: space-between;
  }
  .fs24{
    font-size: 24px;
  }
  .fs28{
    font-size: 28px;
  }
  .fs30{
    font-size: 30px;
  }
  .fs48{
    font-size: 48px;
  }
  .mb16{
    margin-bottom: 16px;
  }
  .mb20{
    margin-bottom: 20px;
  }
  .mb30{
    margin-bottom: 30px;
  }
  .pt2{
    padding-top: 2px;
  }
  .text-333{
    color: #333;
  }
  .text-999{
    color: #999;
  }
  .text-warning{
    color: #F5A623;
  }
  .text-primary{
    color: #1969C6;
  }
  .text-success{
    color: #29AB91;
  }
  .mr22{
    margin-right: 22px;
  }
  .mb15{
    margin-bottom: 15px;
  }
  .mn{
    margin: 0px !important;
  }
  .ptn{
    padding-top: 0px !important;
  }
</style>
