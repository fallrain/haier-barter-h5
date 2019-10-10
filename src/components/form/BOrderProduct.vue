<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform" xmlns:v-solt="">
  <li
    class="b-order-product-item"
  >
    <div class="b-order-product-item-head">
      <!--<span class="b-order-product-item-head-name">{{data.productGroupName}}/{{data.productBrandName}}，{{data.productModel}}</span>-->
      <span class="b-order-product-item-head-name">{{data.productModel}}</span>

      <div>
        <input
          class="b-order-product-item-price"
          type="number"
          v-model="data.productPrice"
        ><span class="b-order-product-item-price-unit">元</span>
      </div>

      <button
        type="button"
        class="common-btn-del"
        @click="onDel"
      >删除
      </button>
    </div>
    <div
      v-if="content"
      class="b-order-product-item-cnt"
    >

      <p class="p-class">产品需要代报装,请选择代包装时间:</p>
      <b-date-picker
        class="orderEntry-date2"
        slot="right"
        type="custom"
        :custom-types="customType"
        title="请选择日期"
        :defaultDate="currentDate"
        :min-date="currentDate"
        v-model="data.installTime"
        :pattern="pattern"
      ></b-date-picker>

    </div>
  </li>
</template>
<script>
import {
  BDatePicker,
  BItem
} from '@/components/form';

export default {
  name: 'BOrderProduct',
  components: {
    BItem,
    BDatePicker
  },
  props: {
    // 产品详情
    data: {
      type: Object
    },
    // 产品索引
    index: {},
    // 是否有内容
    content: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      reportTime: '',
      currentDate: new Date(),
      customType: ['yyyy', 'MM', 'dd', 'hh'],
      pattern: 'yyyy-MM-dd hh:00'
    };
  },
  created() {
    const y = this.currentDate.getFullYear();
    // const m = (this.currentDate.getMonth() + 1) < 10 ? `0${dd.getMonth() + 1}` : (dd.getMonth() + 1);// 获取当前月份的日期，不足10补0
    // const d = this.currentDate.getDate() < 10 ? `0${dd.getDate()}` : dd.getDate();
    const m = this.currentDate.getMonth();
    const d = this.currentDate.getDate();
    const h = this.currentDate.getHours() + 1;
    // this.currentDate = `${y}-${m}-${d} ${h}`
  },
  methods: {
    onDel() {
      /* 删除 */
      this.$emit('onDel', this.index);
    }
  }
};
</script>

<style lang="scss">
  .b-order-product-item {
    border: 1px solid #1969C6;
    border-radius: 8px;
  }

  .b-order-product-item-head {
    display: flex;
    align-items: center;
    background: #F8F8F8;
    height: 80px;
    /*border-top-left-radius: 8px;
    border-top-right-radius: 8px;*/
    border-radius: 8px;
    padding-left: 16px;
    padding-right: 16px;

    .common-btn-del {
      margin-left: auto;
    }
  }

  .b-order-product-item-head-name {
    color: #333;
    font-size: 28px;
    width: 374px;
    flex-shrink: 0;
  }

  .b-order-product-item-price {
    width: 156px;
    height: 60px;
    border: 1px solid #D0D0D0;
    border-radius: 8px;
    padding-left: 8px;
    padding-right: 8px;
  }

  .b-order-product-item-price-unit {
    margin-left: 9px;
    font-size: 28px;
    color: #333;
  }

  .b-order-product-item-cnt {
    height: 100px;
    padding: 24px 16px 20px;
    color: #1969C6;
    font-size: 24px;
  }

  .orderEntry-reportInf {
    color: #3078CC !important;
    font-size: 26px;
    position: relative;
  }

  .orderEntry-date2 {
    width: 280px;
    float: right;
    margin-bottom: 10px;
  }

  .p-class {
    width: 380px;
    float: left;
    margin-top: 10px;
  }
</style>
