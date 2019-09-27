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
      v-bind="$attrs"
      ref="picker"
      :data="pickerData"
      :cols="2"
      :default-index="pickerDefaultIndex"
      :default-value="pickerDefaultValue"
      is-cascade
      v-model="isTimePickerShow"
      @change="onPickerConfirm"
      @confirm="confirmPicker"
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
      isTimePickerShow: false,
      cascade: true,
      dd: new Date(),
      timeArray: [
        {
          value: 8,
          text: '08:00-09:00'
        },
        {
          value: 9,
          text: '09:00-10:00'
        },
        {
          value: 10,
          text: '10:00-11:00'
        }, {
          value: 11,
          text: '11:00-12:00'
        },
        {
          value: 12,
          text: '12:00-13:00'
        },
        {
          value: 13,
          text: '13:00-14:00'
        }, {
          value: 14,
          text: '14:00-15:00'
        }, {
          value: 15,
          text: '15:00-16:00'
        }, {
          value: 16,
          text: '16:00-17:00'
        }, {
          value: 17,
          text: '17:00-18:00'
        }
      ]
    };
  },
  created() {
    const dayList = [];
    let i = 0;
    const h = this.dd.getHours();
    if (h >= 12) {
      i++;
    }
    for (i; i < 365; i++) {
      const day = this.GetDateStr(i).day;
      const timeSectionArray = this.GetDateStr(i).timeSection;
      const dayV = {
        value: i,
        text: day,
        children: timeSectionArray
      };
      dayList.push(dayV);
    }
    // data.children = dayList
    const y = [];
    y.push(dayList);
    // const t = [];
    // t.push(y);
    this.pickerData = y;
    debugger;
  },
  mounted() {
    // this.pickerData = district
    this.pickerDefaultIndex = [0, 0];
  },
  methods: {
    getTimeSection() {

    },
    GetDateStr(AddDayCount) {
      const dd = this.dd;
      dd.setDate(dd.getDate() + AddDayCount);// 获取AddDayCount天后的日期
      const y = dd.getFullYear();
      const m = (dd.getMonth() + 1) < 10 ? `0${dd.getMonth() + 1}` : (dd.getMonth() + 1);// 获取当前月份的日期，不足10补0
      const d = dd.getDate() < 10 ? `0${dd.getDate()}` : dd.getDate();// 获取当前几号，不足10补0
      const time = {
        day: `${y}-${m}-${d}`,
        timeSection: []
      };
      if (AddDayCount > 0) {
        time.timeSection = this.timeArray;
      } else {
        const h = this.dd.getHours();
        const dh = h + 6;
        const timeA = [];
        this.timeArray.forEach((t) => {
          if (t.value >= dh) {
            timeA.push(t);
          }
        });
        time.timeSection = timeA;
      }
      return time;
    },
    onPickerInitialed() {},
    onPickerConfirm(index) {
      // const values = this.$refs[`picker${index}`].getColumnValues();
      //
      // let res = '';
      // values.forEach((value) => {
      //   value && (res += `${value.text || value.text} `);
      // });
      // this[`pickerValue${index}`] = res;
      // debugger;
    },
    getColumnValues(columnsValue) {
      return columnsValue;
    },

    confirmPicker(columnsValue) {
      debugger;
      const data = `${columnsValue[0].text} ${columnsValue[1].text}`;
      this.$emit('confirmDeliveryTime', data);
    },

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
