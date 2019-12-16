<template>
  <div class="drainage-activity-bg" @click="showActivityDetail">

    <div class="drainage-activity-contains">

      <div class="drainage-activity-left">
        <img :src=getData.posterUrl1 class="drainage-activity-img"/>
        <div v-show="getData.participateCount !== 0" class="drainage-activity-status bg-primary">已参与{{getData.participateCount}}人</div>
        <div v-show="getData.participateCount === 0" class="drainage-activity-status bg-danger">未参与</div>
      </div>

      <div class="drainage-activity-right">
        <span class="drainage-activity-title">{{getData.activityTitle}}</span>
        <span class="drainage-activity-time">{{getData.activityStartTime}}至{{getData.activityEndTime}}</span>

        <div class="drainage-activity-container">
          <div>
            <span class="drainage-activity-time">{{getData.microName}}</span>
          </div>
          <div>
            <i class="iconfont icon-yanjing fs38 mr16"/>
            <span class="drainage-activity-time">{{getData.singleReadingCount}}</span>
          </div>
        </div>

      </div>
    </div>
    <div class="drainage-activity-btns">
      <button
        type="button"
        class="common-btn-primary"
        @click.stop="share">
        分享
      </button>
      <button
        type="button"
        class="common-btn-primary"
        v-show="false"
        style="margin-left:15px">
        认筹营销
      </button>
      <button
        type="button"
        class="common-btn-primary"
        style="margin-left:15px"
        @click.stop="qrCode">
        活动二维码
      </button>
      <button
        type="button"
        class="common-btn-primary"
        style="margin-left:15px"
        @click.stop="dataStatistics">
        数据统计
      </button>
    </div>

  </div>
</template>

<script>

export default {
  name: 'BDrainageActivity',
  components: {
  },
  data() {
    return {
      isPopupShow: false,
    };
  },
  props: {
    getData: {
    },
    userData: {

    },
  },
  methods: {
    share() {
      this.$emit('shareClick', this.getData);
    },
    qrCode() {
      this.$router.push({
        name: 'Activity.ActivityQRCode',
        params: { activityInfo: this.getData,
          userInfo: this.userData }
      });
    },
    dataStatistics() {
      this.$router.push({
        name: 'Activity.ActivityDataAnalysis',
        params: { activityInfo: this.getData,
          userInfo: this.userData }
      });
    },
    showActivityDetail() {
      this.$router.push({
        name: 'Activity.ActivityDetail',
        params: { activityId: this.getData.id,
          userInfo: this.userData }
      });
    }
  },
};
</script>

<style lang="scss" scoped>

  .drainage-activity-bg {
    width: 100%;
    height: 294px;
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 24px 24px 0 24px;
    margin-top: 16px;
    margin-bottom: 40px;
  }

  .drainage-activity-contains {
    width: 100%;
    background: #fff;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
  }

  .drainage-activity-btns {
    width: 100%;
    height: 108px;
    background: #fff;
    flex-grow: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }

  .drainage-activity-img {
    width: 221px;
    height: 160px;
  }

  .drainage-activity-status {
    position: absolute;
    top: 0px;
    left: 0px;
    font-size: 24px;
    line-height: 32px;
  }

  .drainage-activity-left {
    position: relative;
    width: 221px;
    height: 160px;
  }

  .drainage-activity-right {
    display: flex;
    flex-direction: column;
    margin-left: 24px;
    width: 100%;
  }

  .drainage-activity-title {
    height: 63px;
    font-size: 28px;
    color: #333;
    margin-bottom: 20px;
  }

  .drainage-activity-time {
    font-size: 24px;
    color: #999;
  }

  .drainage-activity-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .bg-primary{
    background: #4A90E2;
    color: #fff;
  }
  .bg-danger{
    background: #FF001F;
    color: #fff;
  }
  .fs38{
    font-size: 28px;
  }
</style>
