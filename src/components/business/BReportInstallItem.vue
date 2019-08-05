<template>
  <div
    class="reportInstallList-orderItem-card"
  >
    <img
      v-if="orderItem.domainName==='Haier'||orderItem.domainName==='haier'"
      class="reportInstallList-orderItem-card-portrait"
      src="@/assets/images/reportInstall/bandnamehaier.png"
    >
    <img
      v-else
      class="reportInstallList-orderItem-card-portrait"
      src="@/assets/images/reportInstall/bangnamecasarter.png"
    >
    <div v-if="orderItem.hccResult">
      <div
        class="reportInstallList-orderItem-card-mark"
        :class="['reportInstallList-orderItem-card-mark-'+orderItem.hccResult]"
      >
        {{['未派单','已派单','服务中','服务完成'][orderItem.hccResult]}}
      </div>
    </div>
    <div class="reportInstallList-orderItem-cnt">
      <div class="reportInstallList-orderItem-cnt-item name">
        {{orderItem.customerName}}
      </div>
      <div class="reportInstallList-orderItem-cnt-item tel">
        <i class="iconfont icon-shouji"></i>{{orderItem.phoneNumber}}
      </div>
      <div
        v-if="orderItem.orderTime"
        class="reportInstallList-orderItem-cnt-item time"
      >
        <i class="iconfont icon-shizhong"></i>安装时间：{{orderItem.orderTime}}
      </div>
      <div class="reportInstallList-orderItem-cnt-item time">
        型号：{{orderItem.productModelCode}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BReportInstallItem',
  props: {
    orderItem: {
      type: Object,
      require: true
    }
  }
};
</script>

<style scoped lang="scss">

  .b2-head-item-par{
  }

  .b2-head-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-left: 6px solid #1969C6;
    padding-left: 16px;
  }

  .b2-head-item-text{
    font-size: 32px;
    color: #333;
  }

  .b2-head-item-right{

  }
</style>
