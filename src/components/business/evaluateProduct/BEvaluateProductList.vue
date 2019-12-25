<template>
  <div class="bEvaluateProductList-par">
    <ul class="bEvaluateProductList">
      <b-evaluate-product-item
        v-for="(item,index) in list"
        :key="index"
      ></b-evaluate-product-item>
    </ul>
    <div class="bEvaluateProductList-chooseAll-btm">
      <div class="bEvaluateProductList-chooseAll">
        <div class="bEvaluateProductItem-check">
          <i class="iconfont icon-duihao"></i>
        </div>
        <span class="bEvaluateProductList-chooseAll-text">全选</span>
      </div>
      <div class="bEvaluateProductList-chooseAll-btns">
        <button
          type="button"
          class="bEvaluateProductList-chooseAll-btn-waring"
        >批量发券
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import BEvaluateProductItem from './BEvaluateProductItem';

export default {
  name: 'BEvaluateProductList',
  components: {
    BEvaluateProductItem
  },
  props: {
    // 列表数据
    list: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss">
  .bEvaluateProductList-par {
    height: 100%;
  }

  .bEvaluateProductList {
    padding-left: 24px;
    padding-right: 24px;
    background: #fff;

    .bEvaluateProductItem:last-child {
      border-bottom: 0;
    }
  }

  .bEvaluateProductList-chooseAll-btm {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 120px;
    padding-left: 24px;
    padding-right: 24px;
    background: #F8F8F8;
    border-top: 1px solid #D0D0D0;
  }

  .bEvaluateProductList-chooseAll {
    display: flex;
    align-items: center;
  }

  .bEvaluateProductList-chooseAll-text {
    font-size: 28px;
  }

  .bEvaluateProductList-chooseAll-btns {

  }

  .bEvaluateProductList-chooseAll-btn-waring {
    width: 180px;
    height: 60px;
    background: #F5A623;
    font-size: 28px;
    color: #fff;
    border-radius: 30px;
  }
</style>
