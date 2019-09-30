<template>
  <div>
    <md-radio
      v-for="(item) in list"
      :key="item.key"
      v-model="radioVal"
      v-bind="$attrs"
      :name="item.key"
      :label="item.value"
    ></md-radio>
  </div>
</template>

<script>
import {
  Radio
} from 'mand-mobile';

export default {
  name: 'BRadioItem',
  inheritAttrs: true,
  components: {
    'md-radio': Radio,
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    value: {}
  },
  data() {
    return {
      radioVal: this.value
    };
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.radioVal = newVal;
      }
    },
    radioVal(newVal) {
      this.$emit('radioChange', newVal);
    }
  }
};
</script>

<style scoped>

</style>
