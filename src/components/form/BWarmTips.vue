<template>
  <div class="bWarmTips">
    <p class="bWarmTips-title">温馨提示</p>
    <ul class="bWarmTips-list">
      <li
        v-for="(item,index) in tips"
        :key="index"
        class="bWarmTips-item"
      >
        {{index + 1}}.{{item}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BWarmTips',
  props: {
    tips: {
      type: Array
    }
  }
};
</script>

<style lang="scss">
  .bWarmTips {
    padding-left: 24px;
    padding-right: 24px;
  }

  .bWarmTips-title {
    font-size: 26px;
    color: #f5a623;
  }

  .bWarmTips-list {
    padding-left: 10px;
    color: #666;
    font-size: 24px;
  }

  .bWarmTips-item {
    margin-top: 4px;
    word-break: break-all;
  }
</style>
