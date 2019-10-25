<template>
  <div class="activityNameTime-par">
    <p class="activityNameTime-title">{{title}}</p>
    <div class="activityNameTime-item">
      <i class="iconfont icon-solid-time"></i>{{startDate}}至{{endDate}}
    </div>
    <div class="activityNameTime-item">
      <i class="iconfont icon-dingwei"></i>{{address}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityNameTime',
  props: {
    title: {
      type: String
    },
    // 开始时间 例：2019-06-01
    startDate: {
      type: String
    },
    // 结束时间 例：2019-06-20
    endDate: {
      type: String
    },
    // 地址，例：青岛市崂山区海尔路10号海尔专卖店
    address: {
      type: String
    },
  }
};
</script>

<style lang="scss">
  .activityNameTime-par {
    padding: 24px;
    background: #fff;
  }

  .activityNameTime-title {
    margin-bottom: 20px;
    line-height: 1;
    font-size: 32px;
    color: #333;
  }


  .activityNameTime-item {
    margin-bottom: 14px;
    color: #999;
    font-size: 24px;
    line-height: 28px;

    &:last-child {
      margin-bottom: 0;
    }

    .iconfont {
      margin-right: 27px;
      font-size: 28px;
      color: #1969C6;
    }
  }
</style>
