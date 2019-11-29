<template>
  <div class="activityDataAnalysis">
    <div class="activityDataAnalysis-bg">
      <img src="@/assets/images/activity/data-analysis-example.png" alt="">
    </div>
    <activity-name-time
      :title="activityInfo.activityTitle"
      :startDate="activityInfo.activityStartTime"
      :endDate="activityInfo.activityEndTime"
      address="青岛市崂山区海尔路10号海尔专卖店"
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
      <li class="activityDataAnalysis-data-grid-item">
        <div class="activityDataAnalysis-data-grid-item-num">2121</div>
        <div class="activityDataAnalysis-data-grid-item-user">浏览人数</div>
      </li>
      <li class="activityDataAnalysis-data-grid-item">
        <div class="activityDataAnalysis-data-grid-item-num">423</div>
        <div class="activityDataAnalysis-data-grid-item-user">分享人数</div>
      </li>
      <li class="activityDataAnalysis-data-grid-item">
        <div class="activityDataAnalysis-data-grid-item-num">3132</div>
        <div class="activityDataAnalysis-data-grid-item-user">领券人数</div>
      </li>
      <li class="activityDataAnalysis-data-grid-item">
        <div class="activityDataAnalysis-data-grid-item-num">423</div>
        <div class="activityDataAnalysis-data-grid-item-user">核销人数</div>
      </li>
      <li class="activityDataAnalysis-data-grid-item">
        <div class="activityDataAnalysis-data-grid-item-num">534534</div>
        <div class="activityDataAnalysis-data-grid-item-user">转化人数</div>
      </li>
      <li class="activityDataAnalysis-data-grid-item">
        <div class="activityDataAnalysis-data-grid-item-num">33%</div>
        <div class="activityDataAnalysis-data-grid-item-user">
          转化率
        </div>
      </li>
      <li class="activityDataAnalysis-data-grid-item">
        <div class="activityDataAnalysis-data-grid-item-num">3232.55</div>
        <div class="activityDataAnalysis-data-grid-item-user">
          转化金额
        </div>
      </li>
    </ul>
    <div class="activityDataAnalysis-btn-par">
      <button
        class="common-submit-btn-primary"
        type="button"
      >传播核心用户分析
      </button>
      <button
        class="common-submit-btn-primary"
        type="button"
      >已核销名单
      </button>
      <button
        class="common-submit-btn-primary"
        type="button"
      >未核销名单
      </button>
    </div>
  </div>
</template>

<script>
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
    ActivityNameTime
  },
  created() {
    // this.activityInfo = this.$route.params.activityInfo;
  },
  data() {
    return {
      activityInfo: {
        activityTitle: '',
        activityStartTime: '',
        activityEndTime: ''
      },
      startDate: '',
      endDate: '',
      currentDate: new Date(),
    };
  },
  methods: {
    getAnalysisData() {
      this.activityService.detailCount({
        activityId: this.activityInfo.activityId,
        countDateStart: this.startDate,
        countDateEnd: this.endDate
      }).then((res) => {

      });
    },
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
