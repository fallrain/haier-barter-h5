<template>
  <div class="md-toast center js-b-loading" style="display: none">
    <div class="md-popup with-mask center">
      <div class="md-popup-mask"></div>
      <div class="md-popup-box md-fade">
        <div class="md-toast-content">
          <svg class="md-icon icon-svg md-icon-spinner lg">
            <use xlink:href="#spinner"></use>
          </svg>
          <div class="md-toast-text">加载中...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BLoading'
};
</script>

<style scoped>

</style>
