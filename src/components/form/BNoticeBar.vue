<template>
  <div
    v-if="show"
    class="bNoticeBar"
  >
    {{content}}
    <slot></slot>
    <i
      class="iconfont icon-chahao bNoticeBar-del"
      @click="hideClick"
    ></i>
  </div>
</template>

<script>
export default {
  name: 'BNoticeBar',
  props: {
    content: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideClick() {
      this.$emit('update:show', false);
    }
  }
};
</script>

<style lang="scss">
  .bNoticeBar {
    position: relative;
    padding: 22px 24px;
    padding-right: 77px;
    background: #FDF0CE;
    color: #E89748;
    font-size: 24px;
  }

  .bNoticeBar-del{
    position: absolute;
    top: 24px;
    right: 16px;
    font-size: 22px;
    color: #E89748;
  }
</style>
