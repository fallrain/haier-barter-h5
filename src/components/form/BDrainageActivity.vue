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
        <span class="drainage-activity-time">{{activityStartTime}}至{{activityEndTime}}</span>

        <div class="drainage-activity-container">
          <div>
            <span class="drainage-activity-time drainage-activity-store">{{getData.microName}}</span>
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
        v-show="getData.allowShare === 1"
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
        v-show="getData.participateCount !== 0"
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
      activityStartTime: '',
      activityEndTime: '',
    };
  },
  props: {
    getData: {
    },
    userData: {

    },
  },
  created() {
    // 活动日期，截取到日
    if (this.getData) {
      if (this.getData.activityEndTime) {
        const index = this.getData.activityEndTime.indexOf(' ');
        this.activityEndTime = this.getData.activityEndTime.substring(0, index);
      }
      if (this.getData.activityStartTime) {
        const index = this.getData.activityStartTime.indexOf(' ');
        this.activityStartTime = this.getData.activityStartTime.substring(0, index);
      }
    }
  },
  methods: {
    share() {
      this.$emit('shareClick', this.getData);
    },
    qrCode() {
      this.settingShareWX();
      this.$router.push({
        name: 'Activity.ActivityQRCode',
        params: { activityInfo: this.getData,
          userInfo: this.userData }
      });
    },
    dataStatistics() {
      this.settingShareWX();
      this.$router.push({
        name: 'Activity.ActivityDataAnalysis',
        params: { activityInfo: this.getData,
          userInfo: this.userData }
      });
    },
    showActivityDetail() {
      // 传值给小程序
      this.settingShareWX();
      this.$router.push({
        name: 'Activity.ActivityDetail',
        params: { activityId: this.getData.id,
          userInfo: this.userData }
      });
    },
    // h5给小程序传分享时需要的数据
    settingShareWX() {
      wx.ready(() => {
        console.log('this.getData.id====', this.getData.id);
        console.log('this.userData.hmcId====', this.userData.hmcId);
        wx.miniProgram.postMessage({
          data: {
            activityId: this.getData.id,
            hmcId: this.userData.hmcId,
          }
        });
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
    height: 88px;
    width: 433px;
    font-size: 28px;
    color: #333;
    overflow: hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:2;//想要的行数
    -webkit-box-orient:vertical;
  }

  .drainage-activity-store {
    height: 33px;
    width: 326px;
    overflow: hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:1;//想要的行数
    -webkit-box-orient:vertical;
  }

  .drainage-activity-time {
    font-size: 24px;
    color: #999;
    margin-top: 10px;
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
