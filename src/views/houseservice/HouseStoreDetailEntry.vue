<template>
  <div class="container">
    <div class="header">
      <span class="headTitle">{{customerInfo.title}}</span>
    </div>
    <div id="capture" class="content" v-html="message"></div>
    <div v-if="showSharebtn" class="shareClass" @click="shareImg">保存图片到相册</div>
     <div class="popContainer" v-if="isShowPopContainer" @click="closeShare" style="z-index: 100000">
      <img src="@/assets/images/activity/activity-share.png" alt="" class="activity-detail-share">
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';

export default {
  data() {
    return {
      message: '',
      customerInfo: {},
      showSharebtn: false,
      isShowPopContainer: false,
    };
  },
  created() {},
  activated() {
    const that = this;
    this.houseService
      .searchStoryByPlanId({
        planId: this.$route.query.planId
      })
      .then((res) => {
        if (res.code === 1) {
          this.customerInfo = res.data;
          this.message = res.data.content;
          that.$nextTick(() => {
            //
            that.showSharebtn = true;
          });
        }
      });
  },
  methods: {
    closeShare() {
      this.isShowPopContainer = false;
    },
    capture() {
      const that = this;
      // document.querySelector('#capture')
      html2canvas(document.body, {
        allowTaint: true,
        useCORS: true
      }).then((canvas) => {
        // document.body.appendChild(canvas);
        const imgUrl = canvas.toDataURL('image/png', 0.001); // 此方法可以设置截图质量（0-1）
        console.log('base64编码数据：', imgUrl);
        console.log('base64编码数据长度：', imgUrl.length);
        that.updateImgToBack(imgUrl);
      });
    },
    shareImg() {
      const that = this;
      that.capture();
    },
    // 上传base64
    updateImgToBack(imgUrl) {
      const data = {
        base64Str: imgUrl,
      };
      this.houseService.uploadImage(data, {}).then((res) => {
        if (res.code === 1) {
          // this.isShowPopContainer = true;

          wx.miniProgram.postMessage({
            data: {
              shareUrl: res.data
            }
          });
          wx.miniProgram.navigateBack({ delta: 1 });
        }
      });
    }
  },
  mounted() {},
  watch: {}
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: column;
  background: white;
}
.headerimg {
  width: 100%;
}
.headTitle {
  font-size: 40px;
  font-weight: 500;
}
.iconClass {
  width: 30px;
  height: 30px;
}
.content img {
  width: 100%;
}
.bottomClass {
  display: flex;
}
.zanclass {
  height: 29.65px;
}
.moreClass {
  display: flex;
}
.shareClass{
   float: right;
   margin: 30px;
}
  .popContainer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
    .activity-detail-share {
    position: fixed;
    right: 128px;
    width: 493px;
    height: 694px;
  }
</style>
