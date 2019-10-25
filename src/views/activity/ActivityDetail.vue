<template>
  <div>
    <div class="activityDetail-detail-title-bg">
      <img src="@/assets/images/activity/detail-example.png" alt="">
    </div>
    <activity-name-time
      title="海尔国潮家电节|海尔智慧厨房"
      startDate="2019-06-01"
      endDate="2019-06-18"
      address="青岛市崂山区海尔路10号海尔专卖店"
    ></activity-name-time>
    <div class="activityDetail-btm-btns">
      <button
        type="button"
        class="common-submit-btn-waring activityDetail-btm-btn"
      >分享有好礼</button>
      <button
        type="button"
        class="common-submit-btn-default activityDetail-btm-btn"
      >我要报名参加</button>
    </div>
  </div>
</template>

<script>
import ActivityNameTime from '../../components/business/activity/ActivityNameTime';

export default {
  name: 'ActivityDetail',
  components: {
    ActivityNameTime
  }
};
</script>

<style lang="scss">
  .activityDetail-detail-title-bg {
    width: 100%;

    img {
      width: 100%;
    }
  }

  .activityDetail-btm-btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24px;
    .activityDetail-btm-btn{
      width: 45%;
    }
  }
</style>
