<template>
  <div>
    <ul>
      <li
        class="bProductMultUpload-item"
        v-for="(product,index) in products"
        :key="index"
      >
        <div class="bProductMultUpload-item-head">
          <span>{{index+1}}.{{product.name}}</span>
          <span>{{product.price}}元</span>
        </div>
        <div class="bProductMultUpload-item-cnt">
          <b-upload
            v-show="value.length < 1"
            :crop="false"
            inputOfFile="file"
            @imageuploaded="imageUploaded"
            :max-file-size="1024*1024*20"
            :maxWidth="1280"
            :compress="70"
            extensions="png,jpg,jpeg"
            inputAccept="image/jpg,image/jpeg,image/png"
            :url="uploadUrl"
            :multiple-size="1"
            @errorhandle="uploadError"
            :imgs="value"
            :delFun="delImg"
          ></b-upload>
          <p class="bProductMultUpload-item-inf">上传购机凭证,包括:发票、购机小票</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  Toast
} from 'mand-mobile';

import {
  BUpload
} from '@/components/form';

export default {
  name: 'BProductMultUpload',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    // 产品列表
    products: {
      type: Array,
      default: () => []
    }
  },
  components: {
    BUpload
  },
  data() {
    return {
      // 上传的地址
      uploadUrl: ''
    };
  },
  methods: {
    imageUploaded({ code, data }) {
      /* 上传成功 */
      // todo 返回值待定
      if (code === 1) {
        this.$emit('input', data.url);
      }
    },
    uploadError(res) {
      /* 上传错误 */
      const errorObj = {
        'FILE IS TOO LARGER MAX FILE IS': '图片最大不能超过20M'
      };
      for (const p in errorObj) {
        if (new RegExp(p).test(res)) {
          Toast.failed(errorObj[p]);
          return;
        }
      }
      Toast.failed('上传失败');
    },
    delImg() {
      this.$emit('input', []);
    }
  }
};
</script>

<style lang="scss">
  .bProductMultUpload-item {
    background: #fff;
    border: 1px solid #1969C6;
    border-radius: 8px;
    color: #333;
    font-size: 28px;
    padding: 24px;
    margin-bottom: 16px;
  }

  .bProductMultUpload-item-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .bProductMultUpload-item-cnt {
    display: flex;
    align-items: center;
    margin-top: 50px;
  }

  .bProductMultUpload-item-inf {
    margin-left: 28px;
    font-size: 24px;
    color: #999;
  }
</style>
