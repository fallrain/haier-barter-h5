<template>
  <li class="bEvaluateProductItem">
    <div class="bEvaluateProductItem-check">
      <i class="iconfont icon-duihao"></i>
    </div>
    <div class="bEvaluateProductItem-cnt">
      <div class="bEvaluateProductItem-cnt-person mb22">
        <span class="name mr16">张自强</span>
        <span class="mr16">先生</span>
        <i class="iconfont icon-dianhua mr16"></i>
        <span>13884970216</span>
      </div>
      <div class="bEvaluateProductItem-cnt-price mb22">
        <span class="name">冰箱</span>
        <span class="price">￥200.00</span>
      </div>
      <div class="bEvaluateProductItem-cnt-time">
        <i class="iconfont icon-shizhong"></i>2019-06-18 15:33
      </div>
    </div>
    <div>
      <button
        type="button"
        class="common-btn-primary"
      >估价详情</button>
    </div>
  </li>
</template>

<script>
export default {
  name: 'BEvaluateProductItem'
};
</script>

<style lang="scss">
  .bEvaluateProductItem {
    display: flex;
    align-items: center;
    padding-top: 32px;
    padding-bottom: 32px;
    border-bottom: 1px solid #D9D9D9;
  }

  .bEvaluateProductItem-cnt {
    width: 490px;
    overflow: hidden;
  }

  .bEvaluateProductItem-cnt-person {
    color: #333;
    line-height: 1;

    & > .name {
      font-size: 36px;
    }

    & > .iconfont {
      font-size: 32px;
      color: #1969C6;
    }
  }

  .bEvaluateProductItem-cnt-price {
    line-height: 1;
    font-size: 28px;

    & > .name {
      color: #666;
      margin-right: 18px;
    }

    & > .price {
      color: #1969C6;
    }
  }

  .bEvaluateProductItem-cnt-time {
    line-height: 1;
    font-size: 28px;
    color: #1969C6;

    .iconfont {
      font-size: 28px;
      margin-right: 18px;
      color: #bbb;
    }
  }

  .bEvaluateProductItem-btn-par {
    margin-left: auto;
  }
</style>
