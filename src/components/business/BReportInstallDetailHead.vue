<template>
  <div class="bReportInstallDetailHead-par">
    <div class="bReportInstallDetailHead-item">
      <span class="bReportInstallDetailHead-item-text">{{title}}</span>
      <slot
        v-if="right"
        name="right"
        class="bReportInstallDetailHead-item-right"
      ></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BReportInstallDetailHead',
  props: {
    title: {
      type: String
    },
    right: {
      type: Boolean,
      default: false
    }
  },
};
</script>

<style scoped lang="scss">

  .bReportInstallDetailHead-par{
  }

  .bReportInstallDetailHead-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-left: 6px solid #1969C6;
    padding-left: 16px;
  }

  .bReportInstallDetailHead-item-text{
    font-size: 32px;
    color: #333;
  }

  .bReportInstallDetailHead-item-right{

  }

</style>
