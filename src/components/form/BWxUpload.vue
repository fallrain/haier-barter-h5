<template>
  <div class="bUpload-img-par">
    <div
      v-show="imgs.length"
      class="bUpload-img-preshow"
    >
      <div
        class="bUpload-preshow"
        v-for="(item,index) in imgs"
        :key="item"
      >
        <i class="iconfont del icon-shanchu" @click="delFun(index)"></i>
        <img
          :src="item"
          class="images"
          @click="imgClick(item,index)"
        >
      </div>
    </div>
    <div class="click-upload" @click="chooseImg">
      <div class="bUpload" v-show="imgs.length < maxLength">
        <i class="iconfont icon-jiahao bUpload-icon"></i>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Toast
} from 'mand-mobile';

export default {
  name: 'BWxUpload',
  components: {
  },
  data() {
    return {
      isFinished: true
    };
  },
  props: {
    imgs: {
      type: Array,
      default: () => []
    },
    imgObj: {
      type: Object,
      default: () => {
      }
    },
    maxLength: {
      type: Number,
      default: 1
    },
    // 用来上传的函数
    uploadFn: {
      type: Function,
      default: () => function () {},
      required: true
    }
  },
  created() {
    localStorage.setItem('picFinishedStatus', 'true');
  },
  activated() {
    localStorage.setItem('picFinishedStatus', 'true');
  },
  methods: {
    imageuploaded(data) {
      Toast.hide();
      this.$emit('imageuploaded', data, this.imgs);
    },
    delFun(index) {
      this.$emit('delFun', index);
    },
    imageuploading() {
      Toast.loading('上传中');
    },
    chooseImg() {
      this.isFinished = localStorage.getItem('picFinishedStatus');
      if (this.isFinished === 'false') {
        return;
      }
      localStorage.setItem('picFinishedStatus', 'false');
      /* 选择图片,并上传 */
      wx.ready(() => {
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            const localId = res.localIds.join(''); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            // Android6.2之前会有无法调用uploadImage的bug
            setTimeout(() => {
              wx.uploadImage({
                localId, // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: (uploadImageRes) => {
                  const serverId = uploadImageRes.serverId; // 返回图片的服务器端ID
                  this.uploadFn(serverId).then((data) => {
                    // this.imgs.push(localId);
                    this.imageuploaded(data);
                  });
                },
                fail(uploadError) {
                  this.$emit('errorhandle', uploadError);
                }
              });
            }, 100);
          },
          fail(error) {
            this.$emit('errorhandle', error);
          },
          complete() {
            localStorage.setItem('picFinishedStatus', 'true');
          }
        });
      });
    },
    imgClick(src) {
      /* 图片点击事件 */
      this.$emit('imgClick', src);
    }
  }
};
</script>
<style lang="scss">
  .bUpload {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 140px;
    height: 140px;
    border: 1px solid #D0D0D0;
    text-align: center;
    border-radius: 6px;
  }

  /*.images{*/
  /*background: #000;*/
  /*width: 200px;*/
  /*height: 200px;*/
  /*}*/
  .bUpload-icon {
    color: #D0D0D0;
    font-size: 70px;
  }

  .bUpload-img-preshow {
    display: flex;
  }

  .bUpload-img-par {
    display: flex;
    flex-wrap: wrap;
  }

  .bUpload-preshow {
    position: relative;
    width: 200px;
    height: 200px;
    margin-right: 20px;
    justify-content: space-between;

    img {
      width: 100%;
      height: 100%;
    }

    .del {
      font-size: 28px;
      position: absolute;
      color: #333;
      right: -14px;
      top: -14px;
      background: #fff;
      border-radius: 100%;
    }
  }
</style>
