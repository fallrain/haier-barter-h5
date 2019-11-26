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
          :src="item" class="images"
        >
      </div>
    </div>
    <div @click="chooseImg">
      <div class="bUpload" v-show="imgs.length < 1">
        <i class="iconfont icon-jiahao bUpload-icon"></i>
      </div>
    </div>
  </div>
</template>
<script>
import VueCoreImageUpload from 'vue-core-image-upload';
import {
  Toast
} from 'mand-mobile';

export default {
  name: 'BUpload',
  components: {
    VueCoreImageUpload,
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
    }
  },
  methods: {
    imageuploaded(data) {
      Toast.hide();
      this.$emit('imageuploaded', data, this.imgs);
    },
    delFun(index) {
      this.$emit('delFun', index, this.imgs);
    },
    imageuploading() {
      Toast.loading('上传中');
    },
    uploadError(res) {
      this.$emit('errorhandle', res);
    },
    chooseImg() {
      /* 选择图片 */
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: (res) => {
          const localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        }
      });
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
