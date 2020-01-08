<template xmlns:v-slot="">
<div>
  <div class="check-plan-header line-style mb16">
    <span class="name mr16">顾客信息:{{customerInfo.userName}}</span>
    <span class="name mr16">{{customerInfo.userPhone}}</span>
  </div>
  <div class="rows line-style bg-white br-b">
    <div class="key-style">入户服务场景</div>
    <div class="val-style">{{tagName}}</div>
  </div>
  <div class="rows line-style bg-white mb16">
    <div class="key-style">计划服务时间</div>
    <div class="val-style">{{customerInfo.serviceTime}}</div>
  </div>
  <div class="rows line-style bg-white br-b">
    <div class="key-style">服务人</div>
    <div class="val-style">{{customerInfo.servicerName}}</div>
  </div>
  <div class="rows line-style bg-white br-b" v-show="customerInfo.accompanyingName !== ''">
    <div class="key-style">随行参与人</div>
    <div class="val-style">{{customerInfo.accompanyingName}}</div>
  </div>
  <div class=" bg-white mb16">
    <div class="key-style line-style">入户地址</div>
    <div class="val-style lh60 ph24">{{customerInfo.serviceAddress}}</div>
  </div>
<!--  <div class=" bg-white mb16">-->
<!--    <div class="key-style line-style">入户服务礼品</div>-->
<!--    <div class="val-style lh60 ph24">{{customerInfo.giftName}}</div>-->
<!--  </div>-->
  <div class=" bg-white">
    <div class="key-style line-style">购买产品</div>
    <div class="val-style lh60 ph24" v-for="(item, index) in productlist" :key="index">{{item}}</div>
  </div>
  <div class=" bg-white mt16" v-show="customerInfo.description !== ''">
    <div class="key-style line-style">备注</div>
    <div class="val-style lh60 ph24" style="word-wrap: break-word;word-break: break-all;overflow: hidden;">
      {{customerInfo.description}}</div>
  </div>
  <footer>
    <template>
      <div class="md-example-child  md-example-child-button md-example-child-button-3">
        <div class="md-example-section">
          <md-button type="primary" inline @click="goback">返回</md-button>
        </div>
      </div>
    </template>
  </footer>
</div>
</template>

<script>
import {
  Toast, Popup, PopupTitleBar, Button, Icon
} from 'mand-mobile';

export default {
  name: 'AddServiceUser',
  components: {
    [Toast.name]: Toast,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Button.name]: Button,
    [Icon.name]: Icon,
  },
  data() {
    return {
      customerInfo: {},
      tagList: [],
      productlist: []
    };
  },
  mounted() {
  },
  activated() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      this.queryDetail(this.id);
    }
  },
  created() {
    // 查询直销员信息
    this.basicService.userInfo().then((res) => {
      this.customerInfo.servicerId = res.data.hmcId;
      this.customerInfo.servicerName = res.data.username;
    });

    this.getServiceEle();
  },
  methods: {
    // 查询 入户服务场景 数据字典
    getServiceEle() {
      const data = [
        { id: 1, name: '购买后指导家电使用' },
        { id: 2, name: '用户关怀（上门清洗保养）' },
        { id: 3, name: '未购买用户上门测量' }
      ];
      this.tagList = data;
    },
    queryDetail(id) { // 根据ID查询入户计划详情
      const param = { id };
      this.houseService.queryDetailById(param).then((res) => {
        if (res.code === 1) {
          this.customerInfo = res.data;
          this.productlist = res.data.productNames.split(',')
        }
      });
    },
    // 取消
    goback() {
      this.$router.go(-1);
    }
  },
  computed: {
    tagName() {
      let tagname = '';
      this.tagList.forEach((item) => {
        if (item.id === this.customerInfo.servicescape) {
          tagname = item.name;
        }
      });
      return tagname;
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$destroy();
    next();
  }
};
</script>
<style lang="scss" scoped>
  .check-plan-header{
    display: flex;
    align-items: center;
    background: #fff;
    color: #333;
    margin-top: 20px;
  }
  footer {
    padding: 24px;
    .md-example-section {
      display: flex;
      justify-content: space-between;
      button {
        position: fixed;
        bottom: 10px;
        left: calc(2%);
        width: 96%;
        height: 84px;
      }
    }
  }
  .rows{
    display: flex;
    justify-content: space-between;
  }
  .line-style{
    height: 76px;
    line-height: 76px;
    padding: 0 24px;
  }
  .val-style{
    color: #666;
  }
  .lh60{
    line-height: 60px;
  }
  .bg-white{
    background: #fff;
  }
  .p24{
    padding: 24px;
  }
  .ph24{
    padding: 0 24px;
   }
  .br-b {
    border-bottom: 1px solid #D0D0D0;
  }
  .mt2 {
    margin-top: 2px;
  }
  .ml10 {
    margin-left: 10px;
  }
  .mbn {
    margin-bottom: 0 !important;
  }
  .mb16{
    margin-bottom: 16px;
  }
  .fs34 {
    font-size: 34px;
  }
  .icon-color {
    color: #4A90E2;
  }
  .text-333 {
    color: #333333;
  }
  .text-666 {
    color: #666666;
  }
  .text-ccc {
    color: #CCCCCC;
  }
  .text-primary {
    color: #1969C6;
  }
  .text-bold {
    font-weight: bold;
  }
</style>
