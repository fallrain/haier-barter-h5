<template>
  <div>
    <div class="bOrderFollowItemOdd-head">
      <span class="bOrderFollowItemOdd-head-name">{{order.userName}}</span>
      <!--<span>{{order.sex}}</span>-->
      <i class="iconfont icon-dianhua ml16"></i>
      <span class="ml16">{{order.userPhone}}</span>
    </div>
    <ol class="bOrderFollowItemOdd-cnt">
      <li class="bOrderFollowItemOdd-cnt-item">
        <label class="bOrderFollowItemOdd-cnt-item-name">订单号：</label>
        <span class="bOrderFollowItemOdd-cnt-item-val">{{order.orderNo || '无'}}</span>
      </li>
      <li class="bOrderFollowItemOdd-cnt-item">
        <label class="bOrderFollowItemOdd-cnt-item-name">申请理由：</label>
        <span class="bOrderFollowItemOdd-cnt-item-val">{{order.applyReason || '无'}}</span>
      </li>
      <li class="bOrderFollowItemOdd-cnt-item">
        <label class="bOrderFollowItemOdd-cnt-item-name">申请时间：</label>
        <span class="bOrderFollowItemOdd-cnt-item-val">{{order.applyTime || '无'}}</span>
      </li>
      <li class="bOrderFollowItemOdd-cnt-item">
        <label class="bOrderFollowItemOdd-cnt-item-name">订单状态：</label>
        <span
          class="bOrderFollowItemOdd-cnt-item-val bOrderFollowItemOdd-cnt-item-status"
        >{{order.status | orderDeleteStatus}}</span>
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
    return {};
  },
};
</script>

<style lang="scss">
  .bOrderFollowItemOdd-head {
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
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
</style>
