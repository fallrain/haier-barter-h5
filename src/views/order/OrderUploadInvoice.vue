<template>
  <div class="orderUploadInvoice">
    <div class="orderUploadInvoice-head">上传产品购机凭证</div>
    <!-- <b-radio-item
      :inline="true"
      :list="uploadTypes"
      v-model="uploadType"
    ></b-radio-item> -->
    <div class="orderUploadInvoice-cnt">
      <b-product-mult-upload
        :products="products"
        :merge="uploadType===1"
        v-model="invoiceImg"
        @uploadSuccess="uploadSuccess"
        @uploadErr="uploadErr"
        @delImg="delImg"

      ></b-product-mult-upload>
    </div>
    <div class="orderUploadInvoice-tips mt16">
      <p class="orderUploadInvoice-tips-title">温馨提示：</p>
      <p>购机凭证必须上传，在3个月内，允许补传正规购机凭证。</p>
    </div>
    <div class="orderUploadInvoice-question mt16">
      <p class="orderUploadInvoice-question-title">问题解答：</p>
      <ul>
        <li
          class="orderUploadInvoice-question-item"
        >
          <p class="orderUploadInvoice-question-item-q">
            Q1、为什么需要上传购机凭证
          </p>
          <p class="orderUploadInvoice-question-item-answer">
            A：通过购机凭证校验销售订单的真实性
          </p>
        </li>
        <li
          class="orderUploadInvoice-question-item"
        >
          <p class="orderUploadInvoice-question-item-q">
            Q2、购机凭证都支持哪些类型
          </p>
          <p class="orderUploadInvoice-question-item-answer">
            A：上传购机凭证包括：发票、购机小票、系统订单截图
          </p>
        </li>
      </ul>
    </div>
    <div class="orderEntry-btns-par">
      <button
        type="button"
        class="common-submit-btn-primary"
        @click="skipUpload"
      >跳过
      </button>
      <button
        type="button"
        class="common-submit-btn-default"
        @click="updateSubmit"
      >上传凭证
      </button>
    </div>
  </div>
</template>

<script>
import {
  Toast
} from 'mand-mobile';

import {
  BRadioItem
} from '@/components/form';

import {
  BProductMultUpload
} from '@/components/business';

export default {
  name: 'OrderUploadInvoice',
  components: {
    BProductMultUpload,
    BRadioItem
  },
  data() {
    return {
      invoiceList: [],
      fileMap: {},
      // 上传类型类型单选
      uploadTypes: [
        {
          key: 1,
          value: '合并上传发票'
        },
        {
          key: 2,
          value: '单台上传发票'
        }
      ],
      // 上传类型
      uploadType: 2,
      // 产品
      products: [
      ],
      // 发票图片地址
      invoiceImg: [],
      orderNo: '',
    };
  },
  activated() {
    console.log('tag', this.$route.params);
    if (this.$route.params.orderNo) {
      this.orderNo = this.$route.params.orderNo;
      this.getData();
    }
  },
  created() {
  },
  methods: {
    skipUpload() {
      this.$router.push({
        name: 'Order.OrderConfirm',
        params: { orderNo: this.orderNo }
      });
    },
    uploadSuccess(data, fileMap, product) {
      data.orderNo = this.orderNo;
      data.orderDetailId = product.id;
      data.invoiceUpload = 1;
      delete data.id;
      this.invoiceList.push(data);
    },
    uploadErr(msg) {
      Toast.failed(msg);
    },
    delImg(fileList) {
      this.invoiceList.forEach((val) => {
        if (fileList === val) {
          this.invoiceList.remove(fileList);
        }
      });
    },

    indexOf(val) {
      for (let i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
      }
      return -1;
    },
    remove(val) {
      const index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
      }
    },

    updateSubmit() {
      if (this.invoiceList.length == 0) {
        Toast.failed('请上传凭证！');
        return;
      }
      this.orderService.uploadInvoice(this.invoiceList, { orderNo: this.orderNo }).then((res) => {
        if (res.code === 1) {
          Toast.succeed('上传成功');
          setTimeout(() => {
            this.$router.push({
              name: 'Order.OrderConfirm',
              params: { orderNo: this.orderNo }
            });
          }, 800);
        }
      });
    },
    getData() {
      this.orderService.queryOrderDetailAndInvoice({}, { orderNo: this.orderNo }).then((res) => {
        if (res.code === 1) {
          this.products = res.data;
        }
      });
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'Order.OrderEntry' || to.name === 'Order.OrderModify') { // 此处判断是如果返回上一层，你可以根据自己的业务更改此处的判断逻辑，酌情决定是否摧毁本层缓存。
      localStorage.setItem('invoice', 'true');
      to.params.orderNo = this.orderNo;
      if (this.$vnode && this.$vnode.data.keepAlive) {
        if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
          if (this.$vnode.componentOptions) {
            const key = this.$vnode.key == null
              ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
              : this.$vnode.key;
            const cache = this.$vnode.parent.componentInstance.cache;
            const keys = this.$vnode.parent.componentInstance.keys;
            if (cache[key]) {
              if (keys.length) {
                const index = keys.indexOf(key);
                if (index > -1) {
                  keys.splice(index, 1);
                }
              }
              delete cache[key];
            }
          }
        }
      }
      this.$destroy();
    }
    next();
  },

};
</script>

<style lang="scss">
  .orderUploadInvoice {
    width: 100%;
    padding: 24px;

    .md-radio-label {
      color: #666;
      font-size: 28px;
    }
  }

  .orderUploadInvoice-head {
    color: #333;
    font-size: 28px;
  }

  .orderUploadInvoice-cnt {
    margin-top: 36px;
  }

  .orderUploadInvoice-tips {
    padding: 24px;
    font-size: 24px;
    color: #999;
    background: #fff;
    border-radius: 8px;
  }

  .orderUploadInvoice-tips-title {
    color: #F5A623;
    font-size: 28px;
    margin-bottom: 18px;
  }

  .orderUploadInvoice-question {
    padding: 24px;
    background: #fff;
  }

  .orderUploadInvoice-question-title {
    color: #666;
    font-size: 28px;
    margin-top: 4px;
    margin-bottom: 18px;
  }

  .orderUploadInvoice-question-item {
    font-size: 24px;
    line-height: 36px;
  }

  .orderUploadInvoice-question-item-q {
    color: #999;
  }

  .orderUploadInvoice-question-item-answer {
    color: #1969C6;
  }
</style>
