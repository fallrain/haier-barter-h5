<template>
  <div
    class="b-time-section-picker"
    :class="[disabled && 'b-date-picker-disabled']"
  >
    <div
      class="b-date-picker-ipt"
      @click="showPicker"
    >
      <span class="b-date-picker-ipt-val">{{value || $attrs.title}}</span>
      <i class="iconfont icon-riqi"></i>
    </div>
    <md-picker
      ref="picker"
      :data="pickerData"
      :cols="2"
      :default-index="pickerDefaultIndex"
      :default-value="pickerDefaultValue"
      is-view
      is-cascade
      @initialed="onPickerInitialed"
      @change="onPickerConfirm"
    ></md-picker>
  </div>
</template>

<script>
  import {Picker} from 'mand-mobile'

  export default {
    name: 'BTimeSectionPicker',
    components: {
      [Picker.name]: Picker,
    },
    props: {
      value: {},
      // 默认值
      defaultDate: {
        default: new Date()
      },
      pattern: {
        type: String,
        default: 'yyyy-MM-dd'
      },
      // 禁用
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        // defaultVal: this.defaultDate ? new Date(this.defaultDate) : new Date(),
        pickerData: [],
        pickerDefaultIndex: [],
        pickerDefaultValue: [],
        pickerValue: '',
      };
    },
    methods: {
      datePickerConfirm() {
        /* 点了确定按钮 */
        const date = this.$refs.datePicker.getFormatDate(this.pattern);
        this.$emit('confirm', date);
        this.$emit('input', date);
      },
      showPicker() {
        /* 显示时间选择器 */
        if (this.disabled) {
          return;
        }
        this.isDatePickerShow = true;
      }
    }
  };
</script>

<style lang="scss">
  .b-time-section-picker {
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

  .b-date-picker-ipt-val {

  }

  .b-date-picker-disabled {
    .b-date-picker-ipt-val {
      color: #999;
    }
  }
</style>
