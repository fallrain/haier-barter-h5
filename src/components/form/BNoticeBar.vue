<template>
  <div
    v-if="show"
    class="bNoticeBar"
    :class="[type || 'warning']"
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
    type: {
      type: String,
      default: ''
    },
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
    font-size: 24px;

    &.warning {
      background: #FDF0CE;
      color: #E89748;

      .bNoticeBar-del {
        color: #E89748;
      }
    }

    &.error {
      background: #F6DCDF;
      color: #FF011F;

      .bNoticeBar-del {
        color: #FF011F;
      }
    }
  }

  .bNoticeBar-del {
    position: absolute;
    top: 24px;
    right: 16px;
    font-size: 22px;
  }
</style>
