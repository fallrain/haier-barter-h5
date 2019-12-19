<template>
  <div class="activityDataAnalysis">
    <div class="activityDataAnalysis-bg">
      <img v-if="detailInfo.activityInfoPoster.posterUrl1" :src="detailInfo.activityInfoPoster.posterUrl1" alt="">
    </div>
    <activity-name-time
      :title="activityInfo.activityTitle"
      :startDate="activityInfo.activityStartTime"
      :endDate="activityInfo.activityEndTime"
      :address="activityInfo.storeName"
    ></activity-name-time>

    <b-item
      class="mt16"
      title="开始日期："
    >
      <template
        v-slot:right=""
      >
        <b-date-picker
          class="orderEntry-date"
          slot="right"
          type="date"
          title="请选择日期"
          :defaultDate="startDate"
          v-model="startDate"
          :max-date="currentDate"
        ></b-date-picker>
      </template>
    </b-item>
    <b-item
      class="mt16"
      title="结束日期："
    >
      <template
        v-slot:right=""
      >
        <b-date-picker
          class="orderEntry-date"
          slot="right"
          type="date"
          title="请选择日期"
          :defaultDate="endDate"
          v-model="endDate"
          :max-date="currentDate"
        ></b-date-picker>
      </template>
    </b-item>
    <b-item
      class="activityDataAnalysis-b-item"
      title="数据分析"
    >
    </b-item>
    <ul class="activityDataAnalysis-data-grid">
      <li class="activityDataAnalysis-data-grid-item" v-for="(item, index) in count" :key="index">
        <div class="activityDataAnalysis-data-grid-item-num">{{item.quantity}}</div>
        <div class="activityDataAnalysis-data-grid-item-user">{{typeName[item.counterTypeCode]}}</div>
      </li>
    </ul>
    <div class="activityDataAnalysis-btn-par">
      <button
        class="common-submit-btn-primary"
        type="button"
        v-show="false"
      >传播核心用户分析
      </button>
      <button
        class="common-submit-btn-primary"
        type="button"
        v-show="false"
      >已核销名单
      </button>
      <button
        class="common-submit-btn-primary"
        type="button"
        v-show="false"
      >未核销名单
      </button>
    </div>
  </div>
</template>

<script>
import {
  Toast,
} from 'mand-mobile';
import ActivityNameTime from '../../components/business/activity/ActivityNameTime';
import {
  BDatePicker,
  BItem,
} from '@/components/form';

export default {
  name: 'ActivityDataAnalysis',
  components: {
    BItem,
    BDatePicker,
    Toast,
    ActivityNameTime
  },
  activated() {
    this.getDate();
    if (this.$route.params.activityInfo) {
      this.activityInfo = this.$route.params.activityInfo;
      console.log(this.activityInfo);
      // 活动详情查询
      this.activityService.queryActivityInfoDetails({}, {
        activityId: this.activityInfo.id,
      }).then((res) => {
        if (res.code === 1) {
          this.detailInfo = res.data;
        }
      });
      this.getAnalysisData();
    }
  },
  data() {
    return {
      typeName: {
        single_reading_count: '浏览',
        single_share_count: '分享',
        single_forword_count: '转发',
        single_join_count: '参加',
        single_conversion_count: '转化订单',
        single_conversion_amount_sum: '转化金额',
        single_receive_coupon_count: '领劵',
      },
      detailInfo: {},
      activityInfo: {
        activityTitle: '',
        activityStartTime: '',
        activityEndTime: ''
      },
      count: {},
      startDate: '',
      endDate: '',
      currentDate: new Date(),
    };
  },
  methods: {
    getAnalysisData() {
      this.activityService.detailCount({}, {
        activityId: this.activityInfo.id,
        countDateStart: `${this.startDate} 00:00:00`,
        countDateEnd: `${this.endDate} 23:59:59`
      }).then((res) => {
        if (res.code === 1) {
          this.count = res.data;
          debugger
          if (!res.data || res.data.length == 0) {
            Toast.info('暂无数据');
          }
        }
      });
    },
    getDate() {
      const myDate = new Date();
      this.endDate = `${myDate.getFullYear()}-${myDate.getMonth() + 1}-${myDate.getDate()}`;
      myDate.setMonth(myDate.getMonth() - 1);
      this.startDate = `${myDate.getFullYear()}-${myDate.getMonth() + 1}-${myDate.getDate()}`;
    }
  },
  watch: {
    startDate() {
      if (!this.endDate) {
        return;
      }
      this.getAnalysisData();
    },
    endDate() {
      if (!this.startDate) {
        return;
      }
      this.getAnalysisData();
    },
  },
  beforeRouteLeave(to, from, next) {
    this.$destroy();
    next();
  }
};
</script>

<style lang="scss">
  .activityDataAnalysis-b-item {
    &.bItem-item {
      background: transparent;
    }
  }

  .activityDataAnalysis-data-grid {
    display: flex;
    flex-wrap: wrap;
    border-radius: 8px;
    background: #fff;
    padding: 30px;
  }

  .activityDataAnalysis-data-grid-item {
    width: 25%;
    line-height: 1;
    text-align: center;
  }

  .activityDataAnalysis-data-grid-item:nth-child(n+5) {
    margin-top: 70px;
  }

  .activityDataAnalysis-data-grid-item-num {
    color: #1969C6;
    font-size: 32px;
    margin-bottom: 24px;
  }

  .activityDataAnalysis-data-grid-item-user {
    color: #666;
    font-size: 24px;
  }

  .activityDataAnalysis-btn-par {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 27px 24px;

    .common-submit-btn-primary {
      width: 45%;
      margin-bottom: 24px;
    }
  }

  .orderEntry-date {
    width: 320px;
  }

</style>
