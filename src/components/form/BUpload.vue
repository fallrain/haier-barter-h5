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
    <vue-core-image-upload
      v-bind="$attrs"
      inputAccept="image/*"
      @imageuploaded="imageuploaded"
      @imageuploading="imageuploading"
      @errorhandle="uploadError"
    >
      <div class="bUpload" v-show="imgs.length < maxLength">
        <i class="iconfont icon-jiahao bUpload-icon"></i>
      </div>
    </vue-core-image-upload>
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
    Toast
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
      Toast.hide();
      this.$emit('errorhandle', res);
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
