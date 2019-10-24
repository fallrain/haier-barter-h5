<template>
  <div class="activityDataAnalysis">
    <div class="activityDataAnalysis-bg">
      <img src="@/assets/images/activity/data-analysis-example.png" alt="">
    </div>
    <activity-name-time
      title="海尔国潮家电节|海尔智慧厨房"
      startDate="2019-06-01"
      endDate="2019-06-18"
      address="青岛市崂山区海尔路10号海尔专卖店"
    ></activity-name-time>
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
      >传播核心用户分析</button>
      <button
        class="common-submit-btn-primary"
        type="button"
      >已核销名单</button>
      <button
        class="common-submit-btn-primary"
        type="button"
      >未核销名单</button>
    </div>
  </div>
</template>

<script>
import ActivityNameTime from '../../components/business/activity/ActivityNameTime';
import BItem from '../../components/form/BItem';

export default {
  name: 'ActivityDataAnalysis',
  components: {
    BItem,
    ActivityNameTime
  }
};
</script>

<style lang="scss">
  .activityDataAnalysis-bg {
    width: 100%;
    height: 300px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .activityDataAnalysis-b-item {
    &.bItem-item {
      background: transparent;
    }
  }

  .activityDataAnalysis-data-grid{
    display: flex;
    flex-wrap: wrap;
    border-radius:8px;
    background: #fff;
    padding: 30px;
  }

  .activityDataAnalysis-data-grid-item{
    width: 25%;
    line-height: 1;
    text-align: center;
  }

  .activityDataAnalysis-data-grid-item:nth-child(n+5){
    margin-top: 70px;
  }

  .activityDataAnalysis-data-grid-item-num{
    color: #1969C6;
    font-size: 32px;
    margin-bottom: 24px;
  }

  .activityDataAnalysis-data-grid-item-user{
    color: #666;
    font-size: 24px;
  }

  .activityDataAnalysis-btn-par{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 27px 24px;
    .common-submit-btn-primary{
      width: 45%;
      margin-bottom: 24px;
    }
  }
</style>
