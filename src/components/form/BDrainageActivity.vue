<template>
  <div class="drainage-activity-bg">

    <div class="drainage-activity-contains">

      <div class="drainage-activity-left">
        <img src="../../assets/images/edit-delete.png" class="drainage-activity-img"/>
        <span class="drainage-activity-status">11111</span>
      </div>

      <div class="drainage-activity-right">
        <span class="drainage-activity-title">{{getData.activityTitle}}</span>
        <span class="drainage-activity-time">{{getData.activityStartTime}}至{{getData.activityEndTime}}</span>

        <div class="drainage-activity-container">
          <div>
            <span class="drainage-activity-time">{{getData.microName}}</span>
          </div>
          <div>
            <i class="iconfont icon-yanjing"/>
            <span class="drainage-activity-time">{{getData.allowShare}}</span>
          </div>
        </div>

      </div>
    </div>
    <div class="drainage-activity-btns">
      <button
        type="button"
        class="common-btn-primary"
        @click="share">
        分享
      </button>
      <button
        type="button"
        class="common-btn-primary"
        style="margin-left:15px">
        认筹营销
      </button>
      <button
        type="button"
        class="common-btn-primary"
        style="margin-left:15px"
        @click="qrCode">
        活动二维码
      </button>
      <button
        type="button"
        class="common-btn-primary"
        style="margin-left:15px"
        @click="dataStatistics">
        数据统计
      </button>
    </div>

    <md-popup
      v-model="isPopupShow"
      position="bottom"
      class="md-popup-class"
    >
      <md-popup-title-bar
        large-radius
        @confirm="hidePopUp('bottom')"
        @cancel="hidePopUp('bottom')"
      ></md-popup-title-bar>
      <div class="drainage-popup-items">
        <div class="drainage-popup-item" @click="shareWechat">

          <i class="iconfont icon-weixin drainage-popup-img"/>
          <div>
            <span class="drainage-popup-title">分享微信好友</span>
          </div>
          <div>
            <span class="drainage-popup-tip">转发到聊天</span>
          </div>

        </div>
        <div class="drainage-popup-item" @click="shareImg">

          <i class="iconfont icon-weixin drainage-popup-img"/>
          <div>
            <span class="drainage-popup-title">生成分享图片</span>
          </div>
          <div>
            <span class="drainage-popup-tip">长按保存图片可分享</span>
          </div>

        </div>
      </div>
      <div class="popup-cancle" @click="drainageCancle">
        <span class="popup-cancle-text">取消</span>
      </div>
    </md-popup>

  </div>
</template>

<script>
  import {Popup, PopupTitleBar, Button, Icon} from 'mand-mobile'
export default {
  name: 'BDrainageActivity',
  components: {
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Button.name]: Button,
    [Icon.name]: Icon,
  },
  data() {
    return {
      isPopupShow: false,
    };
  },
  props: {
    getData: {
      name: '',
      giftUrl: '',
      time: '',
      scope: '',
      people: ''
    }
  },
  methods: {
    share() {
      this.isPopupShow = true;
    },
    qrCode() {
      this.$router.push({
        name: 'Activity.ActivityQRCode',
        params: {activityInfo: this.getData}
      });
    },
    dataStatistics() {
      this.$router.push({
        name: 'Activity.ActivityDataAnalysis',
        params: {activityInfo: this.getData}
      });
    },
    drainageCancle() {
      this.isPopupShow = false;
    },
    shareWechat() {

    },
    shareImg() {

    }
  },
};
</script>

<style lang="scss">

  .drainage-activity-bg {
    width: 100%;
    height: 294px;
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 24px 24px 0 24px;
    margin-top: 16px;
    margin-bottom: 40px;

    .md-popup-class {
      .md-popup-box {
        background: #fff;
      }

      .md-popup-title-bar {
        background: #fff;
        height: 15px;
      }
    }
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
    right: 0px;
    left: 0px;
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

  .popup-cancle {
    width: 100%;
    height: 100px;
    background: #F5F5F5;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .popup-cancle-text {
    font-size: 32px;
    color: #333;
  }

  .drainage-popup-items {
    width: 100%;
    height: 284px;
    background: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .drainage-popup-item {
    /*width: 170px;*/
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    margin-left: 58px;
  }

  .drainage-popup-title {
    font-size: 28px;
    color: #333;
  }

  .drainage-popup-tip {
    font-size: 20px;
    color: #999;
  }

  .drainage-popup-img {
    font-size: 80px;
    color: #00cd00;
  }
</style>
