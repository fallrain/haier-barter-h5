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
      >返回上一步
      </button>
      <button
        type="button"
        class="common-submit-btn-default"
      >上传凭证
      </button>
    </div>
  </div>
</template>

<script>
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
        {
          id: 1,
          name: '海尔/空调，KFR-35G',
          price: 2299
        },
        {
          id: 2,
          name: '海尔/空调，KFR-35G',
          price: 9999
        }
      ],
      // 发票图片地址
      invoiceImg: []
    };
  }
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
