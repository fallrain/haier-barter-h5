<template>
  <div class="activityQRCode">
    <div class="activityDataAnalysis-bg">
      <img src="@/assets/images/activity/data-analysis-example.png" alt="">
    </div>
    <activity-name-time
      :title="activityInfo.activityTitle"
      :startDate="activityInfo.activityStartTime"
      :endDate="activityInfo.activityEndTime"
      :address="detailInfo.storeName"
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
        @click="goBack"
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
import {
  Toast,
  Dialog,
} from 'mand-mobile';

export default {
  name: 'ActivityQRCode',
  components: {
    Toast,
    Dialog,
    ActivityNameTime
  },
  created() {
  },
  activated() {
    this.activityInfo = this.$route.params.activityInfo;
    this.getUserInfo = this.$route.params.userInfo;
    if (this.activityInfo && this.getUserInfo) {
      console.log(this.activityInfo);
      // 活动详情查询
      this.activityService.queryActivityInfoDetails({}, {
        activityId: this.activityInfo.id,
        hmcId: this.getUserInfo.hmcId,
      }).then((res) => {
        if (res.code === 1) {
          this.detailInfo = res.data;
        }
      });
    }
    this.createQrcode();
  },
  data() {
    return {
      qrcodeImg: '',
      activityInfo: {},
      getUserInfo: {},
      storeName: '',
      detailInfo: {},
    };
  },
  methods: {
    createQrcode() {
      const protocol = `${window.location.protocol}//`;
      const host = window.location.host;
      const pathname = '/activity/activityDetail';
      const userName = encodeURIComponent(this.getUserInfo.username);
      const url = `${protocol + host + pathname}?activityId=${this.activityInfo.id}&mobile=${this.getUserInfo.mobile}&username=${userName}&hmcId=${this.getUserInfo.hmcId}`;
      console.log('url==', url);
      this.basicService.authorizedUrl({ frontUrl: url }).then((res) => {
        if (res.code === 1) {
          if (res.data) {
            return this.activityService.generateQrcode({
              activityId: this.activityInfo.id,
              redirectUrl: res.data,
              hmcId: this.getUserInfo.hmcId,
            }).then((res1) => {
              const blob = new Blob([res1.data], {
                type: 'image/png'
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
          }
          Toast.info('授权失败');
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    downLoadQrcode() {
      // const protocol = `${window.location.protocol}//`;
      // const host = window.location.host;
      // const pathname = '/activity/activityDetail';
      // const url = `${protocol + host + pathname}?activityId=${this.activityInfo.id}`;
      // return this.activityService.generateQrcode({
      //   activityId: this.activityInfo.id,
      //   redirectUrl: url,
      //   hmcId: this.getUserInfo.hmcId,
      // }).then((res) => {
      //   this.bUtil.downloadFile(res.data);
      // });
      Dialog.alert({
        content: '长按页面二维码保存图片',
        confirmText: '确定',
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
    width: 330px;
    height: 330px;
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
