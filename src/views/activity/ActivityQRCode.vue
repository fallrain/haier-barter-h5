<template>
  <div class="activityQRCode">
    <div class="activityDataAnalysis-bg">
      <img src="@/assets/images/activity/data-analysis-example.png" alt="">
    </div>
    <activity-name-time
      :title="activityInfo.activityTitle"
      :startDate="activityInfo.activityStartTime"
      :endDate="activityInfo.activityEndTime"
      address="青岛市崂山区海尔路10号海尔专卖店"
    ></activity-name-time>
    <div class="activityQRCode-cnt">
      <p class="activityQRCode-cnt-title">活动专属二维码</p>
      <div class="activityQRCode-cnt-code-par">
        <div class="activityQRCode-cnt-code-corner activityQRCode-cnt-code-corner1"></div>
        <div class="activityQRCode-cnt-code-corner activityQRCode-cnt-code-corner2"></div>
        <div class="activityQRCode-cnt-code-corner activityQRCode-cnt-code-corner3"></div>
        <div class="activityQRCode-cnt-code-corner activityQRCode-cnt-code-corner4"></div>
        <img :src="qrcodeImg">
      </div>
      <div class="activityQRCode-cnt-inf">
        活动二维码可用于展示<span class="active">给用户报名参与活动</span>或
        <span class="active">下载打印到物业或传单上</span>
      </div>
    </div>
    <div class="activityQRCode-btn-par">
      <button
        class="common-submit-btn-primary"
        type="button"
      >取消
      </button>
      <a
        download=""
        class="common-submit-btn-default"
        @click="downLoadQrcode"
      >下载二维码
      </a>
    </div>
  </div>
</template>

<script>
import ActivityNameTime from '../../components/business/activity/ActivityNameTime';
// import qrcodeImg from '@/assets/images/activity/qrcode-example.png';

export default {
  name: 'ActivityQRCode',
  components: {
    ActivityNameTime
  },
  created() {
    this.activityInfo = this.$route.params.activityInfo;
    this.userInfo = this.$route.params.userInfo;
    console.log(this.activityInfo);
  },
  activated() {
    this.createQrcode();
  },
  data() {
    return {
      qrcodeImg: '',
      activityInfo: {},
      userInfo: {},
    };
  },
  methods: {
    createQrcode() {
      const protocol = `${window.location.protocol}//`;
      const host = window.location.host;
      const pathname = '/activity/activityDetail';
      const url = `${protocol + host + pathname}?activityId=${this.activityInfo.id}`;
      return this.activityService.generateQrcode({
        activityId: this.activityInfo.id,
        redirectUrl: url,
        hmcId: this.userInfo.hmcId,
      }).then((res) => {
        const blob = new Blob([res.data], {
          type: 'image/jpeg'
        });
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = (e) => {
          const result = e.target.result;
          if (result) {
            this.qrcodeImg = result;
          }
        };
      });
    },
    downLoadQrcode() {
      return this.activityService.generateQrcode('http://baidu.com/', '123456', '9999').then((res) => {
        this.bUtil.downloadFile(res.data);
      });
    },
  },
};
</script>

<style lang="scss">
  .activityQRCode-cnt {
    margin-top: 16px;
    text-align: center;
  }

  .activityQRCode-cnt-title {
    color: #999;
    font-size: 28px;
    line-height: 1;
  }

  .activityQRCode-cnt-code-par {
    position: relative;
    width: 314px;
    height: 314px;
    margin-top: 24px;
    margin-left: auto;
    margin-right: auto;
    padding: 28px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .activityQRCode-cnt-code-corner {
    width: 28px;
    height: 28px;
    border-color: #999;
    border-style: solid;
    border-width: 0;
  }

  .activityQRCode-cnt-code-corner1 {
    position: absolute;
    top: 0;
    left: 0;
    border-top-width: 1px;
    border-left-width: 1px;
  }

  .activityQRCode-cnt-code-corner2 {
    position: absolute;
    top: 0;
    right: 0;
    border-top-width: 1px;
    border-right-width: 1px;
  }

  .activityQRCode-cnt-code-corner3 {
    position: absolute;
    bottom: 0;
    right: 0;
    border-bottom-width: 1px;
    border-right-width: 1px;
  }

  .activityQRCode-cnt-code-corner4 {
    position: absolute;
    bottom: 0;
    left: 0;
    border-bottom-width: 1px;
    border-left-width: 1px;
  }

  .activityQRCode-cnt-inf {
    margin-top: 22px;
    margin-bottom: 22px;
    margin-left: 52px;
    margin-right: 52px;
    text-align: center;
    font-size: 24px;
    line-height: 40px;
    color: #999;
    .active{
      color: #1969C6;
    }
  }

  .activityQRCode-btn-par{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 22px 24px;

    .common-submit-btn-primary,
    .common-submit-btn-default{
      width: 45%;
    }
  }
</style>
