<template>
  <div
    :class="[merge && 'bProductMultUpload-list-merge']"
  >
    <ul>
      <li
        class="bProductMultUpload-item"
        v-for="(product,index) in products"
        :key="index"
      >
        <div class="bProductMultUpload-item-head">
          <span>{{index+1}}.{{product.productModel}}</span>
          <span>{{product.productPrice}}元</span>
        </div>
        <div
          v-if="!merge"
          class="bProductMultUpload-item-cnt"
        >
          <b-upload
            :crop="false"
            inputOfFile="file"
            :max-file-size="1024*1024*10"
            :maxWidth="1280"
            :compress="70"
            :headers="headers"
            @imageuploaded="(data, fileList)=>imageuploaded(data, fileList, product)"
            :url="uploadUrl"
            :multiple-size="1"
            :imgs="fileMap[products.productCode]"
            @delFun="(index, fileList)=>delImg(index, fileList, product)"
            :data="dataObj"
            @errorhandle="uploadError"
          >
          </b-upload>
          <p class="bProductMultUpload-item-inf">上传购机凭证,包括:发票、购机小票</p>
        </div>
      </li>
    </ul>
    <div
      v-if="merge"
      class="bProductMultUpload-merge-cnt"
    >
      <!-- <b-upload
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
        :data="dataObj"
      ></b-upload> -->
      <!-- <div class="bProductMultUpload-merge-inf">
        <p> 多个产品合并(<span class="active"> 可上传多张图片</span>）</p>
        <p>开一张发票上传购机凭证,包括:发票、购机小票</p>
      </div> -->
    </div>
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
    // fileMap:{
    //   type:Object,
    //   default: () => {}
    // },
    // fileList: {
    //   type: Array,
    //   default: () => []
    // },
    fileData: {
      type: Object,
      default: () => {}
    },
    // 产品列表
    products: {
      type: Array,
      default: () => []
    },
    merge: {
      type: Boolean,
      default: false
    }
  },
  components: {
    BUpload,
    [Toast.name]: Toast
  },
  data() {
    return {
      fileMap: {},
      fileList: [],
      dataObj: { recordMode: 'Haier' },
      // 上传的地址
      uploadUrl: '/api/manage/orderManage/checkInvoice',
      headers: {
        Authorization: ''
      }
    };
  },
  created() {
    this.headers.Authorization = `Bearer  ${localStorage.getItem('acces_token')}`;
    this.genFileMap();
  },
  methods: {
    genFileMap() {
      setTimeout(() => {
        this.products.forEach((v) => {
          this.$set(this.fileMap, v.productCode, []);
        });
      });
    },
    imageChanged(res) {

    },
    imageuploaded(data, fileList, product) {
      /* 上传成功 */
      // todo 返回值待定


      if (data.code === 1) {
        if (data.data.invoiceUrl !== null) {
          fileList.push(data.data.invoiceUrl);
        }
        this.$emit('uploadSuccess', data.data, this.fileMap, product);
      } else {
        this.$emit('uploadErr', data.msg);
      }
    },
    uploadError(res) {
      /* 上传错误 */
      const errorObj = {
        'TYPE ERROR': '只能上传jpg/png/gif类型图片',
        'FILE IS TOO LARGER MAX FILE IS': '图片最大不能超过10M'
      };
      for (const p in errorObj) {
        if (new RegExp(p).test(res)) {
          Toast.failed(errorObj[p]);
          return;
        }
      }
      Toast.failed(res || '上传失败');
    },
    delImg(index, fileList, product) {
      fileList.splice(index, 1);
      this.$emit('delImg', fileList, product);
    }
  }
};
</script>

<style lang="scss">
  .bProductMultUpload-list-merge {
    border: 1px solid #1969C6;
    border-radius: 8px;

    .bProductMultUpload-item {
      border: 0;
      margin-bottom: 0;
      border-bottom: 1px solid #F5F5F5;
    }
  }

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

  .bProductMultUpload-merge-cnt {
    display: flex;
    align-items: center;
    padding: 24px;
  }

  .bProductMultUpload-merge-inf {
    margin-left: 28px;
    color: #999;
    font-size: 24px;
    line-height: 30px;

    .active {
      color: #1969C6;
    }
  }
</style>
