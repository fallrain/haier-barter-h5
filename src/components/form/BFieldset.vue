<template>
  <div class="b-fieldset">
    <p class="b-fieldset-legend">{{title}}</p>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BFieldset',
  props: {
    title: {
      default: ''
    }
  }
};
</script>

<style lang="scss">
  .b-fieldset {
    padding: 24px;
    background: #fff;
  }

  .b-fieldset-legend {
    line-height: 1;
    color: #333;
    font-size: 28px;
    margin-bottom: 24px;
  }
</style>
