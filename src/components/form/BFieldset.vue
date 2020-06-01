<template>
  <div class="b-fieldset">
    <div
      v-show="showTitle"
      class="b-fieldset-legend"
      :class="[
        headBtmLine && 'headBtmLine'
      ]"
    >
      <span class="b-fieldset-legend-left">{{title}}</span>
      <span class="b-fieldset-legend-right"><slot name="headRight"></slot></span>
    </div>
    <div class="b-fieldset-default-cnt">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BFieldset',
  props: {
    showTitle: {
      type: Boolean,
      default: false
    },
    title: {
      default: ''
    },
    // head底部线
    headBtmLine: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
  .b-fieldset {
    /*padding-bottom: 24px;*/
    background: #fff;
  }

  .b-fieldset-legend {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    color: #333;
    font-size: 28px;
    padding-left: 24px;
    padding-right: 24px;

    &.headBtmLine {
      border-bottom: 1px solid #F5F5F5;
    }
  }

  .b-fieldset-default-cnt {
    padding: 10px 24px;
  }
</style>
