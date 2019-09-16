<template>
  <div>
    <div
      class="bMonthPop-filed"
      @click="showPop"
    >
      {{curDateText}}<i class="iconfont icon-jiantou9"></i>
    </div>
    <md-date-picker
      v-bind="$attrs"
      v-model="isDatePickerShow"
      ref="datePicker"
      :default-date="defaultDate"
      type="custom"
      :custom-types="['yyyy', 'MM']"
      @confirm="confirmClick"
    ></md-date-picker>
  </div>
</template>

<script>
import {
  DatePicker
} from 'mand-mobile';

export default {
  name: 'BMonthPop',
  inheritAttrs: true,
  components: {
    'md-date-picker': DatePicker
  },
  props: {
    defaultDate: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      // 日期pop显示隐藏
      isDatePickerShow: false,
      // 选中的日期文字
      curDateText: `${this.checkCurMonth(this.defaultDate.getMonth() + 1)}`
    };
  },
  methods: {
    showPop() {
      /* 显示 */
      this.isDatePickerShow = true;
    },
    checkCurMonth(month) {
      // 判断是否本月
      return month === new Date().getMonth() + 1 ? '本月' : `${month}月`;
    },
    confirmClick(dates) {
      // 选中时间点确认
      this.curDateText = this.checkCurMonth(dates[1].value);
      this.$emit('choosed', dates,);
    }
  }
};
</script>

<style lang="scss" scoped>
  .bMonthPop {

  }

  .bMonthPop-filed {
    display: flex;
    align-items: center;
    height: 60px;
    line-height: 60px;
    border-radius: 30px;
    border: 1px solid #1969C6;
    font-size: 28px;
    color: #1969C6;
    padding-left: 16px;
    padding-right: 16px;

    .iconfont {
      font-size: 24px;
    }
  }
</style>
