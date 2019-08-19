<template>
  <div class="report-bg">

    <div class="report-box1">
      <span class="report-box1-goods-name">{{orderItem.productCategoryName}}</span>
      <span class="report-box1-desc">{{orderItem.productModelCode}}</span>
      <span class="report-box1-status"
            :class="['reportInstallList-orderItem-card-mark-'+orderItem.hccResult]"
            v-if="isShow">
         {{['未派单','已派单','服务中','服务完成'][orderItem.hccResult]}}
      </span>
    </div>

    <div class="report-box1 report-box2">
      <span class="report-box2-name">购买人：{{orderItem.customerName}}</span>
      <span class="report-box2-phone">{{orderItem.phoneNumber}}</span>
    </div>
    <div class="report-box1 report-box3">
      <span class="report-box3-time">安装时间：{{orderItem.orderTime}}</span>
    </div>
    <div class="report-box1 report-box4" v-if="orderItem.failReason">
      <span class="report-box4-exception">异常原因：{{orderItem.failReason}}</span>
    </div>

    <Button class="report-btn" v-if="isShow">修改</Button>

  </div>
</template>

<script>
  export default {
    name: "BReportInstallItemNew",
    props: {
      orderItem: {
        type: Object,
        require: true
      },
      isShow: true,
    }
  }
</script>

<style lang="scss">
  .report-bg {
    background: #FBFBFB;
    padding-top: 24px;
    padding-right: 24px;
    padding-bottom: 14px;
    margin-left: 24px;
    border-bottom: 2px solid #EEE;
    position: relative;
  }

  .report-box1 {
    display: flex;
    flex-direction: row;
    align-items: baseline;

    .report-box1-goods-name {
      font-size: 32px;
      color: #333;
      margin-right: 3px;
    }

    .report-box1-desc {
      font-size: 32px;
      color: #666;
      flex-grow: 1
    }

    .report-box1-status {
      font-size: 28px;
    }

  }

  .report-box2 {
    margin-top: 16px;

    .report-box2-name {
      width: 260px;
      font-size: 28px;
      color: #666;
    }

    .report-box2-phone {
      font-size: 28px;
      color: #666;
      margin-left: 44px;
    }
  }

  .report-box3 {
    margin-top: 16px;

    .report-box3-time {
      font-size: 28px;
      color: #999;
    }
  }

  .report-box4 {
    margin-top: 16px;

    .report-box4-exception {
      font-size: 28px;
      color: #FF001F;
    }
  }


  .report-btn {
    position: absolute;
    bottom: 26px;
    right: 24px;
    border-radius: 30px;
    border: 1px solid #1969C6;
    background: #fff;
    height: 60px;
    padding-left: 24px;
    padding-right: 24px;
    color: #1969C6;
  }

  .reportInstallList-orderItem-card-mark-0 {
    color: #F5A623;
  }

  .reportInstallList-orderItem-card-mark-1 {
    color: #F5A623;
  }

  .reportInstallList-orderItem-card-mark-2 {
    color: #4A90E2;
  }

  .reportInstallList-orderItem-card-mark-3 {
    color: #29AB91;
  }

</style>
