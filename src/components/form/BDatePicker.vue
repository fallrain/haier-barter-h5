<template>
  <div class="b-date-picker">
    <div
      class="b-date-picker-ipt"
      @click="isDatePickerShow=true"
    >
      <span>{{value || $attrs.title}}</span>
      <i class="iconfont icon-riqi"></i>
    </div>
    <md-date-picker
      v-bind="$attrs"
      ref="datePicker"
      v-model="isDatePickerShow"
      :default-date="defaultVal"
      @confirm="datePickerConfirm"
    ></md-date-picker>
  </div>
</template>

<script>
import {
  DatePicker
} from 'mand-mobile';

export default {
  name: 'BDatePicker',
  inheritAttrs: true,
  components: {
    'md-date-picker': DatePicker,
  },
  props: {
    value: {},
    // 默认值
    defaultDate: {
      default: new Date()
    },
    // 格式化
    pattern: {
      type: String,
      default: 'yyyy-MM-dd'
    }
  },
  data() {
    return {
      defaultVal: this.defaultDate ? new Date(this.defaultDate) : new Date(),
      isDatePickerShow: false
    };
  },
  methods: {
    datePickerConfirm() {
      /* 点了确定按钮 */
      const date = this.$refs.datePicker.getFormatDate(this.pattern);
      this.$emit('confirm', date);
      this.$emit('input', date);
    }
  }
};
</script>

<style lang="scss">
  .b-date-picker {
    width: 100%;

    .md-popup-title-bar {
      .title-bar-title {
        display: none;
      }

      .title-bar-left,
      .title-bar-right {
        font-size: 28px;
      }
    }
  }

  .b-date-picker-ipt {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 60px;
    border: 1px solid #D0D0D0;
    border-radius: 30px;
    padding-left: 24px;
    padding-right: 24px;

    .iconfont {
      font-size: 32px;
    }
  }
</style>
