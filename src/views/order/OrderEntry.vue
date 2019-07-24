<template>
  <div>
    <div class="orderEntry-header">
      <span class="orderEntry-header-name">门店：{{shopName}}</span>
      <i class="iconfont icon-icon-question orderEntry-header-icon"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderEntry',
  data() {
    return {
      shopName: '新华百货老大楼', // 门店名称
    };
  }
};
</script>

<style lang="scss">
  .orderEntry-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    padding-left: 27px;
    padding-right: 25px;
  }

  .orderEntry-header-name {
    font-size: 28px;
    color: #1969C6;
  }

  .orderEntry-header-icon {
    font-size: 32px;
  }
</style>
