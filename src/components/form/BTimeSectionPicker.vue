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
      v-model="isTimePickerShow"
      @change="onPickerConfirm"
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
    defaultDate: {
      default: new Date()
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
      isTimePickerShow:false
    };
  },
  created(){
    var dayList = []
    const timeSectionArray = [
      {
        id:0,
        value:'8:00-9:00'
      },
      {
        id:0,
        value:'9:00-10:00'
      },
      {
        id:0,
        value:'10:00-11:00'
      },{
        id:0,
        value:'11:00-12:00'
      },{
        id:0,
        value:'13:00-14:00'
      },{
        id:0,
        value:'14:00-15:00'
      },{
        id:0,
        value:'15:00-16:00'
      },{
        id:0,
        value:'16:00-17:00'
      },{
        id:0,
        value:'17:00-18:00'
      }
    ]
    for (let i = 0; i < 365; i++) {
      const day = this.GetDateStr(i);
      const dayV = {
        id: i,
        value: day,
        children:timeSectionArray
      };
      dayList.push(dayV)
    }
    var t = []
    t.push(dayList)
    this.pickerData = t
    debugger

    // var dataA = [
    //   [
    //     {
    //       // 选项展示文案
    //       "text": {
    //         id:'1',
    //         value:''
    //       },
    //       // 第二列对应数据
    //       "children": [
    //         {
    //           id:'1',
    //           value:''
    //         },
    //         // ...
    //       ]
    //       // 以下自定义字段
    //       "value": ""
    //     },
    //     {
    //       // 选项展示文案
    //       "text": "",
    //       // 第二列对应数据
    //       "children": [
    //         {
    //
    //         },
    //         // ...
    //       ]
    //       // 以下自定义字段
    //       "value": ""
    //     },
    //     // ...
    //   ]
    // ]


  },
  mounted() {
    // this.pickerData = district
    this.pickerDefaultIndex = [0, 0]

    // window.PickerTrigger3 = () => {
    //   this.getColumnValue('picker', 0)
    // }
    // window.PickerTrigger4 = () => {
    //   this.getColumnIndex('picker', 0)
    // }
    // window.PickerTrigger5 = () => {
    //   this.pickerDefaultIndex = []
    //   this.pickerDefaultValue = ['110000', '110100', '110101']
    //   setTimeout(() => {
    //     this.$refs.picker.refresh()
    //   }, 0)
    // }
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
    onPickerInitialed(){},
    onPickerConfirm(index) {
      const values = this.$refs[`picker${index}`].getColumnValues()

      let res = ''
      values.forEach(value => {
        value && (res += `${value.text || value.label} `)
      })
      this[`pickerValue${index}`] = res
      debugger
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
</style>
