<template>
<div class="fs28 ">
  <div class="mb16 bg-white p24">
    <div class="title mb16">选择日期范围</div>
    <div class="">
      <b-date-picker
        class="data-style"
        slot="right"
        type="date"
        title="请选择日期"
        :max-date="getdate(currentInfo.endDate)"
        :defaultDate="currentInfo.startDate"
        v-model="currentInfo.startDate"
      ></b-date-picker>
      <span class="">至</span>
      <b-date-picker
        class="data-style"
        slot="right"
        type="date"
        title="请选择日期"
        :min-date="getdate(currentInfo.startDate)"
        :defaultDate="currentInfo.endDate"
        v-model="currentInfo.endDate"
      ></b-date-picker>
    </div>
  </div>
  <div class="mb16 p24">
    <div class="title mb16">统计概览</div>
    <div class="dis-flex justify-center bg-blue">
      <div class="data-item">
        <div class="value-style">{{queryInfo.activity_num}}</div>
        <div class="key-style">开展活动数量</div>
      </div>
      <div class="data-item">
        <div class="value-style">{{queryInfo.followNum}}</div>
        <div class="key-style">跟进用户数量</div>
      </div>
    </div>
  </div>
  <div class="mb16">
    <div class="title p24 pbn mb16">转化统计</div>
    <div class="bg-white dis-flex justify-center p24">
      <div class="data-item1">
        <div class="value-style">{{queryInfo.user_num}}</div>
        <div class="key-style">参与用户数</div>
      </div>
      <div class="data-item1">
        <div class="value-style">{{queryInfo.orderNum}}</div>
        <div class="key-style">转化订单</div>
      </div>
      <div class="data-item1">
        <div class="value-style">{{queryInfo.orderMoney}}元</div>
        <div class="key-style">转化订单额</div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {
  BDatePicker
} from '@/components/form';
import {
  Toast
} from 'mand-mobile';

export default {
  name: 'dataAnalysis',
  components: {
    Toast,
    BDatePicker
  },
  data() {
    return {
      hmcId: '',
      currentInfo: {
        startDate: '',
        endDate: '',
      },
      queryInfo: {
        activity_num: 0,
        followNum: '0',
        orderMoney: '0',
        orderNum: '0',
        user_num: 0
      }
    };
  },
  activated() {
  },
  created() {
    if (this.$route.query.hmcId) {
      this.hmcId = this.$route.query.hmcId;
    }
    this.getDefalutData();
  },
  watch: {
    currentInfo: {
      // 数据变化时执行的逻辑代码
      handler() {
        this.queryResult();
      },
      // 开启深度监听
      deep: true
    }
  },
  computed: {
    getdate() {
      return date => new Date(date);
    }
  },
  methods: {
    queryResult() {
      if (this.currentInfo.startDate === '' || this.currentInfo.endDate === '') {
        Toast.failed('起止时间不能为空，请选择时间');
        return;
      }
      this.haierhouseService.queryCount({
        hmcId: this.hmcId,
        activityStartTime: this.currentInfo.startDate,
        activityEndTime: this.currentInfo.endDate
      }).then((res) => {
        if (res.code === 1) {
          this.queryInfo = res.data;
        }
      });
    },
    getDefalutData() {
      this.currentInfo.startDate = this.getLastMonthStartDate();
      this.currentInfo.endDate = this.getLastMonthEndDate();
    },
    // 获得上月开始时间
    getLastMonthStartDate() {
      const lastMonthDate = new Date(); // 上月日期
      lastMonthDate.setDate(1); // 变成这个月一号
      lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
      let lastYear = lastMonthDate.getFullYear();
      lastYear += (lastYear < 2000) ? 1900 : 0;
      const lastMonth = lastMonthDate.getMonth();

      const lastMonthStartDate = new Date(lastYear, lastMonth, 1);
      return this.formatDate(lastMonthStartDate);
    },
    // 获得上月结束时间
    getLastMonthEndDate() {
      const lastMonthDate = new Date(); // 上月日期
      lastMonthDate.setDate(1); // 变成这个月一号
      lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
      let lastYear = lastMonthDate.getFullYear();
      lastYear += (lastYear < 2000) ? 1900 : 0;
      const lastMonth = lastMonthDate.getMonth();

      const lastMonthEndDate = new Date(lastYear, lastMonth, this.getMonthDays(lastMonth));
      return this.formatDate(lastMonthEndDate);
    },
    // 获得某月的天数 可以
    getMonthDays(myMonth) {
      const nowYear = (new Date()).getFullYear();
      const monthStartDate = new Date(nowYear, myMonth, 1);
      const monthEndDate = new Date(nowYear, myMonth + 1, 1);
      //   console.log('天数'+monthStartDate+'==='+ monthEndDate)
      const days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
      //  console.log('天数，数量：'+days);
      return days;
    },
    // 格式化日期：yyyy-MM-dd
    formatDate(date) {
      const myyear = date.getFullYear();
      const mymonth = (date.getMonth() + 1).toString().padStart(2, '0');
      const myweekday = date.getDate().toString().padStart(2, '0');
      return (`${myyear}-${mymonth}-${myweekday}`);
    }
  },
  beforeRouteLeave(to, form, next) {
    this.$destroy();
    next();
  }
};
</script>

<style lang="scss">
.justify-center{
  justify-content: space-evenly;
}
.fs28{
  font-size: 28px;
}
.mb16{
  margin-bottom: 16px;
}
.bg-white{
  background: #fff;
}
.bg-blue{
  padding: 20px 0;
  background:linear-gradient(0deg,rgba(75,144,224,0.96),rgba(25,105,198,0.96));
  border-radius: 8px;
}
.p24{
  padding: 24px;
}
.pbn{
  padding-bottom: 0px !important;
}
.title{
  font-size: 30px;
  color: #333;
  font-weight: bold;
}
.data-style{
  margin: 0 20px;
  width: 260px;
  display: inline-block;
  .b-date-picker-ipt{
    background: #fff;
  }
}
.data-item{
  width: 200px;
  text-align: center;
  color: #fff;
  .value-style{
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 16px;
    /*color: #1969C6;*/
  }
  .key-style{
    font-size: 28px;
    /*color: #666;*/
  }
}
.data-item1{
  width: 200px;
  text-align: center;
  .value-style{
    height: 50px;
    line-height: 50px;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 16px;
    color: #1969C6;
  }
  .key-style{
    font-size: 28px;
    color: #666;
  }
}
</style>
