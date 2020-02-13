<template>
  <div class="houseServiceItemClass">
    <div id="myPlan">
      <div class="rows header">
        <span class="">我的入户计划</span>
        <!--        <span class="date">查看日历</span>-->
      </div>
      <div
        class="panel-body"
        v-for="(item,index) in list"
        :key="index"
      >
        <div class="rows mb20">
          <span class="info">
            <span class="key-color">购机后入户服务用户:</span>
            <span class="value-color">{{item.userName}}</span>
          </span>
          <span class="deal">
            <span class="text-warning" v-show="item.status == 2">已完成</span>
            <span class="text-warning" v-show="item.status == 1">待完善资料</span>
          </span>
        </div>
        <div class="mb20">
          <span>
            <span class="key-color">上门服务时间:</span>
            <span class="value-color">{{item.serviceTime}}</span>
          </span>
        </div>
        <div class="mb20">
          <span class="key-color">随行参与人:</span>
          <span class="value-color">{{item.accompanyingName}}</span>
        </div>
        <div class="mb20">
          <span class="key-color">服务地址:</span>
          <span class="value-color">{{item.serviceAddress}}</span>
        </div>
        <div class="mb20 rows">
          <div>
            <span class="key-color left">购机型号:</span>
            <ul class="type-list left" :class="{'hide-height':!item.arrowtag}">
              <li v-for="(item1, index1) in item.dealProducts" :key="index1">{{item1}}</li>
            </ul>
          </div>
          <div>
            <span class="icon iconfont icon-jiantou9" v-show="!item.arrowtag" @click="change(item)"></span>
            <span class="icon iconfont icon-shangjiantou" v-show="item.arrowtag" @click="change(item)"></span>
          </div>
        </div>
        <div class="btn-groups">
          <button type="button" @click="dealOrder(item)">成交录单</button>
          <button type="button" v-show="item.storyFlag === 1" @click="storyDetail(item)">用户服务故事</button>
          <button type="button"
                  v-show="item.applianceFlag === 0 || item.appraiseFlag === 0
                  || item.familyFlag === 0 || item.storyFlag === 0"
                  @click="completeUserInfo(item)">完善资料</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {
  Icon, Toast, Popup, PopupTitleBar, Button
} from 'mand-mobile';
import {
  BPopSortType, BPopButton
} from '@/components/form';

export default {
  name: '',
  components: {
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    BPopButton,
    BPopSortType,
    'md-popup': Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Button.name]: Button,

  },
  props: {
    list: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
    change(item) {
      item.arrowtag = !item.arrowtag;
    },
    completeUserInfo(item) { // 完善用户资料
      this.$emit('completeUserInfo', item);
    },
    dealOrder(item) { // 成交录单
      console.log(item);
      this.orderService.createFollowByRHFW({
        hmcId: item.servicerId,
        userId: item.userId,
        userName: item.userName,
        userMobile: item.userPhone,
        recordMode: 'Haier',
        sourceSn: item.id
      }).then((res) => {
        if (res.code === 1) {
          const orderFollowId = res.data.id;
          this.orderService.checkCreateOrder().then((res1) => { // 判断店铺是否冻结
            if (res1.code != -1) {
              const freezeMsg = res1.data;
              this.$router.push({
                name: 'Order.OrderEntry',
                params: {
                  customerConsigneeInfo: {
                    username: item.userName,
                    mobile: item.userPhone,
                    userId: item.userId,
                    recordMode: 'Haier',
                    // businessScenarios: info.businessScenarios,
                    sourceSn: item.id,
                    smld: true,
                    id: orderFollowId,
                    freezeMsg,
                    // oldForNew
                  },
                  region: 'new'
                }
              });
            }
          });
        }
      });
    },
    storyDetail(item) {
      this.$router.push({
        name: 'Houseservice.CompleteServiceStory',
        query: { planId: item.id },
      });
    }
  }
};
</script>

<style scoped lang="scss">
  .houseServiceItemClass {
    padding: 25px;
    font-size: 28px;
  }
  .panel-body {
    background: #fff;
    padding: 24px;
    border-radius: 4px;
    margin-bottom: 16px;
  }
  .btn-groups{
    text-align: right;
    button{
      font-size: 24px;
      margin-right: 25px;
      border-radius: 3.333vw;
      background: #fff;
      padding: 0 1.5vw;
      line-height: 6vw;
      border: 1px solid #195cad;
      color: #195cad;
    }
  }
  #otherPlan .title{
    color: #353535;
    font-size: 3.733vw;
    width: 100%;
    line-height: 72px;
    margin-bottom: 20px;
    border-bottom: 1px solid #d2d2d2;
  }
  .key-color {
    color: #8a8a8a;
    margin-right: 20px;
  }
  .value-color {
    color: #353535;
  }
  .rows {
    display: flex;
    justify-content: space-between;
  }
  .mb20{
    margin-bottom: 20px;
  }
  .pt2{
    padding-top: 2px;
  }
  .iconfont{
    font-size: 28px;
    color: #2F77CB;
  }
  .header {
    color: #333;
    margin-bottom: 24px;
    .date {
      color: #2F77CB;
    }
  }
  .md-example-section{
    display: flex;
    justify-content: space-between;
    button{
      width: 48%;
      height: 80px;
    }
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
  .type-list{
    width: 400px;
    overflow: hidden;
    height: 100%;
    color: #999;
    transition:all 0.3s ease-in;
    li{
      margin-bottom: 10px;
    }
  }
  .hide-height{
    height: 38px;
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
