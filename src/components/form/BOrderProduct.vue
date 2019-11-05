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
          @blur="blur"
          v-resetInput
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
      <p class="p-class">请选择代报装时间：</p>
      <b-date-picker
        class="orderEntry-date2"
        slot="right"
        type="custom"
        :custom-types="customType"
        title="请选择日期"
        :defaultDate="defaultDate"
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
import {
  Toast
} from 'mand-mobile';

export default {
  name: 'BOrderProduct',
  components: {
    BItem,
    BDatePicker,
    [Toast.name]: Toast,
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
      currentDate: '',
      customType: ['yyyy', 'MM', 'dd', 'hh'],
      pattern: 'yyyy-MM-dd hh:00',
      defaultDate: ''
    };
  },
  created() {
    //  const dd = new Date();
    // const y = dd.getFullYear();
    // const m = (dd.getMonth() + 1) < 10 ? `0${dd.getMonth() + 1}` : (dd.getMonth() + 1);// 获取当前月份的日期，不足10补0
    // const d = dd.getDate() < 10 ? `0${dd.getDate()}` : dd.getDate();// 获取当前几号，不足10补0
    // const h = dd.getHours() + 1;
    // this.currentDate = `${y}-${m}-${d} ${h}:00`
    // debugger
    // this.currentDate = Date.parse(this.currentDate)
    // this.currentDate = new Date(this.currentDate)
    // if(h >=14){
    //   this.currentDate = new Date(new Date().getTime() + 3600 * 33000)
    // }
    this.currentDate = new Date(new Date().getTime() + 3600 * 2000);
  },
  methods: {
    onDel() {
      /* 删除 */
      this.$emit('onDel', this.index);
    },
    blur() {
      this.data.productPrice = this.formatDecimal(this.data.productPrice, 2);
      if (this.data.productPrice < 0) {
        Toast.failed('请输入正确的产品价格');
        this.data.productPrice = '';
      }
    },
    formatDecimal(num, decimal) {
      num = num.toString();
      const index = num.indexOf('.');
      if (index !== -1) {
        num = num.substring(0, decimal + index + 1);
      } else {
        num = num.substring(0);
      }
      return parseFloat(num).toFixed(decimal);
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
    width: 320px;
    margin-bottom: 10px;
    position: absolute;
    margin-left: 340px;
  }

  .p-class {
    width: 350px;
    float: left;
    margin-top: 10px;
  }
</style>
