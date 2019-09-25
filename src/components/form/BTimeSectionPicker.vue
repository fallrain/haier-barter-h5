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
      :cols="3"
      :default-index="pickerDefaultIndex"
      :default-value="pickerDefaultValue"
      is-view
      is-cascade
      v-model="isTimePickerShow"
      @change="onPickerConfirm"
      @getColumnValue="getColumnValue"
    ></md-picker>
  </div>
</template>

<script>
import {
  Picker
} from 'mand-mobile';

export default {
  name: 'BTimeSectionPicker',
  components: {
    [Picker.name]: Picker,
  },
  props: {
    value: {},
    // 默认值
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
      isTimePickerShow: true
    };
  },
  created() {
    const dayList = [];
    const timeSectionArray = [
      {
        value: 0,
        text: '8:00-9:00'
      },
      {
        value: 1,
        text: '9:00-10:00'
      },
      {
        value: 2,
        text: '10:00-11:00'
      }, {
        value: 3,
        text: '11:00-12:00'
      }, {
        value: 4,
        text: '13:00-14:00'
      }, {
        value: 5,
        text: '14:00-15:00'
      }, {
        value: 6,
        text: '15:00-16:00'
      }, {
        value: 7,
        text: '16:00-17:00'
      }, {
        value: 8,
        text: '17:00-18:00'
      }
    ];
    const data = {
      text: '请选择日期',
      value: 'day',
      children: []
    };

    for (let i = 0; i < 365; i++) {
      const day = this.GetDateStr(i);
      const dayV = {
        value: i,
        text: day,
        children: {
          text: '请选择送达时间',
          value: 'hour',
          children: timeSectionArray
        }
      };
      dayList.push(dayV);
    }
    data.children = dayList
    const y = [];
    y.push(data);
    const t = [];
    t.push(y);
    this.pickerData = t;
    debugger;
  },
  mounted() {
    // this.pickerData = district
    this.pickerDefaultIndex = [0, 0];
  },
  methods: {
    GetDateStr(AddDayCount) {
      const dd = new Date();
      dd.setDate(dd.getDate() + AddDayCount);// 获取AddDayCount天后的日期
      const y = dd.getFullYear();
      const m = (dd.getMonth() + 1) < 10 ? `0${dd.getMonth() + 1}` : (dd.getMonth() + 1);// 获取当前月份的日期，不足10补0
      const d = dd.getDate() < 10 ? `0${dd.getDate()}` : dd.getDate();// 获取当前几号，不足10补0
      return `${y}-${m}-${d}`;
    },
    onPickerInitialed() {},
    onPickerConfirm(index) {
      const values = this.$refs[`picker${index}`].getColumnValues();

      let res = '';
      values.forEach((value) => {
        value && (res += `${value.text || value.text} `);
      });
      this[`pickerValue${index}`] = res;
      debugger;
    },
    getColumnValue(){},
    getColumnValues(columnsValue){

      return columnsValue
    },
    // datePickerConfirm() {
    //   /* 点了确定按钮 */
    //   // const date = this.$refs.datePicker.getFormatDate(this.pattern);
    //   // this.$emit('confirm', date);
    //   // this.$emit('input', date);
    // },
    showPicker() {
      /* 显示时间选择器 */
      if (this.disabled) {
        return;
      }
      this.isTimePickerShow = true;
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
  .md-picker{
    width: 750px;
  }
</style>
