<template>
  <li
    class="b-order-product-item"
  >
    <div class="b-order-product-item-head">
      <span class="b-order-product-item-head-name-confirm">{{data.productModel}}</span>
      <div class="b-order-product-confirm">
        <p
          class="b-order-product-item-price-confirm"
        >{{data.productPrice}}<span class="b-order-product-item-price-unit">元</span></p>
      </div>
    </div>
    <div
      v-if="content"
      class="b-order-product-item-cnt"
    <p class="install-class">代包装时间：{{data.installTime}}</p>
      <slot></slot>
    </div>
  </li>
</template>

<script>
export default {
  name: 'BOrderProduct',
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
  methods: {
    onDel() {
      /* 删除 */
      this.$emit('onDel', this.data);
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

  .b-order-product-item-head-name-confirm {
    color: #333;
    font-size: 28px;
    width: 500px;
    flex-shrink: 0;
  }

  .b-order-product-item-price-confirm {
    color: #EF5A4B
  }

  .b-order-product-item-price-unit {
    margin-left: 9px;
    font-size: 28px;
    color: #333;
  }

  .b-order-product-item-cnt {
    padding: 24px 16px;
  }
  .install-class {
    padding: 20px;
    color: #1969C6;
  }
</style>
