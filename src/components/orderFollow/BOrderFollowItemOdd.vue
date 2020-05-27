<template>
  <div>
    <div class="bOrderFollowItemOdd-head cf">
      <div class="fl">
        <span class="bOrderFollowItemOdd-head-name">{{order.userName}}</span>
        <!--<span>{{order.sex}}</span>-->
        <i class="iconfont icon-dianhua ml16"></i>
        <span class="ml16">{{order.userPhone}}</span>
      </div>
      <div class="fr">
        <span class="cu-tag cu-tag-red" v-show="order.orderMark=='1'">删除订单</span>
        <span class="cu-tag cu-tag-green" v-show="order.orderMark=='2'">补录订单</span>
      </div>
    </div>
    <ol class="bOrderFollowItemOdd-cnt">
      <li class="bOrderFollowItemOdd-cnt-item">
        <label class="bOrderFollowItemOdd-cnt-item-name">订单号：</label>
        <span class="bOrderFollowItemOdd-cnt-item-val">{{order.orderNo || '无'}}</span>
      </li>
      <li class="bOrderFollowItemOdd-cnt-item">
        <label class="bOrderFollowItemOdd-cnt-item-name">申请理由：</label>
        <span class="bOrderFollowItemOdd-cnt-item-val">{{order.operateReason || '无'}}</span>
      </li>
      <li class="bOrderFollowItemOdd-cnt-item">
        <label class="bOrderFollowItemOdd-cnt-item-name">申请时间：</label>
        <span class="bOrderFollowItemOdd-cnt-item-val">{{order.operateTime || '无'}}</span>
      </li>
      <li class="bOrderFollowItemOdd-cnt-item">
        <label class="bOrderFollowItemOdd-cnt-item-name">订单状态：</label>
        <span
          class="bOrderFollowItemOdd-cnt-item-val bOrderFollowItemOdd-cnt-item-status"
        >{{orderStatusOdd}}</span>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'BOrderFollowItemOdd',
  props: {
    // 订单item
    order: {
      type: Object
    }
  },
  data() {
    return {
    };
  },
  computed: {
    orderStatusOdd(val){
      if(this.order.orderMark == '1'){
        return {
          0: '待审核',
          1: '审核通过',
          2: '审核驳回',
          3: '人工处理'
        }[this.order.status] || '';
      }
      if(this.order.orderMark == '2'){
        return {
          0: '正常',
          1: '冻结',
          2: '补录待审核',
          3: '审核通过'
        }[this.order.status] || '';
      }
      return '';
    }
  }
};
</script>

<style lang="scss">
  .bOrderFollowItemOdd-head {
    // display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
    line-height: 80px;
    background: #FBFBFB;
    box-shadow: 0 1px 0 0 #eee;
    padding-left: 24px;
    padding-right: 24px;
    color: #999;
    font-size: 28px;

    .icon-dianhua {
      color: #1969C6;
      font-size: 28px;
    }
  }

  .bOrderFollowItemOdd-head-name {
    color: #333;
    font-size: 36px;
    max-width: 430px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bOrderFollowItemOdd-cnt {
    padding: 24px;
  }

  .bOrderFollowItemOdd-cnt-item {
    display: flex;
    font-size: 28px;
    color: #999;
    line-height: 56px;
  }

  .bOrderFollowItemOdd-cnt-item-name {
    color: #333;
    width: 140px;
    flex-shrink: 0;
    text-align-last: justify;
  }

  .bOrderFollowItemOdd-cnt-item-val {
    word-break: break-all;
    margin-left: 10px;
    flex-grow: 1;
  }

  .bOrderFollowItemOdd-cnt-item-status {
    color: #F01F00;
  }
  .cf::after {
  	clear: both;
  }
  .fl {
  	float: left;
  }
  .fr {
  	float: right;
  }
  .cu-tag {
  	vertical-align: middle;
  	position: relative;
  	display: -webkit-inline-box;
  	display: -webkit-inline-flex;
  	display: inline-flex;
  	-webkit-box-align: center;
  	-webkit-align-items: center;
  	        align-items: center;
  	-webkit-box-pack: center;
  	-webkit-justify-content: center;
  	        justify-content: center;
  	box-sizing: border-box;
  	padding: 0px 32px;
  	height: 48px;
  	font-family: Helvetica Neue, Helvetica, sans-serif;
  	white-space: nowrap;
    border-radius: 42px;
    letter-spacing: 2px;
  }
  .cu-tag-red {
    background-color: #FFFFFF;
    color: red;
  }
  .cu-tag-green {
    background-color: #FFFFFF;
    color: green;
  }
</style>
